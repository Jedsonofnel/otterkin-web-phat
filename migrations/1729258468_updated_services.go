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

		collection, err := dao.FindCollectionByNameOrId("7cn60em19m9m396")
		if err != nil {
			return err
		}

		// add
		new_artist_id := &schema.SchemaField{}
		if err := json.Unmarshal([]byte(`{
			"system": false,
			"id": "ptpij5ws",
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
		}`), new_artist_id); err != nil {
			return err
		}
		collection.Schema.AddField(new_artist_id)

		return dao.SaveCollection(collection)
	}, func(db dbx.Builder) error {
		dao := daos.New(db);

		collection, err := dao.FindCollectionByNameOrId("7cn60em19m9m396")
		if err != nil {
			return err
		}

		// remove
		collection.Schema.RemoveField("ptpij5ws")

		return dao.SaveCollection(collection)
	})
}
