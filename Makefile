live/templ:
	templ generate --watch --proxy="http://localhost:8080" --open-browser=false -v

live/esbuild:
	esbuild views/css/app.css views/js/index.js --entry-names=[name] \
	--outdir=static/build --bundle --sourcemap --watch </dev/zero \

live/server:
	go run github.com/cosmtrek/air@v1.51.0 \
	--tmp_dir "tmp" \
	--build.bin "tmp/bin/main" \
	--build.full_bin "APP_END=dev tmp/bin/main" \
	--build.args_bin "serve,--http=localhost:8090"  \
  --build.cmd "go build -o tmp/bin/main ." \
	--build.delay "100" \
  --build.exclude_dir "node_modules" \
  --build.include_ext "go" \
  --build.stop_on_error "false" \
  --misc.clean_on_exit = true \

live:
	make -j live/esbuild live/templ live/server
