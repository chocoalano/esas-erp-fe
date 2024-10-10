<script setup>
import Swal from 'sweetalert2';
import { useLemburStore } from '@/stores/apps/administrasi/lembur';
import { computed, ref } from 'vue';

const store = useLemburStore();

// State to track editable rows
const editableRows = ref([])
const dialog = ref(false)

const loading = computed(() => store.loading);
const data = computed(() => store.meta.data);
const totaldata = computed(() => store.meta.totaldata);
const search = computed(() => store.meta.search);
const forms = computed(() => store.forms);
const users = computed(() => store.users);
const organizations = computed(() => store.organizations);
const positions = computed(() => store.positions);
const usersDataAdm = computed(() => store.usersDataAdm);
const usersDataLine = computed(() => store.usersDataLine);
const usersDataGm = computed(() => store.usersDataGm);
const usersDataHr = computed(() => store.usersDataHr);
const usersDataDirector = computed(() => store.usersDataDirector);
const usersDataFat = computed(() => store.usersDataFat);

const headers = ref([
  { title: 'Nama', sortable: false, key: 'user.name' },
  { title: 'NIK', sortable: false, key: 'user.nik' },
  { title: 'Tanggal Diajukan', sortable: false, key: 'dateSpl' },
  { title: 'Tanggal Dilaksanakan', sortable: false, key: 'dateOvertimeAt' },
  { title: 'Persetujuan Adm', sortable: false, key: 'adminApproved' },
  { title: 'Persetujuan Line', sortable: false, key: 'lineApproved' },
  { title: 'Persetujuan GM', sortable: false, key: 'gmApproved' },
  { title: 'Persetujuan HR', sortable: false, key: 'hrgaApproved' },
  { title: 'Persetujuan Direktur', sortable: false, key: 'directorApproved' },
  { title: 'Persetujuan FAT', sortable: false, key: 'fatApproved' },
  { title: '#', sortable: false, key: 'actions', align: 'end' },
]);
const itemsPerPage = ref(10);
const statusApprove = ref([
  { name: 'Terima', id: 'y' },
  { name: 'Tolak', id: 'n' },
  { name: 'Menunggu', id: 'w' },
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
  if (editableRows.value.includes(id)) {
    editableRows.value = editableRows.value.filter(rowId => rowId !== id);
  } else {
    editableRows.value.push(id);
  }
};
const handleSaveEdit = (formUpdate) => {
  const { id, ...dataPost } = formUpdate;
  store.submitEditForm(id, dataPost);
};

const loadItems = async ({ page, itemsPerPage, search }) => {
  await store.getAbsen({ page, itemsPerPage, search });
};

// Check if a row is currently being edited
const isRowEditable = (id) => editableRows.value.includes(id);
const iconMapping = {
  y: { icon: 'mdi-check-circle-outline', color: 'primary' },
  n: { icon: 'mdi-close-circle-outline', color: 'error' },
  w: { icon: 'mdi-information-slab-circle-outline', color: 'info' },
};

const handleSubmitFormAdd = () => {
  store.submitForm()
  dialog.value = !dialog.value
}
const handleChangeFetchUser = (organizationId, jobPositionId) => {
  store.fetchUser(organizationId, jobPositionId)
}
const handleChangeFetchApproval = (userId) => {
  store.fetchUserApproval(userId)
}

</script>

<template>
  <v-data-table-server v-model:items-per-page="itemsPerPage" :headers="headers" :items="data" :items-length="totaldata"
    :loading="loading" :search="search" item-value="id" @update:options="loadItems" density="compact">
    <template v-slot:top>
      <v-toolbar color="surface">
        <v-toolbar-title>Data lembur karyawan</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" transition="dialog-bottom-transition" fullscreen>
          <template v-slot:activator="{ props: activatorProps }">
            <v-btn class="ms-5" icon="mdi-plus-circle-multiple-outline" v-bind="activatorProps"></v-btn>
          </template>

          <v-card>
            <v-toolbar color="primary">
              <v-btn icon="mdi-close" @click="dialog = false"></v-btn>
              <v-toolbar-title>Form Lembur</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-toolbar-items>
                <v-btn text="tambahkan users" variant="text" @click="store.addForm()"></v-btn>
                <v-btn text="buat dan ajukan lembur sekarang" variant="text" @click="handleSubmitFormAdd"></v-btn>
              </v-toolbar-items>
            </v-toolbar>
            <v-card-text>
              <Alert msg="Pastikan pengajuan ini telah disetujui oleh pengguna yang diajukan!" />
              <v-sheet class="ma-2 pa-2 mx-auto" border="md" v-for="(item, index) in forms" :key="index">
                <div class="d-flex justify-space-between">
                  <strong>Users {{ index + 1 }}</strong>
                  <v-btn class="text-none" color="error" variant="flat" width="90" rounded
                    @click="store.delForm(index)">
                    Hapus
                  </v-btn>
                </div>
                <v-divider class="mb-4 mt-2"></v-divider>
                <v-row>
                  <v-col cols="12" md="2" sm="12">
                    <DatePickerField label="Tanggal diajukan" v-model="item.dateSpl" />
                  </v-col>
                  <v-col cols="12" md="2" sm="12">
                    <DatePickerField label="Tanggal dikerjakan" v-model="item.dateOvertimeAt" />
                  </v-col>
                  <v-col cols="12" md="2" sm="12">
                    <SelectSearchField label="Departemen" :items="organizations" v-model="item.organizationId" @update:model-value="handleChangeFetchUser(item.organizationId, item.jobPositionId)" />
                  </v-col>
                  <v-col cols="12" md="2" sm="12">
                    <SelectSearchField label="Jabatan" :items="positions" v-model="item.jobPositionId" @update:model-value="handleChangeFetchUser(item.organizationId, item.jobPositionId)" />
                  </v-col>
                  <v-col cols="12" md="2" sm="12">
                    <SelectSearchField label="User diajukan" :items="users" v-model="item.userIdCreated" @update:model-value="handleChangeFetchApproval(item.userIdCreated)"/>
                  </v-col>
                  <v-col cols="12" md="2" sm="12">
                    <v-switch v-model="item.overtimeDayStatus"
                      :label="`Apakah user ini mengetujui?: ${item.overtimeDayStatus ? 'Ya' : 'Tidak'}`" hide-details
                      inset color="primary"></v-switch>
                  </v-col>
                  <v-col cols="12" md="2" sm="12" v-if="item.userIdCreated !==''">
                    <SelectSearchField label="Pilih ADM pengajuan ini" :items="usersDataAdm" v-model="item.userAdm" />
                  </v-col>
                  <v-col cols="12" md="2" sm="12" v-if="item.userIdCreated !==''">
                    <SelectSearchField label="Pilih Line pengajuan ini" :items="usersDataLine" v-model="item.userLine" />
                  </v-col>
                  <v-col cols="12" md="2" sm="12" v-if="item.userIdCreated !==''">
                    <SelectSearchField label="Pilih GM pengajuan ini" :items="usersDataGm" v-model="item.userGm" />
                  </v-col>
                  <v-col cols="12" md="2" sm="12" v-if="item.userIdCreated !==''">
                    <SelectSearchField label="Pilih HR pengajuan ini" :items="usersDataHr" v-model="item.userHr" />
                  </v-col>
                  <v-col cols="12" md="2" sm="12" v-if="item.userIdCreated !==''">
                    <SelectSearchField label="Pilih Director pengajuan ini" :items="usersDataDirector" v-model="item.userDirector" />
                  </v-col>
                  <v-col cols="12" md="2" sm="12" v-if="item.userIdCreated !==''">
                    <SelectSearchField label="Pilih FAT pengajuan ini" :items="usersDataFat" v-model="item.userFat" />
                  </v-col>
                </v-row>
              </v-sheet>
            </v-card-text>
          </v-card>
        </v-dialog>
        <v-divider class="mx-3 align-self-center" length="24" thickness="2" vertical></v-divider>
        <v-text-field placeholder="Cari data..." variant="outlined" density="compact" class="mt-5 mr-5"
          v-model="search" />
      </v-toolbar>
    </template>
    <template v-slot:loading>
      <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
    </template>

    <!-- Row fields with editable state::started -->
    <template v-slot:item.adminApproved="{ item }">
      <v-select label="Persetujuan Admin" :items="statusApprove" v-model="item.adminApproved" variant="outlined"
        density="compact" class="mt-5" item-title="name" item-value="id" :disabled="!isRowEditable(item.id)"
        v-if="isRowEditable(item.id)" />
        <v-icon v-else :color="iconMapping[item.adminApproved].color">{{ iconMapping[item.adminApproved].icon }}</v-icon>
    </template>
    <template v-slot:item.lineApproved="{ item }">
      <v-select label="Persetujuan Line" :items="statusApprove" v-model="item.lineApproved" variant="outlined"
        density="compact" class="mt-5" item-title="name" item-value="id" :disabled="!isRowEditable(item.id)"
        v-if="isRowEditable(item.id)" />
        <v-icon v-else :color="iconMapping[item.lineApproved].color">{{ iconMapping[item.lineApproved].icon }}</v-icon>
    </template>
    <template v-slot:item.gmApproved="{ item }">
      <v-select label="Persetujuan GM" :items="statusApprove" v-model="item.gmApproved" variant="outlined"
        density="compact" class="mt-5" item-title="name" item-value="id" :disabled="!isRowEditable(item.id)"
        v-if="isRowEditable(item.id)" />
        <v-icon v-else :color="iconMapping[item.gmApproved].color">{{ iconMapping[item.gmApproved].icon }}</v-icon>
    </template>
    <template v-slot:item.hrgaApproved="{ item }">
      <v-select label="Persetujuan HR" :items="statusApprove" v-model="item.hrgaApproved" variant="outlined"
        density="compact" class="mt-5" item-title="name" item-value="id" :disabled="!isRowEditable(item.id)"
        v-if="isRowEditable(item.id)" />
        <v-icon v-else :color="iconMapping[item.hrgaApproved].color">{{ iconMapping[item.hrgaApproved].icon }}</v-icon>
    </template>
    <template v-slot:item.directorApproved="{ item }">
      <v-select label="Persetujuan Direktur" :items="statusApprove" v-model="item.directorApproved" variant="outlined"
        density="compact" class="mt-5" item-title="name" item-value="id" :disabled="!isRowEditable(item.id)"
        v-if="isRowEditable(item.id)" />
        <v-icon v-else :color="iconMapping[item.directorApproved].color">{{ iconMapping[item.directorApproved].icon }}</v-icon>
    </template>
    <template v-slot:item.fatApproved="{ item }">
      <v-select label="Persetujuan FAT" :items="statusApprove" v-model="item.fatApproved" variant="outlined"
        density="compact" class="mt-5" item-title="name" item-value="id" :disabled="!isRowEditable(item.id)"
        v-if="isRowEditable(item.id)" />
        <v-icon v-else :color="iconMapping[item.fatApproved].color">{{ iconMapping[item.fatApproved].icon }}</v-icon>
    </template>
    <!-- Row fields with editable state::ended -->

    <!-- Action icons for edit and delete -->
    <template v-slot:item.actions="{ item }">
      <v-icon v-if="!isRowEditable(item.id) && hasPermissions('lembur-update') || hasRole('Developer') || hasRole('Administrator')" class="me-2" size="small"
        @click="handleEdit(item.id)" icon="mdi-pencil" />
      <v-icon v-if="isRowEditable(item.id)" class="me-2" size="small" color="primary" @click="handleSaveEdit(item)"
        icon="mdi-content-save" />
      <v-icon v-if="isRowEditable(item.id)" class="me-2" size="small" color="error" @click="handleEdit(item.id)"
        icon="mdi-close-circle" />
      <v-icon class="me-2" size="small" @click="handleDelete(item.id)" icon="mdi-delete" v-if="hasPermissions('lembur-delete') || hasRole('Developer') || hasRole('Administrator')" />
    </template>
  </v-data-table-server>
</template>
