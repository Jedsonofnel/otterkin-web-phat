dev-build:
	docker build -t otterkin-web .

dev:
	docker run -p 8080:8080 --rm -it --name otterkin-web-dev \
	-v $(shell pwd):/app -v otterkin-web-tmp:/app/tmp -v otterkin-web-dev-db:/app/tmp/pb_data \
	otterkin-web
 
live/templ:
	templ generate --watch --proxy="http://0.0.0.0:8080" --open-browser=false -v

live/esbuild:
	./node_modules/esbuild/bin/esbuild view/css/app.css view/js/index.js --entry-names=[name] \
	--outdir=static/build --bundle --sourcemap --watch </dev/zero \

live/server:
	go run github.com/cosmtrek/air@v1.51.0 \
	--tmp_dir "tmp" \
	--build.bin "tmp/main" \
	--build.full_bin "APP_END=dev tmp/main" \
	--build.args_bin "serve,--http=0.0.0.0:8080"  \
  --build.cmd "go build -o tmp/main ." \
	--build.delay "100" \
  --build.exclude_dir "node_modules" \
  --build.include_ext "go" \
  --build.stop_on_error "false" \
  --misc.clean_on_exit = false \

live:
	make -j live/esbuild live/templ live/server
