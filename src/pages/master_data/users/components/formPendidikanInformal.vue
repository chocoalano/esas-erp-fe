<script setup>
import { useUsersStore } from '@/stores/apps/master-data/users';
import { computed, ref } from 'vue';
import DatePickerField from "@/components/form-input/DatePickerField.vue";
import SelectField from "@/components/form-input/SelectField.vue";
import Switch from "@/components/form-input/Switch.vue";

const store = useUsersStore();

const form = computed(() => store.form.informal_education);
const errors = computed(() => store.errors)

const jenis = ref([
  { id: 'day', name: 'Hari' },
  { id: 'month', name: 'Bulan' },
  { id: 'year', name: 'Tahun' },
])
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
      <v-toolbar-title>Data Pendidikan Informal</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="store.addIFE" variant="tonal" class="mr-5">Tambah</v-btn>
    </v-toolbar>

    <v-table>
      <thead>
        <tr>
          <th>No</th>
          <th>Instansi</th>
          <th>Mulai</th>
          <th>Selesai</th>
          <th>Masa Berlaku</th>
          <th>Jenis</th>
          <th>Durasi</th>
          <th>Biaya</th>
          <th>Keterangan</th>
          <th>Sertifikasi</th>
          <th>#</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(state, index) in form" :key="index">
          <td>{{ index + 1 }}</td>
          <td><v-text-field v-model="state.name" placeholder="Instansi" density="compact" variant="outlined"
              :error-messages="validate(`informal_education.${index}.name`)" />
          </td>
          <td>
            <DatePickerField label="Tgl. Mulai" v-model="state.start" :err="validate(`informal_education.${index}.start`)" />
          </td>
          <td>
            <DatePickerField label="Tgl. Selesai" v-model="state.finish" :err="validate(`informal_education.${index}.finish`)" />
          </td>
          <td>
            <DatePickerField label="Masa Berlaku" v-model="state.expired" :err="validate(`informal_education.${index}.expired`)" />
          </td>
          <td>
            <SelectField label="Jenis" :items="jenis" v-model="state.type" :err="validate(`informal_education.${index}.type`)" />
          </td>
          <td><v-text-field type="number" v-model="state.duration" placeholder="Durasi" density="compact"
              variant="outlined" :error-messages="validate(`informal_education.${index}.duration`)" />
          </td>
          <td><v-text-field type="number" v-model="state.fee" placeholder="Biaya" density="compact" variant="outlined"
              :error-messages="validate(`informal_education.${index}.fee`)" />
          </td>
          <td><v-text-field v-model="state.description" placeholder="Keterangan" density="compact" variant="outlined"
              :error-messages="validate(`informal_education.${index}.description`)" />
          </td>
          <td>
            <Switch label="" v-model="state.certification" :err="validate(`informal_education.${index}.certification`)" />
          </td>
          <td>
            <v-icon class="me-2" size="large" @click="store.delIFE(index)">
              mdi-delete
            </v-icon>
          </td>
        </tr>
      </tbody>
    </v-table>
  </v-card>
</template>
