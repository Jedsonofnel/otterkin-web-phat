live/templ:
	templ generate --watch --proxy="http://localhost:8080" --open-browser=false -v

live/esbuild:
	esbuild views/css/app.css views/js/index.js --entry-names=[name] \
	--outdir=static/build --bundle --sourcemap --watch </dev/zero \

live:
	make -j live/esbuild live/templ
