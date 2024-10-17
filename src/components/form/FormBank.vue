<script setup>
import { useAuthStore } from '@/stores/apps/auth';
import { ref, computed } from 'vue';

// Inisialisasi store
const store = useAuthStore();
const form = computed(() => store.form.bank);
const errors = computed(() => store.errors);

const submitBank = () => {
  store.submitProfile({ bank: form.value })
}
</script>

<template>
  <v-card class="mx-auto" flat>
    <v-card-title>Data Bank</v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <v-alert border="start" color="error" title="Terjadi kesalahan" variant="tonal" v-if="errors.length > 0">{{ errors }}</v-alert>
      <v-row>
        <v-col cols="12" md="4" sm="12">
          <v-text-field label="Nama Bank" density="compact" variant="outlined" v-model="form.bankName" />
        </v-col>
        <v-col cols="12" md="4" sm="12">
          <v-text-field label="Account Bank" density="compact" variant="outlined" v-model="form.bankAccount" />
        </v-col>
        <v-col cols="12" md="4" sm="12">
          <v-text-field label="Account Holder" density="compact" variant="outlined" v-model="form.bankAccountHolder" />
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-btn class="text-none mb-4" color="primary" size="x-large" variant="flat" block @click="submitBank()">
        Simpan Bank
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
