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

func (hc HandlerContext) HandleProfilePage(c echo.Context) error {
	user, ok := c.Get(apis.ContextAuthRecordKey).(model.User)
	if !ok || user.Id == "" {
		return hxRedirect(c, http.StatusUnauthorized, "/auth")
	}

	return hxRedirect(c, http.StatusOK, fmt.Sprintf("/user/profile/%s", user.Id))
}
