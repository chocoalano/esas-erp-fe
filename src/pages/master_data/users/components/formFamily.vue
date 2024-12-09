<script setup>
import { computed } from 'vue';
import { useUsersStore } from '@/stores/apps/master-data/users';
import SelectField from '@/components/form-input/SelectField.vue';

const store = useUsersStore();
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
const validate = (key)=>{
  if (errors.value.length > 0) {
    const error = errors.value.find(error => error.field === key);
    return error ? error.message : ''
  }
  return ''
}
</script>

<template>
  <v-card flat>
    <v-toolbar color="surface">
      <v-toolbar-title>Data Keluarga</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="store.addFamily" variant="tonal" class="mr-5">Tambah</v-btn>
    </v-toolbar>

    <v-table>
      <thead>
        <tr>
          <th>No</th>
          <th>Nama</th>
          <th>Hubungan</th>
          <th>Tanggal Lahir</th>
          <th>Status Pernikahan</th>
          <th>Profesi</th>
          <th>#</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(family, index) in form" :key="index">
          <td>{{ index + 1 }}</td>
          <td>
            <v-text-field v-model="family.fullname" placeholder="Nama" density="compact" variant="outlined"
              :error-messages="validate(`family.${index}.fullname`)" />
          </td>
          <td>
            <SelectField label="Hubungan" :items="hubungan" v-model="family.relationship"
              :err="validate(`family.${index}.relationship`)" />
          </td>
          <td>
            <v-date-input label="Tgl. Lahir" v-model="family.birthdate" density="compact" variant="outlined"
              :error-messages="validate(`family.${index}.birthdate`)" />
          </td>
          <td>
            <SelectField label="Status Pernikahan" :items="status_pernikahan" v-model="family.marital_status"
              :err="validate(`family.${index}.marital_status`)" />
          </td>
          <td>
            <v-text-field v-model="family.job" placeholder="Profesi" density="compact" variant="outlined"
              :error-messages="validate(`family.${index}.job`)" />
          </td>
          <td>
            <v-icon size="large" @click="store.delFamily(index)">mdi-delete</v-icon>
          </td>
        </tr>
      </tbody>
    </v-table>
  </v-card>
</template>
