<script setup>
import { useDashboardStore } from '@/stores/dashboard';
import { ref, onMounted } from 'vue';
import imgBirthday from '@/assets/birthday.svg'
import imgOffice from '@/assets/office.svg'

const store = useDashboardStore();
const ultah = computed(() => store.ultah);
const quote = computed(() => store.quote);
// Fungsi untuk mengembalikan jam saat ini
const TimeRanges = () => {
  // State reaktif untuk menyimpan jam saat ini
  const currentTime = ref('');

  // Fungsi untuk memperbarui waktu
  const updateTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    currentTime.value = `${hours}:${minutes}:${seconds}`;
  };

  // Update waktu setiap detik
  onMounted(() => {
    store.fetchQuotes()
    updateTime();
    setInterval(updateTime, 1000);
  });

  return currentTime;
};

// Panggil fungsi TimeRanges untuk mendapatkan waktu sekarang
const currentTime = TimeRanges();

// Fungsi untuk menentukan ucapan selamat berdasarkan jam
const ucapanSelamat = () => {
  const now = new Date();
  const hours = now.getHours();

  if (hours >= 5 && hours < 10) {
    return 'Selamat pagi';
  } else if (hours >= 10 && hours < 15) {
    return 'Selamat siang';
  } else if (hours >= 15 && hours < 22) {
    return 'Selamat sore';
  } else {
    return 'Selamat malam';
  }
};
const imageCover = () => {
  return ultah.lenght > 0 ? imgBirthday : imgOffice
};
</script>

<template>
  <v-sheet class="text-body-2 mx-auto">
    <v-container fluid>
      <v-row>
        <v-col cols="12" md="3">
          <v-img height="200" :src="imageCover()" cover></v-img>
        </v-col>

        <v-col cols="12" md="9">
          <div class="d-flex justify-center">
            <p class="text-h4 font-weight-bold">
              {{ ucapanSelamat() }} sobat <strong class="font-weight-black text-primary">ESAS</strong>
            </p>
          </div>
          <v-divider class="mt-5 mb-5" :thickness="3"></v-divider>
          <div class="text-h2 font-weight-black d-flex align-end">{{ currentTime }}</div>
          <div class="text-h6 font-weight-normal">{{ quote }}</div>
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
</template>
