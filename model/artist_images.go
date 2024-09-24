package model

import (
	"github.com/labstack/echo/v5"
	"github.com/pocketbase/dbx"
	"github.com/pocketbase/pocketbase/core"
	"github.com/pocketbase/pocketbase/daos"
	"github.com/pocketbase/pocketbase/forms"
	"github.com/pocketbase/pocketbase/models"
)

type ArtistImage struct {
	Id          string `db:"image_id"`
	Title       string `db:"title" json:"title"`
	Description string `db:"description" json:"description"`
	Image       string `db:"image"`
	Visible     bool   `db:"visible"`
	ArtistId    string `db:"artist_id"`
	UserId      string `db:"user_id"`
}

func CreateArtistImage(app core.App, c echo.Context) (ArtistImage, error) {
	artistImages, err := app.Dao().FindCollectionByNameOrId("artist_images")
	if err != nil {
		return ArtistImage{}, err
	}

	newArtistImage := models.NewRecord(artistImages)
	artistImageForm := forms.NewRecordUpsert(app, newArtistImage)
	artistImageForm.LoadRequest(c.Request(), "")

	if err = artistImageForm.Submit(); err != nil {
		return ArtistImage{}, err
	}

	return GetArtistImageById(app.Dao(), newArtistImage.Id)
}

func GetArtistImageById(dao *daos.Dao, id string) (ArtistImage, error) {
	artistImage := ArtistImage{}
	err := dao.DB().
		Select("artist_images.id as image_id", "artist_images.*", "artists.user as user_id").
		From("artist_images").
		InnerJoin("artists", dbx.NewExp("artist_images.artist_id = artists.id")).
		Where(dbx.NewExp("image_id = {:id}", dbx.Params{"id": id})).
		One(&artistImage)

	if err != nil {
		return ArtistImage{}, err
	}

	return artistImage, nil
}

func GetArtistImagesByArtistId(dao *daos.Dao, id string) ([]ArtistImage, error) {
	artistImages := []ArtistImage{}
	err := dao.DB().
		Select("artist_images.id as image_id", "artist_images.*", "artists.user as user_id").
		From("artist_images").
		InnerJoin("artists", dbx.NewExp("artist_images.artist_id = artists.id")).
		Where(dbx.NewExp("artist_id = {:id}", dbx.Params{"id": id})).
		All(&artistImages)

	if err != nil {
		return []ArtistImage{}, nil
	}

	return artistImages, nil
}

func UpdateArtistImageById(app core.App, c echo.Context, id string) (ArtistImage, error) {
	artistImage, err := app.Dao().FindRecordById("artist_images", id)
	if err != nil {
		return ArtistImage{}, err
	}

	var visible bool
	if c.FormValue("visible") == "false" {
		visible = false
	} else {
		visible = true
	}

	form := forms.NewRecordUpsert(app, artistImage)
	form.LoadData(map[string]any{
		"title":       c.FormValue("title"),
		"description": c.FormValue("description"),
		"visible":     visible,
	})

	if err := form.Submit(); err != nil {
		return ArtistImage{}, err
	}

	return GetArtistImageById(app.Dao(), id)
}

func DeleteArtistImageById(dao *daos.Dao, id string) error {
	artistImage, err := dao.FindRecordById("artist_images", id)
	if err != nil {
		return err
	}

	return dao.DeleteRecord(artistImage)
}
