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
			return c.Redirect(http.StatusFound, "/")
		}

		return next(c)
	}
}
