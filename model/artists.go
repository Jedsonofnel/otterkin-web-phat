package model

import (
	"github.com/pocketbase/dbx"
	"github.com/pocketbase/pocketbase/daos"
	"github.com/pocketbase/pocketbase/models"
)

func FindActiveArtists(dao *daos.Dao) ([]*models.Record, error) {
	query := dao.RecordQuery("artists")

	return nil, nil
}
