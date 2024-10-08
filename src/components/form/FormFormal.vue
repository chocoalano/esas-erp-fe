<script setup>
import { useAuthStore } from '@/stores/apps/auth';
import { ref, computed } from 'vue';

// Inisialisasi store
const store = useAuthStore();
const form = computed(() => store.form.formal_education);
const errors = computed(() => store.errors);
const jenjang = [
  { id: 'sd', name: 'Sekolah Dasar' },
  { id: 'smp/sltp', name: 'SMP/SLTP' },
  { id: 'sma/slta', name: 'SMA/SLTA' },
  { id: 'd1', name: 'D1' },
  { id: 'd2', name: 'D2' },
  { id: 'd3', name: 'D3' },
  { id: 's1', name: 'S1' },
  { id: 's2', name: 'S2' },
  { id: 's3', name: 'S3' },
];
const submitFormal = () => {
  store.submitProfile({ formal_education: form.value })
}
</script>

<template>
  <v-card flat>
    <v-toolbar color="surface">
      <v-toolbar-title>Data Pendidikan Formal</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="store.addFE" variant="tonal" class="mr-5">Tambah</v-btn>
    </v-toolbar>
    <v-card-text>
      <v-alert border="start" color="error" title="Terjadi kesalahan" variant="tonal" v-if="errors.length > 0">{{ errors }}</v-alert>
      <v-card class="mx-auto mt-3" v-for="(state, index) in form" :key="index" variant="outlined">
        <v-list-item>
          <template v-slot:title> Form pendidikan No. {{ index + 1 }} </template>
          <template v-slot:append>
            <v-btn class="text-none" color="error" text="Hapus" variant="text" slim @click="store.delFE(index)"></v-btn>
          </template>
        </v-list-item>
        <v-card-text>
          <v-row>
            <v-col cols="12" md="3" sm="12">
              <v-text-field v-model="state.institution" placeholder="Instansi" density="compact" variant="outlined"
                rounded="0" />
            </v-col>
            <v-col cols="12" md="3" sm="12">
              <SelectField label="Jenjang" :items="jenjang" v-model="state.majors" />
            </v-col>
            <v-col cols="12" md="3" sm="12">
              <v-text-field v-model="state.score" type="number" placeholder="Skor" density="compact" variant="outlined" rounded="0" />
            </v-col>
            <v-col cols="12" md="3" sm="12">
              <DatePickerField label="Tgl. Dimulai" v-model="state.start" />
            </v-col>
            <v-col cols="12" md="3" sm="12">
              <DatePickerField label="Tgl. Berakhir" v-model="state.finish" />
            </v-col>
            <v-col cols="12" md="6" sm="12">
              <v-text-field v-model="state.description" placeholder="Keterangan" density="compact" variant="outlined"
                rounded="0" />
            </v-col>
            <v-col cols="12" md="3" sm="12">
              <v-switch color="primary" v-model="form.certification"
                :label="`Sertifikasi: ${form.certification}`" hide-details inset />
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-card-text>
    <v-card-actions>
      <v-btn class="text-none mb-4" color="primary" size="x-large" variant="flat" block @click="submitFormal()">
        Simpan Pendidikan Formal
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
