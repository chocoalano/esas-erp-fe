<script setup>
import { computed } from 'vue';
import { useUsersStore } from '@/stores/apps/master-data/users';
import SelectField from '@/components/form-input/SelectField.vue';
import DatePickerField from '@/components/form-input/DatePickerField.vue';
import Switch from '@/components/form-input/Switch.vue';

const store = useUsersStore();
const form = computed(() => store.form.formal_education);
const errors = computed(() => store.errors);
const education = ref([
  { id: 'SD', name: 'SD' },
  { id: 'SMP', name: 'SMP' },
  { id: 'SMA/SLTA', name: 'SMA/SLTA' },
  { id: 'D1', name: 'D1' },
  { id: 'D2', name: 'D2' },
  { id: 'D3', name: 'D3' },
  { id: 'D4', name: 'D4' },
  { id: 'S1', name: 'S1' },
  { id: 'S2', name: 'S2' },
  { id: 'S3', name: 'S3' },
]);
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
      <v-toolbar-title>Data Pendidikan Formal</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="store.addFE" variant="tonal" class="mr-5">Tambah</v-btn>
    </v-toolbar>

    <v-table>
      <thead>
        <tr>
          <th>No</th>
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
          <td><v-text-field v-model="state.institution" placeholder="Instansi" density="compact" variant="outlined"
              :error-messages="validate(`formal_education.${index}.institution`)" /></td>
          <td>
              <SelectField label="Jenjang" :items="education" v-model="state.majors"
              :err="validate(`formal_education.${index}.majors`)" />
            </td>
          <td><v-text-field v-model="state.score" placeholder="Skor" density="compact" variant="outlined"
              :error-messages="validate(`formal_education.${index}.score`)" /></td>
          <td>
            <DatePickerField label="Mulai" v-model="state.start"
              :err="validate(`formal_education.${index}.start`)" /></td>
          <td>
            <DatePickerField label="Selesai" v-model="state.finish"
              :err="validate(`formal_education.${index}.finish`)" /></td>
          <td><v-text-field v-model="state.description" placeholder="Keterangan" density="compact" variant="outlined"
              :error-messages="validate(`formal_education.${index}.description`)" /></td>
          <td>
            <Switch label="" v-model="state.certification" :err="validate(`formal_education.${index}.certification`)" />
          </td>
          <td>
            <v-icon size="large" @click="store.delFE(index)">mdi-delete</v-icon>
          </td>
        </tr>
      </tbody>
    </v-table>
  </v-card>
</template>
