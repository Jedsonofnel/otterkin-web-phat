package controller

import (
	"net/http"

	"github.com/labstack/echo/v5"
	"github.com/pocketbase/pocketbase/apis"
	"github.com/pocketbase/pocketbase/models"
)

func OnlyUnauthorisedUsers(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		_, ok := c.Get(apis.ContextAuthRecordKey).(*models.Record)

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
		authRecord, ok := c.Get(apis.ContextAuthRecordKey).(*models.Record)
		if !ok || authRecord.Id != c.PathParam("id") {
			SetFlash(c, "error", "Don't be silly - you don't have approval to go in there!")
			return c.Redirect(http.StatusTemporaryRedirect, "/")
		}

		return next(c)
	}
}

func OnlyAdmins(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		authRecord, ok := c.Get(apis.ContextAuthRecordKey).(*models.Record)
		if !ok || authRecord.GetString("role") != "admin" {
			SetFlash(c, "error", "Don't be silly - you don't have approval to go in there!")
			return c.Redirect(http.StatusTemporaryRedirect, "/")
		}

		return next(c)
	}
}
