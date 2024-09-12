package routing

import (
	"net/http"

	"github.com/Jedsonofnel/otterkin-web/auth"
	"github.com/labstack/echo/v5"
	"github.com/pocketbase/pocketbase/apis"
	"github.com/pocketbase/pocketbase/tools/template"
)

// needs the external registry dependency as it caches
func HomeHandlerGen(registry *template.Registry) func(c echo.Context) error {
	homeHandler := func(c echo.Context) error {
		html, err := registry.LoadFiles(
			"templates/layout.html", "templates/index.html",
		).Render(nil)
		if err != nil {
			return apis.NewNotFoundError("", err)
		}

		return c.HTML(http.StatusOK, html)
	}

	return homeHandler
}

func (p PageRenderer) LoginHandler(c echo.Context) error {
	html, err := p.Registry.LoadFiles(
		"templates/layout.html", "templates/login.html",
	).Render(nil)

	if err != nil {
		return apis.NewNotFoundError("", err)
	}

	return c.HTML(http.StatusOK, html)
}

func (p PageRenderer) SignupHandler(c echo.Context) error {
	html, err := p.Registry.LoadFiles(
		"templates/layout.html", "templates/sign-up.html",
	).Render(nil)

	if err != nil {
		return apis.NewNotFoundError("", err)
	}

	return c.HTML(http.StatusOK, html)
}

func (p PageRenderer) SignupPostHandler(c echo.Context) error {
	if err := auth.Signup(p.Event, c); err != nil {
		html, rendererErr := p.Registry.LoadFiles("templates/sign-up-error.html").Render(struct{ Error string }{Error: err.Error()})

		if rendererErr != nil {
			return apis.NewNotFoundError("", rendererErr)
		}

		return c.HTML(http.StatusOK, html)

	}

	c.Redirect(http.StatusSeeOther, "/")
	return nil
}
