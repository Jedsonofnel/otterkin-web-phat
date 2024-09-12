package routing

import (
	"github.com/pocketbase/pocketbase/core"
	"github.com/pocketbase/pocketbase/tools/template"
)

type PageRenderer struct {
	Registry *template.Registry
	Event    *core.ServeEvent
}
