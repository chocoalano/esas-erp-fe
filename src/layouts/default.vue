<script setup>
import { onMounted } from 'vue';
import AppFooter from '@/layouts/components/AppFooter.vue';
import Drawer from './components/Drawer.vue';
import AppHeader from './components/AppHeader.vue';

import { useAuthStore } from '@/stores/apps/auth';

// Inisialisasi store
const { permission, profile } = useAuthStore();
const permission_data = computed(() => permission);

// Fetch profile jika permission null
onMounted(async () => {
  if (permission_data.value.length < 1) {
    await profile();
  }
});
</script>

<template>
  <v-app>
    <Drawer />
    <AppHeader />
    <v-main class="bg-background">
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
    <AppFooter />
  </v-app>
</template>
