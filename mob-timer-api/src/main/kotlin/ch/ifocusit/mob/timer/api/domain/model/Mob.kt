package ch.ifocusit.mob.timer.api.domain.model

import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document
import java.time.LocalDateTime
import java.util.*

@Document
data class Mob(@Id val id: String? = UUID.randomUUID().toString(), val creationDate: LocalDateTime? = LocalDateTime.now(), val name: String, val duration: Double, val mobers: List<String> = listOf(), val round: Round?)

data class Round(val timerStartTimestamp: String?, val started: Boolean, val timerPauseTimestamp: String?, val currentMober: String?)