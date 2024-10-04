package model

import (
	"strings"

	"github.com/pocketbase/dbx"
	"github.com/pocketbase/pocketbase/daos"
)

const (
	OrderDesc string = "DESC"
	OrderAsc  string = "ASC"
)

type TableSpec struct {
	Collection string
	Sort       string
	Order      string
	Page       int64
	PerPage    int64
}

// returns a query that can then be bound into data
// structure by whichever function calls it
func (ts TableSpec) Query(dao *daos.Dao) dbx.SelectQuery {
	// defaults:
	if ts.Sort == "" {
		ts.Sort = "created"
	}
	if ts.Order == "" || (ts.Order != "DESC" && ts.Order != "ASC") {
		ts.Order = "DESC"
	}
	if ts.Page <= 0 {
		ts.Page = 1
	}
	if ts.PerPage <= 0 {
		ts.PerPage = 10
	}

	return *dao.RecordQuery(ts.Collection).
		Offset((ts.Page - 1) * ts.PerPage).
		Limit(ts.PerPage).
		OrderBy(strings.Join([]string{ts.Sort, ts.Order}, " "))
}
