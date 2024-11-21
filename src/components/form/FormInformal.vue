<script setup>
import { useAuthStore } from '@/stores/apps/auth';
import { ref, computed } from 'vue';
import SelectField from '@/components/form-input/SelectField.vue'
import DatePickerField from '@/components/form-input/DatePickerField.vue'
import Switch from '../form-input/Switch.vue';

// Inisialisasi store
const store = useAuthStore();
const errors = computed(() => store.errors);
const form = computed(() => store.form.informal_education);

const jenis = ref([
  { id: 'day', name: 'Hari' },
  { id: 'month', name: 'Bulan' },
  { id: 'year', name: 'Tahun' },
])
const submitInformal = () => {
  store.submitProfile({ informal_education: form.value })
}
</script>

<template>
  <v-card flat>
    <v-toolbar color="surface">
      <v-toolbar-title>Data Pendidikan Informal</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="store.addIFE" variant="tonal" class="mr-5">Tambah</v-btn>
    </v-toolbar>
    <v-card-text>
      <v-alert border="start" color="error" title="Terjadi kesalahan" variant="tonal" v-if="errors.length > 0">{{ errors }}</v-alert>
      <v-card class="mx-auto mt-3" v-for="(state, index) in form" :key="index" variant="outlined">
        <v-list-item>
          <template v-slot:title> Form pendidikan informal No. {{ index + 1 }} </template>
          <template v-slot:append>
            <v-btn class="text-none" color="error" text="Hapus" variant="text" slim @click="store.delIFE(index)"></v-btn>
          </template>
        </v-list-item>
        <v-card-text>
          <v-row no-gutters>
            <v-col cols="12" md="3" sm="12">
              <v-text-field v-model="state.name" placeholder="Instansi" density="compact" variant="outlined" rounded="0"/>
            </v-col>
            <v-col cols="12" md="3" sm="12">
              <DatePickerField label="Tgl. Mulai" v-model="state.start" rounded="0"/>
            </v-col>
            <v-col cols="12" md="3" sm="12">
              <DatePickerField label="Tgl. Selesai" v-model="state.finish" rounded="0"/>
            </v-col>
            <v-col cols="12" md="3" sm="12">
              <DatePickerField label="Masa Berlaku" v-model="state.expired" rounded="0"/>
            </v-col>
            <v-col cols="12" md="3" sm="12">
              <SelectField label="Jenis" :items="jenis" v-model="state.type" rounded="0"/>
            </v-col>
            <v-col cols="12" md="3" sm="12">
              <v-text-field type="number" v-model="state.duration" placeholder="Durasi" density="compact"
                variant="outlined" rounded="0"/>
            </v-col>
            <v-col cols="12" md="3" sm="12">
              <v-text-field type="number" v-model="state.fee" placeholder="Biaya" density="compact"
                variant="outlined" rounded="0"/>
            </v-col>
            <v-col cols="12" md="3" sm="12">
              <v-text-field v-model="state.description" placeholder="Keterangan" density="compact" variant="outlined" rounded="0"/>
            </v-col>
            <v-col cols="12" md="3" sm="12">
              <Switch label="Sertifikasi" v-model="state.certification" />
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-card-text>
    <v-card-actions>
      <v-btn class="text-none mb-4" color="primary" size="x-large" variant="flat" block @click="submitInformal()">
        Simpan Pendidikan Informal
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
