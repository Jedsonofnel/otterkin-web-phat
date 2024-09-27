package controller

import (
	"net/http"

	"github.com/Jedsonofnel/otterkin-web/auth"
	"github.com/Jedsonofnel/otterkin-web/view"
	"github.com/Jedsonofnel/otterkin-web/view/layout"
	"github.com/labstack/echo/v5"
)

func (hc HandlerContext) HandleAuth(g *echo.Group) {
	// default page, gives the option to login OR register
	g.GET("", hc.HandleAuthPage)

	// login
	g.GET("/login", hc.HandleLoginPage)
	g.POST("/login", hc.HandleLoginPost)

	// register
	g.GET("/register", hc.HandleRegisterPage)
	g.GET("/register/patron", hc.HandleRegisterPatron)
	g.GET("/register/artist", hc.HandleRegisterArtist)
	g.POST("/register/patron", hc.HandleCreatePatron)
	g.POST("/register/artist", hc.HandleCreateArtist)
}

func (hc HandlerContext) HandleAuthPage(c echo.Context) error {
	ld := layout.NewLayoutData(c, "Otterkin")
	return Render(c, http.StatusOK, view.AuthPage(ld))
}

func (h HandlerContext) HandleLoginPage(c echo.Context) error {
	ld := layout.NewLayoutData(c, "Login - Otterkin")
	return Render(c, http.StatusOK, view.LoginPage(ld))
}

func (h HandlerContext) HandleLoginPost(c echo.Context) error {
	if err := auth.Login(h.e.App, c); err != nil {
		return Render(c, http.StatusUnprocessableEntity, view.LoginFormError("Invalid credentials!"))
	}

	SetFlash(c, "info", "Logged in, welcome!")
	c.Response().Header().Set("Hx-Redirect", "/")
	c.Response().WriteHeader(http.StatusOK)
	return nil
}

// TODO use hxRedirect to redirect
func (h HandlerContext) HandleRegisterPage(c echo.Context) error {
	ld := layout.NewLayoutData(c, "Register - Otterkin")
	return Render(c, http.StatusOK, view.RegisterArtist(ld))
}

func (h HandlerContext) HandleRegisterPatron(c echo.Context) error {
	ld := layout.NewLayoutData(c, "Register - Otterkin")
	return Render(c, http.StatusOK, view.RegisterPatron(ld))
}

func (h HandlerContext) HandleRegisterArtist(c echo.Context) error {
	ld := layout.NewLayoutData(c, "Register - Otterkin")
	return Render(c, http.StatusOK, view.RegisterArtist(ld))
}

func (h HandlerContext) HandleCreatePatron(c echo.Context) error {
	if err := auth.Register(h.e.App, c); err != nil {
		errMap := auth.GetMapOfErrs(err)
		return Render(c, http.StatusUnprocessableEntity, view.RegisterFormError(errMap))
	}

	SetFlash(c, "info", "Registered - welcome!")
	c.Response().Header().Set("Hx-Redirect", "/")
	c.Response().WriteHeader(http.StatusOK)
	return nil
}

func (h HandlerContext) HandleCreateArtist(c echo.Context) error {
	if err := auth.RegisterArtist(h.e.App, c); err != nil {
		errMap := auth.GetMapOfErrs(err)
		return Render(c, http.StatusUnprocessableEntity, view.RegisterFormError(errMap))
	}

	SetFlash(c, "info", "Registered - welcome!")
	c.Response().Header().Set("Hx-Redirect", "/")
	c.Response().WriteHeader(http.StatusOK)
	return nil
}

func (hc HandlerContext) HandleLogout(c echo.Context) error {
	auth.Logout(c)

	SetFlash(c, "info", "Logged out!")
	c.Response().Header().Set("Hx-Redirect", "/")
	c.Response().WriteHeader(http.StatusOK)
	return nil
}
