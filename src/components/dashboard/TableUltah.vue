<script setup>
import { useDashboardStore } from '@/stores/dashboard';
import globalMixin from '@/mixins/globalMixin'
import avatar from '@/assets/avatar.png'

const store = useDashboardStore();
const ultah = computed(() => store.ultah);
const { baseFileUrl } = globalMixin.methods;
const dateYMD = (str) => {
  const dateObj = new Date(str)
  return dateObj.toISOString().split('T')[0]
};
const stringLimiter = (str, limit, suffix = '...') => {
  if (str.length <= limit) {
    return str;
  }
  return str.slice(0, limit) + suffix;
};
</script>
<template>
  <v-card flat v-if="ultah.length > 0">
    <v-card-text>
      <p class="text-h4 font-weight-bold">
        Selamat Ulang tahun untuk rekan-rekan semua
      </p>
      <div>Informasi untuk teman-teman yang berulang tahun dibulan ini</div>
    </v-card-text>
    <v-data-iterator :items="ultah" :items-per-page="6">
      <template v-slot:default="{ items }">
        <v-card-text>
          <v-row dense>
            <v-col v-for="item in items" :key="item.id" cols="auto" md="4">
              <v-card class="pb-3" border flat>
                <v-img :src="item.raw.image ? `${baseFileUrl()}/${item.raw.image}` : avatar" max-height="80"></v-img>

                <v-list-item :subtitle="item.raw.nik" class="mb-2">
                  <template v-slot:title>
                    <strong class="text-h6 mb-2">{{ item.raw.name }}</strong>
                  </template>
                </v-list-item>

                <div class="d-flex justify-space-between px-4">
                  <div class="d-flex align-center text-caption text-medium-emphasis me-1">
                    <v-icon icon="mdi-cake-layered" start></v-icon>
                    <div class="text-truncate font-weight-bold">{{ dateYMD(item.raw.datebirth) }}</div>
                  </div>
                </div>
                <div class="d-flex justify-space-between px-4">
                  <v-chip variant="outlined" class="ma-2" color="primary" label>
                    <v-icon icon="mdi-lightbulb-group" start></v-icon>
                    {{ item.raw.employe.org.name }}
                  </v-chip>
                  <v-chip variant="outlined" class="ma-2" color="primary" label>
                    <v-icon icon="mdi-information-outline" start></v-icon>
                    {{ stringLimiter(item.raw.employe.job.name, 15) }}
                  </v-chip>
                </div>
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>
      </template>

      <template v-slot:footer="{ page, pageCount, prevPage, nextPage }">
        <v-card-actions>
          <v-spacer></v-spacer>
          <div class="d-flex align-center justify-center pa-4">
            <v-btn :disabled="page === 1" density="comfortable" icon="mdi-arrow-left" variant="tonal" rounded
              @click="prevPage"></v-btn>
            <div class="mx-2 text-caption">
              Page {{ page }} of {{ pageCount }}
            </div>
            <v-btn :disabled="page >= pageCount" density="comfortable" icon="mdi-arrow-right" variant="tonal" rounded
              @click="nextPage"></v-btn>
          </div>
        </v-card-actions>
      </template>
    </v-data-iterator>
  </v-card>
</template>
