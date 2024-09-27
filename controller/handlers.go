package controller

import (
	"fmt"
	"net/http"

	"github.com/Jedsonofnel/otterkin-web/model"
	"github.com/Jedsonofnel/otterkin-web/view"
	"github.com/Jedsonofnel/otterkin-web/view/layout"
	"github.com/labstack/echo/v5"
	"github.com/pocketbase/pocketbase/apis"
	"github.com/pocketbase/pocketbase/core"
	"github.com/pocketbase/pocketbase/models"
)

type HandlerContext struct {
	e *core.ServeEvent
}

func NewHandlerContext(e *core.ServeEvent) HandlerContext {
	return HandlerContext{e: e}
}

func (hc HandlerContext) HandleHomePage(c echo.Context) error {
	visibleArtists, err := model.GetActiveArtists(hc.e.App.Dao())
	if err != nil {
		return err // this will be a 500 as it's a db error
	}
	hd := view.NewHomePageData(visibleArtists)
	ld := layout.NewLayoutData(c, "Otterkin")
	return Render(c, http.StatusOK, view.HomePage(ld, hd))
}

// TODO fix this by using hxRedirect
func (hc HandlerContext) HandleProfilePage(c echo.Context) error {
	authRecord, ok := c.Get(apis.ContextAuthRecordKey).(*models.Record)
	if !ok || authRecord == nil {
		c.Response().Header().Set("Hx-Location", "/auth")
		return Render(c, http.StatusUnauthorized, layout.RedirectPage())
	}
	c.Response().Header().Set("Hx-Location", fmt.Sprintf("/user/profile/%s", authRecord.Id))
	return Render(c, http.StatusOK, layout.RedirectPage())
}
