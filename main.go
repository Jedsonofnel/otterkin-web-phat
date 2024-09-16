package main

import (
	"log"
	"os"

	"github.com/Jedsonofnel/otterkin-web/auth"
	"github.com/Jedsonofnel/otterkin-web/routing"
	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/core"
	"github.com/pocketbase/pocketbase/plugins/migratecmd"
)

var dev, prod = getAppEnv()

func main() {
	pb := pocketbase.NewWithConfig(pocketbase.Config{
		DefaultDev: dev,
	})

	// automatically make migrations into file in dev
	migratecmd.MustRegister(pb, pb.RootCmd, migratecmd.Config{
		Automigrate: dev,
	})

	// Routing
	pb.OnBeforeServe().Add(func(e *core.ServeEvent) error {
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

func getAppEnv() (dev bool, prod bool) {
	appEnv, ok := os.LookupEnv("APP_ENV")
	if !ok || appEnv == "dev" {
		return true, false // dev by default
	} else {
		return false, true
	}
}
