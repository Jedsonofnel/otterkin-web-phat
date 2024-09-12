package main

import (
	"log"
	"os"

	"github.com/Jedsonofnel/otterkin-web/routing"
	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/apis"
	"github.com/pocketbase/pocketbase/core"
	"github.com/pocketbase/pocketbase/tools/template"
)

type LoginInfo struct {
	email    string
	password string
}

func main() {
	app := pocketbase.New()

	// Routing
	app.OnBeforeServe().Add(func(e *core.ServeEvent) error {
		// way of caching templates that is safe to use
		// in multiple goroutines
		p := routing.PageRenderer{Registry: template.NewRegistry(), Event: e}

		// static files
		e.Router.GET("/static/*", apis.StaticDirectoryHandler(os.DirFS("./static"), false))

		// favicon
		e.Router.File("/favicon.ico", "./static/favicon.ico")

		// other pages
		e.Router.GET("/", routing.HomeHandlerGen(p.Registry))
		e.Router.GET("/login", p.LoginHandler)
		e.Router.GET("/sign-up", p.SignupHandler)
		e.Router.POST("/sign-up", p.SignupPostHandler)

		return nil
	})

	if err := app.Start(); err != nil {
		log.Fatal(err)
	}

}
