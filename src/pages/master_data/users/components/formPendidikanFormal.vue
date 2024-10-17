<script setup>
import { computed } from 'vue';
import { useUsersStore } from '@/stores/apps/master-data/users';

const store = useUsersStore();
const form = computed(() => store.form.formal_education);
const errors = computed(() => store.errors);
</script>

<template>
  <v-card flat>
    <v-toolbar color="surface">
      <v-toolbar-title>Data Pendidikan Formal</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="store.addFE" variant="tonal" class="mr-5">Tambah</v-btn>
    </v-toolbar>

    <v-table>
      <thead>
        <tr>
          <th>No</th>
          <th>Peringkat Instansi</th>
          <th>Nama Instansi</th>
          <th>Jenjang</th>
          <th>Skor</th>
          <th>Tgl. Mulai</th>
          <th>Tgl. Selesai</th>
          <th>Keterangan</th>
          <th>Sertifikasi</th>
          <th>#</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(state, index) in form" :key="index">
          <td>{{ index + 1 }}</td>
          <td><v-text-field v-model="state.grade_id" placeholder="Peringkat" density="compact" variant="outlined"
              :error-messages="errInput(errors.value, `formal_education.${index}.grade_id`)" /></td>
          <td><v-text-field v-model="state.institution" placeholder="Instansi" density="compact" variant="outlined"
              :error-messages="errInput(errors.value, `formal_education.${index}.institution`)" /></td>
          <td><v-text-field v-model="state.majors" placeholder="Jenjang" density="compact" variant="outlined"
              :error-messages="errInput(errors.value, `formal_education.${index}.majors`)" /></td>
          <td><v-text-field v-model="state.score" placeholder="Skor" density="compact" variant="outlined"
              :error-messages="errInput(errors.value, `formal_education.${index}.score`)" /></td>
          <td><v-text-field v-model="state.start" placeholder="Dimulai" density="compact" variant="outlined"
              :error-messages="errInput(errors.value, `formal_education.${index}.start`)" /></td>
          <td><v-text-field v-model="state.finish" placeholder="Berakhir" density="compact" variant="outlined"
              :error-messages="errInput(errors.value, `formal_education.${index}.finish`)" /></td>
          <td><v-text-field v-model="state.description" placeholder="Keterangan" density="compact" variant="outlined"
              :error-messages="errInput(errors.value, `formal_education.${index}.description`)" /></td>
          <td><v-text-field v-model="state.certification" placeholder="Sertifikasi" density="compact" variant="outlined"
              :error-messages="errInput(errors.value, `formal_education.${index}.certification`)" /></td>
          <td>
            <v-icon size="large" @click="store.delFE(index)">mdi-delete</v-icon>
          </td>
        </tr>
      </tbody>
    </v-table>
  </v-card>
</template>
