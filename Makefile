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
	# docker-compose up -d mongo mongo-express
	docker-compose -f docker-compose.replicatset.yml down --remove-orphans
	docker-compose -f docker-compose.replicatset.yml up -d
	docker-compose -f docker-compose.replicatset.yml logs -f
	#--scale mongodb-primary=1 --scale mongodb-secondary=3 --scale mongodb-arbiter=1

api:
	docker-compose up -d --build timer-api
#	mob-timer-api/gradlew clean build && java -jar mob-timer-api/build/libs/mob-timer-api-0.0.1-SNAPSHOT.jar
