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
	Id          string `db:"id"`
	Title       string `db:"title" json:"title"`
	Description string `db:"description" json:"description"`
	Image       string `db:"image"`
	Visible     bool   `db:"visible"`
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
		Select("*").
		From("artist_images").
		Where(dbx.NewExp("id = {:id}", dbx.Params{"id": id})).
		One(&artistImage)

	if err != nil {
		return ArtistImage{}, err
	}

	return artistImage, nil
}
