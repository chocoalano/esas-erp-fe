<script setup>
import { useUsersStore } from '@/stores/apps/master-data/users';
import globalMixin from '@/mixins/globalMixin';
import { computed, ref } from 'vue';

const store = useUsersStore();
const { errInput } = globalMixin.methods;

const form = computed(() => store.form.informal_education);
const errors = computed(() => store.errors)

const handleError = (field, index) => errInput(errors.value, `informal_education.${index}.${field}`);

const jenis = ref([
  { id: 'day', name: 'Hari' },
  { id: 'month', name: 'Bulan' },
  { id: 'year', name: 'Tahun' },
])
</script>

<template>
  <v-card flat>
    <v-toolbar color="surface">
      <v-toolbar-title>Data Pendidikan Informal</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="store.addIFE" variant="tonal" class="mr-5">Tambah</v-btn>
    </v-toolbar>

    <v-card-title v-if="errInput(errors, 'informal_education').length > 0">
      <Alert type="error" :msg="errInput(errors, 'informal_education')" />
    </v-card-title>

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
            <SelectField label="Jenis" :items="jenis" v-model="state.type" :err="handleError('type', index)" />
          </td>
          <td><v-text-field type="number" v-model="state.duration" placeholder="Durasi" density="compact"
              variant="outlined" :error-messages="handleError('duration', index)" />
          </td>
          <td><v-text-field type="number" v-model="state.fee" placeholder="Biaya" density="compact" variant="outlined"
              :error-messages="handleError('fee', index)" />
          </td>
          <td><v-text-field v-model="state.description" placeholder="Keterangan" density="compact" variant="outlined"
              :error-messages="handleError('description', index)" />
          </td>
          <td>
            <Switch label="" v-model="state.certification" :err="handleError('certification', index)" />
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
