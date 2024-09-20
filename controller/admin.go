package controller

import (
	"net/http"

	"github.com/Jedsonofnel/otterkin-web/model"
	"github.com/Jedsonofnel/otterkin-web/view"
	"github.com/labstack/echo/v5"
)

func (hc HandlerContext) AdminHandler(g *echo.Group) {
	g.GET("", hc.AdminArtistHandler)
	g.POST("/approve/:id", hc.AdminArtistHandler)
}

func (hc HandlerContext) AdminArtistHandler(c echo.Context) error {
	allArtists, err := model.FindAllArtists(hc.e.App.Dao())
	if err != nil {
		return err // should be a 500
	}

	ld := view.NewLayoutData(c, "Admin Dashboard - Otterkin")
	apd := view.NewAdminPageData(allArtists)
	return view.Render(c, http.StatusOK, view.AdminArtistPageResponse(ld, apd))
}

func (hc HandlerContext) AdminApproveArtistHandler(c echo.Context) error {
	return nil
}
