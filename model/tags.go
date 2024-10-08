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

// to write a method to turn into a map
type Tags []Tag

func (tags Tags) ToMap() map[string]string {
	tagMap := make(map[string]string)
	for _, tag := range tags {
		tagMap[tag.Id] = tag.Name
	}

	return tagMap
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

func IndexTagsTable(dao *daos.Dao, ts TableSpec, tagType string) (Tags, error) {
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
func GetTagsByType(dao *daos.Dao, tagType string) (Tags, error) {
	tags := Tags{}
	err := dao.DB().
		Select("*").
		From("tags").
		Where(dbx.NewExp("type = {:type}", dbx.Params{"type": tagType})).
		All(&tags)

	if err != nil {
		return tags, err
	}

	return tags, nil
}

func GetAllTagsIntoType(dao *daos.Dao) (map[string]Tags, error) {
	allTags := make(map[string]Tags)

	for _, tagType := range []string{"medium", "style", "subject"} {
		tags, err := GetTagsByType(dao, tagType)
		if err != nil {
			return allTags, err
		}
		allTags[tagType] = tags
	}

	return allTags, nil
}

func GetAllArtistTagsIntoTypeByArtistId(dao *daos.Dao, artistId string) (map[string]Tags, error) {
	allTags := make(map[string]Tags)

	for _, tagType := range []string{"medium", "style", "subject"} {
		tags, err := IndexTagsByArtistIdAndType(dao, artistId, tagType)
		if err != nil {
			return allTags, err
		}
		allTags[tagType] = tags
	}

	return allTags, nil
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

	// delete any relevant tag relations
	_, err = dao.DB().
		NewQuery("DELETE FROM artist_tags WHERE tag_id = {:id}").
		Bind(dbx.Params{"id": id}).
		Execute()

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

	// check that an artist does not already have that tag
	existingTags, err := IndexTagsByArtistId(app.Dao(), artist.Id)
	if err != nil {
		return TagRelation{}, err
	}
	for _, existingTag := range existingTags {
		if existingTag.Id == tag.Id {
			return TagRelation{}, fmt.Errorf("Cannot add a tag already applied to this artist")
		}
	}

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

func GetTagRelationByIds(dao *daos.Dao, tagId string, artistId string) (TagRelation, error) {
	tagRelation := TagRelation{}
	err := dao.DB().
		Select("*").
		From("artist_tags").
		Where(dbx.NewExp("tag_id = {:tag_id}", dbx.Params{"tag_id": tagId})).
		AndWhere(dbx.NewExp("artist_id = {:artist_id}", dbx.Params{"artist_id": artistId})).
		One(&tagRelation)

	if err != nil {
		return TagRelation{}, err
	}

	return tagRelation, nil
}

func IndexTagsByArtistId(dao *daos.Dao, id string) (Tags, error) {
	tags := []Tag{}
	err := dao.DB().
		Select("artist_tags.tag_id", "artist_tags.artist_id", "tags.*").
		From("artist_tags").
		InnerJoin("tags", dbx.NewExp("artist_tags.tag_id=tags.id")).
		Where(dbx.NewExp("artist_id={:id}", dbx.Params{"id": id})).
		OrderBy("name DESC").
		All(&tags)

	if err != nil {
		return tags, err
	}

	return tags, nil
}

func IndexTagsByArtistIdAndType(dao *daos.Dao, id string, tagType string) (Tags, error) {
	tags := []Tag{}
	err := dao.DB().
		Select("artist_tags.tag_id", "artist_tags.artist_id", "tags.*").
		From("artist_tags").
		InnerJoin("tags", dbx.NewExp("artist_tags.tag_id=tags.id")).
		Where(dbx.NewExp("artist_id={:id}", dbx.Params{"id": id})).
		AndWhere(dbx.NewExp("type={:type}", dbx.Params{"type": tagType})).
		OrderBy("name DESC").
		All(&tags)

	if err != nil {
		return tags, err
	}

	return tags, nil
}

func RemoveTagRelation(dao *daos.Dao, artistId string, tagId string) error {
	tagRelation, err := GetTagRelationByIds(dao, tagId, artistId)
	if err != nil {
		return err
	}

	tagRelationRecord, err := dao.FindRecordById("artist_tags", tagRelation.Id)
	if err != nil {
		return err
	}

	return dao.DeleteRecord(tagRelationRecord)
}
