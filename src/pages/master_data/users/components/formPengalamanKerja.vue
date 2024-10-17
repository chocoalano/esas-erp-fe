<script setup>
import { useUsersStore } from '@/stores/apps/master-data/users';
const store = useUsersStore();
const form = computed(() => store.form.work_experience)
const errors = computed(() => store.errors)
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
          <td><v-text-field v-model="state.name" placeholder="Instansi" density="compact" variant="outlined"
              :error-messages="errInput(errors.value, `work_experience.${index}.name`)" />
          </td>
          <td>
            <DatePickerField label="Tgl. Mulai" v-model="state.start" :err="errInput(errors.value, `work_experience.${index}.start`)" />
          </td>
          <td>
            <DatePickerField label="Tgl. Selesai" v-model="state.finish" :err="errInput(errors.value, `work_experience.${index}.finish`)" />
          </td>
          <td>
            <DatePickerField label="Masa Berlaku" v-model="state.expired" :err="errInput(errors.value, `work_experience.${index}.expired`)" />
          </td>
          <td>
            <v-text-field v-model="state.type" placeholder="Jenis" density="compact" variant="outlined"
              :error-messages="errInput(errors.value, `work_experience.${index}.type`)" />
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
