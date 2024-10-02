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
		new_medians := &schema.SchemaField{}
		if err := json.Unmarshal([]byte(`{
			"system": false,
			"id": "1ldgy0ac",
			"name": "medians",
			"type": "json",
			"required": false,
			"presentable": false,
			"unique": false,
			"options": {
				"maxSize": 2000000
			}
		}`), new_medians); err != nil {
			return err
		}
		collection.Schema.AddField(new_medians)

		// add
		new_styles := &schema.SchemaField{}
		if err := json.Unmarshal([]byte(`{
			"system": false,
			"id": "8ndkkqbb",
			"name": "styles",
			"type": "json",
			"required": false,
			"presentable": false,
			"unique": false,
			"options": {
				"maxSize": 2000000
			}
		}`), new_styles); err != nil {
			return err
		}
		collection.Schema.AddField(new_styles)

		// add
		new_subjects := &schema.SchemaField{}
		if err := json.Unmarshal([]byte(`{
			"system": false,
			"id": "ecrmcm4h",
			"name": "subjects",
			"type": "json",
			"required": false,
			"presentable": false,
			"unique": false,
			"options": {
				"maxSize": 2000000
			}
		}`), new_subjects); err != nil {
			return err
		}
		collection.Schema.AddField(new_subjects)

		return dao.SaveCollection(collection)
	}, func(db dbx.Builder) error {
		dao := daos.New(db);

		collection, err := dao.FindCollectionByNameOrId("7uf04t0mtmdfecm")
		if err != nil {
			return err
		}

		// remove
		collection.Schema.RemoveField("1ldgy0ac")

		// remove
		collection.Schema.RemoveField("8ndkkqbb")

		// remove
		collection.Schema.RemoveField("ecrmcm4h")

		return dao.SaveCollection(collection)
	})
}
