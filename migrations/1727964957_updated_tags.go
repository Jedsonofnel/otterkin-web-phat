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

		collection, err := dao.FindCollectionByNameOrId("udv6qtqa0asd8ow")
		if err != nil {
			return err
		}

		// update
		edit_name := &schema.SchemaField{}
		if err := json.Unmarshal([]byte(`{
			"system": false,
			"id": "meboth8a",
			"name": "name",
			"type": "text",
			"required": true,
			"presentable": false,
			"unique": false,
			"options": {
				"min": null,
				"max": null,
				"pattern": ""
			}
		}`), edit_name); err != nil {
			return err
		}
		collection.Schema.AddField(edit_name)

		// update
		edit_type := &schema.SchemaField{}
		if err := json.Unmarshal([]byte(`{
			"system": false,
			"id": "tr3l75n4",
			"name": "type",
			"type": "select",
			"required": true,
			"presentable": false,
			"unique": false,
			"options": {
				"maxSelect": 1,
				"values": [
					"medium",
					"style",
					"subject"
				]
			}
		}`), edit_type); err != nil {
			return err
		}
		collection.Schema.AddField(edit_type)

		return dao.SaveCollection(collection)
	}, func(db dbx.Builder) error {
		dao := daos.New(db);

		collection, err := dao.FindCollectionByNameOrId("udv6qtqa0asd8ow")
		if err != nil {
			return err
		}

		// update
		edit_name := &schema.SchemaField{}
		if err := json.Unmarshal([]byte(`{
			"system": false,
			"id": "meboth8a",
			"name": "name",
			"type": "text",
			"required": false,
			"presentable": false,
			"unique": false,
			"options": {
				"min": null,
				"max": null,
				"pattern": ""
			}
		}`), edit_name); err != nil {
			return err
		}
		collection.Schema.AddField(edit_name)

		// update
		edit_type := &schema.SchemaField{}
		if err := json.Unmarshal([]byte(`{
			"system": false,
			"id": "tr3l75n4",
			"name": "type",
			"type": "select",
			"required": false,
			"presentable": false,
			"unique": false,
			"options": {
				"maxSelect": 1,
				"values": [
					"medium",
					"style",
					"subject"
				]
			}
		}`), edit_type); err != nil {
			return err
		}
		collection.Schema.AddField(edit_type)

		return dao.SaveCollection(collection)
	})
}
