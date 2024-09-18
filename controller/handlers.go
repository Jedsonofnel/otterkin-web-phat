package controller

import (
	"net/http"

	"github.com/Jedsonofnel/otterkin-web/auth"
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
func (h HandlerContext) HomeHandler(c echo.Context) error {
	pd := view.NewLayoutData(c)
	return view.Render(c, http.StatusOK, view.HomePage("Otterkin", pd))
}

func (hc HandlerContext) AuthHandler(g *echo.Group) {
	//TODO block user from logging in/registering if
	// they are already logged in or registered
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

func (h HandlerContext) LoginPageHandler(c echo.Context) error {
	pd := view.NewLayoutData(c)
	return view.Render(c, http.StatusOK, view.LoginPage("Login - Otterkin", pd))
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
	pd := view.NewLayoutData(c)
	return view.Render(c, http.StatusOK, view.RegisterPage("Register - Otterkin", pd))
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
