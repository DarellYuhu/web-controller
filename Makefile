build:
	docker build -t darellyuhu/web-controller:latest .

push:
	docker image push darellyuhu/web-controller:latest
