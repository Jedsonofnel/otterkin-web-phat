package main

import (
	"log"
	"os"

	"github.com/Jedsonofnel/otterkin-web/auth"
	"github.com/Jedsonofnel/otterkin-web/controller"
	_ "github.com/Jedsonofnel/otterkin-web/migrations"
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
		hc := controller.NewHandlerContext(e)

		// non-grouped pages
		e.Router.GET("/", hc.HomeHandler,
			auth.LoadAuthContextFromCookie(e.App),
			controller.LoadFlash)

		e.Router.GET("/profile", hc.ProfileHandler, auth.LoadAuthContextFromCookie(e.App))

		// auth routes
		authGroup := e.Router.Group(
			"/auth",
			auth.LoadAuthContextFromCookie(e.App),
			controller.OnlyUnauthorisedUsers,
		)
		hc.AuthHandler(authGroup)
		e.Router.POST("/logout", hc.LogoutHandler)

		// admin routes
		adminGroup := e.Router.Group(
			"/admin",
			auth.LoadAuthContextFromCookie(e.App),
			controller.OnlyAdmins,
		)
		hc.AdminHandler(adminGroup)

		// user routes
		userGroup := e.Router.Group(
			"/user",
			auth.LoadAuthContextFromCookie(e.App),
		)
		hc.UserHandler(userGroup)

		// artist routes
		artistGroup := e.Router.Group(
			"/artist",
			auth.LoadAuthContextFromCookie(e.App),
		)
		hc.ArtistHandler(artistGroup)

		// artwork routes
		artworkGroup := e.Router.Group(
			"/artwork",
		)
		hc.ArtworkHandler(artworkGroup)

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
