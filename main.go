package main

import (
	"embed"
	"log"
	"os"

	"github.com/Jedsonofnel/otterkin-web/assets"
	"github.com/Jedsonofnel/otterkin-web/auth"
	"github.com/Jedsonofnel/otterkin-web/controller"
	_ "github.com/Jedsonofnel/otterkin-web/migrations"
	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/core"
	"github.com/pocketbase/pocketbase/plugins/migratecmd"
)

var dev, prod = getAppEnv()

//go:embed public/*
var publicAssets embed.FS // this is served FIRST

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

		// static first
		ah := assets.NewAssetHandler(dev, "", publicAssets)
		ah.Handle(e.Router)

		// non-grouped pages
		e.Router.GET("/", hc.HandleHomePage,
			auth.LoadAuthContextFromCookie(e.App),
			controller.LoadFlash)

		e.Router.GET("/profile", hc.HandleProfilePage, auth.LoadAuthContextFromCookie(e.App))

		// auth routes
		authGroup := e.Router.Group(
			"/auth",
			auth.LoadAuthContextFromCookie(e.App),
			controller.OnlyUnauthorisedUsers,
		)
		hc.HandleAuth(authGroup)
		e.Router.POST("/logout", hc.HandleLogout)

		// admin routes
		adminGroup := e.Router.Group(
			"/admin",
			auth.LoadAuthContextFromCookie(e.App),
			controller.OnlyAdmins,
		)
		hc.HandleAdmin(adminGroup)

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
		hc.HandleArtist(artistGroup)

		// artwork routes
		artworkGroup := e.Router.Group(
			"/artwork",
			auth.LoadAuthContextFromCookie(e.App),
		)
		hc.HandleArtwork(artworkGroup)

		// tag routes
		tagGroup := e.Router.Group("/tag",
			auth.LoadAuthContextFromCookie(e.App),
			controller.OnlyAdmins,
		)
		hc.HandleTag(tagGroup)

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
