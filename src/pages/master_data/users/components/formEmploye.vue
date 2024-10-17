<script setup>
import { useUsersStore } from '@/stores/apps/master-data/users';

// Initialize store and destructure the needed data
const store = useUsersStore();
const { form, errors, company, branch, status, departemen, jabatan, level, approval } = store;
</script>

<template>
  <v-card class="mx-auto" flat>
    <v-card-title>Data Kepegawaian</v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <v-row>
        <v-col cols="12" md="6" sm="12">
          <SelectField label="Perusahaan" :items="company" v-model="form.employe.companyId" :err="errInput(errors.value,'employe.companyId')" />
        </v-col>
        <v-col cols="12" md="6" sm="12">
          <SelectField label="Cabang/Penempatan" :items="branch" v-model="form.employe.branchId" :err="errInput(errors.value,'employe.branchId')" />
        </v-col>
        <v-col cols="12" md="6" sm="12">
          <SelectField label="Status" :items="status" v-model="form.employe.status" :err="errInput(errors.value,'employe.status')" />
        </v-col>
        <v-col cols="12" md="6" sm="12">
          <DatePickerField label="Tgl. Bergabung" v-model="form.employe.joinDate" :err="errInput(errors.value,'employe.joinDate')" />
        </v-col>
        <v-col cols="12" md="6" sm="12">
          <DatePickerField label="Tgl. Masuk" v-model="form.employe.signDate" :err="errInput(errors.value,'employe.signDate')" />
        </v-col>
        <v-col cols="12" md="6" sm="12">
          <SelectField label="Departemen" :items="departemen" v-model="form.employe.organizationId" :err="errInput(errors.value,'employe.organizationId')" />
        </v-col>
        <v-col cols="12" md="6" sm="12">
          <SelectField label="Jabatan" :items="jabatan" v-model="form.employe.jobPositionId" :err="errInput(errors.value,'employe.jobPositionId')" />
        </v-col>
        <v-col cols="12" md="6" sm="12">
          <SelectField label="Level" :items="level" v-model="form.employe.jobLevelId" :err="errInput(errors.value,'employe.jobLevelId')" />
        </v-col>
        <v-col cols="12" md="6" sm="12">
          <SelectSearchField label="Approval line" :items="approval" v-model="form.employe.approvalLine" :err="errInput(errors.value,'employe.approvalLine')" />
        </v-col>
        <v-col cols="12" md="6" sm="12">
          <SelectSearchField label="Approval Manajer" :items="approval" v-model="form.employe.approvalManager" :err="errInput(errors.value,'employe.approvalManager')" />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
