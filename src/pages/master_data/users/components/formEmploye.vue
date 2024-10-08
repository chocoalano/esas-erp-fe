<script setup>
import { useUsersStore } from '@/stores/apps/master-data/users';
import globalMixin from '@/mixins/globalMixin';

// Initialize store and destructure the needed data
const store = useUsersStore();
const { errInput } = globalMixin.methods;
const { form, errors, company, branch, status, departemen, jabatan, level, approval } = store;

// Reusable error handling function
const handleError = (field) => errInput(errors, `employe.${field}`);
</script>

<template>
  <v-card class="mx-auto" flat>
    <v-card-title>Data Kepegawaian</v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <v-row>
        <v-col cols="12" md="6" sm="12">
          <SelectField label="Perusahaan" :items="company" v-model="form.employe.companyId" :err="handleError('companyId')" />
        </v-col>
        <v-col cols="12" md="6" sm="12">
          <SelectField label="Cabang/Penempatan" :items="branch" v-model="form.employe.branchId" :err="handleError('branchId')" />
        </v-col>
        <v-col cols="12" md="6" sm="12">
          <SelectField label="Status" :items="status" v-model="form.employe.status" :err="handleError('status')" />
        </v-col>
        <v-col cols="12" md="6" sm="12">
          <DatePickerField label="Tgl. Bergabung" v-model="form.employe.joinDate" :err="handleError('joinDate')" />
        </v-col>
        <v-col cols="12" md="6" sm="12">
          <DatePickerField label="Tgl. Masuk" v-model="form.employe.signDate" :err="handleError('signDate')" />
        </v-col>
        <v-col cols="12" md="6" sm="12">
          <SelectField label="Departemen" :items="departemen" v-model="form.employe.organizationId" :err="handleError('organizationId')" />
        </v-col>
        <v-col cols="12" md="6" sm="12">
          <SelectField label="Jabatan" :items="jabatan" v-model="form.employe.jobPositionId" :err="handleError('jobPositionId')" />
        </v-col>
        <v-col cols="12" md="6" sm="12">
          <SelectField label="Level" :items="level" v-model="form.employe.jobLevelId" :err="handleError('jobLevelId')" />
        </v-col>
        <v-col cols="12" md="6" sm="12">
          <SelectSearchField label="Approval line" :items="approval" v-model="form.employe.approvalLine" :err="handleError('approvalLine')" />
        </v-col>
        <v-col cols="12" md="6" sm="12">
          <SelectSearchField label="Approval Manajer" :items="approval" v-model="form.employe.approvalManager" :err="handleError('approvalManager')" />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
