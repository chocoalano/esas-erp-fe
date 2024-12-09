<script setup>
import { useUsersStore } from '@/stores/apps/master-data/users';
const store = useUsersStore();
const form = computed(() => store.form.work_experience)
const errors = computed(() => store.errors)
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
      <v-toolbar-title>Data Pengalaman Kerja</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="store.addWE" variant="tonal" class="mr-5">Tambah</v-btn>
    </v-toolbar>
    <v-table>
      <thead>
        <tr>
          <th>No</th>
          <th>Nama Perusahaan</th>
          <th>Posisi</th>
          <th>Dimulai</th>
          <th>Sampai Dengan</th>
          <th>Lama Bekerja</th>
          <th>#</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(state, index) in form" :key="index">
          <td>{{ index + 1 }}</td>
          <td><v-text-field v-model="state.company" placeholder="Instansi" density="compact" variant="outlined"
              :error-messages="validate(`work_experience.${index}.company`)" />
          </td>
          <td>
            <v-date-input label="Tanggal lahir" variant="outlined" density="compact" v-model="state.start" :error-messages="validate(`work_experience.${index}.start`)"/>
          </td>
          <td>
            <v-date-input label="Tanggal lahir" variant="outlined" density="compact" v-model="state.finish" :error-messages="validate(`work_experience.${index}.finish`)"/>
          </td>
          <td>
            <v-date-input label="Tanggal lahir" variant="outlined" density="compact" v-model="state.expired" :error-messages="validate(`work_experience.${index}.expired`)"/>
          </td>
          <td>
            <v-text-field v-model="state.type" placeholder="Jenis" density="compact" variant="outlined"
              :error-messages="validate(`work_experience.${index}.type`)" />
          </td>
          <td>
            <v-icon class="me-2" size="large" @click="store.delWE(index)">
              mdi-delete
            </v-icon>
          </td>
        </tr>
      </tbody>
    </v-table>
  </v-card>
</template>
