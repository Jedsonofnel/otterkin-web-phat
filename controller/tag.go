package controller

import (
	"net/http"

	"github.com/Jedsonofnel/otterkin-web/auth"
	"github.com/Jedsonofnel/otterkin-web/model"
	"github.com/Jedsonofnel/otterkin-web/view"
	"github.com/Jedsonofnel/otterkin-web/view/components"
	"github.com/labstack/echo/v5"
)

var tagTableProps components.TableProps = components.TableProps{
	CreateURL: "/tag/table/create-modal",
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

	ts := model.TableSpec{Collection: "tags"}
	tags, err := model.IndexTagsTable(hc.e.App.Dao(), ts)
	if err != nil {
		return err
	}

	return Render(c, http.StatusOK, components.TagTable(tagTableProps, tags, tagType))
}

func (hc HandlerContext) HandleCreateTagModal(c echo.Context) error {
	return Render(c, http.StatusOK, view.TagCreateModal(model.Tag{Type: "medium"}))
}

func (hc HandlerContext) HandleCreateTag(c echo.Context) error {
	tag, err := model.CreateTag(hc.e.App, c)
	if err != nil {
		errMap := auth.GetMapOfErrs(err)
		return Render(c, http.StatusUnprocessableEntity, view.TagCreateForm(tag, errMap))
	}

	ts := model.TableSpec{Collection: "tags"}
	tags, err := model.IndexTagsTable(hc.e.App.Dao(), ts)
	if err != nil {
		return err
	}

	return Render(c, http.StatusOK, components.TagTable(tagTableProps, tags, tag.Type))
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

	ts := model.TableSpec{Collection: "tags"}
	tags, err := model.IndexTagsTable(hc.e.App.Dao(), ts)
	if err != nil {
		return err
	}

	return Render(c, http.StatusOK, components.TagTable(tagTableProps, tags, tag.Type))
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

	ts := model.TableSpec{Collection: "tags"}
	tags, err := model.IndexTagsTable(hc.e.App.Dao(), ts)
	if err != nil {
		return err
	}

	return Render(c, http.StatusOK, components.TagTable(tagTableProps, tags, tag.Type))
}
