# prod
build/templ:
	templ generate

build/esbuild:
	esbuild assets/css/app.css assets/js/index.js \
	--entry-names=[name] --outdir=assets/built/prod --bundle --minify \
	"--external:/images/*" \

build/server:
	go build

build:
	make build/templ build/esbuild build/server

prod-build:
	docker build --target prod-stage -t ghcr.io/jedsonofnel/otterkin-web:prod .

dev-build:
	docker build --target prod-stage -t ghcr.io/jedsonofnel/otterkin-web:dev .

# live reload
live-build:
	docker build --target dev-stage -t otterkin-web-dev .

live:
	docker run -p 8080:8080 --rm -it --name otterkin-web-dev-live \
	-v $(shell pwd):/app -v otterkin-web-tmp:/app/tmp -v otterkin-web-dev-db:/app/tmp/pb_data \
	otterkin-web-dev
 
live/templ:
	templ generate --watch --proxy="http://0.0.0.0:8080" --open-browser=false -v

live/esbuild:
	esbuild assets/css/app.css assets/js/index.js --entry-names=[name] \
	--outdir=assets/built/dev --bundle --sourcemap \
	"--external:/images/*" \
	--watch </dev/zero \

live/server:
	air \
	--tmp_dir "tmp" \
	--build.bin "tmp/main" \
	--build.full_bin "APP_ENV=dev tmp/main" \
	--build.args_bin "serve,--http=0.0.0.0:8080"  \
  --build.cmd "go build -o tmp/main ." \
	--build.delay "100" \
  --build.exclude_dir "node_modules" \
  --build.include_ext "go" \
  --build.stop_on_error "false" \
  --misc.clean_on_exit = false \

live-run:
	make -j live/templ live/esbuild live/server
