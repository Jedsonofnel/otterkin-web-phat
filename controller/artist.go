package controller

import (
	"net/http"

	"github.com/Jedsonofnel/otterkin-web/auth"
	"github.com/Jedsonofnel/otterkin-web/model"
	"github.com/Jedsonofnel/otterkin-web/view"
	"github.com/labstack/echo/v5"
)

// Pages we have as an artist:
// Artist profile main page (where you can change artist-specific info)
// Artist profile gallery page (where an artist can upload images)
// Artist public page (for people to look/read about/commission an artist)
func (hc HandlerContext) ArtistHandler(g *echo.Group) {
	g.GET("/profile/:id", hc.ArtistProfileHandler, OnlyArtists, OnlyTheCorrespondingUser)
	g.PUT("/profile/:id", hc.ArtistProfileUpdateHandler, OnlyArtists, OnlyTheCorrespondingArtist(hc.e.App))

	// gallery stuff
	g.GET("/profile/:id/gallery", hc.ArtistProfileGalleryHandler, OnlyArtists, OnlyTheCorrespondingUser, LoadFlash)
	g.POST("/profile/:id/gallery", hc.ArtistProfileGalleryPostHandler, OnlyArtists, OnlyTheCorrespondingArtist(hc.e.App))
}

func (hc HandlerContext) ArtistProfileHandler(c echo.Context) error {
	// we can use the GetArtistByUserId function because this route
	// is protected for only artists
	artist, err := model.GetArtistByUserId(hc.e.App.Dao(), c.PathParam("id"))
	if err != nil {
		return err
	}

	apd := view.NewArtistProfilePageData(artist)
	ld := view.NewLayoutData(c, "Artist Profile - Otterkin")
	return view.Render(c, http.StatusOK, view.ArtistProfilePage(ld, apd))
}

func (hc HandlerContext) ArtistProfileUpdateHandler(c echo.Context) error {
	artist, err := model.UpdateArtistById(hc.e.App, c, c.PathParam("id"))
	if err != nil {
		return err
	}

	return view.Render(c, http.StatusOK, view.ArtistUpdateResponse(artist))
}

func (hc HandlerContext) ArtistProfileGalleryHandler(c echo.Context) error {
	artist, err := model.GetArtistByUserId(hc.e.App.Dao(), c.PathParam("id"))
	if err != nil {
		return err
	}

	images, err := model.GetArtistImagesByArtistId(hc.e.App.Dao(), artist.Id)
	if err != nil {
		return err
	}

	apd := view.NewArtistGalleryPageData(artist, images)
	ld := view.NewLayoutData(c, "Artist Gallery - Otterkin")
	return view.Render(c, http.StatusOK, view.ArtistProfileGalleryPage(ld, apd))
}

func (hc HandlerContext) ArtistProfileGalleryPostHandler(c echo.Context) error {
	artistImage, err := model.CreateArtistImage(hc.e.App, c)
	if err != nil {
		errMap := auth.GetMapOfErrs(err)
		return view.Render(c, http.StatusUnprocessableEntity, view.GalleryFormError(errMap))
	}

	// if not we want to append the artist card to the thing
	return view.Render(c, http.StatusOK, view.GalleryFormSuccess(artistImage))
}
