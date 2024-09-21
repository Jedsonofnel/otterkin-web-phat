package controller

import (
	"net/http"

	"github.com/Jedsonofnel/otterkin-web/auth"
	"github.com/Jedsonofnel/otterkin-web/view"
	"github.com/labstack/echo/v5"
)

func (hc HandlerContext) AuthHandler(g *echo.Group) {
	// default page, gives the option to login OR register
	g.GET("", hc.AuthPageHandler)

	// login
	g.GET("/login", hc.LoginPageHandler)
	g.POST("/login", hc.LoginPostHandler)

	// register
	g.GET("/register", hc.RegisterPageHandler)
	g.GET("/register/patron", hc.RegisterPatronHandler)
	g.GET("/register/artist", hc.RegisterArtistHandler)
	g.POST("/register/patron", hc.RegisterPatronPostHandler)
	g.POST("/register/artist", hc.RegisterArtistPostHandler)
}

func (h HandlerContext) AuthPageHandler(c echo.Context) error {
	ld := view.NewLayoutData(c, "Otterkin")
	return view.Render(c, http.StatusOK, view.AuthPage(ld))
}

func (h HandlerContext) LoginPageHandler(c echo.Context) error {
	ld := view.NewLayoutData(c, "Login - Otterkin")
	return view.Render(c, http.StatusOK, view.LoginPage(ld))
}

func (h HandlerContext) LoginPostHandler(c echo.Context) error {
	if err := auth.Login(h.e.App, c); err != nil {
		return view.Render(c, http.StatusUnprocessableEntity, view.LoginFormError("Invalid credentials!"))
	}

	SetFlash(c, "info", "Logged in, welcome!")
	c.Response().Header().Set("Hx-Redirect", "/")
	c.Response().WriteHeader(http.StatusOK)
	return nil
}

func (h HandlerContext) RegisterPageHandler(c echo.Context) error {
	ld := view.NewLayoutData(c, "Register - Otterking")
	return view.Render(c, http.StatusOK, view.RegisterPage(ld))
}

func (h HandlerContext) RegisterPatronHandler(c echo.Context) error {
	return view.Render(c, http.StatusOK, view.PatronForm())
}

func (h HandlerContext) RegisterArtistHandler(c echo.Context) error {
	return view.Render(c, http.StatusOK, view.ArtistForm())
}

func (h HandlerContext) RegisterPatronPostHandler(c echo.Context) error {
	if err := auth.Register(h.e.App, c); err != nil {
		errMap := auth.GetMapOfErrs(err)
		return view.Render(c, http.StatusUnprocessableEntity, view.RegisterFormError(errMap))
	}

	SetFlash(c, "info", "Registered - welcome!")
	c.Response().Header().Set("Hx-Redirect", "/")
	c.Response().WriteHeader(http.StatusOK)
	return nil
}

func (h HandlerContext) RegisterArtistPostHandler(c echo.Context) error {
	if err := auth.RegisterArtist(h.e.App, c); err != nil {
		errMap := auth.GetMapOfErrs(err)
		return view.Render(c, http.StatusUnprocessableEntity, view.RegisterFormError(errMap))
	}

	SetFlash(c, "info", "Registered - welcome!")
	c.Response().Header().Set("Hx-Redirect", "/")
	c.Response().WriteHeader(http.StatusOK)
	return nil
}

func (hc HandlerContext) LogoutHandler(c echo.Context) error {
	auth.Logout(c)

	SetFlash(c, "info", "Logged out!")
	c.Response().Header().Set("Hx-Redirect", "/")
	c.Response().WriteHeader(http.StatusOK)
	return nil
}
