package controller

import (
	"net/http"

	"github.com/a-h/templ"
	"github.com/labstack/echo/v5"
)

func Render(c echo.Context, status int, cmp templ.Component) error {
	c.Response().Writer.WriteHeader(status)
	c.Response().Header().Set(echo.HeaderContentType, echo.MIMETextHTML)
	return cmp.Render(c.Request().Context(), c.Response().Writer)
}

func hxRedirect(c echo.Context, status int, path string) error {
	if c.Request().Header.Get("Hx-Request") == "true" {
		c.Response().Header().Set("Hx-Redirect", path)
		return c.NoContent(status)
	} else {
		return c.Redirect(http.StatusTemporaryRedirect, path)
	}
}
