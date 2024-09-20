package model

import (
	"github.com/pocketbase/dbx"
	"github.com/pocketbase/pocketbase/core"
	"github.com/pocketbase/pocketbase/daos"
	"github.com/pocketbase/pocketbase/forms"
	"github.com/pocketbase/pocketbase/models"
)

type Artist struct {
	Id              string `db:"user_id"`
	FirstName       string `db:"first_name"`
	LastName        string `db:"last_name"`
	Email           string `db:"email"`
	InstagramHandle string `db:"instagram_handle"`
	Biography       string `db:"biography"`
	Approved        bool   `db:"approved"`
	ArtistId        string `db:"artist_id"`
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
		Select("artists.id as artist_id", "artists.*", "users.id as user_id", "users.*").
		From("artists").
		InnerJoin("users", dbx.NewExp("artists.user=users.id")).
		OrderBy("created DESC").
		All(&artists)

	if err != nil {
		return nil, err
	}

	return artists, nil
}

func FindArtistById(dao *daos.Dao, id string) (Artist, error) {
	artist := Artist{}
	err := dao.DB().
		Select("artists.id as artist_id", "artists.*", "users.id as user_id", "users.*").
		From("artists").
		InnerJoin("users", dbx.NewExp("artists.user=users.id")).
		Where(dbx.NewExp("artist_id = {:id}", dbx.Params{"id": id})).
		One(&artist)

	if err != nil {
		return Artist{}, err
	}

	return artist, nil
}

func UpdateArtistApprovalById(app core.App, id string, approval bool) (Artist, error) {
	artist, err := app.Dao().FindRecordById("artists", id)
	if err != nil {
		return Artist{}, err
	}

	form := forms.NewRecordUpsert(app, artist)

	form.LoadData(map[string]any{
		"approved": approval,
	})

	if err := form.Submit(); err != nil {
		return Artist{}, err
	}

	return FindArtistById(app.Dao(), id)
}
