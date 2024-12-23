<script setup>
import { ref, computed, onMounted } from 'vue';
import { useJadwalGroupAbsenStore } from '@/stores/apps/master-data/jadwal_group_absen';

// Inisialisasi store
const store = useJadwalGroupAbsenStore();

// Computed properties untuk data dari store
const groupOptions = computed(() => store.groupOptions);
const jamOptions = computed(() => store.jamOptions);
const userOptions = computed(() => store.userOptions);

// State untuk items (form repeater)
const items = ref([
  { group_attendance_id: '', user_id: [], time_attendance_id: '', date_start: new Date(), date_finish: new Date() },
]);

// Fungsi untuk menambahkan item baru
const addItem = () => {
  items.value.push({ group_attendance_id: '', user_id: [], time_attendance_id: '', date_start: new Date(), date_finish: new Date() });
};

// Fungsi untuk menghapus item berdasarkan indeks
const removeItem = (index) => {
  if (items.value.length > 1) {
    items.value.splice(index, 1);
  }
};

// Fungsi untuk memuat data dari store
const loadFormAttributes = async (id) => {
  try {
    await store.get_attr_form();
  } catch (error) {
    console.error('Error loading form attributes:', error);
  }
};
const saveData = async () => {
  const arr = [];

  // Iterasi setiap item
  items.value.forEach(el => {
    const dateStart = new Date(el.date_start);
    const dateFinish = new Date(el.date_finish);
    for (let currentDate = new Date(dateStart); currentDate <= dateFinish; currentDate.setDate(currentDate.getDate() + 1)) {
      el.user_id.forEach(userId => {
        arr.push({
          group_attendance_id: el.group_attendance_id,
          user_id: userId,
          time_attendance_id: el.time_attendance_id,
          date: new Date(currentDate).toISOString().split('T')[0], // Format ke 'yyyy-mm-dd'
        });
      });
    }
  })
  store.submitForm(arr)
}

// Panggil fungsi loadFormAttributes saat komponen dimuat
onMounted(loadFormAttributes);
</script>

<template>
  <v-container>
    <div v-for="(item, index) in items" :key="index">
      <v-card align="center" variant="flat" class="mt-2">
        <v-sheet>
          <v-card-item>
            <template v-slot:append>
              <v-btn icon="$close" size="large" variant="text" @click="removeItem(index)" />
            </template>
          </v-card-item>
        </v-sheet>
        <v-card-text>
          <v-row>
            <v-col md="12">
              <v-autocomplete :items="userOptions" item-title="name" item-value="id" density="compact"
                variant="outlined" label="Pilih user" v-model="item.user_id" multiple clearable />
            </v-col>
            <v-col>
              <v-autocomplete :items="jamOptions" item-title="type" item-value="id" density="compact" variant="outlined"
                label="Pilih jam kerja" v-model="item.time_attendance_id" />
            </v-col>
            <v-col>
              <v-date-input label="Pilih tanggal dimulai" v-model="item.date_start" density="compact" variant="outlined"
                prepend-icon="$calendar" />
            </v-col>
            <v-col>
              <v-date-input label="Pilih tanggal sampai dengan" v-model="item.date_finish" density="compact"
                variant="outlined" prepend-icon="$calendar" />
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </div>
    <v-row class="mt-5">
      <v-col cols="6" class="text-center">
        <v-btn color="primary" @click="addItem" block>Tambah Item</v-btn>
      </v-col>
      <v-col cols="6" class="text-center">
        <v-btn color="info" @click="saveData" block>Simpan</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
