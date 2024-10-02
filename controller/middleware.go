package controller

import (
	"net/http"

	"github.com/Jedsonofnel/otterkin-web/model"
	"github.com/labstack/echo/v5"
	"github.com/pocketbase/pocketbase/apis"
	"github.com/pocketbase/pocketbase/core"
)

func OnlyUnauthorisedUsers(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		_, ok := c.Get(apis.ContextAuthRecordKey).(model.User)

		// ie if there is a valid auth record, redirect
		if ok {
			SetFlash(c, "error", "Don't be silly - you're already logged in!")
			return c.Redirect(http.StatusTemporaryRedirect, "/")
		}

		return next(c)
	}
}

func OnlyTheCorrespondingUser(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		authRecord, ok := c.Get(apis.ContextAuthRecordKey).(model.User)
		if !ok || authRecord.Id != c.PathParam("id") {
			SetFlash(c, "error", "Don't be silly - you don't have approval to go in there!")
			return c.Redirect(http.StatusTemporaryRedirect, "/")
		}

		return next(c)
	}
}

func OnlyTheCorrespondingArtist(app core.App) echo.MiddlewareFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			authRecord, ok := c.Get(apis.ContextAuthRecordKey).(model.User)
			artist, err := model.GetArtistByArtistId(app.Dao(), c.PathParam("id"))
			if !ok || err != nil || authRecord.Id != artist.User.Id {
				SetFlash(c, "error", "Don't be silly - you don't have approval to go in there!")
				return c.Redirect(http.StatusTemporaryRedirect, "/")
			}

			return next(c)
		}
	}
}

func OnlyTheOwnerArtist(app core.App) echo.MiddlewareFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			authRecord, ok := c.Get(apis.ContextAuthRecordKey).(model.User)
			artwork, err := model.GetArtworkById(app.Dao(), c.PathParam("id"))
			if !ok || err != nil || authRecord.Id != artwork.UserId {
				SetFlash(c, "error", "Don't be silly - you don't have approval to go in there!")
				return c.Redirect(http.StatusTemporaryRedirect, "/")
			}

			return next(c)
		}
	}
}

func OnlyAdmins(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		authRecord, ok := c.Get(apis.ContextAuthRecordKey).(model.User)
		if !ok || authRecord.Role != "admin" {
			SetFlash(c, "error", "Don't be silly - you don't have approval to go in there!")
			return c.Redirect(http.StatusTemporaryRedirect, "/")
		}

		return next(c)
	}
}

func OnlyArtists(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		authRecord, ok := c.Get(apis.ContextAuthRecordKey).(model.User)
		if !ok || authRecord.Role != "artist" {
			SetFlash(c, "error", "Don't be silly - you don't have approval to go in there!")
			return c.Redirect(http.StatusTemporaryRedirect, "/")
		}
		return next(c)
	}
}
