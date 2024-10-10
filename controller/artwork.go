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
)

func artworkUrl(artwork model.Artwork) string {
	return fmt.Sprintf(
		"/api/files/artworks/%s/%s",
		artwork.Id,
		artwork.Image,
	)
}

func (hc HandlerContext) HandleArtwork(g *echo.Group) {
	g.GET("/:id", hc.HandleGetArtwork)

	g.GET("/:id/update-modal", hc.HandleArtworkUpdateModal, OnlyTheOwnerArtist(hc.e.App))
	g.PUT("/:id", hc.HandleUpdateArtwork, OnlyTheOwnerArtist(hc.e.App))
	g.DELETE("/:id", hc.HandleDeleteArtwork, OnlyTheOwnerArtist(hc.e.App))
}

func (hc HandlerContext) HandleGetArtwork(c echo.Context) error {
	artwork, err := model.GetArtworkById(hc.e.App.Dao(), c.PathParam("id"))
	if err != nil {
		return err
	}

	// if modal then return modal
	if c.QueryParam("modal") == "true" {
		return Render(c, http.StatusOK, view.ImageModal(fmt.Sprintf("/artwork/%s", artwork.Id)))
	}

	imgUrl := artworkUrl(artwork)
	return Render(c, http.StatusOK, view.Image(imgUrl, artwork.Description))
}

func (hc HandlerContext) HandleArtworkUpdateModal(c echo.Context) error {
	// get current artist
	user, ok := c.Get(apis.ContextAuthRecordKey).(model.User)
	if !ok {
		return fmt.Errorf("Error getting auth record")
	}
	artist, err := model.GetArtistByUserId(hc.e.App.Dao(), user.Id)
	if err != nil {
		return err
	}

	artwork, err := model.GetArtworkById(hc.e.App.Dao(), c.PathParam("id"))
	if err != nil {
		return err
	}

	return Render(c, http.StatusOK, view.ArtistGalleryUpdateModal(artist, artwork))
}

func (hc HandlerContext) HandleUpdateArtwork(c echo.Context) error {
	artwork, err := model.UpdateArtworkById(hc.e.App, c, c.PathParam("id"))
	if err != nil {
		errMap := auth.GetMapOfErrs(err)
		return Render(c, http.StatusUnprocessableEntity, view.ArtistGalleryFormError(errMap))
	}

	c.Response().Header().Add("data-modal-close", "true")
	return Render(c, http.StatusOK, view.ArtworkUpdateSuccess(artwork))
}

func (hc HandlerContext) HandleDeleteArtwork(c echo.Context) error {
	err := model.DeleteArtworkById(hc.e.App.Dao(), c.PathParam("id"))
	if err != nil {
		return err
	}

	// this is safe as we have middleware
	user := c.Get(apis.ContextAuthRecordKey).(model.User)
	artist, err := model.GetArtistByUserId(hc.e.App.Dao(), user.Id)
	if err != nil {
		return err
	}
	artworks, err := model.GetArtworksByArtistId(hc.e.App.Dao(), artist.Id)
	if err != nil {
		return err
	}

	SetFlash(c, "info", "Deleted image!")
	agd := view.NewArtistGalleryPageData(artist, artworks)
	ld := layout.NewLayoutData(c, "Artist Gallery - Otterkin")
	c.Response().Header().Set("Hx-Location", fmt.Sprintf("/artist/profile/%s/gallery", user.Id))
	return Render(c, http.StatusOK, view.ArtistProfileGalleryPage(ld, agd))
}
