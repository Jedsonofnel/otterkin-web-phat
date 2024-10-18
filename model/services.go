package model

import (
	"fmt"

	validation "github.com/go-ozzo/ozzo-validation/v4"
	"github.com/labstack/echo/v5"
	"github.com/pocketbase/dbx"
	"github.com/pocketbase/pocketbase/core"
	"github.com/pocketbase/pocketbase/daos"
	"github.com/pocketbase/pocketbase/forms"
	"github.com/pocketbase/pocketbase/models"
)

type Service struct {
	Id             string `db:"id"`
	Subject        string `db:"subject" form:"subject" json:"subject"`
	Surface        string `db:"surface" form:"surface" json:"surface"`
	Size           string `db:"size" form:"size" json:"size"`
	CompletionTime int64  `db:"completion_time" form:"completion_time" json:"completion_time"`
	Price          int64  `db:"price" form:"price" json:"price"`
	ArtistId       string `db:"artist_id" form:"artist_id"`
}

func (s Service) Validate() error {
	return validation.ValidateStruct(&s,
		validation.Field(&s.Subject, validation.Required),
		validation.Field(&s.Surface, validation.Required),
		validation.Field(&s.Size, validation.Required),
		validation.Field(&s.CompletionTime, validation.Required),
		validation.Field(&s.Price, validation.Required),
		validation.Field(&s.ArtistId, validation.Required),
	)
}

type Services []Service

func CreateService(app core.App, c echo.Context) (Service, error) {
	// find collection
	serviceCollection, err := app.Dao().FindCollectionByNameOrId("services")
	if err != nil {
		return Service{}, err
	}

	// validate
	s := Service{}
	if err = c.Bind(&s); err != nil {
		return s, err
	}
	fmt.Printf("s.CompletionTime: %v\n", s.CompletionTime)
	if err = s.Validate(); err != nil {
		return s, err
	}

	// create pocketbased-ly
	newService := models.NewRecord(serviceCollection)
	serviceForm := forms.NewRecordUpsert(app, newService)
	serviceForm.LoadData(map[string]any{
		"subject":         s.Subject,
		"surface":         s.Surface,
		"size":            s.Size,
		"completion_time": s.CompletionTime,
		"price":           s.Price,
		"artist_id":       s.ArtistId,
	})
	if err := serviceForm.Submit(); err != nil {
		return Service{}, err
	}

	return GetServiceById(app.Dao(), newService.Id)
}

func IndexServicesTable(dao *daos.Dao, ts TableSpec, artist_id string) (Services, error) {
	services := Services{}
	query := ts.Query(dao)
	if err := query.
		All(&services); err != nil {
		return Services{}, err
	}

	return services, nil
}

func GetServiceById(dao *daos.Dao, id string) (Service, error) {
	service := Service{}
	err := dao.DB().
		Select("*").
		From("services").
		Where(dbx.NewExp("id = {:id}", dbx.Params{"id": id})).
		One(&service)

	if err != nil {
		return Service{}, err
	}

	return service, nil
}
