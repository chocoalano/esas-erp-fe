<script setup>
import { watch } from 'vue'
import { useLaporanBugStore } from '@/stores/apps/configs/laporan_bug'

const store = useLaporanBugStore()
const loading = computed(() => store.loading)
const errors = computed(() => store.errors)
const dialog = computed(() => store.dialog)
const forms = computed(() => store.forms)
const imgDialog = computed(() => store.imgDialog)

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
        Form Laporan Bug
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-row>
          <v-col cols="12" md="4" sm="12">
            <v-switch v-model="forms.repairStatus"
              :label="`Status perbaikan: ${forms.repairStatus ? 'Selesai diperbaiki' : 'Dalam proses perbaikan'}`"
              hide-details inset color="primary"></v-switch>
          </v-col>
          <v-col cols="12" md="4" sm="12">
            <div class="text-caption">
              Progress pengerjaan
            </div>
            <v-slider v-model="forms.repairProgres" thumb-label color="primary"></v-slider>
          </v-col>
          <v-col cols="12" md="4" sm="12">
            <v-file-input accept="image/png, image/jpeg, image/jpg" label="Bukti gambar" placeholder="Pick an image"
              prepend-icon="mdi-camera" variant="outlined" density="compact" v-model="forms.pictureProof" />
          </v-col>
          <v-col cols="12" md="12" sm="12" v-if="imgDialog">
            <v-img :lazy-src="`${baseFileUrl()}/${imgDialog}`"
              :src="`${baseFileUrl()}/${imgDialog}`" aspect-ratio="1" class="bg-grey-lighten-2"
              cover max-width="200"/>
          </v-col>
          <v-col cols="12" md="12" sm="12">
            <v-textarea label="Keterangan" variant="outlined" v-model="forms.descriptions"></v-textarea>
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
