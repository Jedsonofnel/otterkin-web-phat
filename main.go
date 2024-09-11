package main

import (
	"fmt"
	"net/http"
	"os"
	"text/template"
)

type Welcome struct {
	Message string
}

func main() {
	welcomeMessage := Welcome{Message: "Welcome to Otterkin"}

	// define a router
	router := http.NewServeMux()

	// handle func for the home page
	homeHandler := func(w http.ResponseWriter, r *http.Request) {
		// Parse the HTML template
		tmpl, err := template.ParseFiles("templates/index.html", "templates/layout.html")
		if err != nil {
			http.Error(w, "Internal server error!", http.StatusInternalServerError)
			return
		}

		// Execute the template
		err = tmpl.ExecuteTemplate(w, "layout", welcomeMessage)
		if err != nil {
			http.Error(w, "Internal server error!", http.StatusInternalServerError)
			return
		}
	}

	// handle func for the resources pages
	loginHandler := func(w http.ResponseWriter, r *http.Request) {
		// Parse the HTML template
		tmpl, err := template.ParseFiles("templates/login.html", "templates/layout.html")
		if err != nil {
			http.Error(w, "Internal server error!", http.StatusInternalServerError)
			return
		}

		err = tmpl.ExecuteTemplate(w, "layout", nil)
		if err != nil {
			http.Error(w, "Internal server error!", http.StatusInternalServerError)
			return
		}
	}

	// handle func for the resources pages
	signUpHandler := func(w http.ResponseWriter, r *http.Request) {
		// Parse the HTML template
		tmpl, err := template.ParseFiles("templates/sign-up.html", "templates/layout.html")
		if err != nil {
			http.Error(w, "Internal server error!", http.StatusInternalServerError)
			return
		}

		err = tmpl.ExecuteTemplate(w, "layout", nil)
		if err != nil {
			http.Error(w, "Internal server error!", http.StatusInternalServerError)
			return
		}
	}

	router.HandleFunc("GET /", homeHandler)
	router.HandleFunc("GET /login", loginHandler)
	router.HandleFunc("GET /sign-up", signUpHandler)

	// serve static files like css
	fs := http.FileServer(http.Dir("static"))
	router.Handle("GET /static/", http.StripPrefix("/static/", fs))

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	fmt.Printf("Starting the http server on %s\n", port)
	http.ListenAndServe(":"+port, router)
}
