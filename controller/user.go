package controller

import (
	"net/http"

	"github.com/Jedsonofnel/otterkin-web/model"
	"github.com/Jedsonofnel/otterkin-web/view"
	"github.com/labstack/echo/v5"
)

func (hc HandlerContext) UserHandler(g *echo.Group) {
	g.GET("/:id", hc.UserDashboardHandler, OnlyTheCorrespondingUser)
}

func (hc HandlerContext) UserDashboardHandler(c echo.Context) error {
	user, err := model.FindUserById(hc.e.App.Dao(), c.PathParam("id"))
	if err != nil {
		return err // should be a 500
	}

	ld := view.NewLayoutData(c, "User Dashboard - Otterkin")
	upd := view.NewUserPageData(user)
	return view.Render(c, http.StatusOK, view.UserPage(ld, upd))
}
