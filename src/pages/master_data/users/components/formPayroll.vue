<script setup>
import { useUsersStore } from '@/stores/apps/master-data/users';

const store = useUsersStore();
const errors = computed(() => store.errors)
const statusKaryawan = computed(() => store.form.employe.status)
</script>
<template>
  <v-card class="mx-auto" flat>
    <v-card-title>Data Bank</v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <v-row>
        <v-col cols="12" md="6" sm="12">
          <v-text-field label="Nama Bank" density="compact" variant="outlined" v-model="store.form.bank.bankName"
            :error-messages="errInput(errors.value, 'bank.bankName')"></v-text-field>
        </v-col>
        <v-col cols="12" md="6" sm="12">
          <v-text-field label="Account Bank" density="compact" variant="outlined" v-model="store.form.bank.bankAccount"
            :error-messages="errInput(errors.value, 'bank.bankAccount')"></v-text-field>
        </v-col>
        <v-col cols="12" md="6" sm="12">
          <v-text-field label="Account Holder" density="compact" variant="outlined"
            v-model="store.form.bank.bankAccountHolder"
            :error-messages="errInput(errors.value, 'bank.bankAccountHolder')"></v-text-field>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-title v-if="statusKaryawan === 'permanent'">Data BPJS</v-card-title>
    <v-divider v-if="statusKaryawan === 'permanent'"></v-divider>
    <v-card-text v-if="statusKaryawan === 'permanent'">
      <v-row>
        <v-col cols="12" md="6" sm="12">
          <v-text-field label="BPJS Ketenagakerjaan" density="compact" variant="outlined"
            v-model="store.form.bpjs.bpjsKetenagakerjaan"
            :error-messages="errInput(errors.value, 'bpjs.bpjsKetenagakerjaan')"></v-text-field>
        </v-col>
        <v-col cols="12" md="6" sm="12">
          <v-text-field label="NPP BPJS Ketenagakerjaan" density="compact" variant="outlined"
            v-model="store.form.bpjs.nppBpjsKetenagakerjaan"
            :error-messages="errInput(errors.value, 'bpjs.nppBpjsKetenagakerjaan')"></v-text-field>
        </v-col>
        <v-col cols="12" md="6" sm="12">
          <DatePickerField label="Tgl. Terdaftar BPJS Ketenagakerjaan" v-model="store.form.bpjs.bpjsKetenagakerjaanDate"
            :err="errInput(errors.value, 'bpjs.bpjsKetenagakerjaanDate')" />
        </v-col>
        <v-col cols="12" md="6" sm="12">
          <v-text-field label="BPJS Kesehatan" density="compact" variant="outlined"
            v-model="store.form.bpjs.bpjsKesehatan"
            :error-messages="errInput(errors.value, 'bpjs.bpjsKesehatan')"></v-text-field>
        </v-col>
        <v-col cols="12" md="6" sm="12">
          <v-text-field label="BPJS Kesehatan Family" density="compact" variant="outlined"
            v-model="store.form.bpjs.bpjsKesehatanFamily"
            :error-messages="errInput(errors.value, 'bpjs.bpjsKesehatanFamily')"></v-text-field>
        </v-col>
        <v-col cols="12" md="6" sm="12">
          <DatePickerField label="Tgl. Terdaftar BPJS Kesehatan" v-model="store.form.bpjs.bpjsKesehatanDate"
            :err="errInput(errors.value, 'bpjs.bpjsKesehatanDate')" />
        </v-col>
        <v-col cols="12" md="6" sm="12">
          <v-text-field label="Biaya BPJS Kesehatan" density="compact" variant="outlined"
            v-model="store.form.bpjs.bpjsKesehatanCost"
            :error-messages="errInput(errors.value, 'bpjs.bpjsKesehatanCost')"></v-text-field>
        </v-col>
        <v-col cols="12" md="6" sm="12">
          <DatePickerField label="Tgl. BPJS JHT" v-model="store.form.bpjs.jhtCost"
            :err="errInput(errors.value, 'bpjs.jhtCost')" />
        </v-col>
        <v-col cols="12" md="6" sm="12">
          <v-text-field label="Biaya BPJS JP" density="compact" variant="outlined"
            v-model="store.form.bpjs.jaminanPensiunCost"
            :error-messages="errInput(errors.value, 'bpjs.jaminanPensiunCost')"></v-text-field>
        </v-col>
        <v-col cols="12" md="6" sm="12">
          <DatePickerField label="Tgl. BPJS JP" v-model="store.form.bpjs.jaminanPensiunDate"
            :err="errInput(errors.value, 'bpjs.jaminanPensiunDate')" />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
