package model

import (
	"github.com/labstack/echo/v5"
	"github.com/pocketbase/dbx"
	"github.com/pocketbase/pocketbase/core"
	"github.com/pocketbase/pocketbase/daos"
	"github.com/pocketbase/pocketbase/forms"
	"github.com/pocketbase/pocketbase/models"
)

type Tag struct {
	Id   string `db:"id"`
	Name string `db:"name"`
	Type string `db:"type"`
}

type TagRelation struct {
	Id       string `db:"id"`
	ArtistId string `db:"artist_id"`
	TagId    string `db:"tag_id"`
}

func CreateTag(app core.App, c echo.Context) (Tag, error) {
	tags, err := app.Dao().FindCollectionByNameOrId("tags")
	if err != nil {
		return Tag{}, err
	}

	tagFromForm := Tag{
		Name: c.FormValue("name"),
		Type: c.FormValue("type"),
	}

	newTag := models.NewRecord(tags)
	tagForm := forms.NewRecordUpsert(app, newTag)
	tagForm.LoadData(map[string]any{
		"name": tagFromForm.Name,
		"type": tagFromForm.Type,
	})

	if err := tagForm.Submit(); err != nil {
		return tagFromForm, err
	}

	return GetTagById(app.Dao(), newTag.Id)
}

func IndexTagsTable(dao *daos.Dao, ts TableSpec, tagType string) ([]Tag, error) {
	tags := []Tag{}
	query := ts.Query(dao)
	if err := query.
		Where(dbx.NewExp("type = {:type}", dbx.Params{"type": tagType})).
		All(&tags); err != nil {
		return []Tag{}, err
	}

	return tags, nil
}

func GetTagById(dao *daos.Dao, id string) (Tag, error) {
	tag := Tag{}
	err := dao.DB().
		Select("*").
		From("tags").
		Where(dbx.NewExp("id = {:id}", dbx.Params{"id": id})).
		One(&tag)

	if err != nil {
		return Tag{}, err
	}

	return tag, nil
}

// key value is the tag id, value is the name of the tag
// for drop down multi select
func GetTagOptionsByType(dao *daos.Dao, tagType string) (map[string]string, error) {
	tagOptions := make(map[string]string)
	tags := []Tag{}
	err := dao.DB().
		Select("*").
		From("tags").
		Where(dbx.NewExp("type = {:type}", dbx.Params{"type": tagType})).
		All(&tags)

	if err != nil {
		return tagOptions, nil
	}

	for _, tag := range tags {
		tagOptions[tag.Id] = tag.Name
	}

	return tagOptions, nil
}

func UpdateTagById(app core.App, c echo.Context, id string) (Tag, error) {
	tag, err := app.Dao().FindRecordById("tags", id)
	if err != nil {
		return Tag{}, err
	}

	formTag := Tag{
		Id:   id,
		Name: c.FormValue("name"),
		Type: c.FormValue("type"),
	}

	form := forms.NewRecordUpsert(app, tag)
	form.LoadData(map[string]any{
		"name": c.FormValue("name"),
	})

	if err := form.Submit(); err != nil {
		return formTag, err
	}

	return GetTagById(app.Dao(), id)
}

func DeleteTagById(dao *daos.Dao, id string) error {
	tag, err := dao.FindRecordById("tags", id)
	if err != nil {
		return err
	}

	return dao.DeleteRecord(tag)
}

// now for the junction table stuff
func CreateTagRelation(app core.App, artist Artist, tag Tag) (TagRelation, error) {
	tagRelation := TagRelation{
		ArtistId: artist.Id,
		TagId:    tag.Id,
	}

	artistTags, err := app.Dao().FindCollectionByNameOrId("artist_tags")
	if err != nil {
		return TagRelation{}, err
	}

	// TODO check that an artist does not already have that
	// tag
	newTagRelation := models.NewRecord(artistTags)
	tagForm := forms.NewRecordUpsert(app, newTagRelation)
	tagForm.LoadData(map[string]any{
		"artist_id": tagRelation.ArtistId,
		"tag_id":    tagRelation.TagId,
	})

	if err := tagForm.Submit(); err != nil {
		return TagRelation{}, err
	}

	return tagRelation, nil
}

func IndexTagsByArtistId(dao *daos.Dao, id string) ([]Tag, error) {
	return []Tag{}, nil
}

func RemoveTagRelation(dao *daos.Dao, artistId string, tagId string) error {
	return nil
}
