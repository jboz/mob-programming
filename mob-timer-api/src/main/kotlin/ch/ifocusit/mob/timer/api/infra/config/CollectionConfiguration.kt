package ch.ifocusit.mob.timer.api.infra.config

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.annotation.Configuration
import org.springframework.data.mongodb.core.CollectionOptions
import org.springframework.data.mongodb.core.ReactiveMongoTemplate
import javax.annotation.PostConstruct

@Configuration
class CollectionConfiguration @Autowired constructor(private val reactiveMongoTemplate: ReactiveMongoTemplate) {

    @PostConstruct
    fun setUpCollection() {
        reactiveMongoTemplate.collectionExists("mob")
                .thenEmpty {
                    reactiveMongoTemplate
                            .createCollection("mob", CollectionOptions.empty()
                                    .capped()
                                    .size(2048)
                                    .maxDocuments(10000))
                }
                .subscribe()
    }
}
