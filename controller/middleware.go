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
			return hxRedirect(c, http.StatusForbidden, "/")
		}

		return next(c)
	}
}

func OnlyTheCorrespondingUser(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		authRecord, ok := c.Get(apis.ContextAuthRecordKey).(model.User)
		if !ok || authRecord.Id != c.PathParam("id") {
			SetFlash(c, "error", "Don't be silly - you don't have approval to go in there!")
			return hxRedirect(c, http.StatusForbidden, "/")
		}

		return next(c)
	}
}

func OnlyTheCorrespondingArtist(app core.App) echo.MiddlewareFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			user, ok := c.Get(apis.ContextAuthRecordKey).(model.User)
			artist, err := model.GetArtistByArtistId(app.Dao(), c.PathParam("id"))

			if !ok || err != nil || user.Id != artist.User.Id {
				SetFlash(c, "error", "Don't be silly - you don't have approval to go in there!")
				return hxRedirect(c, http.StatusForbidden, "/")
			}

			return next(c)
		}
	}
}

func OnlyQueriedArtist(app core.App) echo.MiddlewareFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			// assumes there's a query ?artist=id
			user, ok := c.Get(apis.ContextAuthRecordKey).(model.User)
			artist, err := model.GetArtistByArtistId(app.Dao(), c.QueryParam("artist"))

			if !ok || err != nil || user.Id != artist.User.Id {
				SetFlash(c, "error", "Don't be silly - you don't have approval to access that!")
				return hxRedirect(c, http.StatusForbidden, "/")
			}

			return next(c)
		}
	}
}

func OnlyTheOwnerArtist(app core.App) echo.MiddlewareFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			user, ok := c.Get(apis.ContextAuthRecordKey).(model.User)
			artwork, err := model.GetArtworkById(app.Dao(), c.PathParam("id"))
			if !ok || err != nil || user.Id != artwork.UserId {
				SetFlash(c, "error", "Don't be silly - you don't have approval to go in there!")
				return hxRedirect(c, http.StatusForbidden, "/")
			}

			return next(c)
		}
	}
}

func OnlyAdmins(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		user, ok := c.Get(apis.ContextAuthRecordKey).(model.User)
		if !ok || user.Role != "admin" {
			SetFlash(c, "error", "Don't be silly - you don't have approval to go in there!")
			return hxRedirect(c, http.StatusForbidden, "/")
		}

		return next(c)
	}
}

func OnlyArtists(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		user, ok := c.Get(apis.ContextAuthRecordKey).(model.User)
		if !ok || user.Role != "artist" {
			SetFlash(c, "error", "Don't be silly - you don't have approval to go in there!")
			return hxRedirect(c, http.StatusForbidden, "/")
		}
		return next(c)
	}
}
