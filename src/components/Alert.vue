<script setup>
import { defineProps } from 'vue'

const { msg, type } = defineProps({
  msg: String,
  type: {
    type: String,
    default: 'info'
  }
})
</script>

<template>
  <v-alert border="start" :type="type" variant="outlined" density="compact" closable>{{ msg }}</v-alert>
</template>
