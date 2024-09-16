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

func RegisterArtist(app core.App, c echo.Context) error {
	_, err := app.Dao().FindCollectionByNameOrId("users")
	if err != nil {
		return err
	}

	_, err = app.Dao().FindCollectionByNameOrId("artists")
	if err != nil {
		return err
	}

	// fields have to be exported for this to work
	formData := struct {
		FirstName       string `form:"first_name"`
		LastName        string `form:"last_name"`
		InstagramHandle string `form:"instagram_handle"`
		Email           string `form:"email"`
		biography       string `form:"biography"`
		password        string `form:"password"`
		passwordConfirm string `form:"password"`
	}{}

	if err = c.Bind(&formData); err != nil {
		return err
	}

	return nil
}

func Register(app core.App, c echo.Context) error {
	collection, err := app.Dao().FindCollectionByNameOrId("users")
	if err != nil {
		return err
	}

	newUser := models.NewRecord(collection)
	form := forms.NewRecordUpsert(app, newUser)
	form.LoadData(map[string]any{
		"email":           c.FormValue("email"),
		"password":        c.FormValue("password"),
		"passwordConfirm": c.FormValue("passwordConfirm"),
	})

	// validation happens here:
	if err := form.Submit(); err != nil {
		return err
	}

	return setAuthToken(app, c, newUser)
}

func setAuthToken(app core.App, c echo.Context, user *models.Record) error {
	s, tokenErr := tokens.NewRecordAuthToken(app, user)
	if tokenErr != nil {
		return fmt.Errorf("Login failed")
	}

	c.SetCookie(&http.Cookie{
		Name:     authCookieName,
		Value:    s,
		Path:     "/",
		Secure:   true,
		HttpOnly: true,
		SameSite: http.SameSiteLaxMode,
	})

	return nil
}
