<script setup>
import { ref, watch, computed } from 'vue';
import { usePengumumanStore } from '@/stores/apps/master-data/pengumuman';
import { useValidate } from './validate';

const store = usePengumumanStore();
const loading = computed(() => store.loading);
const dialog = computed({
  get: () => store.dialog,
  set: (value) => (store.dialog = value),
});
const forms = computed(() => store.forms);

// Validasi menggunakan composable
const { validateField, errors, resetErrors } = useValidate({
  title: '',
  value: '',
});

const close = () => {
  dialog.value = false;
};

const save = async () => {
  resetErrors(); // Reset error sebelum validasi
  const isValid = validateField('title', forms.value.title, {
    required: true,
    minLength: 5,
  }) & validateField('value', forms.value.value, {
    required: true,
    minLength: 20,
  });

  if (!isValid) return;

  await store.submitForm(store.idform);
  close();
};

// Reset forms dan error ketika dialog ditutup
watch(dialog, (v) => {
  if (!v) {
    store.idform = null;
    store.resetForms();
    resetErrors();
  }
});
</script>

<template>
  <v-dialog v-model="dialog" max-width="900px">
    <v-card>
      <v-card-title>
        Form Pengumuman
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-row>
          <v-col cols="12" md="4" sm="12">
            <v-text-field
              label="Judul pengumuman"
              variant="outlined"
              density="compact"
              v-model="forms.title"
              :error-messages="errors.title"
            />
          </v-col>
          <v-col cols="12" md="4" sm="12">
            <v-switch
              v-model="forms.publish"
              :label="`Publikasi: ${forms.publish ? 'Dipublish' : 'Tidak dipublish'}`"
              hide-details
              inset
              color="primary"
            />
          </v-col>
          <v-col cols="12" md="12" sm="12">
            <QuillEditor theme="snow" v-model="forms.value" />
            <div class="error--text">{{ errors.value }}</div>
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="error" variant="outlined" @click="close">
          Tutup
        </v-btn>
        <v-btn color="primary" variant="elevated" @click="save" :loading="loading">
          Simpan
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
