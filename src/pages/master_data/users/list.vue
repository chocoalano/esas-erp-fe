<script setup>
import Swal from 'sweetalert2'
import { useUsersStore } from '@/stores/apps/master-data/users'
import { useUsersTables } from './composables/useUsersTables'
import { useRouter } from 'vue-router'
const router = useRouter()
const store = useUsersStore()
const {
  itemsPerPage,
  search,
  fetchItems,
  headers,
  serverItems,
  totalItems,
  loading
} = useUsersTables()

// Fungsi untuk mengedit item
const editItem = (id) => {
  router.push({ name: 'users-edit', params: { id: id } })
}

// Fungsi untuk mengonfirmasi dan menghapus item
const confirmDeleteItem = (id) => {
  Swal.fire({
    title: "Apakah anda yakin ingin menghapus data ini?",
    text: "Data yang sudah terhapus tidak bisa kami kembalikan lagi!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Ya, hapus sekarang!",
    customClass: {
      confirmButton: 'sweet-confirm-button-class',
      cancelButton: 'sweet-cancel-button-class'
    }
  }).then((result) => {
    if (result.isConfirmed) {
      deleteItem(id)
    }
  })
}

// Fungsi untuk menghapus item
const deleteItem = async (id) => {
  try {
    const response = await store.delete(id)
    if (response.status === 200) {
      Swal.fire({
        title: "Terhapus!",
        text: "Data anda berhasil terhapus.",
        icon: "success",
        customClass: {
          confirmButton: 'sweet-confirm-button-class',
        }
      })
    } else {
      throw new Error('Failed to delete')
    }
  } catch (error) {
    Swal.fire({
      title: "Gagal Terhapus!",
      text: "Data anda gagal terhapus.",
      icon: "error",
      customClass: {
        confirmButton: 'sweet-confirm-button-class',
      }
    })
  }
}
</script>
<template>
  <v-card flat>
    <v-card-title class="d-flex align-center pe-2">
      <v-btn variant="tonal" color="primary"
        v-if="hasPermissions('user-create') || hasRole('Developer') || hasRole('Administrator')"
        :to="{ name: 'users-create' }">
        <v-icon>mdi-pen-plus</v-icon> tambah data
      </v-btn>
      <v-spacer></v-spacer>
      <v-text-field v-model="search" density="compact" variant="outlined" placeholder="Cari data..." class="mt-5" />
    </v-card-title>
    <v-divider></v-divider>
    <v-data-table-server v-model:items-per-page="itemsPerPage" :headers="headers" :items="serverItems"
      :items-length="totalItems" :loading="loading" item-value="name" @update:options="fetchItems">
      <template v-slot:item.gender="{ item }">
        <v-icon :color="item.gender === 'm' ? 'primary' : 'error'">{{ item.gender === 'm' ? 'mdi-gender-male' : 'mdi-gender-female' }}</v-icon>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon class="me-2" size="small" @click="editItem(item.id)"
          v-if="hasPermissions('user-update') || hasRole('Developer') || hasRole('Administrator')">
          mdi-pencil
        </v-icon>
        <v-icon size="small" @click="confirmDeleteItem(item.id)"
          v-if="hasPermissions('user-delete') || hasRole('Developer') || hasRole('Administrator')">
          mdi-delete
        </v-icon>
      </template>
    </v-data-table-server>
  </v-card>
</template>
