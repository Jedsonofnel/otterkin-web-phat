package controller

import (
	"net/http"

	"github.com/Jedsonofnel/otterkin-web/model"
	"github.com/Jedsonofnel/otterkin-web/view"
	"github.com/Jedsonofnel/otterkin-web/view/layout"
	"github.com/labstack/echo/v5"
)

func (hc HandlerContext) UserHandler(g *echo.Group) {
	g.GET("/profile/:id", hc.UserDashboardHandler, OnlyTheCorrespondingUser)
	g.PUT("/profile/:id", hc.UserUpdateHandler, OnlyTheCorrespondingUser)

	g.GET("/profile/:id/avatar", hc.UserAvatarFormHandler, OnlyTheCorrespondingUser)
	g.PUT("/profile/:id/avatar", hc.UserAvatarUpdateHandler, OnlyTheCorrespondingUser)
}

func (hc HandlerContext) UserDashboardHandler(c echo.Context) error {
	user, err := model.GetUserById(hc.e.App.Dao(), c.PathParam("id"))
	if err != nil {
		return err // should be a 500
	}

	ld := layout.NewLayoutData(c, "User Dashboard - Otterkin")
	upd := view.NewUserPageData(user)
	return Render(c, http.StatusOK, view.UserPage(ld, upd))
}

func (hc HandlerContext) UserAvatarFormHandler(c echo.Context) error {
	user, err := model.GetUserById(hc.e.App.Dao(), c.PathParam("id"))
	if err != nil {
		return err
	}
	return Render(c, http.StatusOK, view.UserAvatarUpdateForm(user))
}

func (hc HandlerContext) UserAvatarUpdateHandler(c echo.Context) error {
	user, err := model.UpdateUserAvatarById(hc.e.App, c, c.PathParam("id"))
	if err != nil {
		return err
	}

	upd := view.NewUserPageData(user)
	ld := layout.NewLayoutData(c, "User Dashboard - Otterkin")
	return Render(c, http.StatusOK, view.UserPage(ld, upd))
}

func (hc HandlerContext) UserUpdateHandler(c echo.Context) error {
	user, err := model.UpdateUserById(hc.e.App, c, c.PathParam("id"))
	if err != nil {
		return err // should be a 500
	}

	upd := view.NewUserPageData(user)
	return Render(c, http.StatusOK, view.UserUpdateResponse(upd))
}
