package controller

import (
	"net/http"

	"github.com/labstack/echo/v5"
)

func (hc HandlerContext) ArtistHandler(g *echo.Group) {
	g.GET("/profile/:id", hc.ArtistProfileHandler, OnlyTheCorrespondingUser)
}

func (hc HandlerContext) ArtistProfileHandler(c echo.Context) error {
	return c.NoContent(http.StatusOK)
}
