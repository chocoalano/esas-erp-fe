<script setup>
import { onMounted, ref, watch } from 'vue'
import Editor from '@tinymce/tinymce-vue'
import { usePengumumanStore } from '@/stores/apps/master-data/pengumuman'

const store = usePengumumanStore()
const loading = computed(() => store.loading)
const errors = computed(() => store.errors)
const dialog = computed(() => store.dialog)
const forms = computed(() => store.forms)

const editorConfig = ref({
  height: 500,
  menubar: false,
  plugins: 'lists link image paste help wordcount',
  toolbar: 'undo redo | formatselect | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
  branding: false,
})

const close = () => {
  store.dialog = !store.dialog
}
const save = () => {
  store.submitForm(store.idform)
}

watch(() => store.dialog, (v) => {
  if (v === false) {
    store.idform = null
    store.resetForms()
  }
})
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
            <v-text-field label="Judul pengumuman" variant="outlined" density="compact" v-model="forms.title"
              :error-messages="errInput(errors.value, 'timeinAdjustment')" />
          </v-col>
          <v-col cols="12" md="4" sm="12">
            <v-switch v-model="forms.publish"
              :label="`Publikasi: ${forms.publish > 0 ? 'Dipublish' : 'Tidak dipublish'}`" hide-details
              inset color="primary"></v-switch>
          </v-col>
          <v-col cols="12" md="12" sm="12">
            <Editor api-key="1y2xcrnwbiunmm74mc7dvp2yufif40ojh4gvq385t4f8bzch" :init="editorConfig" initial-value="Welcome to TinyMCE!" v-model="forms.value" />
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
