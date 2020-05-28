package ch.ifocusit.mob.timer.api.domain.repository

import ch.ifocusit.mob.timer.api.domain.model.Mob
import org.springframework.data.mongodb.repository.ReactiveMongoRepository
import org.springframework.data.mongodb.repository.Tailable
import org.springframework.stereotype.Repository
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono

@Repository
interface MobRepository : ReactiveMongoRepository<Mob, String> {
    @Tailable
    fun findLastByName(name: String): Mono<Mob>
    // fun findFirstByNameOrderByCreationDateDesc(name: String): Mono<Mob>

    @Tailable
    fun findWithTailableCursorBy(): Flux<Mob>
}