<template>
  <v-card class="mx-auto" flat>
    <v-list-item class="px-6">
      <template v-slot:prepend>
        <v-avatar color="surface-light" size="32">
          <v-icon icon="mdi-office-building-cog" />
        </v-avatar>
      </template>
      <template v-slot:title>Form pengaturan perusahaan.</template>
      <template v-slot:append>
        <v-btn @click="updateForm" class="text-none" color="error" text="Batal Perbaharui" variant="text" slim v-if="!formDisabled"></v-btn>
        <v-btn @click="updateForm" class="text-none" color="primary" text="Perbaharui" variant="text" slim v-else></v-btn>
      </template>
    </v-list-item>

    <v-divider></v-divider>

    <v-form @submit.prevent="handleSubmit" :disabled="formDisabled">
      <v-card-text>
        <v-row>
          <v-col cols="12" md="3" sm="12">
            <v-text-field label="Nama perusahaan" variant="outlined" density="compact" v-model="store.form.name" />
          </v-col>
          <v-col cols="12" md="3" sm="12">
            <v-text-field label="Latitude perusahaan" variant="outlined" density="compact" v-model="store.form.latitude" />
          </v-col>
          <v-col cols="12" md="3" sm="12">
            <v-text-field label="Longitude perusahaan" variant="outlined" density="compact" v-model="store.form.longitude" />
          </v-col>
          <v-col cols="12" md="3" sm="12">
            <v-text-field label="Radius absensi" variant="outlined" density="compact" v-model="store.form.radius" />
          </v-col>
          <v-col cols="12" md="12" sm="12">
            <v-textarea label="Alamat perusahaan" variant="outlined" density="compact"
              v-model="store.form.fullAddress"></v-textarea>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn :loading="loading" :disabled="formDisabled" type="submit" class="flex-grow-1" color="primary" variant="elevated">
          Simpan
        </v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script setup>
import { useCompanyStore } from '@/stores/apps/configs/company';
import { onMounted } from 'vue';

const store = useCompanyStore();

// Destructure state and actions from the store
const loading = computed(() => store.loading);
const formDisabled = computed(() => store.formDisabled);

const handleSubmit = () => {
  store.submitForm();
};

const updateForm = () => {
  store.formDisabled = !store.formDisabled
};

onMounted(async () => {
  await store.getCompany()
})
</script>
