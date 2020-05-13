package ch.ifocusit.mob.timer.api

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.web.reactive.config.EnableWebFlux
import org.springframework.data.mongodb.repository.config.EnableReactiveMongoRepositories

@SpringBootApplication
@EnableWebFlux
@EnableReactiveMongoRepositories
class MobTimerApiApplication

fun main(args: Array<String>) {
	runApplication<MobTimerApiApplication>(*args)
}
