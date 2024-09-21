package controller

import (
	"fmt"
	"net/http"

	"github.com/Jedsonofnel/otterkin-web/model"
	"github.com/Jedsonofnel/otterkin-web/view"
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

func (hc HandlerContext) HomeHandler(c echo.Context) error {
	visibleArtists, err := model.GetActiveArtists(hc.e.App.Dao())
	if err != nil {
		return err // this will be a 500 as it's a db error
	}
	hd := view.NewHomePageData(visibleArtists)
	ld := view.NewLayoutData(c, "Otterkin")
	return view.Render(c, http.StatusOK, view.HomePage(ld, hd))
}

func (hc HandlerContext) ProfileHandler(c echo.Context) error {
	visibleArtists, err := model.GetActiveArtists(hc.e.App.Dao())
	if err != nil {
		return err // this will be a 500 as it's a db error
	}
	hpd := view.NewHomePageData(visibleArtists)
	ld := view.NewLayoutData(c, "Otterkin")

	authRecord, ok := c.Get(apis.ContextAuthRecordKey).(*models.Record)
	if !ok || authRecord == nil {
		fmt.Println("Not detecting authorisation, redirecting to /auth")
		// TODO make a "redirecting" page that doesn't need any data
		c.Response().Header().Set("Hx-Redirect", "/auth")
		return view.Render(c, http.StatusUnauthorized, view.HomePage(ld, hpd))
	}

	c.Response().Header().Set("Hx-Redirect", fmt.Sprintf("/user/profile/%s", authRecord.Id))
	return view.Render(c, http.StatusOK, view.HomePage(ld, hpd))
}
