<script setup>
import { useAuthStore } from '@/stores/apps/auth';
import { ref, computed } from 'vue';

// Inisialisasi store
const store = useAuthStore();
const errors = computed(() => store.errors);
const form = computed(() => store.form.emergency_contacts);
const hubungan = [
  { id: 'wife', name: 'Istri' },
  { id: 'husband', name: 'Suami' },
  { id: 'mother', name: 'Ibu' },
  { id: 'father', name: 'Ayah' },
  { id: 'brother', name: 'Saudara Laki-laki' },
  { id: 'sister', name: 'Saudara perempuan' },
  { id: 'child', name: 'Anak' },
];
const submitKontak = () => {
  store.submitProfile({ kontak_darurat: form.value })
}
</script>

<template>
  <v-card flat>
    <v-toolbar color="surface">
      <v-toolbar-title>Data Kontak Darurat</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="store.addEC" variant="tonal" class="mr-5">Tambah</v-btn>
    </v-toolbar>
    <v-card-text>
      <v-alert border="start" color="error" title="Terjadi kesalahan" variant="tonal" v-if="errors.length > 0">{{ errors }}</v-alert>
      <v-card class="mx-auto mt-3" v-for="(state, index) in form" :key="index" variant="outlined">
        <v-list-item>
          <template v-slot:title> Form kontak darurat No. {{ index + 1 }} </template>
          <template v-slot:append>
            <v-btn class="text-none" color="error" text="Hapus" variant="text" slim @click="store.delEC(index)"></v-btn>
          </template>
        </v-list-item>
        <v-card-text>
          <v-row>
            <v-col cols="12" md="6" sm="12">
              <v-text-field v-model="state.name" placeholder="Nama" density="compact" variant="outlined" />
            </v-col>
            <v-col cols="12" md="6" sm="12">
              <SelectField label="Hubungan" :items="hubungan" v-model="state.relationship" />
            </v-col>
            <v-col cols="12" md="6" sm="12">
              <v-text-field v-model="state.phone" placeholder="Telpon/HP" density="compact" variant="outlined" />
            </v-col>
            <v-col cols="12" md="6" sm="12">
              <v-text-field v-model="state.profession" placeholder="Profesi" density="compact" variant="outlined" />
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-card-text>
    <v-card-actions>
      <v-btn class="text-none mb-4" color="primary" size="x-large" variant="flat" block @click="submitKontak()">
        Simpan Kontak Darurat
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
