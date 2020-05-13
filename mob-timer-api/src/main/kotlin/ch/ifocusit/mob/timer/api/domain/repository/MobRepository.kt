package ch.ifocusit.mob.timer.api.domain.repository

import ch.ifocusit.mob.timer.api.domain.model.Mob
import org.springframework.data.mongodb.repository.ReactiveMongoRepository
import org.springframework.stereotype.Repository
import org.springframework.data.mongodb.repository.Tailable
import reactor.core.publisher.Flux

@Repository
interface MobRepository : ReactiveMongoRepository<Mob, String> {
    
    @Tailable
    fun findWithTailableCursorBy(): Flux<Mob>


}