package routing

import (
	"net/http"

	"github.com/Jedsonofnel/otterkin-web/auth"
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

type PageData struct {
	Flash      interface{}
	AuthRecord interface{}
}

func NewPageData(c echo.Context) (PageData, error) {
	flashData := map[string]string{
		"error": "",
		"info":  "",
	}

	for key := range flashData {
		value, err := GetFlash(c, key)
		if err != nil {
			return PageData{}, echo.NewHTTPError(http.StatusInternalServerError, err.Error)
		}
		flashData[key] = string(value)
	}

	pageData := PageData{
		Flash:      flashData,
		AuthRecord: c.Get(apis.ContextAuthRecordKey),
	}

	return pageData, nil
}

// needs the external registry dependency as it caches
func (h HandlerContext) HomeHandler(c echo.Context) error {
	pd, err := NewPageData(c)
	if err != nil {
		return err
	}
	return c.Render(http.StatusOK, "index", pd)
}

func (hc HandlerContext) AuthHandler(g *echo.Group) {
	//TODO block user from logging in/registering if
	// they are already logged in or registered
	// login
	g.GET("/login", hc.LoginPageHandler, LoadFlash)
	g.POST("/login", hc.LoginPostHandler)

	// register
	g.GET("/register", hc.RegisterPageHandler, LoadFlash)
	g.GET("/register/patron", hc.RegisterPatronHandler)
	g.GET("/register/artist", hc.RegisterArtistHandler)
	g.POST("/register", hc.RegisterPostHandler)

	// logout
	g.POST("/logout", hc.LogoutHandler)
}

func (h HandlerContext) LoginPageHandler(c echo.Context) error {
	pd, err := NewPageData(c)
	if err != nil {
		return err
	}
	return c.Render(http.StatusOK, "login", pd)
}

func (h HandlerContext) RegisterPageHandler(c echo.Context) error {
	pd, err := NewPageData(c)
	if err != nil {
		return err
	}
	return c.Render(http.StatusOK, "register", pd)
}

func (h HandlerContext) RegisterPatronHandler(c echo.Context) error {
	return c.Render(http.StatusOK, "register-patron", nil)
}

func (h HandlerContext) RegisterArtistHandler(c echo.Context) error {
	return c.Render(http.StatusOK, "register-artist", nil)
}

func (h HandlerContext) RegisterPostHandler(c echo.Context) error {
	if err := auth.Register(h.e.App, c); err != nil {
		return c.Render(http.StatusOK, "register-error", err)
	}

	c.Redirect(http.StatusSeeOther, "/")
	return nil
}

func (h HandlerContext) LoginPostHandler(c echo.Context) error {
	if err := auth.Login(h.e.App, c); err != nil {
		return c.Render(http.StatusOK, "login-error", nil)
	}

	SetFlash(c, "info", "Logged in, welcome!")

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
