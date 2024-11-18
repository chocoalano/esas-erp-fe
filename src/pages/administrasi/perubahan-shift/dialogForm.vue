<script setup>
import { onMounted, ref, watch } from 'vue'
import { usePerubahanShiftStore } from '@/stores/apps/administrasi/perubahan_shift'
import SelectSearchField from '@/components/form-input/SelectSearchField.vue'
import DatePickerField from '@/components/form-input/DatePickerField.vue'
import SelectField from '@/components/form-input/SelectField.vue'

const store = usePerubahanShiftStore()
const loading = computed(() => store.loading)
const errors = computed(() => store.errors)
const dialog = computed(() => store.dialog)
const forms = computed(() => store.forms)
const groupAbsenOptions = computed(() => store.groupAbsenOptions)
const usersOptions = computed(() => store.usersOptions)
const shiftOptions = computed(() => store.shiftOptions)
const usersLineApprovalOptions = computed(() => store.usersLineApprovalOptions)
const usersHrgaApprovalOptions = computed(() => store.usersHrgaApprovalOptions)


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

const statusOption = ref([
{ id: 'y', name: 'Disetujui' },
{ id: 'n', name: 'Ditolak' },
{ id: 'w', name: 'Menunggu persetujuan' },
])
</script>
<template>
  <v-dialog v-model="dialog" max-width="900px">
    <v-card>
      <v-card-title>
        Form Pengajuan Perubahan Shift
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-row>
          <v-col cols="12" md="3" sm="12">
            <SelectSearchField label="Pilih pengguna" :items="usersOptions" v-model="forms.userId"
              @update:model-value="handleChangeFetchUser(forms.userId)" />
          </v-col>
          <v-col cols="12" md="3" sm="12">
            <DatePickerField label="Tanggal" v-model="forms.date" :err="errInput(errors.value, 'date')" @update:model-value="handleChangeFetchSchedule(forms.userId, forms.date)"/>
          </v-col>
          <v-col cols="12" md="3" sm="12">
            <SelectField label="Apakah pengajuan ini disetujui?" :items="statusOption" v-model="forms.status"
              :err="errInput(errors.value, 'status')" />
          </v-col>
          <v-col cols="12" md="3" sm="12">
            <SelectSearchField label="Pilih Grup Absen" :items="groupAbsenOptions" v-model="forms.currentGroup" disabled/>
          </v-col>
          <v-col cols="12" md="3" sm="12">
            <v-autocomplete label="Pilih Shift Sekarang"
              :items="shiftOptions" item-title="type" item-value="id"
              variant="outlined" density="compact" v-model="forms.currentShift" disabled></v-autocomplete>
          </v-col>
          <v-col cols="12" md="3" sm="12">
            <v-autocomplete label="Pilih Shift Diajukan"
              :items="shiftOptions" item-title="type" item-value="id"
              variant="outlined" density="compact" v-model="forms.adjustShift"></v-autocomplete>
          </v-col>
          <v-col cols="12" md="3" sm="12">
            <SelectSearchField label="Pilih line approval" :items="usersLineApprovalOptions" v-model="forms.lineId" />
          </v-col>
          <v-col cols="12" md="3" sm="12">
            <SelectSearchField label="Pilih HRGA approval" :items="usersHrgaApprovalOptions" v-model="forms.hrId" />
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
