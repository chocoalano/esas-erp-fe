<script setup>
import { ref, computed } from 'vue';
import { useUsersStore } from '@/stores/apps/master-data/users';
import SelectField from '@/components/form-input/SelectField.vue';

// Initialize store and destructure needed methods and properties
const store = useUsersStore();
const { form } = store;

// Extract tax form properties for easier access
const taxForm = computed(() => form.tax);
const errors = computed(() => store.errors);

// PTKP and employee type options
const ptkpType = ref([
  { id: 'TK0', name: 'TK0' }, { id: 'TK1', name: 'TK1' }, { id: 'TK2', name: 'TK2' },
  { id: 'TK3', name: 'TK3' }, { id: 'K0', name: 'K0' }, { id: 'K1', name: 'K1' },
  { id: 'K2', name: 'K2' }, { id: 'K3', name: 'K3' }, { id: 'K/I/0', name: 'K/I/0' },
  { id: 'K/I/1', name: 'K/I/1' }, { id: 'K/I/2', name: 'K/I/2' }, { id: 'K/I/3', name: 'K/I/3' }
]);

const empType = ref([
  { id: 'permanent', name: 'Karyawan Tetap' },
  { id: 'contract', name: 'Kontrak' },
  { id: 'last-daily', name: 'Harian lepas' }
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
  <v-card class="mx-auto" flat>
    <v-card-title>Data Pajak</v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field type="number" label="NPWP 15 digit" density="compact" variant="outlined"
            v-model="taxForm.npwp15DigitOld" :error-messages="validate('tax.npwp15DigitOld')" />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field type="number" label="NPWP 16 digit" density="compact" variant="outlined"
            v-model="taxForm.npwp16DigitNew" :error-messages="validate('tax.npwp16DigitNew')" />
        </v-col>
        <v-col cols="12" md="6">
          <SelectField label="Status PTKP" :items="ptkpType" v-model="taxForm.ptkpStatus"
            :err="validate('tax.ptkpStatus')" />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field label="Metode pajak" density="compact" variant="outlined" v-model="taxForm.taxMethod" disabled
            :error-messages="validate('tax.taxMethod')" />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field label="Pajak gaji" density="compact" variant="outlined" v-model="taxForm.taxSalary" disabled
            :error-messages="validate('tax.taxSalary')" />
        </v-col>
        <v-col cols="12" md="6">
          <SelectField label="Status Karyawan" :items="empType" v-model="taxForm.empTaxStatus"
            :err="validate('tax.empTaxStatus')" />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field type="number" label="Awal netto" density="compact" variant="outlined"
            v-model="taxForm.beginningNetto" :error-messages="validate('tax.beginningNetto')" />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field type="number" label="Pembayaran PPH21" density="compact" variant="outlined"
            v-model="taxForm.pph21_paid" :error-messages="validate('tax.pph21Paid')" />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
