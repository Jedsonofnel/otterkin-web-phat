# Otterkin Web App Repo

Basically I'm trying to recreate rails in golang - love how you can
bundle all your static files and have the entire web app as one
executable + a sqlite file.  Trying to stick (medium ruthlessly) to MVC
for a comfy separation of concerns.

## What is the stack?

I call it the PHaT stack, standing for Pocketbase, HTMX, and Templ.  Why
have I picked each of these:
- Pocketbase:  Is just a nice wrapper around sqlite, used it to very
  quickly bootstrap some authentication and a nice little admin webui
  for validating database things.  Long term vision is to remove it as a
  dependency but will probs be in a while.
- HTMX: Allows you to build fairly "native" feeling web apps (ie limited
  full page reloads) in the same way that React does but without any
  disgusting javascript.  Big fan.
- Templ: Type safe templating, far more ergonomic than golang's standard
  library templating option.

Other key philosophies are rsjs for reusable and understandable
javascript, MVC for nice decoupling of code (this will allows us to get
rid of pocketbase at some point - we can just rewrite some of the model
bindings and refactor only part of the code without affecting anything
else) and trying to avoid magic as much as possible.

## Future additions
- Remove pocketbase.  This is a long term goal and would require me to
  roll my own email verification, JWT/auth stuff and data validation.
  Bit of a faff so to enable me to move quickly I'm keeping it for the
  time being
- Building a rails 8 (propshaft) -esque asset pipeline using hashing for
  cache-busting and leveraging HTTP2's ability to make non-bundled
  javacript very usable.  My vision is to use an import map/manifest
  thing for javascript, using es6 modules, and then manually replacing
  all the import strings in css files.  Currently we are using a
  slightly hacky esbuild implementation that relies on it being
  installed inside the docker container (for building) which I don't
  love.  This is a fun weekend project but not super crucial for the
  time being .

## How do I build and deploy? For local development, you can run

``` make live-build ```

which builds the docker container for the live dev environment, followed
by 

``` make live ```

to run the docker container.  This is based heavily on air/templ watch
as well as `esbuild --watch`.  Due to pocketbase taking a while to
compile the dev experience is a bit of a pain as you have to wait ~5s
after every change so that's another reason to remove pocketbase as a
dependency.

For deployment to `dev` you run

``` make dev-build ```

which builds a from scratch docker image containing only the binary. You
then need to push this to the container registry using

``` docker push ghcr.io/jedsonofnel/otterkin-web:dev ```

which will only work if you are correctly authenticated!

The next step is to login to the VPS, `docker pull` the image and then
deploy using docker compose (which uses traefik as a reverse proxy).

It's a pretty involved process currently but as a result we can get a
really lean deployment that is just a binary and a sqlite file (plus a
filesystem for images).  Defo some scope for a CI/CD pipeline at some
point but that's really not important atm.
