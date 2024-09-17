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
	users, err := app.Dao().FindCollectionByNameOrId("users")
	if err != nil {
		return err
	}

	artists, err := app.Dao().FindCollectionByNameOrId("artists")
	if err != nil {
		return err
	}

	// fields have to be exported for this to work
	fd := struct {
		FirstName       string `form:"first_name"`
		LastName        string `form:"last_name"`
		InstagramHandle string `form:"instagram_handle"`
		Biography       string `form:"biography"`
		Email           string `form:"email"`
		Password        string `form:"password"`
		PasswordConfirm string `form:"password"`
	}{}

	if err = c.Bind(&fd); err != nil {
		return err
	}

	newUser := models.NewRecord(users)
	userForm := forms.NewRecordUpsert(app, newUser)
	userForm.LoadData(map[string]any{
		"first_name":      fd.FirstName,
		"last_name":       fd.LastName,
		"email":           fd.Email,
		"password":        fd.Password,
		"passwordConfirm": fd.PasswordConfirm,
	})

	// user validation happens here:
	if err := userForm.Submit(); err != nil {
		return err
	}

	newArtist := models.NewRecord(artists)
	artistForm := forms.NewRecordUpsert(app, newArtist)
	artistForm.LoadData(map[string]any{
		"instagram_handle": fd.InstagramHandle,
		"biography":        fd.Biography,
		"user":             newUser.Id,
		"approved":         false,
	})

	// artist validation happens here
	if err = artistForm.Submit(); err != nil {
		return err
	}

	return setAuthToken(app, c, newUser)
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
