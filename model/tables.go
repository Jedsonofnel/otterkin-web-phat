package model

import (
	"math"
	"strings"

	"github.com/labstack/echo/v5"
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
	MaxPage    int64
	PerPage    int64
}

func NewTableSpec(dao *daos.Dao, c echo.Context, collection string, exprs ...dbx.Expression) (TableSpec, error) {

	ts := TableSpec{
		Collection: collection,
	}

	records, err := dao.FindRecordsByExpr(collection, exprs...)
	if err != nil {
		return ts, err
	}

	err = echo.QueryParamsBinder(c).
		String("sort", &ts.Sort).
		String("order", &ts.Order).
		Int64("page", &ts.Page).
		Int64("perpage", &ts.PerPage).
		BindError()

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

	ts.MaxPage = int64(math.Floor(float64(int64(len(records))/ts.PerPage)) + 1)

	if int64(len(records))%ts.PerPage == 0 {
		ts.MaxPage = ts.MaxPage - 1
	}

	if ts.MaxPage == 0 {
		ts.MaxPage = 1
	}
	return ts, err
}

// returns a query that can then be bound into data
// structure by whichever function calls it
func (ts TableSpec) Query(dao *daos.Dao) dbx.SelectQuery {

	return *dao.RecordQuery(ts.Collection).
		Offset((ts.Page - 1) * ts.PerPage).
		Limit(ts.PerPage).
		OrderBy(strings.Join([]string{ts.Sort, ts.Order}, " "))
}
