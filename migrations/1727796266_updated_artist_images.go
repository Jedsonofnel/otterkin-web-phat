package migrations

import (
	"github.com/pocketbase/dbx"
	"github.com/pocketbase/pocketbase/daos"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(db dbx.Builder) error {
		dao := daos.New(db);

		collection, err := dao.FindCollectionByNameOrId("0oq2qublvazz2dd")
		if err != nil {
			return err
		}

		collection.Name = "artworks"

		return dao.SaveCollection(collection)
	}, func(db dbx.Builder) error {
		dao := daos.New(db);

		collection, err := dao.FindCollectionByNameOrId("0oq2qublvazz2dd")
		if err != nil {
			return err
		}

		collection.Name = "artist_images"

		return dao.SaveCollection(collection)
	})
}
