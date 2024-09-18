package model

import (
	"github.com/pocketbase/dbx"
	"github.com/pocketbase/pocketbase/daos"
	"github.com/pocketbase/pocketbase/models"
)

func FindActiveArtists(dao *daos.Dao) ([]*models.Record, error) {
	query := dao.RecordQuery("artists").
		AndWhere(dbx.HashExp{"approved": true}).
		OrderBy("created DESC").
		Limit(10)

	records := []*models.Record{}
	if err := query.All(&records); err != nil {
		return nil, err
	}

	return records, nil
}

func FindAllArtists(dao *daos.Dao) ([]*models.Record, error) {
	query := dao.RecordQuery("artists").
		OrderBy("created DESC")

	records := []*models.Record{}
	if err := query.All(&records); err != nil {
		return nil, err
	}

	return records, nil
}
