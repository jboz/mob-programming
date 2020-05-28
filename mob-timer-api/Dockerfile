FROM openjdk:11-jdk-slim

EXPOSE 8080

ADD ./build/libs/mob-timer-api-*.jar /app.jar

ENTRYPOINT exec java $JAVA_OPTS -Xmx512m -Djava.security.egd=file:/dev/./urandom -jar /app.jar
