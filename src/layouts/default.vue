<script setup>
import AppFooter from '@/layouts/components/AppFooter.vue'
import Drawer from './components/Drawer.vue'
import AppHeader from './components/AppHeader.vue'
</script>
<template>
  <v-app>
    <Drawer></Drawer>
    <AppHeader></AppHeader>
    <v-main class="bg-background">
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
    <AppFooter />
  </v-app>
</template>
