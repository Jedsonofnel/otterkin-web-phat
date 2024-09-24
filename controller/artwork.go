package controller

import (
	"fmt"
	"net/http"

	"github.com/Jedsonofnel/otterkin-web/model"
	"github.com/Jedsonofnel/otterkin-web/view"
	"github.com/labstack/echo/v5"
)

func artworkUrl(artwork model.ArtistImage) string {
	return fmt.Sprintf(
		"/api/files/artist_images/%s/%s",
		artwork.Id,
		artwork.Image,
	)
}

func (hc HandlerContext) ArtworkHandler(g *echo.Group) {
	g.GET("/:id", hc.GetArtworkHandler)
	g.GET("/edit/:id", hc.GetArtworkEditModalHandler, OnlyTheOwnerArtist(hc.e.App))
	g.PUT("/edit/:id", hc.UpdateArtworkModalHandler, OnlyTheOwnerArtist(hc.e.App))
}

func (hc HandlerContext) GetArtworkHandler(c echo.Context) error {
	artwork, err := model.GetArtistImageById(hc.e.App.Dao(), c.PathParam("id"))
	if err != nil {
		return err
	}
	url := artworkUrl(artwork)
	return view.Render(c, http.StatusOK, view.Image(url, artwork.Description))
}

func (hc HandlerContext) GetArtworkEditModalHandler(c echo.Context) error {
	artwork, err := model.GetArtistImageById(hc.e.App.Dao(), c.PathParam("id"))
	if err != nil {
		return err
	}

	return view.Render(c, http.StatusOK, view.ImageModal(artwork))
}

func (hc HandlerContext) UpdateArtworkModalHandler(c echo.Context) error {
	_, err := model.UpdateArtistImageById(hc.e.App, c, c.PathParam("id"))
	if err != nil {
		// TODO deal with invalid data
		return err
	}

	SetFlash(c, "info", "Updated artwork!")
	// TODO make a route that goes to artist profile by default
	// but redirects to auth if not
	c.Response().Header().Set("Hx-Location", "/profile")
	c.Response().WriteHeader(http.StatusOK)
	return nil
}
