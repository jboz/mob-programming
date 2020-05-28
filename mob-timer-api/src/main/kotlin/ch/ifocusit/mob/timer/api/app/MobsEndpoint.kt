package ch.ifocusit.mob.timer.api.app

import ch.ifocusit.mob.timer.api.domain.model.Mob
import ch.ifocusit.mob.timer.api.domain.repository.MobRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.MediaType.TEXT_EVENT_STREAM_VALUE
import org.springframework.web.bind.annotation.*
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono

@RestController
@RequestMapping("/mob-programming/api/mobs")
class MobsEndpoint @Autowired constructor(private val repository: MobRepository) {

    @GetMapping
    fun findAll() = repository.findAll()

    @GetMapping("/{id}")
    fun findById(@PathVariable id: String) = repository.findById(id)

    @DeleteMapping("/{id}")
    fun deleteById(@PathVariable id: String) = repository.deleteById(id)

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    fun insert(@RequestBody mob: Mob) = repository.insert(mob)

    @PutMapping("/{id}")
    fun save(@PathVariable id: String, @RequestBody mob: Mob) = repository.deleteById(id).then(repository.insert(mob))

    @GetMapping("/tail", produces = [TEXT_EVENT_STREAM_VALUE])
    fun tailAll(): Flux<Mob> = repository.findWithTailableCursorBy()

    @GetMapping("/tail/{name}", produces = [TEXT_EVENT_STREAM_VALUE])
    fun findByName(@PathVariable name: String): Mono<Mob> = repository.findLastByName(name)
}
