up:
	docker-compose up --build -d
	make logs

down:
	docker-compose down --remove-orphans

logs:
	docker-compose logs -f

re:
	make down
	make up

mongo:
	docker-compose up -d mongo mongo-express
