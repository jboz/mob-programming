package ch.ifocusit.mob.timer.api.app

import ch.ifocusit.mob.timer.api.domain.model.Mob
import ch.ifocusit.mob.timer.api.domain.repository.MobRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.MediaType
import org.springframework.web.bind.annotation.*

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

    @PutMapping
    fun save(@RequestBody mob: Mob) = repository.save(mob)

    @GetMapping("/tail/{name}", produces = [MediaType.TEXT_EVENT_STREAM_VALUE])
    fun findByName(@PathVariable name: String) = repository.findByName(name)
}
