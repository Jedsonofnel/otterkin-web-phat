package controller

import (
	"net/http"

	"github.com/Jedsonofnel/otterkin-web/model"
	"github.com/Jedsonofnel/otterkin-web/view"
	"github.com/labstack/echo/v5"
)

func (hc HandlerContext) AdminHandler(g *echo.Group) {
	g.GET("/:id", hc.AdminArtistHandler, OnlyTheCorrespondingUser)
	g.PUT("/approve/:id", hc.AdminArtistApproveHandler)
	g.PUT("/revoke/:id", hc.AdminArtistRevokeHandler)
}

func (hc HandlerContext) AdminArtistHandler(c echo.Context) error {
	allArtists, err := model.FindAllArtists(hc.e.App.Dao())
	if err != nil {
		return err // should be a 500
	}

	user, err := model.FindUserById(hc.e.App.Dao(), c.PathParam("id"))
	if err != nil {
		return err
	}

	ld := view.NewLayoutData(c, "Admin Dashboard - Otterkin")
	apd := view.NewAdminPageData(allArtists, user)
	return view.Render(c, http.StatusOK, view.AdminArtistPageResponse(ld, apd))
}

func (hc HandlerContext) AdminArtistApproveHandler(c echo.Context) error {
	artist, err := model.UpdateArtistApprovalById(
		hc.e.App,
		c.PathParam("id"),
		true,
	)
	if err != nil {
		return err
	}

	return view.Render(c, http.StatusOK, view.ArtistRow(artist))
}

func (hc HandlerContext) AdminArtistRevokeHandler(c echo.Context) error {
	artist, err := model.UpdateArtistApprovalById(
		hc.e.App,
		c.PathParam("id"),
		false,
	)
	if err != nil {
		return err
	}

	return view.Render(c, http.StatusOK, view.ArtistRow(artist))
}
