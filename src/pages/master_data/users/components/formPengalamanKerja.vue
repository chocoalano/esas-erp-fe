<script setup>
import { useUsersStore } from '@/stores/apps/master-data/users';
import globalMixin from '@/mixins/globalMixin';
const store = useUsersStore();
const { errInput } = globalMixin.methods;
const form = computed(() => store.form.work_experience)
const errors = computed(() => store.errors)
const handleError = (field, index) => errInput(errors.value, `work_experience.${index}.${field}`);
</script>

<template>
  <v-card flat>
    <v-toolbar color="surface">
      <v-toolbar-title>Data Pengalaman Kerja</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="store.addWE" variant="tonal" class="mr-5">Tambah</v-btn>
    </v-toolbar>
    <v-card-title v-if="errInput(errors, 'work_experience').length > 0">
      <Alert type="error" :msg="errInput(errors, 'work_experience')" />
    </v-card-title>
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
              :error-messages="handleError('name', index)" />
          </td>
          <td>
            <DatePickerField label="Tgl. Mulai" v-model="state.start" :err="handleError('start', index)" />
          </td>
          <td>
            <DatePickerField label="Tgl. Selesai" v-model="state.finish" :err="handleError('finish', index)" />
          </td>
          <td>
            <DatePickerField label="Masa Berlaku" v-model="state.expired" :err="handleError('expired', index)" />
          </td>
          <td>
            <v-text-field v-model="state.type" placeholder="Jenis" density="compact" variant="outlined"
              :error-messages="handleError('type', index)" />
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
