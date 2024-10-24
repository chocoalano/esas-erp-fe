<script setup>
import { useUsersStore } from '@/stores/apps/master-data/users';
import { ref, computed } from 'vue';

// Inisialisasi store
const store = useUsersStore();
const roleOptions = computed(() => store.roleOptions);
const errors = computed(() => store.errors);
const avatar = computed(() => store.avatar);

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
  { id: 'islam', name: 'Islam' },
  { id: 'protestant', name: 'Protestant' },
  { id: 'catholic', name: 'Catholic' },
  { id: 'hindu', name: 'Hindu' },
  { id: 'buddha', name: 'Buddha' },
  { id: 'khonghucu', name: 'Khonghucu' },
]);
</script>

<template>
  <v-card class="mx-auto" flat>
    <v-card-title>
      User akun
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <v-row>
        <v-col cols="12" md="6" sm="12">
          <v-text-field label="Nama" variant="outlined" density="compact" v-model="store.form.user.name"
            :error-messages="errInput(errors.value,'user.name')" />
        </v-col>
        <v-col cols="12" md="6" sm="12">
          <v-text-field label="NIK" variant="outlined" density="compact" v-model="store.form.user.nik"
            :error-messages="errInput(errors.value,'user.nik')" />
        </v-col>
        <v-col cols="12" md="6" sm="12">
          <v-text-field label="Email" variant="outlined" density="compact" v-model="store.form.user.email"
            :error-messages="errInput(errors.value,'user.email')" />
        </v-col>
        <v-col cols="12" md="6" sm="12"
          v-if="hasPermissions('user-create') || hasRole('Developer') || hasRole('Administrator')">
          <SelectField label="Roles" :items="roleOptions" v-model="store.form.user.role" multiple
            :error-messages="errInput(errors.value,'user.role')" />
        </v-col>
        <v-col cols="12" md="6" sm="12">
          <v-text-field label="Telpon/HP" variant="outlined" density="compact" v-model="store.form.user.phone"
            :error-messages="errInput(errors.value,'user.phone')" />
        </v-col>
        <v-col cols="12" md="6" sm="12">
          <v-text-field label="Tempat lahir" variant="outlined" density="compact" v-model="store.form.user.placebirth"
            :error-messages="errInput(errors.value,'user.placebirth')" />
        </v-col>
        <v-col cols="12" md="6" sm="12">
          <DatePickerField label="Tanggal lahir" v-model="store.form.user.datebirth" :err="errInput(errors.value,'user.datebirth')" />
        </v-col>
        <v-col cols="12" md="6" sm="12">
          <SelectField label="Jenis Kelamin" :items="jenis_kelamin" v-model="store.form.user.gender"
            :error-messages="errInput(errors.value,'user.gender')" />
        </v-col>
        <v-col cols="12" md="6" sm="12">
          <SelectField label="Gol Darah" :items="gol_darah" v-model="store.form.user.blood"
            :error-messages="errInput(errors.value,'user.blood')" />
        </v-col>
        <v-col cols="12" md="6" sm="12">
          <SelectField label="Status Pernikahan" :items="status_pernikahan" v-model="store.form.user.maritalStatus"
            :error-messages="errInput(errors.value,'user.maritalStatus')" />
        </v-col>
        <v-col cols="12" md="6" sm="12">
          <SelectField label="Agama" :items="agama" v-model="store.form.user.religion"
            :error-messages="errInput(errors.value,'user.religion')" />
        </v-col>
        <v-col cols="12" md="6" sm="12">
          <v-file-input variant="outlined" density="compact" label="Foto" v-model="store.form.user.image"
            :error-messages="errInput(errors.value,'user.image')"></v-file-input>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions v-if="avatar !== ''">
      <v-img class="mx-auto" height="300" :lazy-src="avatar" max-width="500"
        :src="avatar">
        <template v-slot:placeholder>
          <div class="d-flex align-center justify-center fill-height">
            <v-progress-circular color="grey-lighten-4" indeterminate></v-progress-circular>
          </div>
        </template>
      </v-img>
    </v-card-actions>
  </v-card>
</template>
