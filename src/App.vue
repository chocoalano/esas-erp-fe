<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
import { useAuthStore } from '@/stores/apps/auth'
import { onMounted } from 'vue'
const store = useAuthStore()

// Menggunakan onMounted untuk menjalankan kode setelah komponen dimuat
onMounted(async () => {
  if (store.isAuthenticated) {
    await store.profile()
  }
})
</script>
