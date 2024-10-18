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

		collection, err := dao.FindCollectionByNameOrId("7uf04t0mtmdfecm")
		if err != nil {
			return err
		}

		// add
		new_location := &schema.SchemaField{}
		if err := json.Unmarshal([]byte(`{
			"system": false,
			"id": "1fomtmmn",
			"name": "location",
			"type": "text",
			"required": false,
			"presentable": false,
			"unique": false,
			"options": {
				"min": null,
				"max": null,
				"pattern": ""
			}
		}`), new_location); err != nil {
			return err
		}
		collection.Schema.AddField(new_location)

		return dao.SaveCollection(collection)
	}, func(db dbx.Builder) error {
		dao := daos.New(db);

		collection, err := dao.FindCollectionByNameOrId("7uf04t0mtmdfecm")
		if err != nil {
			return err
		}

		// remove
		collection.Schema.RemoveField("1fomtmmn")

		return dao.SaveCollection(collection)
	})
}
