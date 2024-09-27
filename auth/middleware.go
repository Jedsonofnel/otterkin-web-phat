package auth

import (
	"errors"
	"net/http"

	"github.com/Jedsonofnel/otterkin-web/model"
	"github.com/labstack/echo/v5"
	"github.com/pocketbase/pocketbase/apis"
	"github.com/pocketbase/pocketbase/core"
)

const authCookieName = "Auth"

// Finds out if authorised and puts that into the routing context
func LoadAuthContextFromCookie(app core.App) echo.MiddlewareFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			tokenCookie, err := c.Cookie(authCookieName)

			// if there isn't a cookie, just go to the next middleware
			// otherwise throw an error (something else is wrong)
			if err != nil {
				switch {
				case errors.Is(err, http.ErrNoCookie):
					return next(c)
				default:
					return err
				}
			}

			// get the token from the cookie and use it to find a corresponding
			// auth record
			token := tokenCookie.Value
			record, err := app.Dao().FindAuthRecordByToken(
				token,
				app.Settings().RecordAuthToken.Secret,
			)

			if err != nil {
				return next(c)
			}

			// use auth record to find user type
			user, err := model.GetUserById(app.Dao(), record.Id)
			if err != nil {
				return next(c)
			}

			// set the auth record at the common place in the router context
			c.Set(apis.ContextAuthRecordKey, user)
			return next(c)
		}
	}
}
