live/esbuild:
	esbuild views/css/app.css views/js/index.js --entry-names=[name] \
	--outdir=static/build --bundle --sourcemap --watch </dev/zero \

live:
	make -j live/esbuild
