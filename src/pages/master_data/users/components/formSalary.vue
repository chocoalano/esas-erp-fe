<script setup>
import { useUsersStore } from '@/stores/apps/master-data/users';
import globalMixin from '@/mixins/globalMixin';
import { computed, ref } from 'vue';

// Inisialisasi store
const store = useUsersStore();
const { errInput } = globalMixin.methods;
const errors = computed(() => store.errors);

const salaryOptions = ref({
  salaryType: [
    { id: 'Monthly', name: 'Monthly' },
    { id: 'Weakly', name: 'Weakly' },
    { id: 'Dayly', name: 'Dayly' },
  ],
  scheduleType: [
    { id: 'last-month', name: 'Akhir bulan' },
    { id: 'mid-month', name: 'Pertengahan bulan' },
    { id: 'first-month', name: 'Awal bulan' },
  ],
  lemburType: [
    { id: 'time-flat', name: 'Jam tetap' },
    { id: 'time-live', name: 'Jam hidup' },
  ],
});

// Reusable error handling function
const handleError = (field) => errInput(errors.value, `salary.${field}`);
;
</script>

<template>
  <v-card class="mx-auto" flat>
    <v-card-title>Data Salary</v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <v-row>
        <v-col cols="12" md="6" sm="12">
          <v-text-field type="number" label="Gaji total" density="compact" variant="outlined"
            v-model="store.form.salary.basicSalary" :error-messages="handleError('basic_salary')" />
        </v-col>
        <v-col cols="12" md="6" sm="12">
          <SelectField label="Tipe gaji" :items="salaryOptions.salaryType" v-model="store.form.salary.salaryType"
            :err="handleError('salary_type')" />
        </v-col>
        <v-col cols="12" md="6" sm="12">
          <SelectField label="Jadwal Pembayaran" :items="salaryOptions.scheduleType"
            v-model="store.form.salary.paymentSchedule" :err="handleError('payment_schedule')" />
        </v-col>
        <v-col cols="12" md="6" sm="12">
          <v-text-field type="number" label="Gaji prorate" density="compact" variant="outlined"
            v-model="store.form.salary.prorateSettings" :error-messages="handleError('prorate_settings')" />
        </v-col>
        <v-col cols="12" md="6" sm="12">
          <SelectField label="Pembayaran lembur" :items="salaryOptions.lemburType"
            v-model="store.form.salary.overtimeSettings" :err="handleError('overtime_settings')" />
        </v-col>
        <v-col cols="12" md="6" sm="12">
          <v-text-field label="Mata uang" density="compact" variant="outlined" v-model="store.form.salary.currency"
            disabled :error-messages="handleError('currency')" />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
