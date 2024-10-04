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

func CreateTag(app core.App, c echo.Context) (Tag, error) {
	tag, err := app.Dao().FindCollectionByNameOrId("tags")
	if err != nil {
		return Tag{}, err
	}

	tagFromForm := Tag{
		Name: c.FormValue("name"),
		Type: c.FormValue("type"),
	}

	newTag := models.NewRecord(tag)
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

func IndexTagsTable(dao *daos.Dao, ts TableSpec) ([]Tag, error) {
	tags := []Tag{}
	query := ts.Query(dao)
	if err := query.All(&tags); err != nil {
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
