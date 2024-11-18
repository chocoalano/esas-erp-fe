<script setup>
import { useUsersStore } from '@/stores/apps/master-data/users';
import DatePickerField from "@/components/form-input/DatePickerField.vue";

const store = useUsersStore();
const errors = computed(() => store.errors)
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
    <v-card-title>Data Bank</v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <v-row>
        <v-col cols="12" md="6" sm="12">
          <v-text-field label="Nama Bank" density="compact" variant="outlined" v-model="store.form.bank.bankName"
            :error-messages="validate('bank.bankName')"></v-text-field>
        </v-col>
        <v-col cols="12" md="6" sm="12">
          <v-text-field label="Account Bank" density="compact" variant="outlined" v-model="store.form.bank.bankAccount"
            :error-messages="validate('bank.bankAccount')"></v-text-field>
        </v-col>
        <v-col cols="12" md="6" sm="12">
          <v-text-field label="Account Holder" density="compact" variant="outlined"
            v-model="store.form.bank.bankAccountHolder"
            :error-messages="validate('bank.bankAccountHolder')"></v-text-field>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-title>Data BPJS</v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <v-row>
        <v-col cols="12" md="6" sm="12">
          <v-text-field label="BPJS Ketenagakerjaan" density="compact" variant="outlined"
            v-model="store.form.bpjs.bpjsKetenagakerjaan"
            :error-messages="validate('bpjs.bpjsKetenagakerjaan')"></v-text-field>
        </v-col>
        <v-col cols="12" md="6" sm="12">
          <v-text-field label="NPP BPJS Ketenagakerjaan" density="compact" variant="outlined"
            v-model="store.form.bpjs.nppBpjsKetenagakerjaan"
            :error-messages="validate('bpjs.nppBpjsKetenagakerjaan')"></v-text-field>
        </v-col>
        <v-col cols="12" md="6" sm="12">
          <DatePickerField label="Tgl. Terdaftar BPJS Ketenagakerjaan" v-model="store.form.bpjs.bpjsKetenagakerjaanDate"
            :err="validate('bpjs.bpjsKetenagakerjaanDate')" />
        </v-col>
        <v-col cols="12" md="6" sm="12">
          <v-text-field label="BPJS Kesehatan" density="compact" variant="outlined"
            v-model="store.form.bpjs.bpjsKesehatan"
            :error-messages="validate('bpjs.bpjsKesehatan')"></v-text-field>
        </v-col>
        <v-col cols="12" md="6" sm="12">
          <v-text-field label="BPJS Kesehatan Family" density="compact" variant="outlined"
            v-model="store.form.bpjs.bpjsKesehatanFamily"
            :error-messages="validate('bpjs.bpjsKesehatanFamily')"></v-text-field>
        </v-col>
        <v-col cols="12" md="6" sm="12">
          <DatePickerField label="Tgl. Terdaftar BPJS Kesehatan" v-model="store.form.bpjs.bpjsKesehatanDate"
            :err="validate('bpjs.bpjsKesehatanDate')" />
        </v-col>
        <v-col cols="12" md="6" sm="12">
          <v-text-field label="Biaya BPJS Kesehatan" density="compact" variant="outlined"
            v-model="store.form.bpjs.bpjsKesehatanCost"
            :error-messages="validate('bpjs.bpjsKesehatanCost')"></v-text-field>
        </v-col>
        <v-col cols="12" md="6" sm="12">
          <DatePickerField label="Tgl. BPJS JHT" v-model="store.form.bpjs.jhtCost"
            :err="validate('bpjs.jhtCost')" />
        </v-col>
        <v-col cols="12" md="6" sm="12">
          <v-text-field label="Biaya BPJS JP" density="compact" variant="outlined"
            v-model="store.form.bpjs.jaminanPensiunCost"
            :error-messages="validate('bpjs.jaminanPensiunCost')"></v-text-field>
        </v-col>
        <v-col cols="12" md="6" sm="12">
          <DatePickerField label="Tgl. BPJS JP" v-model="store.form.bpjs.jaminanPensiunDate"
            :err="validate('bpjs.jaminanPensiunDate')" />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
