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
)

func newTagTableProps(ts model.TableSpec, tagType string) components.TableProps {
	return components.TableProps{
		CreateURL: fmt.Sprintf("/tag/table/create-modal?type=%s", tagType),
		PagNextURL: fmt.Sprintf(
			"/tag/table?type=%s&sort=%s&order=%s&page=%v&perpage=%v",
			tagType,
			ts.Sort,
			ts.Order,
			ts.Page+1,
			ts.PerPage,
		),
		PagPrevURL: fmt.Sprintf(
			"/tag/table?type=%s&sort=%s&order=%s&page=%v&perpage=%v",
			tagType,
			ts.Sort,
			ts.Order,
			ts.Page-1,
			ts.PerPage,
		),
		PagPage:    ts.Page,
		PagMaxPage: ts.MaxPage,
	}
}

func (hc HandlerContext) HandleTag(g *echo.Group) {
	// tag table index
	g.GET("/table", hc.HandleIndexTagTable)

	// creation
	g.GET("/table/create-modal", hc.HandleCreateTagModal)
	g.POST("", hc.HandleCreateTag)

	// updation
	g.GET("/table/update-modal/:id", hc.HandleUpdateTagModal)
	g.PUT("/:id", hc.HandleUpdateTag)

	// deletion
	g.DELETE("/:id", hc.HandleDeleteTag)
}

func (hc HandlerContext) HandleIndexTagTable(c echo.Context) error {
	// query stuff
	tagType := c.QueryParam("type")

	ts, err := model.NewTableSpec(hc.e.App.Dao(), c, "tags",
		dbx.NewExp("type={:type}", dbx.Params{"type": tagType}))
	if err != nil {
		return err
	}

	fmt.Printf("ts: %+v\n", ts)

	tags, err := model.IndexTagsTable(hc.e.App.Dao(), ts, tagType)
	if err != nil {
		return err
	}

	return Render(c, http.StatusOK, components.TagTable(newTagTableProps(ts, tagType), tags, tagType))
}

func (hc HandlerContext) HandleCreateTagModal(c echo.Context) error {
	tagType := c.QueryParam("type")
	return Render(c, http.StatusOK, view.TagCreateModal(model.Tag{Type: tagType}))
}

func (hc HandlerContext) HandleCreateTag(c echo.Context) error {
	tag, err := model.CreateTag(hc.e.App, c)
	if err != nil {
		errMap := auth.GetMapOfErrs(err)
		return Render(c, http.StatusUnprocessableEntity, view.TagCreateForm(tag, errMap))
	}

	ts, err := model.NewTableSpec(hc.e.App.Dao(), c, "tags",
		dbx.NewExp("type={:type}", dbx.Params{"type": tag.Type}))
	if err != nil {
		return err
	}

	tags, err := model.IndexTagsTable(hc.e.App.Dao(), ts, tag.Type)
	if err != nil {
		return err
	}

	return Render(c, http.StatusOK, components.TagTable(newTagTableProps(ts, tag.Type), tags, tag.Type))
}

func (hc HandlerContext) HandleUpdateTagModal(c echo.Context) error {
	tag, err := model.GetTagById(hc.e.App.Dao(), c.PathParam("id"))
	if err != nil {
		return err
	}
	return Render(c, http.StatusOK, view.TagUpdateModal(tag))
}

func (hc HandlerContext) HandleUpdateTag(c echo.Context) error {
	tag, err := model.UpdateTagById(hc.e.App, c, c.PathParam("id"))
	if err != nil {
		errMap := auth.GetMapOfErrs(err)
		return Render(c, http.StatusUnprocessableEntity, view.TagUpdateForm(tag, errMap))
	}

	ts, err := model.NewTableSpec(hc.e.App.Dao(), c, "tags",
		dbx.NewExp("type={:type}", dbx.Params{"type": tag.Type}))
	if err != nil {
		return err
	}

	tags, err := model.IndexTagsTable(hc.e.App.Dao(), ts, tag.Type)
	if err != nil {
		return err
	}

	return Render(c, http.StatusOK, components.TagTable(newTagTableProps(ts, tag.Type), tags, tag.Type))
}

func (hc HandlerContext) HandleDeleteTag(c echo.Context) error {
	tag, err := model.GetTagById(hc.e.App.Dao(), c.PathParam("id"))
	if err != nil {
		return err
	}

	err = model.DeleteTagById(hc.e.App.Dao(), c.PathParam("id"))
	if err != nil {
		return err
	}

	ts, err := model.NewTableSpec(hc.e.App.Dao(), c, "tags",
		dbx.NewExp("type={:type}", dbx.Params{"type": tag.Type}))
	if err != nil {
		return err
	}

	tags, err := model.IndexTagsTable(hc.e.App.Dao(), ts, tag.Type)
	if err != nil {
		return err
	}

	return Render(c, http.StatusOK, components.TagTable(newTagTableProps(ts, tag.Type), tags, tag.Type))
}
