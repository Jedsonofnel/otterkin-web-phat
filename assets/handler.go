package assets

import (
	"embed"
	"io/fs"

	"github.com/labstack/echo/v5"
	"github.com/labstack/echo/v5/middleware"
)

//go:embed images/*
var imageAssets embed.FS

//go:embed built/prod/*.js built/prod/*.css
var builtAssets embed.FS

type assetHandler struct {
	dev          bool
	prod         bool
	publicAssets embed.FS
}

func NewAssetHandler(dev bool, fsRoot string, pa embed.FS) assetHandler {
	return assetHandler{
		dev:          dev,
		prod:         !dev,
		publicAssets: pa,
	}
}

func (ah assetHandler) Handle(router *echo.Echo) {
	router.Use(
		middleware.StaticWithConfig(middleware.StaticConfig{
			Root:       "public",
			Filesystem: fs.FS(imageAssets),
		}),
		middleware.StaticWithConfig(middleware.StaticConfig{
			Root:       "public",
			Filesystem: fs.FS(ah.publicAssets),
		}),
	)

	// otherAssets
	if ah.dev {
		router.Use(
			disableCacheInDevMode,
			middleware.StaticWithConfig(middleware.StaticConfig{
				Root:       "assets/built/dev",
				IgnoreBase: false,
			}))
	} else {
		router.Use(
			middleware.StaticWithConfig(middleware.StaticConfig{
				Root:       "assets/built/prod",
				Filesystem: fs.FS(builtAssets),
				IgnoreBase: false,
			}),
		)
	}
}

func disableCacheInDevMode(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		c.Response().Header().Add("Cache-control", "no-store")
		return next(c)
	}
}
