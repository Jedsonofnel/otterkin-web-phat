package controller

import (
	"net/http"

	"github.com/Jedsonofnel/otterkin-web/model"
	"github.com/Jedsonofnel/otterkin-web/view"
	"github.com/labstack/echo/v5"
	"github.com/pocketbase/pocketbase/core"
)

type HandlerContext struct {
	e *core.ServeEvent
}

func NewHandlerContext(e *core.ServeEvent) HandlerContext {
	return HandlerContext{e: e}
}

// needs the external registry dependency as it caches
func (hc HandlerContext) HomeHandler(c echo.Context) error {
	visibleArtists, err := model.GetActiveArtists(hc.e.App.Dao())
	if err != nil {
		return err // this will be a 500 as it's a db error
	}
	hd := view.NewHomePageData(visibleArtists)
	ld := view.NewLayoutData(c, "Otterkin")
	return view.Render(c, http.StatusOK, view.HomePage(ld, hd))
}
