package auth

import (
	"fmt"
	"net/http"

	"github.com/labstack/echo/v5"
	"github.com/pocketbase/pocketbase/core"
	"github.com/pocketbase/pocketbase/forms"
	"github.com/pocketbase/pocketbase/models"
	"github.com/pocketbase/pocketbase/tokens"
)

func Signup(e *core.ServeEvent, c echo.Context) error {
	collection, err := e.App.Dao().FindCollectionByNameOrId("users")
	if err != nil {
		return err
	}

	newUser := models.NewRecord(collection)
	form := forms.NewRecordUpsert(e.App, newUser)
	form.LoadRequest(c.Request(), "")

	// validation happens here:
	if err := form.Submit(); err != nil {
		return err
	}

	return setAuthToken(e.App, c, newUser)
}

func setAuthToken(app core.App, c echo.Context, user *models.Record) error {
	s, tokenErr := tokens.NewRecordAuthToken(app, user)
	if tokenErr != nil {
		return fmt.Errorf("Login failed")
	}

	c.SetCookie(&http.Cookie{
		Name:     "Auth",
		Value:    s,
		Path:     "/",
		Secure:   true,
		HttpOnly: true,
		SameSite: http.SameSiteLaxMode,
	})

	return nil
}
