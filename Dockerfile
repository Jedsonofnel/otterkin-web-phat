# Get node dependencies out the way
FROM node:22-alpine AS node-stage
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install

# now install all the go stuff
FROM golang:1.23-alpine AS base-stage
ENV TERM=xterm-256color
COPY --from=node-stage /app /app
WORKDIR /app
RUN apk add --no-cache ca-certificates make
COPY go.* ./
RUN go mod download
RUN go install github.com/a-h/templ/cmd/templ@latest
COPY . .

# dev
FROM base-stage AS dev-stage
COPY --from=base-stage /app /app
WORKDIR /app
EXPOSE 8080
CMD ["make","live"]

# prod (ish)
# esbuild minify for production
# build binary to have everything fully embedded
# this is done by setting APP_ENV to prod
FROM base-stage AS prod-build-stage
