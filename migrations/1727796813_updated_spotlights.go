package migrations

import (
	"encoding/json"

	"github.com/pocketbase/dbx"
	"github.com/pocketbase/pocketbase/daos"
	m "github.com/pocketbase/pocketbase/migrations"
	"github.com/pocketbase/pocketbase/models/schema"
)

func init() {
	m.Register(func(db dbx.Builder) error {
		dao := daos.New(db);

		collection, err := dao.FindCollectionByNameOrId("i4t0uj8jb73i5k4")
		if err != nil {
			return err
		}

		// update
		edit_artist_id := &schema.SchemaField{}
		if err := json.Unmarshal([]byte(`{
			"system": false,
			"id": "6jyv8dyy",
			"name": "artist_id",
			"type": "relation",
			"required": true,
			"presentable": false,
			"unique": false,
			"options": {
				"collectionId": "7uf04t0mtmdfecm",
				"cascadeDelete": false,
				"minSelect": null,
				"maxSelect": 1,
				"displayFields": null
			}
		}`), edit_artist_id); err != nil {
			return err
		}
		collection.Schema.AddField(edit_artist_id)

		// update
		edit_biography := &schema.SchemaField{}
		if err := json.Unmarshal([]byte(`{
			"system": false,
			"id": "xzdszpb0",
			"name": "biography",
			"type": "text",
			"required": true,
			"presentable": false,
			"unique": false,
			"options": {
				"min": null,
				"max": null,
				"pattern": ""
			}
		}`), edit_biography); err != nil {
			return err
		}
		collection.Schema.AddField(edit_biography)

		return dao.SaveCollection(collection)
	}, func(db dbx.Builder) error {
		dao := daos.New(db);

		collection, err := dao.FindCollectionByNameOrId("i4t0uj8jb73i5k4")
		if err != nil {
			return err
		}

		// update
		edit_artist_id := &schema.SchemaField{}
		if err := json.Unmarshal([]byte(`{
			"system": false,
			"id": "6jyv8dyy",
			"name": "artist_id",
			"type": "relation",
			"required": false,
			"presentable": false,
			"unique": false,
			"options": {
				"collectionId": "7uf04t0mtmdfecm",
				"cascadeDelete": false,
				"minSelect": null,
				"maxSelect": 1,
				"displayFields": null
			}
		}`), edit_artist_id); err != nil {
			return err
		}
		collection.Schema.AddField(edit_artist_id)

		// update
		edit_biography := &schema.SchemaField{}
		if err := json.Unmarshal([]byte(`{
			"system": false,
			"id": "xzdszpb0",
			"name": "biography",
			"type": "text",
			"required": false,
			"presentable": false,
			"unique": false,
			"options": {
				"min": null,
				"max": null,
				"pattern": ""
			}
		}`), edit_biography); err != nil {
			return err
		}
		collection.Schema.AddField(edit_biography)

		return dao.SaveCollection(collection)
	})
}
