<template>
  <form_login />
</template>

<script setup>
import form_login from '@/components/form/form_login.vue';
import { useAuthStore } from '@/stores/apps/auth'
import { useRouter } from 'vue-router';
import { onMounted } from 'vue'

const router = useRouter()
const store = useAuthStore()
// Menggunakan onMounted untuk menjalankan kode setelah komponen dimuat
onMounted(async () => {
  if (store.isAuthenticated) {
    router.push({ path: 'dashboard' })
  }
})
</script>
