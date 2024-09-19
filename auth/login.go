package auth

import (
	"errors"
	"net/http"
	"time"

	"github.com/labstack/echo/v5"
	"github.com/pocketbase/pocketbase/core"
)

func Login(app core.App, c echo.Context) error {
	loginData := struct {
		email    string
		password string
	}{
		email:    c.FormValue("email"),
		password: c.FormValue("password"),
	}

	// first try find user and login
	record, err := app.Dao().FindAuthRecordByEmail("users", loginData.email)
	if err != nil {
		return err
	} else if !record.ValidatePassword(loginData.password) {
		return errors.New("Invalid credentials")
	}

	return setAuthToken(app, c, record)
}

func Logout(c echo.Context) {
	c.SetCookie(&http.Cookie{
		Name:     authCookieName,
		Value:    "",
		Path:     "/",
		Secure:   true,
		HttpOnly: true,
		SameSite: http.SameSiteLaxMode,
		Expires:  time.Now(),
	})
}
