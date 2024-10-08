<script setup>
import Swal from 'sweetalert2';
import { useAbsenStore } from '@/stores/apps/administrasi/absen';
import { computed, ref } from 'vue';
import globalMixin from '@/mixins/globalMixin';

const store = useAbsenStore();
const { hasPermissions, hasRole } = globalMixin.methods;

// State to track editable rows
const editableRows = ref([]); // Array of ids for rows being edited

const loading = computed(() => store.loading);
const data = computed(() => store.data);
const totaldata = computed(() => store.totaldata);

const headers = ref([
  { title: 'Nama', sortable: false, key: 'user.name' },
  { title: 'NIK', sortable: false, key: 'nik' },
  { title: 'Tanggal', sortable: false, key: 'date' },
  { title: 'Status Masuk', sortable: false, key: 'statusIn' },
  { title: 'Jam Masuk', sortable: false, key: 'timeIn' },
  { title: 'Jam Pulang', sortable: false, key: 'timeOut' },
  { title: 'Status Pulang', sortable: false, key: 'statusOut' },
  { title: '#', sortable: false, key: 'actions', align: 'end' },
]);

const search = ref('');
const itemsPerPage = ref(10);
const statusAbsen = ref([
  { name: 'Terlambat', id: 'late' },
  { name: 'Tidak Terlambat', id: 'unlate' },
]);

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
      store.deleteAbsen(id);
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
  const { id, nik, scheduleGroupAttendancesId, date, statusIn, statusOut, timeIn, timeOut } = formUpdate
  const dataPost = {
    nik: nik,
    schedule_group_attendances_id:scheduleGroupAttendancesId,
    date:date,
    time_in:timeIn,
    status_in:statusIn,
    time_out:timeOut,
    status_out:statusOut
  }
  store.submitEditForm(id, dataPost);
};

const loadItems = async ({ page, itemsPerPage, search }) => {
  await store.getAbsen({ page, itemsPerPage, search });
};

// Check if a row is currently being edited
const isRowEditable = (id) => editableRows.value.includes(id);

const cekPermissionUpdate = () => hasPermissions('attendance-update') || hasRole('Developer') || hasRole('Administrator');
const cekPermissionDelete = () => hasPermissions('attendance-delete') || hasRole('Developer') || hasRole('Administrator');

</script>

<template>
  <v-data-table-server v-model:items-per-page="itemsPerPage" :headers="headers" :items="data" :items-length="totaldata"
    :loading="loading" :search="search" item-value="id" @update:options="loadItems" density="compact">
    <template v-slot:top>
      <v-toolbar color="surface">
        <v-toolbar-title>Data absensi karyawan</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-text-field placeholder="Cari data..." variant="outlined" density="compact" class="mt-5 mr-5"
          v-model="search" />
      </v-toolbar>
    </template>
    <template v-slot:loading>
      <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
    </template>

    <!-- Row fields with editable state -->
    <template v-slot:item.statusIn="{ item }">
      <v-select label="Status masuk" :items="statusAbsen" v-model="item.statusIn" variant="outlined" density="compact"
        class="mt-5" item-title="name" item-value="id" :disabled="!isRowEditable(item.id)" v-if="cekPermissionUpdate()"/>
        <strong v-else>{{ item.statusIn }}</strong>
    </template>
    <template v-slot:item.timeIn="{ item }">
      <v-text-field label="Jam masuk" type="time" v-model="item.timeIn" variant="outlined" density="compact"
        class="mt-5" :disabled="!isRowEditable(item.id)" v-if="cekPermissionUpdate()"/>
        <strong v-else>{{ item.timeIn }}</strong>
    </template>
    <template v-slot:item.timeOut="{ item }">
      <v-text-field label="Jam pulang" type="time" v-model="item.timeOut" variant="outlined" density="compact"
        class="mt-5" :disabled="!isRowEditable(item.id)" v-if="cekPermissionUpdate()"/>
        <strong v-else>{{ item.timeOut }}</strong>
    </template>
    <template v-slot:item.statusOut="{ item }">
      <v-select label="Status pulang" :items="statusAbsen" v-model="item.statusOut" variant="outlined" density="compact"
        class="mt-5" item-title="name" item-value="id" :disabled="!isRowEditable(item.id)" v-if="cekPermissionUpdate()"/>
        <strong v-else>{{ item.statusOut }}</strong>
    </template>

    <!-- Action icons for edit and delete -->
    <template v-slot:item.actions="{ item }">
      <v-icon v-if="!isRowEditable(item.id) && cekPermissionUpdate()" class="me-2" size="small" @click="handleEdit(item.id)" icon="mdi-pencil" />
      <v-icon v-if="isRowEditable(item.id)" class="me-2" size="small" color="primary" @click="handleSaveEdit(item)"
        icon="mdi-content-save" />
      <v-icon v-if="isRowEditable(item.id)" class="me-2" size="small" color="error" @click="handleEdit(item.id)"
        icon="mdi-close-circle" />
      <v-icon class="me-2" size="small" @click="handleDelete(item.id)" icon="mdi-delete" v-if="cekPermissionDelete()"/>
    </template>
  </v-data-table-server>
</template>
