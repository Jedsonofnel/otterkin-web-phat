package view

import (
	"fmt"

	"github.com/a-h/templ"
)

func toUrl(fstring string, a ...any) templ.SafeURL {
	return templ.URL(fmt.Sprintf(fstring, a...))
}

func toString(fstring string, a ...any) string {
	return string(toUrl(fstring, a...))
}
