package view

import (
	"github.com/a-h/templ"
	"github.com/labstack/echo/v5"
	"github.com/pocketbase/pocketbase/apis"
	"github.com/pocketbase/pocketbase/models"
)

type LayoutData struct {
	authRecord *models.Record
	flashInfo  string
	flashError string
}

func NewLayoutData(c echo.Context) LayoutData {
	ld := LayoutData{}

	if authRecord, ok := c.Get(apis.ContextAuthRecordKey).(*models.Record); ok {
		ld.authRecord = authRecord
	} else {
		ld.authRecord = nil
	}

	if flashError, ok := c.Get("ferror").(string); ok {
		ld.flashError = flashError
	}

	if flashInfo, ok := c.Get("finfo").(string); ok {
		ld.flashInfo = flashInfo
	}

	return ld
}

func Render(c echo.Context, status int, cmp templ.Component) error {
	c.Response().Writer.WriteHeader(status)
	c.Response().Header().Set(echo.HeaderContentType, echo.MIMETextHTML)
	return cmp.Render(c.Request().Context(), c.Response().Writer)
}
