package controller

import (
	"fmt"
	"net/http"

	"github.com/Jedsonofnel/otterkin-web/model"
	"github.com/Jedsonofnel/otterkin-web/view"
	"github.com/a-h/templ"
	"github.com/labstack/echo/v5"
)

func (hc HandlerContext) ArtworkHandler(g *echo.Group) {
	g.GET("/:id", hc.GetArtworkHandler)
}

func (hc HandlerContext) GetArtworkHandler(c echo.Context) error {
	artwork, err := model.GetArtistImageById(hc.e.App.Dao(), c.PathParam("id"))
	if err != nil {
		return err
	}
	url := string(templ.URL(fmt.Sprintf(
		"/api/files/artist_images/%s/%s",
		artwork.Id,
		artwork.Image,
	)))
	return view.Render(c, http.StatusOK, view.Image(url, artwork.Description))
}
