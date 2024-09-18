package controller

import (
	"encoding/base64"
	"net/http"
	"time"

	"github.com/labstack/echo/v5"
)

const flashContextKey = "flash"

func SetFlash(c echo.Context, name string, value string) {
	flashCookie := &http.Cookie{
		Name:     name,
		Value:    encode([]byte(value)),
		SameSite: http.SameSiteLaxMode,
		Path:     "/",
	}
	c.SetCookie(flashCookie)
}

func GetFlash(c echo.Context, name string) ([]byte, error) {
	flashCookie, err := c.Cookie(name)
	if err != nil {
		switch err {
		case http.ErrNoCookie:
			return nil, nil
		default:
			return nil, err
		}
	}
	value, err := decode(flashCookie.Value)
	if err != nil {
		return nil, err
	}

	// overwrite with an expired cookie
	deleteFlash := &http.Cookie{
		Name:     name,
		MaxAge:   -1,
		Expires:  time.Unix(1, 0),
		Path:     "/",
		SameSite: http.SameSiteLaxMode,
	}
	c.SetCookie(deleteFlash)
	return value, nil
}

func encode(src []byte) string {
	return base64.URLEncoding.EncodeToString(src)
}

func decode(src string) ([]byte, error) {
	return base64.URLEncoding.DecodeString(src)
}

func LoadFlash(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		if flashError, err := GetFlash(c, "error"); err != nil {
			return err
		} else {
			c.Set("ferror", string(flashError))
		}

		if flashInfo, err := GetFlash(c, "info"); err != nil {
			return err
		} else {
			c.Set("finfo", string(flashInfo))
		}

		return next(c)
	}
}
