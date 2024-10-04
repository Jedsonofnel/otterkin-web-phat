package controller

import (
	"net/http"

	"github.com/Jedsonofnel/otterkin-web/model"
	"github.com/Jedsonofnel/otterkin-web/view"
	"github.com/Jedsonofnel/otterkin-web/view/layout"
	"github.com/labstack/echo/v5"
)

func (hc HandlerContext) HandleAdmin(g *echo.Group) {
	// manage artists page
	g.GET("/:id", hc.HandleAdminArtistPage, OnlyTheCorrespondingUser)
	g.PUT("/approve/:id", hc.HandleAdminArtistApprove)
	g.GET("/revoke/:id", hc.HandleAdminGetRevokeModal)
	g.PUT("/revoke/:id", hc.HandleAdminArtistRevoke)

	// manage tags page
	g.GET("/tags", hc.HandleAdminTagsPage)
}

func (hc HandlerContext) HandleAdminArtistPage(c echo.Context) error {
	allArtists, err := model.GetAllArtists(hc.e.App.Dao())
	if err != nil {
		return err // should be a 500
	}

	user, err := model.GetUserById(hc.e.App.Dao(), c.PathParam("id"))
	if err != nil {
		return err
	}

	ld := layout.NewLayoutData(c, "Admin Dashboard - Otterkin")
	apd := view.NewAdminPageData(allArtists, user)
	return Render(c, http.StatusOK, view.AdminArtistPageResponse(ld, apd))
}

func (hc HandlerContext) HandleAdminArtistApprove(c echo.Context) error {
	artist, err := model.UpdateArtistApprovalById(
		hc.e.App,
		c.PathParam("id"),
		true,
	)
	if err != nil {
		return err
	}

	return Render(c, http.StatusOK, view.ArtistRow(artist))
}

func (hc HandlerContext) HandleAdminArtistRevoke(c echo.Context) error {
	artist, err := model.UpdateArtistApprovalById(
		hc.e.App,
		c.PathParam("id"),
		false,
	)
	if err != nil {
		return err
	}

	return Render(c, http.StatusOK, view.ArtistRow(artist))
}

func (hc HandlerContext) HandleAdminGetRevokeModal(c echo.Context) error {
	artist, err := model.GetArtistByArtistId(hc.e.App.Dao(), c.PathParam("id"))
	if err != nil {
		return err
	}

	return Render(c, http.StatusOK, view.ArtistRevokeModal(artist))
}

func (hc HandlerContext) HandleAdminTagsPage(c echo.Context) error {
	ld := layout.NewLayoutData(c, "Manage Tags - Otterkin")
	return Render(c, http.StatusOK, view.AdminTagsPage(ld))
}
