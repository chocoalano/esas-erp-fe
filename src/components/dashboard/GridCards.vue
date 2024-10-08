<script setup>
import { useDashboardStore } from '@/stores/dashboard'
import { onMounted } from 'vue'

const store = useDashboardStore();
const cards = computed(() => store.cards);
onMounted(() => {
  store.fetchAbsenTelat()
})

onMounted(() => {
  store.fetchGrid()
})
</script>
<template>
  <v-row>
    <v-col cols="12" sm="12" md="3" v-for="item in cards" :key="item.title">
      <v-card class="mx-auto" :subtitle="item.subtitle" :title="item.title" flat :color="item.color" hover to="/">
        <template v-slot:prepend>
          <v-avatar :color="item.color_circle">
            <v-icon :icon="item.icon"></v-icon>
          </v-avatar>
        </template>
        <v-card-text>Total data {{ item.value }}</v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
