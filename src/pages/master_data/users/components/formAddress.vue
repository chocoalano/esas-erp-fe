<script setup>
import { useUsersStore } from '@/stores/apps/master-data/users';
import { ref, computed } from 'vue';

const store = useUsersStore();

const errors = computed(() => store.errors);
const { form } = store; // Destructure the form object for simpler access

const idOptions = ref([
  { id: 'ktp', name: 'KTP' },
  { id: 'passport', name: 'PASSPORT' }
]);
</script>

<template>
  <v-card class="mx-auto" flat>
    <v-card-title>Data Alamat</v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <v-row>
        <v-col cols="12" md="6" sm="12">
          <SelectField
            label="ID Tipe"
            :items="idOptions"
            v-model="form.address.idtype"
            :error-messages="errInput(errors.value,'address.idtype')"
          />
        </v-col>
        <v-col cols="12" md="6" sm="12">
          <v-text-field
            type="number"
            label="ID Number"
            density="compact"
            variant="outlined"
            v-model="form.address.idnumber"
            :error-messages="errInput(errors.value,'address.idnumber')"
          />
        </v-col>
        <v-col cols="12" md="6" sm="12">
          <v-switch
            color="primary"
            v-model="form.address.ispermanent"
            :label="`Permanen: ${form.address.ispermanent ? 'Ya' : 'Tidak'}`"
            hide-details
            inset
            :error-messages="errInput(errors.value,'address.ispermanent')"
          />
        </v-col>

        <!-- Conditionally render the DatePickerField if address is not permanent -->
        <v-col cols="12" md="6" sm="12" v-if="!form.address.ispermanent">
          <DatePickerField
            label="ID Expired"
            v-model="form.address.idexpired"
            :err="errInput(errors.value,'address.idexpired')"
          />
        </v-col>

        <v-col cols="12" :md="form.address.ispermanent ? 12 : 6" sm="12">
          <v-text-field
            type="number"
            label="Kode POS"
            density="compact"
            variant="outlined"
            v-model="form.address.postalcode"
            :error-messages="errInput(errors.value,'address.postalcode')"
          />
        </v-col>

        <v-col cols="12" md="12" sm="12">
          <v-textarea
            label="Alamat Sekarang"
            variant="outlined"
            v-model="form.address.citizenIdAddress"
            :error-messages="errInput(errors.value,'address.citizenIdAddress')"
          />
        </v-col>

        <v-col cols="12" md="12" sm="12">
          <v-switch
            color="primary"
            v-model="form.address.useAsResidential"
            :label="`Gunakan alamat sekarang untuk alamat tinggal: ${form.address.useAsResidential}`"
            hide-details
            inset
            :error-messages="errInput(errors.value,'address.useAsResidential')"
          />
        </v-col>

        <v-col cols="12" md="12" sm="12">
          <v-textarea
            label="Alamat Tinggal"
            variant="outlined"
            v-model="form.address.residentialAddress"
            :error-messages="errInput(errors.value,'address.residentialAddress')"
          />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
