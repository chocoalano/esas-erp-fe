<script setup>
import { useDashboardStore } from '@/stores/dashboard'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router';

const store = useDashboardStore();
const router = useRouter();
const cards = computed(() => store.cards);
onMounted(() => {
  store.fetchAbsenTelat()
})

onMounted(() => {
  store.fetchGrid()
})

const movepage = (routename) => {
  router.push({ name: routename })
}
</script>
<template>
  <v-row>
    <v-col cols="12" sm="12" md="3" v-for="item in cards" :key="item.title">
      <v-card class="mx-auto" :subtitle="item.subtitle" :title="item.title" flat :color="item.color" hover
        @click="movepage(item.name_route)">
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
