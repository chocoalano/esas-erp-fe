<script setup>
import { ref } from "vue";
import { useAppStore } from '@/stores/app';
import { useAuthStore } from '@/stores/apps/auth';
import { useRouter } from 'vue-router';
import { baseFileUrl } from '@/utils/api';

const store = useAppStore();
const auth = useAuthStore();
const router = useRouter();

const masterdata = ref([
  { text: 'Data Pengguna', icon: 'mdi-account-multiple', link: 'users-data', authorization: 'view_user' },
  { text: 'Group Absen Pengguna', icon: 'mdi-access-point-network', link: 'group_absen', authorization: 'attendance-view' },
  { text: 'Jadwal kerja', icon: 'mdi-calendar-account', link: 'jadwal_group_absen', authorization: 'attendance-view' },
]);
const configuration = ref([
  { text: 'Perusahaan', icon: 'mdi-office-building-cog-outline', link: 'company', authorization: 'view_user' },
  { text: 'Lokasi/Cabang', icon: 'mdi-map-marker-account', link: 'cabang', authorization: 'view_user' },
  { text: 'Data Level Karyawan', icon: 'mdi-account-network', link: 'level', authorization: 'view_user' },
  { text: 'Data Departement', icon: 'mdi-account-child-outline', link: 'dept', authorization: 'view_user' },
  { text: 'Data Posisi/Bagian', icon: 'mdi-account-card-outline', link: 'jabatan', authorization: 'view_user' },
  { text: 'Data Jam Absensi', icon: 'mdi-timer-cog', link: 'time', authorization: 'view_user' },
  { text: 'Akses Kontrol Peran', icon: 'mdi-account-cog-outline', link: 'peran-data', authorization: 'view_user' },
]);
const administrasi = ref([
  { text: 'Data Absensi', icon: 'mdi-fingerprint', link: 'absen', authorization: 'attendance-view' },
  { text: 'Koreksi Absensi', icon: 'mdi-map-marker-radius', link: 'koreksi-absen', authorization: 'attendance-view' },
  { text: 'Perubahan Shift', icon: 'mdi-account-switch', link: 'perubahan-shift', authorization: 'shift-view' },
  { text: 'Lembur', icon: 'mdi-clock-plus-outline', link: 'lembur', authorization: 'lembur-view' },
  { text: 'Cuti', icon: 'mdi-head-remove-outline', link: 'cuti', authorization: 'cuti-view' },
]);
const tools = ref([
  { text: 'Pengumuman', icon: 'mdi-information', link: 'pengumuman', authorization: '' },
  { text: 'Laporan Bug', icon: 'mdi-bug-check-outline', link: 'laporan-bug', authorization: '' },
]);
const signOut = () => {
  auth.logout()
}

const drawerSubtitle = () => {
  return auth.user.employe ? auth.user.employe.job.name : auth.user.email
}
const movePage = (link) => {
  router.push({ name: link })
}
</script>

<template>
  <v-navigation-drawer v-model="store.isDrawer" :location="$vuetify.display.mobile ? 'bottom' : undefined"
    style="position: fixed !important;" flat>
    <v-list>
      <v-list-item :prepend-avatar="`${baseFileUrl()}/${auth.user.image}`" :subtitle="drawerSubtitle()"
        :title="auth.user.name">
        <template v-slot:append>
          <v-btn icon="mdi-menu-down" size="small" variant="text" id="menu-account"></v-btn>
          <v-menu activator="#menu-account">
            <v-list density="compact" nav>
              <v-list-item to="profil">
                <template v-slot:prepend>
                  <v-icon icon="mdi-account"></v-icon>
                </template>
                <v-list-item-title>profil</v-list-item-title>
              </v-list-item>
              <v-list-item @click-once="signOut">
                <template v-slot:prepend>
                  <v-icon icon="mdi-logout"></v-icon>
                </template>
                <v-list-item-title>keluar</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </template>
      </v-list-item>
    </v-list>
    <v-divider class="mb-2 mt-2"></v-divider>
    <v-list :lines="false" density="compact" nav>
      <v-list-subheader>Main</v-list-subheader>
      <v-list-item color="primary" value="dashboard" to="dashboard">
        <template v-slot:prepend>
          <v-icon icon="mdi-home"></v-icon>
        </template>
        <v-list-item-title>Dashboard</v-list-item-title>
      </v-list-item>
      <v-divider class="mb-2 mt-2"></v-divider>
      <v-list-subheader>Alat Pendukung</v-list-subheader>
      <div v-for="(item, i) in tools" :key="i">
        <v-list-item :value="item" color="primary" @click="movePage(item.link)"
          v-if="hasPermissions(item.authorization) || hasRole('Developer') || hasRole('Administrator')">
          <template v-slot:prepend>
            <v-icon :icon="item.icon"></v-icon>
          </template>
          <v-list-item-title v-text="item.text"></v-list-item-title>
        </v-list-item>
      </div>
      <v-list-subheader>Konfigurasi</v-list-subheader>
      <div v-for="(item, i) in configuration" :key="i">
        <v-list-item :value="item" color="primary" @click="movePage(item.link)"
          v-if="hasPermissions(item.authorization) || hasRole('Developer') || hasRole('Administrator')">
          <template v-slot:prepend>
            <v-icon :icon="item.icon"></v-icon>
          </template>
          <v-list-item-title v-text="item.text"></v-list-item-title>
        </v-list-item>
      </div>
      <v-divider class="mb-2 mt-2"></v-divider>
      <v-list-subheader>Master Data</v-list-subheader>
      <div v-for="(item, i) in masterdata" :key="i">
        <v-list-item :value="item" color="primary" @click="movePage(item.link)"
          v-if="hasPermissions(item.authorization) || hasRole('Developer') || hasRole('Administrator')">
          <template v-slot:prepend>
            <v-icon :icon="item.icon"></v-icon>
          </template>
          <v-list-item-title v-text="item.text"></v-list-item-title>
        </v-list-item>
      </div>
      <v-divider class="mb-2 mt-2"></v-divider>
      <v-list-subheader>Administrasi</v-list-subheader>
      <div v-for="(item, i) in administrasi" :key="i">
        <v-list-item :value="item" color="primary" @click="movePage(item.link)"
          v-if="hasPermissions(item.authorization) || hasRole('Developer') || hasRole('Administrator')">
          <template v-slot:prepend>
            <v-icon :icon="item.icon"></v-icon>
          </template>
          <v-list-item-title v-text="item.text"></v-list-item-title>
        </v-list-item>
      </div>
    </v-list>
  </v-navigation-drawer>
</template>
