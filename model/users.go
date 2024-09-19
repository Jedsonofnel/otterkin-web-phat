package model

import (
	"github.com/pocketbase/dbx"
	"github.com/pocketbase/pocketbase/daos"
)

type User struct {
	Id        string `db:"id"`
	FirstName string `db:"first_name"`
	LastName  string `db:"last_name"`
	Email     string `db:"email"`
}

func FindUserById(dao *daos.Dao, id string) (User, error) {
	user := User{}
	err := dao.DB().
		Select("*").
		From("users").
		Where(dbx.NewExp("id = {:id}", dbx.Params{"id": id})).
		One(&user)
	if err != nil {
		return User{}, err
	}

	return user, nil
}
