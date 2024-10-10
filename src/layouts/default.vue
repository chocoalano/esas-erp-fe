<script setup>
import { onMounted } from 'vue';
import AppFooter from '@/layouts/components/AppFooter.vue';
import Drawer from './components/Drawer.vue';
import AppHeader from './components/AppHeader.vue';

import { useAuthStore } from '@/stores/apps/auth';

// Inisialisasi store
const { permission, profile } = useAuthStore();

// Fetch profile jika permission null
onMounted(async () => {
  if (!permission) {
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
