package controller

import (
	"github.com/a-h/templ"
	"github.com/labstack/echo/v5"
)

func Render(c echo.Context, status int, cmp templ.Component) error {
	c.Response().Writer.WriteHeader(status)
	c.Response().Header().Set(echo.HeaderContentType, echo.MIMETextHTML)
	return cmp.Render(c.Request().Context(), c.Response().Writer)
}

func hxRedirect(c echo.Context, status int) {
	c.Response().Header().Set("Hx-Redirect", "/")
	c.NoContent(status)
}
