package controller

import (
	"net/http"

	"github.com/labstack/echo/v5"
)

// Pages we have as an artist:
// Artist profile main page (where you can change artist-specific info)
// Artist profile gallery page (where an artist can upload images)
// Artist public page (for people to look/read about/commission an artist)
func (hc HandlerContext) ArtistHandler(g *echo.Group) {
	g.GET("/profile/:id", hc.ArtistProfileHandler, OnlyTheCorrespondingUser)
}

func (hc HandlerContext) ArtistProfileHandler(c echo.Context) error {
	return c.NoContent(http.StatusOK)
}
