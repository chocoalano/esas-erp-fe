<template>
  <v-switch color="primary" v-model="internalValue" :label="label" hide-details
    inset :error-messages="err" />
</template>

<script setup>
import { defineProps, defineEmits, computed } from 'vue';

// Define props
const props = defineProps({
  label: {
    type: String,
    default: ''
  },
  modelValue: {
    type: Boolean,
    required: true,
  },
  err: {
    type: String,
    default: () => '',
  },
});

// Emit event for two-way data binding
const emit = defineEmits(['update:modelValue']);

// Internal value to manage v-model binding
const internalValue = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit('update:modelValue', value);
  },
});
</script>
