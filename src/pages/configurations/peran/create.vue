<script setup>
import { computed, onMounted } from 'vue';
import { useRoleStore } from '@/stores/apps/configs/role';

// Initialize store
const store = useRoleStore();

// Computed properties for reactive state
const forms = computed(() => store.forms);
const loading = computed(() => store.loading);
const usersOptions = computed(() => store.usersOptions);
const permissionOptions = computed(() => store.permissionOptions);

// Function to capitalize the first letter of a string
const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

// Function to generate description based on keywords
const description = (name) => {
  const lowerCaseName = name.toLowerCase();
  const keywords = ["view", "create", "update", "delete"];
  const descriptions = {
    view: `Fungsi ini adalah akses untuk mengatur izin pengguna dalam melihat data pada fungsi ${name}`,
    create: `Fungsi ini adalah akses untuk mengatur izin pengguna dalam membuat data pada fungsi ${name}`,
    update: `Fungsi ini adalah akses untuk mengatur izin pengguna dalam memperbaharui data pada fungsi ${name}`,
    delete: `Fungsi ini adalah akses untuk mengatur izin pengguna dalam menghapus data pada fungsi ${name}`,
  };

  const foundKeyword = keywords.find(keyword => lowerCaseName.includes(keyword));
  return foundKeyword ? descriptions[foundKeyword] : `Tidak ditemukan kata kunci yang cocok pada fungsi ${name}`;
};

// Add all user IDs to forms.userId
const setForUserAll = () => {
  forms.value.userId = usersOptions.value.map(user => user.id);
};

// Form submit handler
const onSubmit = () => {
  store.submitForm();
};

// Fetch required form data on component mount
onMounted(() => {
  store.fetchKelengkapanForms();
});
</script>

<template>
  <form @submit.prevent="onSubmit">
    <v-card flat>
      <v-card-title>
        Form Akses Peran Pengguna
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-text-field label="Nama peran" variant="outlined" density="compact" v-model="forms.name"
          append-inner-icon="mdi-account-group-outline" @click:append-inner="setForUserAll" />

        <SelectSearchField label="Pilih pengguna" :items="usersOptions" v-model="forms.userId" chips multiple />

        <v-row>
          <v-col v-for="permission in permissionOptions" :key="permission.id" cols="12" md="4" sm="12">
            <v-sheet rounded-lg class="pa-6 text-white mx-auto" color="background">
              <h4 class="text-h5 font-weight-bold mb-4">
                {{ capitalize(permission.name) }}
              </h4>
              <v-divider class="mb-5"></v-divider>
              <v-list lines="three">
                <v-list-item v-if="Array.isArray(permission.childPermission) && permission.childPermission.length"
                  v-for="child in permission.childPermission" :key="child.id">
                  <template v-slot:prepend="{ isActive }">
                    <v-list-item-action start>
                      <v-checkbox v-model="forms.permissionId" :value="child.id" />
                    </v-list-item-action>
                  </template>
                  <v-list-item-title>
                    {{ capitalize(child.name) }}
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    {{ description(child.name) }}
                  </v-list-item-subtitle>
                </v-list-item>
                <v-list-item v-else>
                  <v-list-item-title>
                    Tidak ada izin anak yang tersedia.
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-sheet>
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn block color="primary" height="50" variant="flat" :loading="loading" type="submit">
          Simpan
        </v-btn>
      </v-card-actions>
    </v-card>
  </form>
</template>
