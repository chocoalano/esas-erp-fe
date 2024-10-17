<script setup>
import Swal from 'sweetalert2';
import { usePengumumanStore } from '@/stores/apps/master-data/pengumuman';
import { computed, ref } from 'vue';
import DialogForm from './dialogForm.vue';

// Store initialization
const store = usePengumumanStore();

// Computed properties for reactive data
const list = computed(() => store.meta.data);
const totallist = computed(() => store.meta.totaldata);
const limitlist = computed(() => store.meta.limit);
const loadinglist = computed(() => store.meta.loading);
const searchlist = ref(store.meta.search);

// Table headers
const headers = ref([
  { title: 'Dibuat Oleh', sortable: false, key: 'user_created_by.name' },
  { title: 'Status publikasi', sortable: false, key: 'publish' },
  { title: 'Judul', sortable: false, key: 'title' },
  { title: '#', sortable: false, key: 'actions', align: 'end' },
]);

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

// Handle switch change for publication status
const handleSwitchChange = (value, id, data) => {
  const form = {
    title: data.title,
    value: data.value,
    publish: value,
  }
  store.updatePublishStatus(id, form);
  console.log(value)

};
</script>

<template>
  <v-data-table-server v-model:items-per-page="limitlist" :headers="headers" :items="list" :items-length="totallist"
    v-model:expanded="store.meta.expanded" :loading="loadinglist" :search="searchlist" item-value="id"
    @update:options="store.fetchData" density="compact" show-expand>
    <!-- Toolbar -->
    <template v-slot:top>
      <v-toolbar color="surface">
        <v-toolbar-title>Data pengumuman</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-btn class="mr-2" color="primary" variant="outlined" @click="handleCreate">
          Buat pengumuman
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
          <div v-html="item.value"></div>
        </td>
      </tr>
    </template>

    <!-- Publish switch -->
    <template v-slot:item.publish="{ item }">
      <v-switch v-model="item.publish" :label="`Publikasi: ${item.publish ? 'Aktif' : 'Tidak aktif'}`" hide-details
        inset color="primary" @change="handleSwitchChange(item.publish, item.id, item)" />
    </template>

    <!-- Action icons for edit and delete -->
    <template v-slot:item.actions="{ item }">
      <v-icon v-if="hasRole('Developer') || hasRole('Administrator')" class="me-2" size="small" @click="handleEdit(item.id)" icon="mdi-pencil" />
      <v-icon v-if="hasRole('Developer') || hasRole('Administrator')" class="me-2" size="small" @click="handleDelete(item.id)" icon="mdi-delete" />
    </template>
  </v-data-table-server>
</template>
