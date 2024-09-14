package views

import (
	"html/template"
	"io"

	"github.com/labstack/echo/v5"
)

type TemplateRegistry struct {
	templates map[string]*template.Template
}

func (t *TemplateRegistry) Render(w io.Writer, name string, data interface{}, c echo.Context) error {
	return t.templates[name].Execute(w, data)
}

func NewRegistry() *TemplateRegistry {
	templates := make(map[string]*template.Template)

	// full pages
	templates["index"] = template.Must(template.ParseFiles("views/layout.html", "views/index.html"))
	templates["login"] = template.Must(template.ParseFiles("views/layout.html", "views/login.html"))
	templates["register"] = template.Must(template.ParseFiles("views/layout.html", "views/register.html"))

	// partials
	partials := template.Must(template.ParseGlob("views/partials/*.html"))
	templates["register-error"] = partials.Lookup("register-error")
	templates["login-error"] = partials.Lookup("login-error")

	return &TemplateRegistry{
		templates: templates,
	}
}
