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

// needs the external registry dependency as it caches
func (h HandlerContext) HomeHandler(c echo.Context) error {
	authRecord := c.Get(apis.ContextAuthRecordKey)
	return c.Render(http.StatusOK, "index", authRecord)
}

func (hc HandlerContext) AuthHandler(g *echo.Group) {
	//TODO block user from logging in/registering if
	// they are already logged in or registered
	// login
	g.GET("/login", hc.LoginHandler)
	g.POST("/login", hc.LoginPostHandler)

	// register
	g.GET("/register", hc.RegisterHandler)
	g.POST("/register", hc.RegisterPostHandler)

	// logout
	g.POST("/logout", hc.LogoutHandler)
}

func (h HandlerContext) LoginHandler(c echo.Context) error {
	return c.Render(http.StatusOK, "login", nil)
}

func (h HandlerContext) RegisterHandler(c echo.Context) error {
	return c.Render(http.StatusOK, "register", nil)
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

	c.Redirect(http.StatusSeeOther, "/")
	return nil
}

func (hc HandlerContext) LogoutHandler(c echo.Context) error {
	auth.Logout(c)

	//TODO figure out a way to display a "logged out!" message
	return nil
}
