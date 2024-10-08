<script setup>
import { onMounted, watch } from 'vue'
import globalMixin from '@/mixins/globalMixin';
import { useCutiStore } from '@/stores/apps/administrasi/cuti'

const store = useCutiStore()
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
const category = ref([
  { id: 'half', name: 'Setengah hari' },
  { id: 'full', name: 'Sepenuhnya' },
  { id: 'suddenly', name: 'Mendadak' },
]);
const type = ref([
  { id: 'cuti tahunan', name: 'Cuti tahunan' },
  { id: 'cuti menikah', name: 'Cuti menikah' },
  { id: 'cuti menikahkan anak', name: 'Cuti menikahkan anak' },
  { id: 'cuti khitan', name: 'Cuti khitan' },
  { id: 'cuti khitanan anak', name: 'Cuti khitanan anak' },
  { id: 'cuti baptis', name: 'Cuti baptis' },
  { id: 'cuti baptis anak', name: 'Cuti baptis anak' },
  { id: 'cuti istri melahirkan/keguguran', name: 'Cuti istri melahirkan/keguguran' },
  { id: 'cuti keluarga meninggal', name: 'Cuti keluarga meninggal' },
  { id: 'cuti anggota keluarga serumah meninggal', name: 'Cuti anggota keluarga serumah meninggal' },
  { id: 'cuti melahirkan', name: 'Cuti melahirkan' },
  { id: 'cuti haid', name: 'Cuti haid' },
  { id: 'cuti keguguran', name: 'Cuti keguguran' },
  { id: 'cuti ibadah haji', name: 'Cuti ibadah haji' },
]);
</script>
<template>
  <v-dialog v-model="dialog" max-width="900px">
    <v-card>
      <v-card-title>
        Form Pengajuan Cuti
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-row>
          <v-col cols="12" md="4" sm="12">
            <SelectSearchField label="Pilih pengguna" :items="usersOptions" v-model="forms.userId"
              @update:model-value="handleChangeFetchUser(forms.userId)" />
          </v-col>
          <v-col cols="12" md="4" sm="12">
            <DatePickerField label="Tanggal mulai" v-model="forms.startDate" :err="handleError('startDate')" />
          </v-col>
          <v-col cols="12" md="4" sm="12">
            <DatePickerField label="Tanggal selesai" v-model="forms.endDate" :err="handleError('endDate')" />
          </v-col>
          <v-col cols="12" md="4" sm="12">
            <v-text-field label="Jam mulai" type="time" variant="outlined" density="compact" v-model="forms.startTime"
              :error-messages="handleError('startTime')" />
          </v-col>
          <v-col cols="12" md="4" sm="12">
            <v-text-field label="Jam selesai" type="time" variant="outlined" density="compact" v-model="forms.endTime"
              :error-messages="handleError('endTime')" />
          </v-col>
          <v-col cols="12" md="4" sm="12">
            <SelectField label="Kategori Cuti" :items="category" v-model="forms.category"
              :error-messages="handleError('category')" />
          </v-col>
          <v-col cols="12" md="12" sm="12">
            <v-textarea label="Keterangan" variant="outlined" v-model="forms.description"
              :error-messages="handleError('description')" />
          </v-col>
          <v-col cols="12" md="4" sm="12">
            <SelectField label="Tipe Cuti" :items="type" v-model="forms.type" :error-messages="handleError('type')" />
          </v-col>
          <v-col cols="12" md="4" sm="12">
            <SelectSearchField label="Pilih line approval" :items="usersLineApprovalOptions" v-model="forms.userLine" />
          </v-col>
          <v-col cols="12" md="4" sm="12">
            <SelectSearchField label="Pilih HRGA approval" :items="usersHrgaApprovalOptions" v-model="forms.userHr" />
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
