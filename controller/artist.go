package controller

import (
	"net/http"

	"github.com/Jedsonofnel/otterkin-web/auth"
	"github.com/Jedsonofnel/otterkin-web/model"
	"github.com/Jedsonofnel/otterkin-web/view"
	"github.com/Jedsonofnel/otterkin-web/view/layout"
	"github.com/labstack/echo/v5"
)

// Pages we have as an artist:
// Artist profile main page (where you can change artist-specific info)
// Artist profile gallery page (where an artist can upload images)
// Artist public page (for people to look/read about/commission an artist)
func (hc HandlerContext) HandleArtist(g *echo.Group) {
	// public artist page
	g.GET("/:id", hc.HandleArtistPage)

	// artist profile settings
	g.GET("/profile/:id", hc.HandleArtistProfile, OnlyArtists, OnlyTheCorrespondingUser)
	g.PUT("/profile/:id", hc.HandleUpdateArtistProfile, OnlyArtists, OnlyTheCorrespondingArtist(hc.e.App))

	// gallery stuff
	g.GET("/profile/:id/gallery", hc.HandleArtistProfileGallery, OnlyArtists, OnlyTheCorrespondingUser, LoadFlash)
	g.POST("/profile/:id/gallery", hc.HandleCreateArtistImage, OnlyArtists, OnlyTheCorrespondingArtist(hc.e.App))
}

func (hc HandlerContext) HandleArtistPage(c echo.Context) error {
	artist, err := model.GetArtistByArtistId(hc.e.App.Dao(), c.PathParam("id"))
	if err != nil {
		return err
	}

	artworks, err := model.GetArtworksByArtistId(hc.e.App.Dao(), c.PathParam("id"))
	if err != nil {
		return err
	}

	apd := view.NewArtistPageData(artist, artworks)
	ld := layout.NewLayoutData(c, "Artist Page - Otterkin")
	return Render(c, http.StatusOK, view.ArtistPage(ld, apd))
}

func (hc HandlerContext) HandleArtistProfile(c echo.Context) error {
	// we can use the GetArtistByUserId function because this route
	// is protected for only artists
	artist, err := model.GetArtistByUserId(hc.e.App.Dao(), c.PathParam("id"))
	if err != nil {
		return err
	}

	apd := view.NewArtistProfilePageData(artist)
	ld := layout.NewLayoutData(c, "Artist Profile - Otterkin")
	return Render(c, http.StatusOK, view.ArtistProfilePage(ld, apd))
}

func (hc HandlerContext) HandleUpdateArtistProfile(c echo.Context) error {
	artist, err := model.UpdateArtistById(hc.e.App, c, c.PathParam("id"))
	if err != nil {
		return err
	}

	return Render(c, http.StatusOK, view.ArtistUpdateResponse(artist))
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

func (hc HandlerContext) HandleCreateArtistImage(c echo.Context) error {
	artwork, err := model.CreateArtwork(hc.e.App, c)
	if err != nil {
		errMap := auth.GetMapOfErrs(err)
		return Render(c, http.StatusUnprocessableEntity, view.GalleryFormError(errMap))
	}

	// if not we want to append the artist card to the thing
	return Render(c, http.StatusOK, view.GalleryFormSuccess(artwork))
}
