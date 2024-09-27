package layout

import (
	"fmt"

	"github.com/a-h/templ"
)

// for safe urls
func ToUrl(fstring string, a ...any) templ.SafeURL {
	return templ.URL(fmt.Sprintf(fstring, a...))
}

func ToString(fstring string, a ...any) string {
	return string(ToUrl(fstring, a...))
}
