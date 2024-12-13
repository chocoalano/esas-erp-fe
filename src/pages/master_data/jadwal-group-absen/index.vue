<script setup>
import Swal from 'sweetalert2';
import { useJadwalGroupAbsenStore } from '@/stores/apps/master-data/jadwal_group_absen';
import { computed, ref } from 'vue';
import SelectField from '@/components/form-input/SelectField.vue';

const store = useJadwalGroupAbsenStore();

// State to track editable rows
const editableRows = ref([]); // Array of ids for rows being edited

const loading = computed(() => store.loading);
const data = computed(() => store.data);
const totaldata = computed(() => store.totaldata);
const groupOptions = computed(() => store.groupOptions);
const jamOptions = computed(() => store.jamOptions);
const errors = computed(() => store.errors);

const headers = ref([
  { title: 'Nama', sortable: false, key: 'user.name' },
  { title: 'NIK', sortable: false, key: 'user.nik' },
  { title: 'Tanggal', sortable: false, key: 'date' },
  { title: 'Grup Absen', sortable: false, key: 'group_attendance.name' },
  { title: 'Jam Tipe', sortable: false, key: 'time.type' },
  { title: 'Jam Masuk', sortable: false, key: 'time.in' },
  { title: 'Jam Pulang', sortable: false, key: 'time.out' },
  { title: '#', sortable: false, key: 'actions', align: 'end' },
]);

const search = ref('');
const itemsPerPage = ref(10);
const form = ref({
  group_attendance_id: 3, time_attendance_id: 5, start: new Date(), end: new Date()
});

const handleDelete = (id) => {
  Swal.fire({
    title: 'Apakah Anda yakin?',
    text: 'Data ini akan dihapus!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Ya, hapus!',
    cancelButtonText: 'Batal',
    customClass: {
      confirmButton: 'sweet-confirm-button-class',
      cancelButton: 'sweet-cancel-button-class',
    },
  }).then((result) => {
    if (result.isConfirmed) {
      store.deleteJadwalGroupAbsen(id);
    }
  });
};

const handleEdit = (id) => {
  // Toggle the row edit state (enable or disable editing)
  if (editableRows.value.includes(id)) {
    editableRows.value = editableRows.value.filter(rowId => rowId !== id); // Disable edit
  } else {
    editableRows.value.push(id); // Enable edit
  }
};
const handleSaveEdit = (formUpdate) => {
  const { id, userId, groupAttendanceId, timeAttendanceId, date } = formUpdate
  const data = { id: id, user_id: userId, group_attendance_id: groupAttendanceId, time_attendance_id: timeAttendanceId, date: date }
  store.submitEditForm(id, data);
};

const loadItems = async ({ page, itemsPerPage, search }) => {
  await store.getJadwalGroupAbsen({ page, itemsPerPage, search });
};
const handleCreate = () => {
  const { group_attendance_id, time_attendance_id, start, end } = form.value
  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0'); // getMonth() dimulai dari 0
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const startDt = formatDate(start);
  const endDt = formatDate(end);

  store.submitForm({ group: group_attendance_id, time: time_attendance_id, start: startDt, end: endDt });
};

// Check if a row is currently being edited
const isRowEditable = (id) => editableRows.value.includes(id);

</script>

<template>
  <v-data-table-server v-model:items-per-page="itemsPerPage" :headers="headers" :items="data" :items-length="totaldata"
    :loading="loading" :search="search" item-value="id" @update:options="loadItems" density="compact">
    <template v-slot:top>
      <v-toolbar color="surface">
        <v-toolbar-title>Data grup absensi karyawan</v-toolbar-title>
        <v-spacer></v-spacer>
        <!-- start::modal form create -->
        <v-btn icon>
          <v-icon>mdi-plus</v-icon>
          <v-dialog activator="parent" max-width="740">
            <template v-slot:default="{ isActive }">
              <v-card prepend-icon="mdi-picture-in-picture-bottom-right" title="Form buat jadwal grup absen">
                <template v-slot:text>
                  <v-row>
                    <v-col cols="12" md="6" sm="12">
                      <v-select label="Pilih Grup Absen" :items="groupOptions" v-model="form.group_attendance_id"
                        variant="outlined" density="compact" class="mt-5" item-title="name" item-value="id"
                        :error-messages="errInput(errors, 'group_attendance_id')" />
                    </v-col>
                    <v-col cols="12" md="6" sm="12">
                      <v-select label="Pilih Jam Absen" :items="jamOptions" v-model="form.time_attendance_id"
                        variant="outlined" density="compact" class="mt-5" item-title="type" item-value="id"
                        :error-messages="errInput(errors, 'patternName')" />
                    </v-col>
                    <v-col cols="12" md="6" sm="12">
                      <v-card variant="outlined">
                        <v-card-title primary-title>
                          Tanggal Dimulai
                        </v-card-title>
                        <v-date-picker v-model="form.start"></v-date-picker>
                      </v-card>
                    </v-col>
                    <v-col cols="12" md="6" sm="12">
                      <v-card variant="outlined">
                        <v-card-title primary-title>
                          Tanggal Selesai
                        </v-card-title>
                        <v-date-picker v-model="form.end"></v-date-picker>
                      </v-card>
                    </v-col>
                  </v-row>
                </template>
                <v-divider></v-divider>
                <template v-slot:actions>
                  <v-btn text="Simpan" @click="handleCreate()" color="primary"></v-btn>
                  <v-btn text="Tutup" @click="isActive.value = false"></v-btn>
                </template>
              </v-card>
            </template>
          </v-dialog>
        </v-btn>
        <!-- end::modal form create -->
        <v-text-field placeholder="Cari data..." variant="outlined" density="compact" class="mt-5 mr-5"
          v-model="search" />
      </v-toolbar>
    </template>
    <template v-slot:loading>
      <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
    </template>

    <!-- Row fields with editable state -->
    <template v-slot:item.group_attendance.name="{ item }">
      <SelectField label="Pilih Grup Absen" :items="groupOptions" v-model="item.group_attendance.id"
        :disabled="!isRowEditable(item.id)" class="mt-5" />
    </template>
    <template v-slot:item.time.type="{ item }">
      <!-- Null check for time before accessing its properties -->
      <v-select label="Pilih Jam Absen" :items="jamOptions" v-model="item.timeAttendanceId" variant="outlined"
        density="compact" class="mt-5" item-title="type" item-value="id" :disabled="!isRowEditable(item.id)" />
    </template>

    <!-- Action icons for edit and delete -->
    <template v-slot:item.actions="{ item }">
      <v-icon
        v-if="hasRole('Admin-Produksi') || hasRole('Developer') || hasRole('Administrator') && !isRowEditable(item.id)"
        class="me-2" size="small" @click="handleEdit(item.id)" icon="mdi-pencil" />
      <v-icon v-if="isRowEditable(item.id)" class="me-2" size="small" color="primary" @click="handleSaveEdit(item)"
        icon="mdi-content-save" />
      <v-icon v-if="isRowEditable(item.id)" class="me-2" size="small" color="error" @click="handleEdit(item.id)"
        icon="mdi-close-circle" />
      <v-icon v-if="hasRole('Admin-Produksi') || hasRole('Developer') || hasRole('Administrator')" class="me-2" size="small"
        @click="handleDelete(item.id)" icon="mdi-delete" />
    </template>
  </v-data-table-server>
</template>
