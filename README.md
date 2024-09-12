# Welcome to the Otterkin MVP

To build and run the docker image do:

`docker build -t otterkin-web .`

and then do:

```
docker run -p 8080:8080 --rm -v $(pwd):/app -v /app/tmp --name
otterkin-web-air otterkin-web
```

In truth I don't understand realllly what they do - I just followed the
instructions at (here)[https://www.youtube.com/watch?v=Lnfzrus7G5s] to
get the nice hot-reloading from air.
