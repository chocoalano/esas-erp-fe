<script setup>
import Swal from 'sweetalert2';
import { useCutiStore } from '@/stores/apps/administrasi/cuti';
import { computed, ref } from 'vue';
import globalMixin from '@/mixins/globalMixin';
import DialogForm from './dialogForm.vue';

const store = useCutiStore();
const { hasPermissions, hasRole } = globalMixin.methods;

const list = computed(() => store.meta.data);
const totallist = computed(() => store.meta.totaldata);
const limitlist = computed(() => store.meta.limit);
const loadinglist = computed(() => store.meta.loading);
const searchlist = computed(() => store.meta.search);

const headers = ref([
  { title: 'Nama', sortable: false, key: 'user.name' },
  { title: 'NIK', sortable: false, key: 'user.nik' },
  { title: 'Tanggal Mulai', sortable: false, key: 'startDate' },
  { title: 'Tanggal Selesai', sortable: false, key: 'endDate' },
  { title: 'Jam Mulai', sortable: false, key: 'startTime' },
  { title: 'Jam Selesai', sortable: false, key: 'endTime' },
  { title: 'Kategori', sortable: false, key: 'category' },
  { title: '#', sortable: false, key: 'actions', align: 'end' },
]);

const cekPermissionUpdate = () => hasPermissions('cuti-update') || hasRole('Developer') || hasRole('Administrator');
const cekPermissionDelete = () => hasPermissions('cuti-delete') || hasRole('Developer') || hasRole('Administrator');
// Use object lookup for icons and colors
const iconLookup = {
  y: { icon: 'mdi-check-circle-outline', color: 'primary' },
  n: { icon: 'mdi-close-circle-outline', color: 'error' },
  w: { icon: 'mdi-information-outline', color: 'info' },
};
const getIconData = (status) => iconLookup[status] || { icon: '', color: '' };
const handleCreate = () => {
  store.dialog = !store.dialog
}
const handleEdit = (id) => {
  store.idform = id
  store.editForm(id)
  store.dialog = !store.dialog
}

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
      store.deleteItem(id);
    }
  });
};
</script>

<template>
  <v-data-table-server v-model:items-per-page="limitlist" :headers="headers" :items="list" :items-length="totallist"
    v-model:expanded="store.meta.expanded" :loading="loadinglist" :search="searchlist" item-value="id"
    @update:options="store.fetchData" density="compact" show-expand>
    <template v-slot:top>
      <v-toolbar color="surface">
        <v-toolbar-title>Data cuti karyawan</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-btn class="mr-2" color="primary" variant="outlined" @click="handleCreate()">
          Buat pengajuan
        </v-btn>
        <DialogForm />
        <v-text-field placeholder="Cari data..." variant="outlined" density="compact" class="mt-5 mr-5"
          v-model="searchlist" />
      </v-toolbar>
    </template>
    <template v-slot:loading>
      <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
    </template>
    <!-- expanded list data:start -->
    <template v-slot:expanded-row="{ columns, item }">
      <tr>
        <td :colspan="columns.length">
          <v-row no-gutters>
            <v-col>
              <v-sheet class="ma-2 pa-1">
                <h5 class="text-h5 font-weight-black text-primary">Info pengguna yang mengajukan</h5>
                <v-divider class="mt-2 mb-5" :thickness="7" color="primary"></v-divider>
                <div class="d-flex justify-space-between">
                  <div class="font-weight-black">Nama</div>
                  <div>{{ item.user.name }}</div>
                </div>
                <v-divider class="mt-2 mb-2"></v-divider>
                <div class="d-flex justify-space-between">
                  <div class="font-weight-black">NIK</div>
                  <div>{{ item.user.nik }}</div>
                </div>
                <v-divider class="mt-2 mb-2"></v-divider>
                <div class="d-flex justify-space-between">
                  <div class="font-weight-black">Email</div>
                  <div>{{ item.user.email }}</div>
                </div>
                <v-divider class="mt-2 mb-2"></v-divider>
                <div class="d-flex justify-space-between">
                  <div class="font-weight-black">Telepon/HP</div>
                  <div>{{ item.user.phone }}</div>
                </div>
              </v-sheet>
            </v-col>
            <v-col>
              <v-sheet class="ma-2 pa-1">
                <h5 class="text-h5 font-weight-black text-primary">Info permintaan pengajuan</h5>
                <v-divider class="mt-2 mb-5" :thickness="7" color="primary"></v-divider>
                <div class="d-flex justify-space-between">
                  <div class="font-weight-black">Mulai</div>
                  <div><strong>{{ item.startDate }}</strong> pada jam <strong>{{ item.startTime }}</strong></div>
                </div>
                <v-divider class="mt-2 mb-2"></v-divider>
                <div class="d-flex justify-space-between">
                  <div class="font-weight-black">Selesai</div>
                  <div><strong>{{ item.endDate }}</strong> pada jam <strong>{{ item.endTime }}</strong></div>
                </div>
                <v-divider class="my-2"></v-divider>
                <div class="d-flex justify-space-between">
                  <div class="font-weight-black">Disetujui oleh (Line)</div>
                  <div class="font-weight-black text-primary">{{ item.line.name }} - {{ item.line.nik }}</div>
                  <v-icon :icon="getIconData(item.lineApproved).icon" :color="getIconData(item.lineApproved).color" />
                </div>
                <v-divider class="my-2"></v-divider>
                <div class="d-flex justify-space-between">
                  <div class="font-weight-black">Disetujui oleh (HRGA)</div>
                  <div class="font-weight-black text-info">{{ item.hrga.name }} - {{ item.hrga.nik }}</div>
                  <v-icon :icon="getIconData(item.hrgaApproved).icon" :color="getIconData(item.hrgaApproved).color" />
                </div>
              </v-sheet>
            </v-col>
          </v-row>
        </td>
      </tr>
    </template>
    <!-- expanded list data:end -->
    <!-- Action icons for edit and delete -->
    <template v-slot:item.actions="{ item }">
      <v-icon v-if="cekPermissionUpdate()" class="me-2" size="small" @click="handleEdit(item.id)" icon="mdi-pencil" />
      <v-icon class="me-2" size="small" @click="handleDelete(item.id)" icon="mdi-delete" v-if="cekPermissionDelete()" />
    </template>
  </v-data-table-server>
</template>
