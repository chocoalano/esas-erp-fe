<script setup>
import Swal from 'sweetalert2';
import { useBranchStore } from '@/stores/apps/configs/branch';
import { onMounted, computed, ref } from 'vue';

const store = useBranchStore();

const formDisabled = ref(true)

const loading = computed(() => store.loading);
const data = computed(() => store.data);

const headerTable = [
  { name: 'Name', class: 'text-left' },
  { name: 'Latitude', class: 'text-left' },
  { name: 'Longitude', class: 'text-left' },
  { name: 'Address', class: 'text-left' },
  { name: '#', class: 'text-left' },
];

const add = () => {
  store.addCabang({
    id: data.value.length + 1,
    name: 'Nama cabang',
    latitude: '0',
    longitude: '0',
    fullAddress: 'Alamat cabang'
  });
};

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
      cancelButton: 'sweet-cancel-button-class'
    }
  }).then((result) => {
    if (result.isConfirmed) {
      store.deleteCabang(id);
    }
  });
};

onMounted(async () => {
  await store.getCabang();
});

const aturForm = () => {
  formDisabled.value = !formDisabled.value
}
const onSubmit = async () => {
  await store.submitForm()
}
</script>

<template>
  <div>
    <v-skeleton-loader type="card" v-if="loading"></v-skeleton-loader>
    <v-card class="mx-auto" flat v-else>
      <form @submit.prevent="onSubmit" :disabled="formDisabled">
        <v-list-item class="px-6">
          <template v-slot:prepend>
            <v-avatar color="surface-light" size="32">
              <v-icon icon="mdi-map-marker-account" />
            </v-avatar>
          </template>
          <template v-slot:title>Form pengaturan cabang perusahaan.</template>
          <template v-slot:append>
            <v-btn @click="add" class="text-none" color="primary" variant="text" slim v-if="!formDisabled">Tambah</v-btn>
            <v-btn @click="aturForm" class="text-none" color="warning" variant="text" slim>Atur data</v-btn>
          </template>
        </v-list-item>
        <v-divider></v-divider>
        <v-table>
          <thead>
            <tr>
              <th v-for="item in headerTable" :key="item.name" :class="item.class">{{ item.name }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in data" :key="item.id">
              <td>
                <v-text-field label="Nama" variant="outlined" class="mt-5" density="compact" v-model="item.name" :disabled="formDisabled"/>
              </td>
              <td>
                <v-text-field label="Latitude" variant="outlined" class="mt-5" density="compact" v-model="item.latitude" :disabled="formDisabled"/>
              </td>
              <td>
                <v-text-field label="Longitude" variant="outlined" class="mt-5" density="compact" v-model="item.longitude" :disabled="formDisabled"/>
              </td>
              <td>
                <v-text-field label="Alamat" variant="outlined" class="mt-5" density="compact" v-model="item.fullAddress" :disabled="formDisabled"/>
              </td>
              <td style="width: 0% !important;">
                <v-icon size="small" @click="handleDelete(item.id)" v-if="store.data.length > 1">mdi-delete</v-icon>
              </td>
            </tr>
          </tbody>
        </v-table>
        <v-divider v-if="!formDisabled"></v-divider>
        <v-card-actions v-if="!formDisabled">
          <v-btn block color="primary" :loading="loading" variant="elevated" type="submit">Simpan</v-btn>
        </v-card-actions>
      </form>
    </v-card>
  </div>
</template>
