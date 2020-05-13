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

api:
	mob-timer-api/gradlew clean build && java -jar mob-timer-api/build/libs/mob-timer-api-0.0.1-SNAPSHOT.jar
