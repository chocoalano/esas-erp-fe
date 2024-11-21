<script setup>
import { useAuthStore } from '@/stores/apps/auth';
import { ref, computed } from 'vue';
import SelectField from '@/components/form-input/SelectField.vue'
import DatePickerField from '@/components/form-input/DatePickerField.vue'

// Inisialisasi store
const store = useAuthStore();
const form = computed(() => store.form.family);
const errors = computed(() => store.errors);

const hubungan = [
  { id: 'wife', name: 'Istri' },
  { id: 'husband', name: 'Suami' },
  { id: 'mother', name: 'Ibu' },
  { id: 'father', name: 'Ayah' },
  { id: 'brother', name: 'Saudara Laki-laki' },
  { id: 'sister', name: 'Saudara perempuan' },
  { id: 'child', name: 'Anak' },
];
const status_pernikahan = [
  { id: 'single', name: 'Lajang' },
  { id: 'marriade', name: 'Menikah' },
  { id: 'widow', name: 'Janda' },
  { id: 'widower', name: 'Duda' },
];
const submitFamily = () => {
  store.submitProfile({ families:form.value })
}
</script>

<template>
  <v-card flat>
    <v-toolbar color="surface">
      <v-toolbar-title>Data Keluarga</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="store.addFamily" variant="tonal" class="mr-5">Tambah</v-btn>
    </v-toolbar>
    <v-card-text>
      <v-alert border="start" color="error" title="Terjadi kesalahan" variant="tonal" v-if="errors.length > 0">{{ errors }}</v-alert>
      <v-card class="mx-auto mt-3" v-for="(state, index) in form" :key="index" variant="outlined">
        <v-list-item>
          <template v-slot:title> Form keluarga No. {{ index + 1 }} </template>
          <template v-slot:append>
            <v-btn class="text-none" color="error" text="Hapus" variant="text" slim
              @click="store.delFamily(index)"></v-btn>
          </template>
        </v-list-item>
        <v-card-text>
          <v-row>
            <v-col cols="12" md="4" sm="12">
              <v-text-field v-model="state.fullname" placeholder="Nama" density="compact" variant="outlined" />
            </v-col>
            <v-col cols="12" md="4" sm="12">
              <SelectField label="Hubungan" :items="hubungan" v-model="state.relationship" />
            </v-col>
            <v-col cols="12" md="4" sm="12">
              <DatePickerField label="Tgl. Lahir" v-model="state.birthdate" />
            </v-col>
            <v-col cols="12" md="6" sm="12">
              <SelectField label="Status Pernikahan" :items="status_pernikahan" v-model="state.marital_status" />
            </v-col>
            <v-col cols="12" md="6" sm="12">
              <v-text-field v-model="state.job" placeholder="Profesi" density="compact" variant="outlined" />
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-card-text>
    <v-card-actions>
      <v-btn class="text-none mb-4" color="primary" size="x-large" variant="flat" block @click="submitFamily()">
        Simpan Keluarga
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
