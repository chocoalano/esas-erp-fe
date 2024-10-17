<script setup>

const props = defineProps({
  label: String,
  items: Array,
  modelValue: String | Number,
  err: String | null,
})

const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <v-select
    :items="items"
    item-title="name"
    item-value="id"
    density="compact"
    variant="outlined"
    :label="label"
    :model-value="modelValue"
    @update:modelValue="emit('update:modelValue', $event)"
    :error-messages="err"
  />
</template>
