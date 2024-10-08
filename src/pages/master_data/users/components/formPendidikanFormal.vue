<script setup>
import { computed } from 'vue';
import { useUsersStore } from '@/stores/apps/master-data/users';
import globalMixin from '@/mixins/globalMixin';

const store = useUsersStore();
const { errInput } = globalMixin.methods;
const form = computed(() => store.form.formal_education);
const errors = computed(() => store.errors);

const handleError = (index, field) => errInput(errors.value, `formal_education.${index}.${field}`);
</script>

<template>
  <v-card flat>
    <v-toolbar color="surface">
      <v-toolbar-title>Data Pendidikan Formal</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="store.addFE" variant="tonal" class="mr-5">Tambah</v-btn>
    </v-toolbar>

    <v-card-title v-if="errInput(errors, 'formal_education').length > 0">
      <Alert type="error" :msg="errInput(errors, 'formal_education')" />
    </v-card-title>

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
              :error-messages="handleError(index, 'grade_id')" /></td>
          <td><v-text-field v-model="state.institution" placeholder="Instansi" density="compact" variant="outlined"
              :error-messages="handleError(index, 'institution')" /></td>
          <td><v-text-field v-model="state.majors" placeholder="Jenjang" density="compact" variant="outlined"
              :error-messages="handleError(index, 'majors')" /></td>
          <td><v-text-field v-model="state.score" placeholder="Skor" density="compact" variant="outlined"
              :error-messages="handleError(index, 'score')" /></td>
          <td><v-text-field v-model="state.start" placeholder="Dimulai" density="compact" variant="outlined"
              :error-messages="handleError(index, 'start')" /></td>
          <td><v-text-field v-model="state.finish" placeholder="Berakhir" density="compact" variant="outlined"
              :error-messages="handleError(index, 'finish')" /></td>
          <td><v-text-field v-model="state.description" placeholder="Keterangan" density="compact" variant="outlined"
              :error-messages="handleError(index, 'description')" /></td>
          <td><v-text-field v-model="state.certification" placeholder="Sertifikasi" density="compact" variant="outlined"
              :error-messages="handleError(index, 'certification')" /></td>
          <td>
            <v-icon size="large" @click="store.delFE(index)">mdi-delete</v-icon>
          </td>
        </tr>
      </tbody>
    </v-table>
  </v-card>
</template>
