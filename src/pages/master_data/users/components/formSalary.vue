<script setup>
import { useUsersStore } from '@/stores/apps/master-data/users';
import { computed, ref } from 'vue';
import SelectField from '@/components/form-input/SelectField.vue';

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
    <v-card-title>Data Salary</v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <v-row>
        <v-col cols="12" md="6" sm="12">
          <v-text-field type="number" label="Gaji total" density="compact" variant="outlined"
            v-model="store.form.salary.basicSalary" :error-messages="validate('salary.basicSalary')" />
        </v-col>
        <v-col cols="12" md="6" sm="12">
          <SelectField label="Tipe gaji" :items="salaryOptions.salaryType" v-model="store.form.salary.salaryType"
            :err="validate('salary.salary_type')" />
        </v-col>
        <v-col cols="12" md="6" sm="12">
          <SelectField label="Jadwal Pembayaran" :items="salaryOptions.scheduleType"
            v-model="store.form.salary.paymentSchedule" :err="validate('salary.payment_schedule')" />
        </v-col>
        <v-col cols="12" md="6" sm="12">
          <v-text-field type="number" label="Gaji prorate" density="compact" variant="outlined"
            v-model="store.form.salary.prorateSettings" :error-messages="validate('salary.prorate_settings')" />
        </v-col>
        <v-col cols="12" md="6" sm="12">
          <SelectField label="Pembayaran lembur" :items="salaryOptions.lemburType"
            v-model="store.form.salary.overtimeSettings" :err="validate('salary.overtime_settings')" />
        </v-col>
        <v-col cols="12" md="6" sm="12">
          <v-text-field label="Mata uang" density="compact" variant="outlined" v-model="store.form.salary.currency"
            disabled :error-messages="validate('salary.currency')" />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
