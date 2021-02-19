<template>
  <v-card>
    <v-card-title>
      {{ task.title }}
    </v-card-title>
    <v-card-text>
      {{ task.description }}
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

const TaskProps = Vue.extend({
  props: {
    task: Object,
  },
})

@Component
export default class TaskCard extends TaskProps {}
</script>

<style></style>
