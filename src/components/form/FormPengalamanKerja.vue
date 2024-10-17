<script setup>
import { useAuthStore } from '@/stores/apps/auth';
import { computed } from 'vue';

// Inisialisasi store
const store = useAuthStore();
const form = computed(() => store.form.work_experience);
const errors = computed(() => store.errors);
const submitWE = () => {
  store.submitProfile({ work_experiences: form.value })
}
</script>

<template>
  <v-card flat>
    <v-toolbar color="surface">
      <v-toolbar-title>Data Pengalaman Kerja</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="store.addWE" variant="tonal" class="mr-5">Tambah</v-btn>
    </v-toolbar>
    <v-card-text>
      <v-alert border="start" color="error" title="Terjadi kesalahan" variant="tonal" v-if="errors.length > 0">{{ errors }}</v-alert>
      <v-card class="mx-auto mt-3" v-for="(state, index) in form" :key="index" variant="outlined">
        <v-list-item>
          <template v-slot:title> Form pengalaman kerja No. {{ index + 1 }} </template>
          <template v-slot:append>
            <v-btn class="text-none" color="error" text="Hapus" variant="text" slim @click="store.delWE(index)"></v-btn>
          </template>
        </v-list-item>
        <v-card-text>
          <v-row>
            <v-col cols="12" md="6" sm="12">
              <v-text-field v-model="state.company" placeholder="Instansi" density="compact" variant="outlined" />
            </v-col>
            <v-col cols="12" md="6" sm="12">
              <v-text-field v-model="state.position" placeholder="Sebagai ?" density="compact" variant="outlined" />
            </v-col>
            <v-col cols="12" md="3" sm="12">
              <DatePickerField label="Tgl. Mulai" v-model="state.from" />
            </v-col>
            <v-col cols="12" md="3" sm="12">
              <DatePickerField label="Tgl. Selesai" v-model="state.to" />
            </v-col>
            <v-col cols="12" md="6" sm="12">
              <v-text-field type="number" v-model="state.length_of_service" placeholder="Lama dalam satuan angka" density="compact" variant="outlined" />
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-card-text>
    <v-card-actions>
      <v-btn class="text-none mb-4" color="primary" size="x-large" variant="flat" block @click="submitWE()">
        Simpan Pengalaman Kerja
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
