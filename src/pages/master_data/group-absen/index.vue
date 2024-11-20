<script setup>
import Swal from 'sweetalert2';
import { useGroupAbsenStore } from '@/stores/apps/master-data/group_absen';
import { computed, ref } from 'vue';
import SelectSearchField from '@/components/form-input/SelectSearchField.vue';

const store = useGroupAbsenStore();

// State to keep track of expanded rows
const expanded = ref([]);

// State to track editable rows
const editableRows = ref([]); // Array of ids for rows being edited

const loading = computed(() => store.loading);
const data = computed(() => store.data);
const totaldata = computed(() => store.totaldata);
const userOptions = computed(() => store.userOptions);
const errors = computed(() => store.errors);

const headers = ref([
  { title: 'Nama', sortable: false, key: 'name' },
  { title: 'Deskripsi', sortable: false, key: 'description' },
  { title: 'Pattern', sortable: false, key: 'patternName' },
  { title: '#', sortable: false, key: 'actions', align: 'end' },
]);

const search = ref('');
const itemsPerPage = ref(10);
const loadingUser = ref(false);
const form = ref({
  name: '', description: '', patternName: ''
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
      store.deleteGroupAbsen(id);
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
const handleSaveEdit = (id, name, description, patternName) => {
  const data = { id, name, description, patternName }
  store.submitForm(data);
};

const loadItems = async ({ page, itemsPerPage, search }) => {
  await store.getGroupAbsen({ page, itemsPerPage, search });
};

const submitUser = (items) => {
  const uId = items.users.map(({id})=>id)
  const forms = {
    groupId: items.groupId,
    users: uId
  }

  store.submitForm(forms);
};
const handleCreate = () => {
  store.submitForm(form.value);
};

// Check if a row is currently being edited
const isRowEditable = (id) => editableRows.value.includes(id);

</script>

<template>
  <v-data-table-server v-model:items-per-page="itemsPerPage" :headers="headers" :items="data" :items-length="totaldata"
    :loading="loading" :search="search" item-value="id" @update:options="loadItems" show-expand
    v-model:expanded="expanded">
    <template v-slot:top>
      <v-toolbar color="surface">
        <v-toolbar-title>Data grup absensi karyawan</v-toolbar-title>
        <v-spacer></v-spacer>

        <v-btn icon>
          <v-icon>mdi-plus</v-icon>
          <v-dialog activator="parent" max-width="740">
            <template v-slot:default="{ isActive }">
              <v-card prepend-icon="mdi-picture-in-picture-bottom-right" title="Form tambah grup absen">
                <template v-slot:text>
                  <v-row>
                    <v-col cols="12" md="6" sm="12">
                      <v-text-field label="Nama" variant="outlined" density="compact" v-model="form.name" :error-messages="errInput(errors, 'name')"/>
                    </v-col>
                    <v-col cols="12" md="6" sm="12">
                      <v-select label="Pattern" :items="[
                        'production', 'office', 'warehouse', 'maintenance', 'admin'
                      ]" variant="outlined" density="compact" v-model="form.patternName" :error-messages="errInput(errors, 'patternName')"/>
                    </v-col>
                    <v-col cols="12" md="12" sm="12">
                      <v-text-field label="Deskripsi" variant="outlined" density="compact" v-model="form.description" :error-messages="errInput(errors, 'description')"/>
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
        <v-text-field placeholder="Cari data..." variant="outlined" density="compact" class="mt-5 mr-5"
          v-model="search" />
      </v-toolbar>
    </template>
    <template v-slot:loading>
      <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
    </template>

    <!-- Expanded row template for user editing -->
    <template v-slot:expanded-row="{ columns, item }">
      <tr>
        <td :colspan="columns.length">
          <v-sheet class="mx-auto mt-5 mb-5">
            <v-form fast-fail @submit.prevent="submitUser({ groupId: item.id, users: item.group_users })">
              <SelectSearchField label="Pengguna" :items="userOptions" v-model="item.group_users" multiple chips
                clearable />
              <v-btn class="mt-2" type="submit" block color="primary" :loading="loadingUser">
                Simpan
              </v-btn>
            </v-form>
          </v-sheet>
        </td>
      </tr>
    </template>

    <!-- Row fields with editable state -->
    <template v-slot:item.name="{ item }">
      <v-text-field label="Nama" variant="outlined" class="mt-5" density="compact" v-model="item.name"
        :disabled="!isRowEditable(item.id)" />
    </template>

    <template v-slot:item.description="{ item }">
      <v-text-field label="Deskripsi" variant="outlined" class="mt-5" density="compact" v-model="item.description"
        :disabled="!isRowEditable(item.id)" />
    </template>

    <template v-slot:item.patternName="{ item }">
      <v-select label="Pattern" :items="['production', 'office', 'warehouse', 'maintenance', 'admin']"
        variant="outlined" class="mt-5" density="compact" v-model="item.patternName"
        :disabled="!isRowEditable(item.id)" />
    </template>

    <!-- Action icons for edit and delete -->
    <template v-slot:item.actions="{ item }">
      <v-icon v-if="!isRowEditable(item.id)" class="me-2" size="small" @click="handleEdit(item.id)" icon="mdi-pencil" />
      <v-icon v-if="isRowEditable(item.id)" class="me-2" size="small" color="primary"
        @click="handleSaveEdit(item.id, item.name, item.description, item.patternName)" icon="mdi-content-save" />
      <v-icon v-if="isRowEditable(item.id)" class="me-2" size="small" color="error" @click="handleEdit(item.id)"
        icon="mdi-close-circle" />
      <v-icon class="me-2" size="small" @click="handleDelete(item.id)" icon="mdi-delete" />
    </template>
  </v-data-table-server>
</template>
