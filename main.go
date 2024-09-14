package main

import (
	"log"

	"github.com/Jedsonofnel/otterkin-web/auth"
	"github.com/Jedsonofnel/otterkin-web/routing"
	"github.com/Jedsonofnel/otterkin-web/views"
	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/core"
)

func main() {
	pb := pocketbase.New()

	// Routing
	pb.OnBeforeServe().Add(func(e *core.ServeEvent) error {
		e.Router.Renderer = views.NewRegistry()
		hc := routing.NewHandlerContext(e)

		// pages
		e.Router.GET("/", hc.HomeHandler,
			auth.LoadAuthContextFromCookie(e.App),
			routing.LoadFlash)

		// auth routes
		authGroup := e.Router.Group("/auth")
		hc.AuthHandler(authGroup)

		// static files
		e.Router.Static("/static", "static")

		// favicon
		e.Router.File("/favicon.ico", "./static/favicon.ico")

		return nil
	})

	if err := pb.Start(); err != nil {
		log.Fatal(err)
	}

}
