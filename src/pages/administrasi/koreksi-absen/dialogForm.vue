<script setup>
import { onMounted, ref, watch } from 'vue'
import globalMixin from '@/mixins/globalMixin';
import { useKoreksiAbsenStore } from '@/stores/apps/administrasi/koreksi_absen'

const store = useKoreksiAbsenStore()
const loading = computed(() => store.loading)
const errors = computed(() => store.errors)
const dialog = computed(() => store.dialog)
const forms = computed(() => store.forms)
const usersOptions = computed(() => store.usersOptions)
const usersLineApprovalOptions = computed(() => store.usersLineApprovalOptions)
const usersHrgaApprovalOptions = computed(() => store.usersHrgaApprovalOptions)

const { errInput } = globalMixin.methods

const close = () => {
  store.dialog = !store.dialog
}
const save = () => {
  store.submitForm(store.idform)
}
const handleChangeFetchUser = (userId) => {
  store.fetchUserApprovalOptions(userId)
}
const handleChangeFetchSchedule = (userId, tanggal) => {
  store.fetchCurrentScheduleOptions(userId, tanggal)
}

onMounted(() => {
  store.fetchUsers()
})

watch(() => store.dialog, (v) => {
  if (v === false) {
    store.idform = null
    store.resetForms()
  }
})

const handleError = (field) => errInput(errors.value, field);
</script>
<template>
  <v-dialog v-model="dialog" max-width="900px">
    <v-card>
      <v-card-title>
        Form Pengajuan Koreksi Absensi
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-row>
          <v-col cols="12" md="4" sm="12">
            <SelectSearchField label="Pilih pengguna" :items="usersOptions" v-model="forms.userId"
              @update:model-value="handleChangeFetchUser(forms.userId)" :err="handleError('userId')"/>
          </v-col>
          <v-col cols="12" md="4" sm="12">
            <v-text-field label="Pilih jam masuk diajukan" type="time" variant="outlined" density="compact" v-model="forms.timeinAdjustment" :error-messages="handleError('timeinAdjustment')"/>
          </v-col>
          <v-col cols="12" md="4" sm="12">
            <v-text-field label="Pilih jam pulang diajukan" type="time" variant="outlined" density="compact" v-model="forms.timeoutAdjustment" :error-messages="handleError('timeoutAdjustment')"/>
          </v-col>
          <v-col cols="12" md="4" sm="12">
            <DatePickerField label="Tanggal" v-model="forms.dateAdjustment" :err="handleError('dateAdjustment')" />
          </v-col>
          <v-col cols="12" md="4" sm="12">
            <SelectSearchField label="Pilih line approval" :items="usersLineApprovalOptions" v-model="forms.lineId" :err="handleError('lineId')"/>
          </v-col>
          <v-col cols="12" md="4" sm="12">
            <SelectSearchField label="Pilih HRGA approval" :items="usersHrgaApprovalOptions" v-model="forms.hrId" :err="handleError('hrId')"/>
          </v-col>
          <v-col cols="12" md="12" sm="12">
            <v-textarea label="Keterangan" variant="outlined" v-model="forms.notes" :error-messages="handleError('notes')" />
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
