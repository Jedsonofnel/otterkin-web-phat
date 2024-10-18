package controller

import (
	"fmt"
	"net/http"

	"github.com/Jedsonofnel/otterkin-web/auth"
	"github.com/Jedsonofnel/otterkin-web/model"
	"github.com/Jedsonofnel/otterkin-web/view"
	"github.com/Jedsonofnel/otterkin-web/view/components"
	"github.com/Jedsonofnel/otterkin-web/view/layout"
	"github.com/labstack/echo/v5"
)

// Pages we have as an artist:
// Artist profile main page (where you can change artist-specific info)
// Artist profile gallery page (where an artist can upload images)
// Artist public page (for people to look/read about/commission an artist)
func (hc HandlerContext) HandleArtist(g *echo.Group) { // public artist page
	g.GET("/:id", hc.HandleArtistPage)
	g.GET("/:id/gallery", hc.HandleArtistGalleryPage)

	// artist profile settings
	g.GET("/profile/:id", hc.HandleArtistProfile, OnlyArtists, OnlyTheCorrespondingUser)
	g.PUT("/profile/:id", hc.HandleUpdateArtistProfile, OnlyArtists, OnlyTheCorrespondingArtist(hc.e.App))
	g.PUT("/profile/:id/biography", hc.HandleUpdateArtistBiography, OnlyArtists, OnlyTheCorrespondingArtist(hc.e.App))
	g.POST("/profile/:id/tags", hc.HandleAddArtistTag, OnlyArtists, OnlyTheCorrespondingArtist(hc.e.App))
	g.DELETE("/profile/:id/tags", hc.HandleRemoveArtistTag, OnlyArtists, OnlyTheCorrespondingArtist(hc.e.App))

	// gallery stuff
	g.GET("/profile/:id/gallery", hc.HandleArtistProfileGallery, OnlyArtists, OnlyTheCorrespondingUser, LoadFlash)
	g.GET("/profile/:id/gallery/add-modal", hc.HandleCreateArtworkModal, OnlyArtists, OnlyTheCorrespondingArtist(hc.e.App))
	g.POST("/profile/:id/gallery", hc.HandleCreateArtwork, OnlyArtists, OnlyTheCorrespondingArtist(hc.e.App))

}

func (hc HandlerContext) HandleArtistPage(c echo.Context) error {
	artist, err := model.GetArtistByArtistId(hc.e.App.Dao(), c.PathParam("id"))
	if err != nil {
		return err
	}

	fmt.Printf("artist.User.Avatar: %v\n", artist.User.Avatar)

	artworks, err := model.GetArtworksByArtistId(hc.e.App.Dao(), c.PathParam("id"))
	if err != nil {
		return err
	}

	tags, err := model.GetAllArtistTagsIntoTypeByArtistId(hc.e.App.Dao(), artist.Id)

	apd := view.NewArtistPageData(artist, artworks, tags)
	ld := layout.NewLayoutData(c, "Artist Page - Otterkin")
	return Render(c, http.StatusOK, view.ArtistPage(ld, apd))
}

func (hc HandlerContext) HandleArtistGalleryPage(c echo.Context) error {
	artist, err := model.GetArtistByArtistId(hc.e.App.Dao(), c.PathParam("id"))
	if err != nil {
		return err
	}

	artworks, err := model.GetArtworksByArtistId(hc.e.App.Dao(), c.PathParam("id"))
	if err != nil {
		return err
	}

	agd := view.NewArtistGalleryPageData(artist, artworks)
	ld := layout.NewLayoutData(c, "Gallery Page - Otterkin")
	return Render(c, http.StatusOK, view.ArtistGalleryPage(ld, agd))
}

func (hc HandlerContext) HandleArtistProfile(c echo.Context) error {
	// we can use the GetArtistByUserId function because this route
	// is protected for only artists
	artist, err := model.GetArtistByUserId(hc.e.App.Dao(), c.PathParam("id"))
	if err != nil {
		return err
	}

	tags, err := model.GetAllTagsIntoType(hc.e.App.Dao())
	if err != nil {
		return err
	}

	artistTags, err := model.GetAllArtistTagsIntoTypeByArtistId(hc.e.App.Dao(), artist.Id)
	if err != nil {
		return err
	}

	apd := view.NewArtistProfilePageData(artist, tags, artistTags)
	ld := layout.NewLayoutData(c, "Artist Profile - Otterkin")
	return Render(c, http.StatusOK, view.ArtistProfilePage(ld, apd))
}

func (hc HandlerContext) HandleUpdateArtistProfile(c echo.Context) error {
	_, err := model.UpdateArtistById(hc.e.App, c, c.PathParam("id"))
	if err != nil {
		return err
	}

	return Render(c, http.StatusOK, view.SavedIndicator("#artist-details"))
}

func (hc HandlerContext) HandleUpdateArtistBiography(c echo.Context) error {
	_, err := model.UpdateArtistById(hc.e.App, c, c.PathParam("id"))
	if err != nil {
		return err
	}

	return Render(c, http.StatusOK, view.SavedIndicator("#biography"))
}

func (hc HandlerContext) HandleAddArtistTag(c echo.Context) error {
	artistId := c.PathParam("id")
	tagId := c.QueryParam("index")

	artist, err := model.GetArtistByArtistId(hc.e.App.Dao(), artistId)
	if err != nil {
		return err
	}

	tag, err := model.GetTagById(hc.e.App.Dao(), tagId)
	if err != nil {
		return err
	}

	_, err = model.CreateTagRelation(hc.e.App, artist, tag)
	if err != nil {
		return err
	}

	deleteURL := fmt.Sprintf("/artist/profile/%s/tags?index=%s", artist.Id, tag.Id)
	return Render(c, http.StatusOK, components.DropdownMultiSelectTag(tag.Name, deleteURL))
}

func (hc HandlerContext) HandleRemoveArtistTag(c echo.Context) error {
	artistId := c.PathParam("id")
	tagId := c.QueryParam("index")

	err := model.RemoveTagRelation(hc.e.App.Dao(), artistId, tagId)
	if err != nil {
		return err
	}

	return c.NoContent(http.StatusOK)
}

func (hc HandlerContext) HandleArtistProfileGallery(c echo.Context) error {
	artist, err := model.GetArtistByUserId(hc.e.App.Dao(), c.PathParam("id"))
	if err != nil {
		return err
	}

	artworks, err := model.GetArtworksByArtistId(hc.e.App.Dao(), artist.Id)
	if err != nil {
		return err
	}

	apd := view.NewArtistGalleryPageData(artist, artworks)
	ld := layout.NewLayoutData(c, "Artist Gallery - Otterkin")
	return Render(c, http.StatusOK, view.ArtistProfileGalleryPage(ld, apd))
}

func (hc HandlerContext) HandleCreateArtworkModal(c echo.Context) error {
	artist, err := model.GetArtistByArtistId(hc.e.App.Dao(), c.PathParam("id"))
	if err != nil {
		return err
	}
	return Render(c, http.StatusOK, view.ArtistGalleryAddModal(artist))
}

func (hc HandlerContext) HandleCreateArtwork(c echo.Context) error {
	artwork, err := model.CreateArtwork(hc.e.App, c)
	if err != nil {
		fmt.Printf("err: %v\n", err)
		errMap := auth.GetMapOfErrs(err)
		return Render(c, http.StatusUnprocessableEntity, view.ArtistGalleryFormError(errMap))
	}

	// if not we want to append the artist card to the thing
	c.Response().Header().Add("data-modal-close", "true")
	return Render(c, http.StatusOK, view.EditableArtwork(artwork))
}
