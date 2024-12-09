<script setup>
import { useAuthStore } from '@/stores/apps/auth';
import { ref, computed } from 'vue';
import SelectField from '@/components/form-input/SelectField.vue'

// Inisialisasi store
const store = useAuthStore();
const user = computed(() => store.user);
const errors = computed(() => store.errors);
const form = computed(() => store.form.user);

// Definisi list pilihan
const jenis_kelamin = ref([
  { id: 'm', name: 'Laki-laki' },
  { id: 'w', name: 'Perempuan' },
]);

const gol_darah = ref([
  { id: 'a', name: 'A' },
  { id: 'b', name: 'B' },
  { id: 'o', name: 'O' },
  { id: 'ab', name: 'AB' },
]);

const status_pernikahan = ref([
  { id: 'single', name: 'Single' },
  { id: 'married', name: 'Married' },
  { id: 'widow', name: 'Widow' },
  { id: 'widower', name: 'Widower' },
]);

const agama = ref([
  { id: 'ISLAM', name: 'Islam' },
  { id: 'PROTESTAN', name: 'Protestant' },
  { id: 'KHATOLIK', name: 'Catholic' },
  { id: 'HINDU', name: 'Hindu' },
  { id: 'BUDHA', name: 'Buddha' },
  { id: 'KHONGHUCU', name: 'Khonghucu' },
]);

const submitDataDiri = () => {
  const formData = new FormData();
  formData.append('user[name]', form.value.name);
  formData.append('user[nik]', form.value.nik);
  formData.append('user[email]', form.value.email);
  formData.append('user[phone]', form.value.phone);
  formData.append('user[placebirth]', form.value.placebirth);
  formData.append('user[datebirth]', form.value.datebirth);
  formData.append('user[gender]', form.value.gender);
  formData.append('user[blood]', form.value.blood);
  formData.append('user[maritalStatus]', form.value.maritalStatus);
  formData.append('user[religion]', form.value.religion);
  formData.append('user[image]', form.value.image);
  store.submitProfile(formData)
}
</script>

<template>
  <v-card class="mx-auto" flat>
    <v-card-title>
      Data diri
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <v-alert border="start" color="error" title="Terjadi kesalahan" variant="tonal" v-if="errors.length > 0">{{ errors
        }}</v-alert>
      <v-row>
        <v-col cols="12" md="4" sm="12">
          <v-text-field label="Nama" variant="outlined" density="compact" v-model="form.name" />
        </v-col>
        <v-col cols="12" md="4" sm="12">
          <v-text-field label="NIK" variant="outlined" density="compact" v-model="form.nik" />
        </v-col>
        <v-col cols="12" md="4" sm="12">
          <v-text-field label="Email" variant="outlined" density="compact" v-model="form.email" />
        </v-col>
        <v-col cols="12" md="4" sm="12">
          <v-text-field label="Telpon/HP" variant="outlined" density="compact" v-model="form.phone" />
        </v-col>
        <v-col cols="12" md="4" sm="12">
          <v-text-field label="Tempat lahir" variant="outlined" density="compact" v-model="form.placebirth" />
        </v-col>
        <v-col cols="12" md="4" sm="12">
          <v-date-input variant="outlined" density="compact" label="Tanggal lahir" v-model="form.datebirth" />
        </v-col>
        <v-col cols="12" md="4" sm="12">
          <SelectField label="Jenis Kelamin" :items="jenis_kelamin" v-model="form.gender" />
        </v-col>
        <v-col cols="12" md="4" sm="12">
          <SelectField label="Gol Darah" :items="gol_darah" v-model="form.blood" />
        </v-col>
        <v-col cols="12" md="4" sm="12">
          <SelectField label="Status Pernikahan" :items="status_pernikahan" v-model="form.maritalStatus" />
        </v-col>
        <v-col cols="12" md="4" sm="12">
          <SelectField label="Agama" :items="agama" v-model="form.religion" />
        </v-col>
        <v-col cols="12" md="4" sm="12">
          <v-file-input variant="outlined" density="compact" label="Foto" v-model="form.image" />
        </v-col>
        <v-col cols="12" md="4" sm="12">
          <v-img class="mx-auto" height="300" :lazy-src="user.image" max-width="100" :src="user.image" max-height="100">
            <template v-slot:placeholder>
              <div class="d-flex align-center justify-center fill-height">
                <v-progress-circular color="grey-lighten-4" indeterminate></v-progress-circular>
              </div>
            </template>
          </v-img>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-btn class="text-none mb-4" color="primary" size="x-large" variant="flat" block @click="submitDataDiri()">
        Simpan Data Diri
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
