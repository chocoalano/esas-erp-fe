<script setup>
import { computed } from 'vue';
import { useUsersStore } from '@/stores/apps/master-data/users';
import globalMixin from '@/mixins/globalMixin';

const store = useUsersStore();
const { errInput } = globalMixin.methods;

const form = computed(() => store.form.emergency_contacts);
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

const handleError = (index, field) => errInput(errors.value, `emergency_contacts.${index}.${field}`);
</script>

<template>
  <v-card flat>
    <v-toolbar color="surface">
      <v-toolbar-title>Data Kontak Darurat</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="store.addEC" variant="tonal" class="mr-5">Tambah</v-btn>
    </v-toolbar>

    <v-card-title v-if="errInput(errors, 'emergency_contacts').length > 0">
      <Alert type="error" :msg="errInput(errors, 'emergency_contacts')" />
    </v-card-title>

    <v-table>
      <thead>
        <tr>
          <th>No</th>
          <th>Nama</th>
          <th>Hubungan</th>
          <th>Telpon/HP</th>
          <th>Profesi</th>
          <th>#</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(contact, index) in form" :key="index">
          <td>{{ index + 1 }}</td>
          <td>
            <v-text-field v-model="contact.name" placeholder="Nama" density="compact" variant="outlined"
              :error-messages="handleError(index, 'name')" />
          </td>
          <td>
            <SelectField label="Hubungan" :items="hubungan" v-model="contact.relationship"
              :err="handleError(index, 'relationship')" />
          </td>
          <td>
            <v-text-field v-model="contact.phone" placeholder="Telpon/HP" density="compact" variant="outlined"
              :error-messages="handleError(index, 'phone')" />
          </td>
          <td>
            <v-text-field v-model="contact.profession" placeholder="Profesi" density="compact" variant="outlined"
              :error-messages="handleError(index, 'profession')" />
          </td>
          <td>
            <v-icon size="large" @click="store.delEC(index)">mdi-delete</v-icon>
          </td>
        </tr>
      </tbody>
    </v-table>
  </v-card>
</template>
