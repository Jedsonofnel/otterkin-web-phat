package controller

import (
	"fmt"
	"net/http"

	"github.com/Jedsonofnel/otterkin-web/auth"
	"github.com/Jedsonofnel/otterkin-web/model"
	"github.com/Jedsonofnel/otterkin-web/view"
	"github.com/Jedsonofnel/otterkin-web/view/components"
	"github.com/labstack/echo/v5"
	"github.com/pocketbase/dbx"
	"github.com/pocketbase/pocketbase/apis"
)

func newServiceTableProps(ts model.TableSpec, artist_id string) components.TableProps {
	return components.TableProps{
		TableId:   "table-service",
		CreateURL: fmt.Sprintf("/service/table/create-modal?artist=%s", artist_id),
		UpdateURL: func(id string) string {
			return "hello"
		},
		DeleteURL: func(id string) string {
			return "hello"
		},
		PagNextURL: fmt.Sprintf(
			"/service/table?artist=%s&sort=%s&order=%s&page=%v&perpage=%v",
			artist_id,
			ts.Sort,
			ts.Order,
			ts.Page+1,
			ts.PerPage,
		),
		PagPrevURL: fmt.Sprintf(
			"/service/table?artist=%s&sort=%s&order=%s&page=%v&perpage=%v",
			artist_id,
			ts.Sort,
			ts.Order,
			ts.Page-1,
			ts.PerPage,
		),
		PagPage:    ts.Page,
		PagMaxPage: ts.MaxPage,
	}
}

func (hc HandlerContext) HandleService(g *echo.Group) {
	g.GET("/table", hc.HandleIndexServiceTable, OnlyQueriedArtist(hc.e.App))

	g.GET("/table/create-modal", hc.HandleCreateServiceModal)
	g.POST("", hc.HandleCreateService)
}

func (hc HandlerContext) HandleIndexServiceTable(c echo.Context) error {
	artist, err := model.GetArtistByArtistId(hc.e.App.Dao(), c.QueryParam("artist"))
	if err != nil {
		return err
	}

	ts, err := model.NewTableSpec(hc.e.App.Dao(), c, "services",
		dbx.NewExp("artist_id = {:artist_id}", dbx.Params{"artist_id": artist.Id}))
	if err != nil {
		return err
	}
	tp := newServiceTableProps(ts, artist.Id)

	services, err := model.IndexServicesTable(hc.e.App.Dao(), ts, artist.Id)
	if err != nil {
		return err
	}

	return Render(c, http.StatusOK, components.ServicesTable(tp, services, artist.Id))
}

func (hc HandlerContext) HandleCreateServiceModal(c echo.Context) error {
	user, ok := c.Get(apis.ContextAuthRecordKey).(model.User)
	if !ok {
		return nil
	}

	artist, err := model.GetArtistByUserId(hc.e.App.Dao(), user.Id)
	if err != nil {
		return err
	}

	return Render(c, http.StatusOK, view.ServiceCreateModal(artist))
}

func (hc HandlerContext) HandleCreateService(c echo.Context) error {
	// create new service
	service, err := model.CreateService(hc.e.App, c)
	if err != nil {
		errMap := auth.GetMapOfErrs(err)
		fmt.Printf("errMap: %+v\n", errMap)
		return Render(c, http.StatusUnprocessableEntity, components.FormErrors(errMap))
	}

	// get artist using token data
	user, ok := c.Get(apis.ContextAuthRecordKey).(model.User)
	if !ok {
		return nil
	}
	artist, err := model.GetArtistByUserId(hc.e.App.Dao(), user.Id)
	if err != nil {
		return err
	}

	// create table props for new row
	ts, err := model.NewTableSpec(hc.e.App.Dao(), c, "services",
		dbx.NewExp("artist_id = {:artist_id}", dbx.Params{"artist_id": artist.Id}))
	if err != nil {
		return err
	}
	tp := newServiceTableProps(ts, artist.Id)

	c.Response().Header().Add("data-modal-close", "true")
	return Render(c, http.StatusOK, components.ServiceRow(tp, service))
}
