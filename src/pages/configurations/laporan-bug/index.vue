<script setup>
import Swal from 'sweetalert2';
import { useLaporanBugStore } from '@/stores/apps/configs/laporan_bug';
import { computed, ref } from 'vue';
import globalMixin from '@/mixins/globalMixin';
import DialogForm from './dialogForm.vue';

// Store initialization
const store = useLaporanBugStore();
const { hasRole, baseFileUrl } = globalMixin.methods;

// Computed properties for reactive data
const list = computed(() => store.meta.data);
const totallist = computed(() => store.meta.totaldata);
const limitlist = computed(() => store.meta.limit);
const loadinglist = computed(() => store.meta.loading);
const searchlist = ref(store.meta.search);

// Table headers
const headers = ref([
  { title: 'Dibuat Oleh', sortable: false, key: 'user_created_by.name' },
  { title: 'Bukti gambar', sortable: false, key: 'pictureProof' },
  { title: 'Status perbaikan', sortable: false, key: 'repairStatus' },
  { title: 'Status progres', sortable: false, key: 'repairProgres' },
  { title: '#', sortable: false, key: 'actions', align: 'end' },
]);

// Permission checks
const cekPermissionUpdate = () => hasRole('Developer') || hasRole('Administrator');
const cekPermissionDelete = () => hasRole('Developer') || hasRole('Administrator');

// Handle creating a new announcement
const handleCreate = () => {
  store.dialog = !store.dialog;
};

// Handle editing an announcement
const handleEdit = (id) => {
  store.idform = id;
  store.editForm(id);
  store.dialog = !store.dialog;
};

// Handle deleting an announcement
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
    <!-- Toolbar -->
    <template v-slot:top>
      <v-toolbar color="surface">
        <v-toolbar-title>Laporan Bug</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-btn class="mr-2" color="primary" variant="outlined" @click="handleCreate">
          Buat Laporan Bug
        </v-btn>
        <DialogForm />
        <v-text-field placeholder="Cari data..." variant="outlined" density="compact" class="mt-5 mr-5"
          v-model="searchlist" />
      </v-toolbar>
    </template>

    <!-- Loading skeleton -->
    <template v-slot:loading>
      <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
    </template>

    <!-- Expanded row for more details -->
    <template v-slot:expanded-row="{ columns, item }">
      <tr>
        <td :colspan="columns.length">
          <div>{{ item.descriptions }}</div>
        </td>
      </tr>
    </template>

    <!-- pictureProof -->
    <template v-slot:item.pictureProof="{ item }">
      <v-img :width="100" aspect-ratio="16/9" cover
        :src="`${baseFileUrl()}/${item.pictureProof}`"></v-img>
    </template>
    <!-- repairStatus -->
    <template v-slot:item.repairStatus="{ item }">
      <div>{{ item.repairStatus ? 'Selesai diperbaiki' : 'Dalam proses perbaikan' }}</div>
    </template>
    <!-- repairProgres -->
    <template v-slot:item.repairProgres="{ item }">
      <v-progress-linear v-model="item.repairProgres" color="primary" height="25" striped>
        <template v-slot:default="{ value }">
          <strong dark>{{ Math.ceil(value) }}%</strong>
        </template>
      </v-progress-linear>
    </template>

    <!-- Action icons for edit and delete -->
    <template v-slot:item.actions="{ item }">
      <v-icon v-if="cekPermissionUpdate()" class="me-2" size="small" @click="handleEdit(item.id)" icon="mdi-pencil" />
      <v-icon v-if="cekPermissionDelete()" class="me-2" size="small" @click="handleDelete(item.id)" icon="mdi-delete" />
    </template>
  </v-data-table-server>
</template>
