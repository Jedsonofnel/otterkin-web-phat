package model

import (
	"github.com/pocketbase/dbx"
	"github.com/pocketbase/pocketbase/daos"
	"github.com/pocketbase/pocketbase/models"
)

type Artist struct {
	Id              string `db:"id"`
	FirstName       string `db:"first_name"`
	LastName        string `db:"last_name"`
	Email           string `db:"email"`
	InstagramHandle string `db:"instagram_handle"`
	Biography       string `db:"biography"`
	Approved        bool   `db:"approved"`
}

func FindActiveArtists(dao *daos.Dao) ([]*models.Record, error) {
	query := dao.RecordQuery("artists").
		AndWhere(dbx.HashExp{"approved": true}).
		OrderBy("created DESC").
		Limit(10)

	records := []*models.Record{}
	if err := query.All(&records); err != nil {
		return nil, err
	}

	return records, nil
}

func FindAllArtists(dao *daos.Dao) ([]Artist, error) {
	artists := []Artist{}
	err := dao.DB().
		Select("*").
		From("artists").
		InnerJoin("users", dbx.NewExp("artists.user=users.id")).
		OrderBy("created DESC").
		All(&artists)

	if err != nil {
		return nil, err
	}

	return artists, nil
}
