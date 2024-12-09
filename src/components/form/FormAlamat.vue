<script setup>
import { useAuthStore } from '@/stores/apps/auth';
import { ref, computed } from 'vue';
import SelectField from '@/components/form-input/SelectField.vue'

// Inisialisasi store
const store = useAuthStore();
const form = computed(() => store.form.address);
const errors = computed(() => store.errors);

const idOptions = ref([
  { id: 'ktp', name: 'KTP' },
  { id: 'passport', name: 'PASSPORT' }
]);

const submitAlamat = () => {
  store.submitProfile({ alamat: form.value })
}
</script>

<template>
  <v-card class="mx-auto" flat>
    <v-card-title>Data Alamat</v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <v-alert border="start" color="error" title="Terjadi kesalahan" variant="tonal" v-if="errors.length > 0">{{ errors }}</v-alert>
      <v-row>
        <v-col cols="12" md="6" sm="12">
          <SelectField label="ID Tipe" :items="idOptions" v-model="form.idtype" />
        </v-col>
        <v-col cols="12" md="6" sm="12">
          <v-text-field type="number" label="ID Number" density="compact" variant="outlined" v-model="form.idnumber" />
        </v-col>
        <v-col cols="12" md="6" sm="12">
          <v-switch color="primary" v-model="form.ispermanent" :label="`Permanen: ${form.ispermanent ? 'Ya' : 'Tidak'}`"
            hide-details inset />
        </v-col>

        <v-col cols="12" md="6" sm="12" v-if="!form.ispermanent">
          <v-date-input label="ID Expired" v-model="form.idexpired" density="compact" variant="outlined"/>
        </v-col>

        <v-col cols="12" :md="form.ispermanent ? 12 : 6" sm="12">
          <v-text-field type="number" label="Kode POS" density="compact" variant="outlined" v-model="form.postalcode" />
        </v-col>

        <v-col cols="12" md="12" sm="12">
          <v-textarea label="Alamat Sekarang" variant="outlined" v-model="form.citizenIdAddress" />
        </v-col>

        <v-col cols="12" md="12" sm="12">
          <v-switch color="primary" v-model="form.useAsResidential"
            :label="`Gunakan alamat sekarang untuk alamat tinggal: ${form.useAsResidential}`" hide-details inset />
        </v-col>

        <v-col cols="12" md="12" sm="12">
          <v-textarea label="Alamat Tinggal" variant="outlined" v-model="form.residentialAddress" />
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-btn class="text-none mb-4" color="primary" size="x-large" variant="flat" block @click="submitAlamat()">
        Simpan Alamat
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
