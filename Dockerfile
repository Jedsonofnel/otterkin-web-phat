# now install all the go stuff
FROM golang:1.23-alpine AS base-stage
ENV TERM=xterm-256color
WORKDIR /app
RUN go install github.com/air-verse/air@latest
RUN apk add --no-cache ca-certificates make
COPY go.* ./
RUN go mod download
RUN go install github.com/a-h/templ/cmd/templ@latest
RUN go install github.com/evanw/esbuild/cmd/esbuild@latest
COPY . .

# dev
FROM base-stage AS dev-stage
COPY --from=base-stage /app /app
WORKDIR /app
EXPOSE 8080
CMD ["make","live-run"]

# building binary for prod
FROM base-stage AS prod-build-stage
COPY --from=base-stage /app /app
WORKDIR /app
RUN make build

# basic binary container
FROM scratch AS prod-stage
COPY --from=prod-build-stage /app/otterkin-web /
EXPOSE 8090
ENV APP_ENV=prod
ENTRYPOINT ["/otterkin-web"]
CMD ["serve", "--http=0.0.0.0:8090"]
