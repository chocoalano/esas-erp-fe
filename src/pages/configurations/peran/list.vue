<script setup>
import Swal from 'sweetalert2'
import { useRoleStore } from '@/stores/apps/configs/role'
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const store = useRoleStore()
const router = useRouter()

// Menggunakan ref untuk data yang bisa diubah
const itemsPerPage = ref(store.datatables.limit)
const search = ref(store.datatables.search)
const expanded = ref(store.datatables.expanded)

// computed untuk data yang tidak diubah secara langsung
const serverItems = computed(() => store.datatables.data)
const totalItems = computed(() => store.datatables.totaldata)
const loading = computed(() => store.datatables.loading)

const headers = ref([
  { title: 'Nama', sortable: false, key: 'name' },
  { title: 'Waktu dibuat', sortable: false, key: 'createdAt' },
  { title: 'Waktu diperbaharui', sortable: false, key: 'updatedAt' },
  { title: '#', sortable: false, key: 'actions', align: 'end' },
])

// Menggunakan watch untuk sinkronisasi perubahan ke store
watch([itemsPerPage, search, expanded], ([newItemsPerPage, newSearch, newExpanded]) => {
  store.datatables.limit = newItemsPerPage
  store.datatables.search = newSearch
  store.datatables.expanded = newExpanded
})

const loadItems = async ({ page, itemsPerPage, search }) => {
  await store.fetchData({ page, itemsPerPage, search })
};

const handleEdit = (id) => {
  router.push({ name: 'peran-edit', params: { id: id } })
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

const creaeMove = () => {
  router.push({ name: 'peran-create' })
}
</script>

<template>
  <v-data-table-server v-model:items-per-page="itemsPerPage" :headers="headers" :items="serverItems"
    :items-length="totalItems" :loading="loading" v-model:search="search" item-value="id" @update:options="loadItems"
    v-model:expanded="expanded" show-expand>
    <template v-slot:loading>
      <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
    </template>
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Data akses peran pengguna</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon class="mr-5" @click="creaeMove()">
          <v-icon>mdi-plus-circle-outline</v-icon>
        </v-btn>
        <v-text-field v-model="search" density="compact" label="Search" prepend-inner-icon="mdi-magnify"
          variant="solo-filled" flat hide-details single-line class="mr-5"></v-text-field>
      </v-toolbar>
    </template>
    <template v-slot:expanded-row="{ columns, item }">
      <tr>
        <td :colspan="columns.length">
          <v-row no-gutters>
            <v-col>
              <v-sheet class="ma-2 pa-1">
                <h5 class="text-h5 font-weight-black text-primary">Info pengguna</h5>
                <v-divider class="mt-2 mb-5" :thickness="7" color="primary"></v-divider>
                <v-chip class="ma-2" label v-for="i in item.users" :key="i.id">
                  {{ i.name }}
                </v-chip>
              </v-sheet>
            </v-col>
            <v-col>
              <v-sheet class="ma-2 pa-1">
                <h5 class="text-h5 font-weight-black text-primary">Info akses</h5>
                <v-divider class="mt-2 mb-5" :thickness="7" color="primary"></v-divider>
                <v-chip class="ma-2" label v-for="i in item.permissions" :key="i.id">
                  {{ i.name }}
                </v-chip>
              </v-sheet>
            </v-col>
          </v-row>
        </td>
      </tr>
    </template>
    <!-- Action icons for edit and delete -->
    <template v-slot:item.actions="{ item }">
      <v-icon v-if="hasRole('Developer') || hasRole('Administrator')" class="me-2" size="small" @click="handleEdit(item.id)" icon="mdi-pencil" />
      <v-icon class="me-2" size="small" @click="handleDelete(item.id)" icon="mdi-delete" v-if="hasRole('Developer') || hasRole('Administrator')" />
    </template>
  </v-data-table-server>
</template>
