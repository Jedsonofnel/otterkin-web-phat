package controller

import (
	"fmt"
	"net/http"

	"github.com/Jedsonofnel/otterkin-web/auth"
	"github.com/Jedsonofnel/otterkin-web/model"
	"github.com/Jedsonofnel/otterkin-web/view"
	"github.com/Jedsonofnel/otterkin-web/view/layout"
	"github.com/labstack/echo/v5"
	"github.com/pocketbase/pocketbase/apis"
	"github.com/pocketbase/pocketbase/models"
)

func artworkUrl(artwork model.ArtistImage) string {
	return fmt.Sprintf(
		"/api/files/artist_images/%s/%s",
		artwork.Id,
		artwork.Image,
	)
}

func (hc HandlerContext) HandleArtwork(g *echo.Group) {
	g.GET("/:id", hc.HandleGetArtwork)
	g.GET("/edit/:id", hc.HandleGetArtworkUpdateModal, OnlyTheOwnerArtist(hc.e.App))
	g.PUT("/edit/:id", hc.HandleUpdateArtwork, OnlyTheOwnerArtist(hc.e.App))
	g.DELETE("/:id", hc.HandleDeleteArtwork, OnlyTheOwnerArtist(hc.e.App))
}

func (hc HandlerContext) HandleGetArtwork(c echo.Context) error {
	artwork, err := model.GetArtistImageById(hc.e.App.Dao(), c.PathParam("id"))
	if err != nil {
		return err
	}
	url := artworkUrl(artwork)
	return Render(c, http.StatusOK, view.Image(url, artwork.Description))
}

func (hc HandlerContext) HandleGetArtworkUpdateModal(c echo.Context) error {
	artwork, err := model.GetArtistImageById(hc.e.App.Dao(), c.PathParam("id"))
	if err != nil {
		return err
	}

	return Render(c, http.StatusOK, view.ImageModal(artwork))
}

func (hc HandlerContext) HandleUpdateArtwork(c echo.Context) error {
	_, err := model.UpdateArtistImageById(hc.e.App, c, c.PathParam("id"))
	if err != nil {
		errMap := auth.GetMapOfErrs(err)
		return Render(c, http.StatusUnprocessableEntity, view.ImageUpdateError(errMap))
	}

	// this is safe as we have middleware
	authRecord := c.Get(apis.ContextAuthRecordKey).(*models.Record)
	artist, err := model.GetArtistByUserId(hc.e.App.Dao(), authRecord.Id)
	if err != nil {
		return err
	}
	images, err := model.GetArtistImagesByArtistId(hc.e.App.Dao(), artist.Id)
	if err != nil {
		return err
	}

	SetFlash(c, "info", "Updated image!")
	agd := view.NewArtistGalleryPageData(artist, images)
	ld := layout.NewLayoutData(c, "Artist Gallery - Otterkin")
	c.Response().Header().Set("Hx-Location", fmt.Sprintf("/artist/profile/%s/gallery", authRecord.Id))
	return Render(c, http.StatusOK, view.ArtistProfileGalleryPage(ld, agd))
}

func (hc HandlerContext) HandleDeleteArtwork(c echo.Context) error {
	err := model.DeleteArtistImageById(hc.e.App.Dao(), c.PathParam("id"))
	if err != nil {
		return err
	}

	// this is safe as we have middleware
	authRecord := c.Get(apis.ContextAuthRecordKey).(*models.Record)
	artist, err := model.GetArtistByUserId(hc.e.App.Dao(), authRecord.Id)
	if err != nil {
		return err
	}
	images, err := model.GetArtistImagesByArtistId(hc.e.App.Dao(), artist.Id)
	if err != nil {
		return err
	}

	SetFlash(c, "info", "Deleted image!")
	agd := view.NewArtistGalleryPageData(artist, images)
	ld := layout.NewLayoutData(c, "Artist Gallery - Otterkin")
	c.Response().Header().Set("Hx-Location", fmt.Sprintf("/artist/profile/%s/gallery", authRecord.Id))
	return Render(c, http.StatusOK, view.ArtistProfileGalleryPage(ld, agd))
}
