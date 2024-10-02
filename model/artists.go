package model

import (
	"github.com/labstack/echo/v5"
	"github.com/pocketbase/dbx"
	"github.com/pocketbase/pocketbase/core"
	"github.com/pocketbase/pocketbase/daos"
	"github.com/pocketbase/pocketbase/forms"
	"github.com/pocketbase/pocketbase/models"
)

type Artist struct {
	Id              string `db:"artist_id"`
	InstagramHandle string `db:"instagram_handle"`
	Biography       string `db:"biography"`
	Approved        bool   `db:"approved"`
	User            User
}

// we can't do nested `db` tags so we need to get database info
// into the following struct then marshal it into an Artist struct
// which has a nested User
type ArtistDBMarshalling struct {
	ArtistId        string `db:"artist_id"`
	InstagramHandle string `db:"instagram_handle"`
	Biography       string `db:"biography"`
	Approved        bool   `db:"approved"`
	UserId          string `db:"user_id"`
	FirstName       string `db:"first_name"`
	LastName        string `db:"last_name"`
	Email           string `db:"email"`
	Role            string `db:"role"`
}
type ArtistsDBMarshalling []ArtistDBMarshalling

func (adbm ArtistDBMarshalling) Marshal() Artist {
	return Artist{
		Id:              adbm.ArtistId,
		InstagramHandle: adbm.InstagramHandle,
		Biography:       adbm.Biography,
		Approved:        adbm.Approved,
		User: User{
			Id:        adbm.UserId,
			FirstName: adbm.FirstName,
			LastName:  adbm.LastName,
			Email:     adbm.Email,
			Role:      adbm.Role,
		},
	}
}

func (adbm ArtistsDBMarshalling) Marshal() []Artist {
	var artists []Artist
	for _, adb := range adbm {
		artists = append(artists,
			Artist{
				Id:              adb.ArtistId,
				InstagramHandle: adb.InstagramHandle,
				Biography:       adb.Biography,
				Approved:        adb.Approved,
				User: User{
					Id:        adb.UserId,
					FirstName: adb.FirstName,
					LastName:  adb.LastName,
					Email:     adb.Email,
					Role:      adb.Role,
				},
			},
		)
	}
	return artists
}

func GetActiveArtists(dao *daos.Dao) ([]*models.Record, error) {
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

func GetAllArtists(dao *daos.Dao) ([]Artist, error) {
	var artists ArtistsDBMarshalling
	err := dao.DB().
		Select("artists.id as artist_id", "artists.*", "users.id as user_id", "users.*").
		From("artists").
		InnerJoin("users", dbx.NewExp("artists.user=users.id")).
		OrderBy("created DESC").
		All(&artists)

	if err != nil {
		return nil, err
	}

	return artists.Marshal(), nil
}

func GetArtistByArtistId(dao *daos.Dao, id string) (Artist, error) {
	artist := ArtistDBMarshalling{}
	err := dao.DB().
		Select(
			"artists.id as artist_id",
			"artists.*",
			"users.first_name",
			"users.last_name",
			"users.email",
			"users.role",
		).
		From("artists").
		InnerJoin("users", dbx.NewExp("artists.user=users.id")).
		Where(dbx.NewExp("artist_id = {:id}", dbx.Params{"id": id})).
		One(&artist)

	if err != nil {
		return Artist{}, err
	}

	return artist.Marshal(), nil
}

func GetArtistByUserId(dao *daos.Dao, id string) (Artist, error) {
	artist := ArtistDBMarshalling{}
	err := dao.DB().
		Select(
			"artists.id as artist_id",
			"artists.*",
			"users.first_name",
			"users.last_name",
			"users.email",
			"users.role",
		).
		From("artists").
		InnerJoin("users", dbx.NewExp("artists.user_id=users.id")).
		Where(dbx.NewExp("user_id = {:id}", dbx.Params{"id": id})).
		One(&artist)

	if err != nil {
		return Artist{}, err
	}

	return artist.Marshal(), nil
}

func UpdateArtistById(app core.App, c echo.Context, id string) (Artist, error) {
	artist, err := app.Dao().FindRecordById("artists", id)
	if err != nil {
		return Artist{}, err
	}

	form := forms.NewRecordUpsert(app, artist)
	form.LoadData(map[string]any{
		"instagram_handle": c.FormValue("instagram_handle"),
		"biography":        c.FormValue("biography"),
	})
	if err := form.Submit(); err != nil {
		return Artist{}, err
	}

	return GetArtistByArtistId(app.Dao(), id)
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

	return GetArtistByArtistId(app.Dao(), id)
}
