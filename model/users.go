package model

import (
	"github.com/labstack/echo/v5"
	"github.com/pocketbase/dbx"
	"github.com/pocketbase/pocketbase/core"
	"github.com/pocketbase/pocketbase/daos"
	"github.com/pocketbase/pocketbase/forms"
	"github.com/pocketbase/pocketbase/tools/filesystem"
)

type User struct {
	Id        string `db:"user_id"`
	FirstName string `db:"first_name"`
	LastName  string `db:"last_name"`
	Avatar    string `db:"avatar"`
	Email     string `db:"email"`
	Role      string `db:"role"`
}

func FindUserById(dao *daos.Dao, id string) (User, error) {
	user := User{}
	err := dao.DB().
		Select("users.id as user_id", "users.*").
		From("users").
		Where(dbx.NewExp("id = {:id}", dbx.Params{"id": id})).
		One(&user)
	if err != nil {
		return User{}, err
	}

	return user, nil
}

func UpdateUserById(app core.App, c echo.Context, id string) (User, error) {
	record, err := app.Dao().FindRecordById("users", id)
	if err != nil {
		return User{}, err
	}
	form := forms.NewRecordUpsert(app, record)

	form.LoadData(map[string]any{
		"first_name": c.FormValue("first_name"),
		"last_name":  c.FormValue("last_name"),
	})

	if err := form.Submit(); err != nil {
		return User{}, err
	}

	return FindUserById(app.Dao(), id)
}

func UpdateUserAvatarById(app core.App, c echo.Context, id string) (User, error) {
	record, err := app.Dao().FindRecordById("users", id)
	if err != nil {
		return User{}, err
	}
	form := forms.NewRecordUpsert(app, record)

	_, mh, err := c.Request().FormFile("avatar")
	if err != nil {
		return User{}, err
	}

	f, err := filesystem.NewFileFromMultipart(mh)
	if err != nil {
		return User{}, err
	}

	form.AddFiles("avatar", f)

	if err := form.Submit(); err != nil {
		return User{}, err
	}

	return FindUserById(app.Dao(), id)
}
