package views

import (
	"github.com/a-h/templ"
	"github.com/labstack/echo/v5"
	"github.com/pocketbase/pocketbase/apis"
	"github.com/pocketbase/pocketbase/models"
)

type PageData struct {
	authRecord *models.Record
	flashInfo  string
	flashError string
}

func NewPageData(c echo.Context) PageData {
	pd := PageData{}

	if authRecord, ok := c.Get(apis.ContextAuthRecordKey).(*models.Record); ok {
		pd.authRecord = authRecord
	} else {
		pd.authRecord = nil
	}

	if flashError, ok := c.Get("ferror").(string); ok {
		pd.flashError = flashError
	}

	if flashInfo, ok := c.Get("finfo").(string); ok {
		pd.flashInfo = flashInfo
	}

	return pd
}

func Render(c echo.Context, status int, cmp templ.Component) error {
	c.Response().Writer.WriteHeader(status)
	c.Response().Header().Set(echo.HeaderContentType, echo.MIMETextHTML)
	return cmp.Render(c.Request().Context(), c.Response().Writer)
}
