package model

import (
	"fmt"

	"github.com/labstack/echo/v5"
	"github.com/pocketbase/dbx"
	"github.com/pocketbase/pocketbase/core"
	"github.com/pocketbase/pocketbase/daos"
	"github.com/pocketbase/pocketbase/forms"
	"github.com/pocketbase/pocketbase/models"
)

type Artwork struct {
	Id          string `db:"artwork_id"`
	Title       string `db:"title"`
	Description string `db:"description"`
	Image       string `db:"image"`
	Visible     bool   `db:"visible"`
	ArtistId    string `db:"artist_id"`
	UserId      string `db:"user_id"`
}

func CreateArtwork(app core.App, c echo.Context) (Artwork, error) {
	artworks, err := app.Dao().FindCollectionByNameOrId("artworks")
	if err != nil {
		return Artwork{}, err
	}

	newArtwork := models.NewRecord(artworks)
	artworkForm := forms.NewRecordUpsert(app, newArtwork)
	artworkForm.LoadRequest(c.Request(), "")

	if err = artworkForm.Submit(); err != nil {
		return Artwork{}, err
	}

	return GetArtworkById(app.Dao(), newArtwork.Id)
}

func GetArtworkById(dao *daos.Dao, id string) (Artwork, error) {
	artwork := Artwork{}
	err := dao.DB().
		Select("artworks.id as artwork_id", "artworks.*", "artists.user_id").
		From("artworks").
		InnerJoin("artists", dbx.NewExp("artworks.artist_id = artists.id")).
		Where(dbx.NewExp("artwork_id = {:id}", dbx.Params{"id": id})).
		One(&artwork)

	if err != nil {
		return Artwork{}, err
	}

	return artwork, nil
}

func GetArtworksByArtistId(dao *daos.Dao, id string) ([]Artwork, error) {
	artwork := []Artwork{}
	err := dao.DB().
		Select("artworks.id as artwork_id", "artworks.*", "artists.user_id").
		From("artworks").
		InnerJoin("artists", dbx.NewExp("artworks.artist_id = artists.id")).
		Where(dbx.NewExp("artist_id = {:id}", dbx.Params{"id": id})).
		All(&artwork)

	if err != nil {
		return []Artwork{}, nil
	}

	return artwork, nil
}

func GetArtworksByUserId(dao *daos.Dao, id string) ([]Artwork, error) {
	artwork := []Artwork{}
	err := dao.DB().
		Select("artworks.id as artwork_id", "artworks.*", "artists.user_id").
		From("artworks").
		InnerJoin("artists", dbx.NewExp("artworks.artist_id = artists.id")).
		Where(dbx.NewExp("user_id = {:id}", dbx.Params{"id": id})).
		All(&artwork)

	if err != nil {
		return []Artwork{}, nil
	}

	return artwork, nil
}

func UpdateArtworkById(app core.App, c echo.Context, id string) (Artwork, error) {
	artwork, err := app.Dao().FindRecordById("artworks", id)
	if err != nil {
		return Artwork{}, err
	}

	fmt.Printf("c.FormValue(\"visible\"): %v\n", c.FormValue("visible"))

	form := forms.NewRecordUpsert(app, artwork)
	form.LoadRequest(c.Request(), "")

	if err := form.Submit(); err != nil {
		return Artwork{}, err
	}

	return GetArtworkById(app.Dao(), id)
}

func DeleteArtworkById(dao *daos.Dao, id string) error {
	artwork, err := dao.FindRecordById("artworks", id)
	if err != nil {
		return err
	}

	return dao.DeleteRecord(artwork)
}
