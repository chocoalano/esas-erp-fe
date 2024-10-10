<script setup>
import { useAppStore } from '@/stores/app'
import { useAuthStore } from '@/stores/apps/auth';
import { useRouter } from 'vue-router';
import { onMounted, getCurrentInstance, onBeforeUnmount, ref } from 'vue'
import { baseFileUrl } from '@/utils/api';
import { showNotification } from '@/plugins/notification'
import esaslogo from '@/assets/logo_esas_putih.svg';
import notifikasiTone from '@/assets/sound/notifikasi.mp3'

const { proxy } = getCurrentInstance();
const socket = proxy.$socket;

const store = useAppStore();
const router = useRouter();

const list = computed(() => store.dataNotification.data);
const totalInfo = computed(() => store.totalInfo);

const handleMenu = () => {
  menuModel.value = !menuModel.value
}
// Fungsi untuk meng-handle event connection dari server
const handleConnection = (data) => {
  const audio = new Audio(notifikasiTone)
  audio.play().catch(error => {
    alert('Error playing notification sound:', error)
    console.error('Error playing notification sound:', error)
  })
  store.fetchNotification()
  showNotification(data.title, {
    body: data.message,
    icon: esaslogo,
  })
}
// Menghubungkan socket saat komponen mounted dan membersihkannya saat unmount
onMounted(() => {
  socket.on('connection', handleConnection);
  store.fetchNotification()
})
onBeforeUnmount(() => {
  socket.off('connection', handleConnection);
})
// Fungsi untuk load item secara dinamis
const load = ({ done }) => {
  store.fetchNotification()
  done('ok')
}
const handleNotifClick = (id, type, payload) => {
  switch (type) {
    case 'login':
    router.push({ name: 'dashboard' })
      break;
    case 'pengajuan-korbsen':
    router.push({ name: 'koreksi-absen' })
      break;
    case 'pengajuan-lembur':
    router.push({ name: 'lembur' })
      break;
    case 'pengajuan-shift':
    router.push({ name: 'perubahan-shift' })
      break;
    case 'pengajuan-cuti':
    router.push({ name: 'cuti' })
      break;
  }
  store.readNotification(id)

  menuModel.value = !menuModel.value
}
const menuModel = ref(false)
const auth = useAuthStore();
const signOut = () => {
  auth.logout()
}
</script>

<template>
  <v-app-bar flat style="position: fixed !important;" color="primary">
    <template v-slot:title>
      <v-img :src="esaslogo" max-width="100"></v-img>
    </template>
    <template v-slot:prepend>
      <v-app-bar-nav-icon @click="store.toggleDrawer"></v-app-bar-nav-icon>
    </template>

    <template v-slot:append>
      <v-menu v-model="menuModel" :close-on-content-click="false">
        <template v-slot:activator="{ props }">
          <v-btn icon @click="handleMenu" v-bind="props">
            <v-badge color="secondary" :content="totalInfo">
              <v-icon>{{ totalInfo > 0 ? 'mdi-bell-ring-outline' : 'mdi-bell-outline' }}</v-icon>
            </v-badge>
          </v-btn>
        </template>
        <v-card flat>
          <v-infinite-scroll height="400" @load="load" mode="manual" v-if="list.length > 0">
            <v-list lines="three" item-props>
              <v-list-item v-for="item in list" :key="item.id"
                :prepend-avatar="`${baseFileUrl()}/${item.fromUser.image}`">
                <v-list-item-title>{{ item.title }}</v-list-item-title>
                <v-list-item-subtitle>
                  <div>NIP : {{ item.fromUser.nik }}</div>
                  <div>Nama : {{ item.fromUser.name }}</div>
                  <div>{{ item.message }}</div>
                  <div :class="item.isread === 'n' ? 'text-primary' : 'text-grey-darken-4'">
                    {{ item.isread === 'n' ? 'Baru' : 'Sudah dilihat' }}
                  </div>
                </v-list-item-subtitle>
                <template v-slot:append>
                  <v-icon @click="handleNotifClick(item.id, item.type, item.payload)">mdi-chevron-right</v-icon>
                </template>
              </v-list-item>
            </v-list>
            <template v-slot:load-more="{ props }">
              <v-btn icon="mdi-refresh" size="large" variant="text" v-bind="props"></v-btn>
            </template>
          </v-infinite-scroll>
          <v-alert v-else icon="mdi-information-outline" text="Anda tidak memiliki informasi pemberitahuan saat ini."
            title="Pemberitahuan" type="error" variant="tonal"></v-alert>
        </v-card>
      </v-menu>

      <v-btn icon>
        <v-icon @click="signOut">mdi-logout</v-icon>
      </v-btn>
    </template>
  </v-app-bar>
</template>
