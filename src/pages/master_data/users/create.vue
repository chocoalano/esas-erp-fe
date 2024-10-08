<template>
  <v-row>
    <v-col cols="12" md="6" sm="12">
      <formUser v-if="!loading"/>
      <v-skeleton-loader type="article" v-else></v-skeleton-loader>
    </v-col>
    <v-col cols="12" md="6" sm="12">
      <FormEmploye v-if="!loading"/>
      <v-skeleton-loader type="article" v-else></v-skeleton-loader>
    </v-col>
    <v-col cols="12" md="6" sm="12">
      <FormAddress v-if="!loading"/>
      <v-skeleton-loader type="article" v-else></v-skeleton-loader>
    </v-col>
    <v-col cols="12" md="6" sm="12">
      <FormPayroll v-if="!loading"/>
      <v-skeleton-loader type="article" v-else></v-skeleton-loader>
    </v-col>
    <v-col cols="12" md="12" sm="12">
      <FormContactEmgncy v-if="!loading"/>
      <v-skeleton-loader type="article" v-else></v-skeleton-loader>
    </v-col>
    <v-col cols="12" md="12" sm="12">
      <FormFamily v-if="!loading"/>
      <v-skeleton-loader type="article" v-else></v-skeleton-loader>
    </v-col>
    <v-col cols="12" md="12" sm="12">
      <FormPendidikanFormal v-if="!loading"/>
      <v-skeleton-loader type="article" v-else></v-skeleton-loader>
    </v-col>
    <v-col cols="12" md="12" sm="12">
      <formPendidikanInformal v-if="!loading"/>
      <v-skeleton-loader type="article" v-else></v-skeleton-loader>
    </v-col>
    <v-col cols="12" md="12" sm="12">
      <FormPengalamanKerja v-if="!loading"/>
      <v-skeleton-loader type="article" v-else></v-skeleton-loader>
    </v-col>
    <v-col cols="12" md="6" sm="12">
      <FormSalary v-if="!loading"/>
      <v-skeleton-loader type="article" v-else></v-skeleton-loader>
    </v-col>
    <v-col cols="12" md="6" sm="12">
      <FormPajak v-if="!loading"/>
      <v-skeleton-loader type="article" v-else></v-skeleton-loader>
    </v-col>
    <v-col cols="12" md="12" sm="12">
      <v-btn block color="primary" height="50" variant="flat">Simpan</v-btn>
    </v-col>
  </v-row>
</template>
<script setup>
import { onMounted } from 'vue';
import FormAddress from './components/formAddress.vue';
import FormContactEmgncy from './components/formContactEmgncy.vue';
import FormEmploye from './components/formEmploye.vue';
import FormFamily from './components/formFamily.vue';
import FormPajak from './components/formPajak.vue';
import FormPayroll from './components/formPayroll.vue';
import FormPendidikanFormal from './components/formPendidikanFormal.vue';
import formPendidikanInformal from './components/formPendidikanInformal.vue';
import FormPengalamanKerja from './components/formPengalamanKerja.vue';
import FormSalary from './components/formSalary.vue';
import formUser from './components/formUser.vue';

import { useUsersStore } from '@/stores/apps/master-data/users';

const store = useUsersStore();
const loading = computed(() => store.loading)

onMounted(() => {
  store.kelengkapan_form_user()
})
</script>
