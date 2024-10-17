<script setup>
import { useUsersStore } from '@/stores/apps/master-data/users';
import { computed, ref } from 'vue';

// Inisialisasi store
const store = useUsersStore();
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
</script>

<template>
  <v-card class="mx-auto" flat>
    <v-card-title>Data Salary</v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <v-row>
        <v-col cols="12" md="6" sm="12">
          <v-text-field type="number" label="Gaji total" density="compact" variant="outlined"
            v-model="store.form.salary.basicSalary" :error-messages="errInput(errors.value,'salary.basic_salary')" />
        </v-col>
        <v-col cols="12" md="6" sm="12">
          <SelectField label="Tipe gaji" :items="salaryOptions.salaryType" v-model="store.form.salary.salaryType"
            :err="errInput(errors.value,'salary.salary_type')" />
        </v-col>
        <v-col cols="12" md="6" sm="12">
          <SelectField label="Jadwal Pembayaran" :items="salaryOptions.scheduleType"
            v-model="store.form.salary.paymentSchedule" :err="errInput(errors.value,'salary.payment_schedule')" />
        </v-col>
        <v-col cols="12" md="6" sm="12">
          <v-text-field type="number" label="Gaji prorate" density="compact" variant="outlined"
            v-model="store.form.salary.prorateSettings" :error-messages="errInput(errors.value,'salary.prorate_settings')" />
        </v-col>
        <v-col cols="12" md="6" sm="12">
          <SelectField label="Pembayaran lembur" :items="salaryOptions.lemburType"
            v-model="store.form.salary.overtimeSettings" :err="errInput(errors.value,'salary.overtime_settings')" />
        </v-col>
        <v-col cols="12" md="6" sm="12">
          <v-text-field label="Mata uang" density="compact" variant="outlined" v-model="store.form.salary.currency"
            disabled :error-messages="errInput(errors.value,'salary.currency')" />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
