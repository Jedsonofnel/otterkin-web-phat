package auth

import (
	"encoding/json"
	"errors"
	"fmt"
	"net/http"

	validation "github.com/go-ozzo/ozzo-validation/v4"
	"github.com/go-ozzo/ozzo-validation/v4/is"
	"github.com/labstack/echo/v5"
	"github.com/pocketbase/pocketbase/core"
	"github.com/pocketbase/pocketbase/forms"
	"github.com/pocketbase/pocketbase/models"
	"github.com/pocketbase/pocketbase/tokens"
)

type ArtistFormFields struct {
	FirstName       string `form:"first_name" json:"first_name"`
	LastName        string `form:"last_name" json:"last_name"`
	InstagramHandle string `form:"instagram_handle" json:"instagram_handle"`
	Biography       string `form:"biography" json:"biography"`
	Email           string `form:"email" json:"email"`
	Password        string `form:"password" json:"password"`
	PasswordConfirm string `form:"passwordConfirm" json:"passwordConfirm"`
}

type PatronFormFields struct {
	Email           string `form:"email" json:"email"`
	Password        string `form:"password" json:"password"`
	PasswordConfirm string `form:"passwordConfirm" json:"passwordConfirm"`
}

func checkConfirmPassword(password string) validation.RuleFunc {
	return func(value interface{}) error {
		confirmPassword, _ := value.(string)
		if confirmPassword != password {
			return errors.New("must match password")
		}
		return nil
	}
}

func (a ArtistFormFields) Validate() error {
	return validation.ValidateStruct(&a,
		validation.Field(&a.FirstName, validation.Required),
		validation.Field(&a.LastName, validation.Required),
		validation.Field(&a.InstagramHandle, validation.Required),
		validation.Field(&a.Biography, validation.Required),
		validation.Field(&a.Email, validation.Required, is.Email),
		validation.Field(&a.Password, validation.Required),
		validation.Field(&a.PasswordConfirm, validation.Required, validation.By(checkConfirmPassword(a.Password))),
	)
}

func (p PatronFormFields) Validate() error {
	return validation.ValidateStruct(&p,
		validation.Field(&p.Email, validation.Required, is.Email),
		validation.Field(&p.Password, validation.Required),
		validation.Field(&p.PasswordConfirm, validation.Required, validation.By(checkConfirmPassword(p.Password))),
	)
}

func GetMapOfErrs(validationError error) map[string]string {
	// if there are any errors in the marshalling
	// just return empty map
	errJson, err := json.Marshal(validationError)
	if err != nil {
		return make(map[string]string)
	}
	errMap := make(map[string]string)
	if err := json.Unmarshal(errJson, &errMap); err != nil {
		return make(map[string]string)
	}

	return errMap
}

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
	fd := ArtistFormFields{}
	if err = c.Bind(&fd); err != nil {
		return err
	}

	err = fd.Validate()
	if err != nil {
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

	// extra validation happens here:
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

	// validation happens here - returns same type of error
	// as ozzo-validation so can also be marshalled into a map
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

	// fields have to be exported for this to work
	pd := PatronFormFields{}
	if err = c.Bind(&pd); err != nil {
		return err
	}

	err = pd.Validate()
	if err != nil {
		return err
	}

	newUser := models.NewRecord(collection)
	form := forms.NewRecordUpsert(app, newUser)
	form.LoadData(map[string]any{
		"email":           pd.Email,
		"password":        pd.Password,
		"passwordConfirm": pd.PasswordConfirm,
	})

	// validation happens here - returns same type of error
	// as ozzo-validation so can also be marshalled into a map
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
