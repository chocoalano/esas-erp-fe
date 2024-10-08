<script setup>
import { ref, computed } from 'vue';
import { useUsersStore } from '@/stores/apps/master-data/users';
import globalMixin from '@/mixins/globalMixin';

// Initialize store and destructure needed methods and properties
const store = useUsersStore();
const { errInput } = globalMixin.methods;
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

// Reusable error handling function
const handleError = (field) => errInput(errors.value, `tax.${field}`);
</script>

<template>
  <v-card class="mx-auto" flat>
    <v-card-title>Data Pajak</v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field type="number" label="NPWP 15 digit" density="compact" variant="outlined"
            v-model="taxForm.npwp15DigitOld" :error-messages="handleError('npwp15DigitOld')" />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field type="number" label="NPWP 16 digit" density="compact" variant="outlined"
            v-model="taxForm.npwp16DigitNew" :error-messages="handleError('npwp16DigitNew')" />
        </v-col>
        <v-col cols="12" md="6">
          <SelectField label="Status PTKP" :items="ptkpType" v-model="taxForm.ptkpStatus"
            :err="handleError('ptkpStatus')" />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field label="Metode pajak" density="compact" variant="outlined" v-model="taxForm.taxMethod" disabled
            :error-messages="handleError('taxMethod')" />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field label="Pajak gaji" density="compact" variant="outlined" v-model="taxForm.taxSalary" disabled
            :error-messages="handleError('taxSalary')" />
        </v-col>
        <v-col cols="12" md="6">
          <SelectField label="Status Karyawan" :items="empType" v-model="taxForm.empTaxStatus"
            :err="handleError('empTaxStatus')" />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field type="number" label="Awal netto" density="compact" variant="outlined"
            v-model="taxForm.beginningNetto" :error-messages="handleError('beginningNetto')" />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field type="number" label="Pembayaran PPH21" density="compact" variant="outlined"
            v-model="taxForm.pph21_paid" :error-messages="handleError('pph21Paid')" />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
