package views

import (
	"html/template"
	"io"
	"log"

	"github.com/labstack/echo/v5"
)

type TemplateRegistry struct {
	templates map[string]*template.Template
	Reload    bool
}

func (t *TemplateRegistry) Render(w io.Writer, name string, data interface{}, c echo.Context) error {
	return t.templates[name].Execute(w, data)
}

func GetNamedBlock(blockName string, filename string) *template.Template {
	parsedFiles := template.Must(template.ParseFiles(filename))
	parsedBlock := parsedFiles.Lookup(blockName)
	if parsedBlock == nil {
		log.Fatalf("Could not find block with name: %s in file: %s", blockName, filename)
	}

	return parsedBlock
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
	templates["register-artist"] = GetNamedBlock("register-artist", "views/register.html")
	templates["register-patron"] = GetNamedBlock("register-patron", "views/register.html")

	return &TemplateRegistry{
		templates: templates,
		Reload:    false, // enable template caching
	}
}
