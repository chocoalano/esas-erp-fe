<script setup>
import { useRouter } from 'vue-router';
import { useAppStore } from '@/stores/app';
import { useDashboardStore } from '@/stores/dashboard';
import globalMixin from '@/mixins/globalMixin'
import { onMounted } from 'vue';
const app = useAppStore()
const store = useDashboardStore()
const router = useRouter();
const { baseFileUrl } = globalMixin.methods;
const isDrawer = computed(() => app.isDrawer);
const list = computed(() => store.absenTerlambat.data);

const load = ({ done }) => {
  store.fetchAbsenTelat()
  done('ok')
};
onMounted(() => {
  store.fetchAbsenTelat()
})
const handleClick = () => {
  router.push({ name: 'absen' })
}
</script>

<template>
  <v-card class="mx-auto" flat>
    <template v-slot:title>
      <span class="font-weight-black">Daftar karyawan terlambat</span>
    </template>

    <div>
      <v-infinite-scroll class="mx=auto" :max-height="isDrawer ? 480 : 560" mode="manual" @load="load">
        <template v-for="(item, index) in list" :key="item.id">
          <div>
            <v-list>
              <v-list-item
                :prepend-avatar="item.user.image ? `${baseFileUrl()}/${item.user.image}` : 'https://cdn.vuetifyjs.com/images/parallax/material.jpg'"
                :subtitle="item.user.nik" :title="item.user.name">
                <div class="d-flex justify-space-between">
                  <div class="text-sm font-weight-bold">{{ item.date }}</div>
                  <div class="text-sm font-weight-bold">{{ item.timeIn }}</div>
                  <div class="text-capitalize text-sm font-weight-bold text-error">{{ item.statusIn === 'late' ?
                    'Terlambat' : 'Tidak terlambat' }}</div>
                </div>
                <template v-slot:append>
                  <v-btn icon="mdi-chevron-right" size="small" variant="text" @click="handleClick()"></v-btn>
                </template>
              </v-list-item>
            </v-list>
          </div>
        </template>
        <template v-slot:load-more="{ props }">
          <v-btn icon="mdi-refresh" size="large" variant="text" v-bind="props"></v-btn>
        </template>
        <template v-slot:empty>
          <v-alert type="warning">Tidak ada data lagi!</v-alert>
        </template>
        <template v-slot:error="{ props }">
          <v-alert type="error">
            <div class="d-flex justify-space-between align-center">
              Something went wrong...
              <v-btn color="white" size="small" variant="outlined" v-bind="props">
                Retry
              </v-btn>
            </div>
          </v-alert>
        </template>
      </v-infinite-scroll>
    </div>
  </v-card>
</template>
