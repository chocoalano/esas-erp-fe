<script setup>
import { useUsersStore } from '@/stores/apps/master-data/users';
import SelectField from "@/components/form-input/SelectField.vue";
import SelectSearchField from '@/components/form-input/SelectSearchField.vue';

// Initialize store and destructure the needed data
const store = useUsersStore();
const errors = computed(() => store.errors);
const { form, company, branch, status, departemen, jabatan, level, approval } = store;
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
    <v-card-title>Data Kepegawaian</v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <v-row>
        <v-col cols="12" md="6" sm="12">
          <SelectField label="Perusahaan" :items="company" v-model="form.employe.companyId"
            :err="validate('employe.companyId')" />
        </v-col>
        <v-col cols="12" md="6" sm="12">
          <SelectField label="Cabang/Penempatan" :items="branch" v-model="form.employe.branchId"
            :err="validate('employe.branchId')" />
        </v-col>
        <v-col cols="12" md="6" sm="12">
          <SelectField label="Status" :items="status" v-model="form.employe.status"
            :err="validate('employe.status')" />
        </v-col>
        <v-col cols="12" md="6" sm="12">
          <v-date-input label="Tgl. Bergabung" v-model="form.employe.joinDate"
            :error-messages="validate('employe.joinDate')" />
        </v-col>
        <v-col cols="12" md="6" sm="12">
          <v-date-input label="Tgl. Masuk" v-model="form.employe.signDate"
            :error-messages="validate('employe.signDate')" />
        </v-col>
        <v-col cols="12" md="6" sm="12">
          <SelectField label="Departemen" :items="departemen" v-model="form.employe.organizationId"
            :err="validate('employe.organizationId')" />
        </v-col>
        <v-col cols="12" md="6" sm="12">
          <SelectField label="Jabatan" :items="jabatan" v-model="form.employe.jobPositionId"
            :err="validate('employe.jobPositionId')" />
        </v-col>
        <v-col cols="12" md="6" sm="12">
          <SelectField label="Level" :items="level" v-model="form.employe.jobLevelId"
            :err="validate('employe.jobLevelId')" />
        </v-col>
        <v-col cols="12" md="6" sm="12">
          <SelectSearchField label="Approval line" :items="approval" v-model="form.employe.approvalLine"
            :err="validate('employe.approvalLine')" />
        </v-col>
        <v-col cols="12" md="6" sm="12">
          <SelectSearchField label="Approval Manajer" :items="approval" v-model="form.employe.approvalManager"
            :err="validate('employe.approvalManager')" />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
