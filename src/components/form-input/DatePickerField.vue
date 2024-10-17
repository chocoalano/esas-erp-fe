<script setup>
import { ref } from 'vue'
import { DateTime } from 'luxon'

const props = defineProps({
  label: String,
  modelValue: String,
  err: String | null,
})

const emit = defineEmits(['update:modelValue'])

const date = ref(null)

watch(date, (newDate) => {
  if (newDate) {
    const formattedDate = DateTime.fromJSDate(new Date(newDate)).toFormat('yyyy-MM-dd')
    emit('update:modelValue', formattedDate)
  }
})
</script>

<template>
  <v-menu>
    <template v-slot:activator="{ props }">
      <v-text-field
        v-bind="props"
        :label="label"
        density="compact"
        variant="outlined"
        readonly
        :model-value="modelValue"
        :error-messages="err"
      />
    </template>
    <v-date-picker color="primary" v-model="date" />
  </v-menu>
</template>
