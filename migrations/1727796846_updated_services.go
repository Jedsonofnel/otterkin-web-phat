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

		// update
		edit_subject := &schema.SchemaField{}
		if err := json.Unmarshal([]byte(`{
			"system": false,
			"id": "zmibyf54",
			"name": "subject",
			"type": "text",
			"required": true,
			"presentable": false,
			"unique": false,
			"options": {
				"min": null,
				"max": null,
				"pattern": ""
			}
		}`), edit_subject); err != nil {
			return err
		}
		collection.Schema.AddField(edit_subject)

		// update
		edit_surface := &schema.SchemaField{}
		if err := json.Unmarshal([]byte(`{
			"system": false,
			"id": "rs5bxnwe",
			"name": "surface",
			"type": "text",
			"required": true,
			"presentable": false,
			"unique": false,
			"options": {
				"min": null,
				"max": null,
				"pattern": ""
			}
		}`), edit_surface); err != nil {
			return err
		}
		collection.Schema.AddField(edit_surface)

		// update
		edit_size := &schema.SchemaField{}
		if err := json.Unmarshal([]byte(`{
			"system": false,
			"id": "l6whrcfj",
			"name": "size",
			"type": "text",
			"required": true,
			"presentable": false,
			"unique": false,
			"options": {
				"min": null,
				"max": null,
				"pattern": ""
			}
		}`), edit_size); err != nil {
			return err
		}
		collection.Schema.AddField(edit_size)

		// update
		edit_completion_time := &schema.SchemaField{}
		if err := json.Unmarshal([]byte(`{
			"system": false,
			"id": "cnfboo5t",
			"name": "completion_time",
			"type": "number",
			"required": true,
			"presentable": false,
			"unique": false,
			"options": {
				"min": null,
				"max": null,
				"noDecimal": false
			}
		}`), edit_completion_time); err != nil {
			return err
		}
		collection.Schema.AddField(edit_completion_time)

		// update
		edit_price := &schema.SchemaField{}
		if err := json.Unmarshal([]byte(`{
			"system": false,
			"id": "tpbqbzym",
			"name": "price",
			"type": "number",
			"required": true,
			"presentable": false,
			"unique": false,
			"options": {
				"min": null,
				"max": null,
				"noDecimal": false
			}
		}`), edit_price); err != nil {
			return err
		}
		collection.Schema.AddField(edit_price)

		return dao.SaveCollection(collection)
	}, func(db dbx.Builder) error {
		dao := daos.New(db);

		collection, err := dao.FindCollectionByNameOrId("7cn60em19m9m396")
		if err != nil {
			return err
		}

		// update
		edit_subject := &schema.SchemaField{}
		if err := json.Unmarshal([]byte(`{
			"system": false,
			"id": "zmibyf54",
			"name": "subject",
			"type": "text",
			"required": false,
			"presentable": false,
			"unique": false,
			"options": {
				"min": null,
				"max": null,
				"pattern": ""
			}
		}`), edit_subject); err != nil {
			return err
		}
		collection.Schema.AddField(edit_subject)

		// update
		edit_surface := &schema.SchemaField{}
		if err := json.Unmarshal([]byte(`{
			"system": false,
			"id": "rs5bxnwe",
			"name": "surface",
			"type": "text",
			"required": false,
			"presentable": false,
			"unique": false,
			"options": {
				"min": null,
				"max": null,
				"pattern": ""
			}
		}`), edit_surface); err != nil {
			return err
		}
		collection.Schema.AddField(edit_surface)

		// update
		edit_size := &schema.SchemaField{}
		if err := json.Unmarshal([]byte(`{
			"system": false,
			"id": "l6whrcfj",
			"name": "size",
			"type": "text",
			"required": false,
			"presentable": false,
			"unique": false,
			"options": {
				"min": null,
				"max": null,
				"pattern": ""
			}
		}`), edit_size); err != nil {
			return err
		}
		collection.Schema.AddField(edit_size)

		// update
		edit_completion_time := &schema.SchemaField{}
		if err := json.Unmarshal([]byte(`{
			"system": false,
			"id": "cnfboo5t",
			"name": "completion_time",
			"type": "number",
			"required": false,
			"presentable": false,
			"unique": false,
			"options": {
				"min": null,
				"max": null,
				"noDecimal": false
			}
		}`), edit_completion_time); err != nil {
			return err
		}
		collection.Schema.AddField(edit_completion_time)

		// update
		edit_price := &schema.SchemaField{}
		if err := json.Unmarshal([]byte(`{
			"system": false,
			"id": "tpbqbzym",
			"name": "price",
			"type": "number",
			"required": false,
			"presentable": false,
			"unique": false,
			"options": {
				"min": null,
				"max": null,
				"noDecimal": false
			}
		}`), edit_price); err != nil {
			return err
		}
		collection.Schema.AddField(edit_price)

		return dao.SaveCollection(collection)
	})
}
