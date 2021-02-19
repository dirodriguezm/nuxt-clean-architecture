<template>
  <v-row justify="center" align="center">
    <v-col v-if="serverError">
      <v-alert>Server Error: {{ serverError }}</v-alert>
    </v-col>
    <v-col v-if="clientError">
      <v-alert>Client Error: {{ clientError }}</v-alert>
    </v-col>
    <v-col v-if="parseError">
      <v-alert>Parse Error: {{ parseError }}</v-alert>
    </v-col>
    <v-col v-for="task in tasks" :key="task.title" cols="12" sm="8" md="6">
      <task-card :task="task" />
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { inject } from 'inversify-props'
import { Vue, Component } from 'nuxt-property-decorator'
import { Storage } from '@@/src/app/shared/storage/Storage'
import TaskCard from '@@/src/app/modules/task/ui'
import { isHttpError } from '@@/src/app/shared/http'
import { ParseError } from '@@/src/app/shared/error/ParseError'
@Component({
  components: { TaskCard },
})
export default class Home extends Vue {
  @inject() storage!: Storage
  private store = this.storage.getStores().taskStore

  async mounted() {
    await this.store.fetchTasks()
  }

  get tasks() {
    return this.store.taskList
  }

  get serverError() {
    const error = this.store.error
    if (!error) return null
    if (isHttpError(error)) {
      if (error.isServerError()) return error.message
    }
    return null
  }

  get clientError() {
    const error = this.store.error
    if (!error) return null
    if (isHttpError(error)) {
      if (error.isClientError()) return error.message
    }
    return null
  }

  get parseError() {
    const error = this.store.error
    if (!error) return null
    if (isHttpError(error)) return null
    if (error instanceof ParseError) {
      return error.message
    }
    return null
  }
}
</script>
