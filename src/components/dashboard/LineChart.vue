<script setup>
import { useDashboardStore } from '@/stores/dashboard';
import { onMounted, ref, computed, watch } from 'vue';
import ApexCharts from 'vue3-apexcharts';

// Store
const store = useDashboardStore();

// State
const filter = ref('bulan');
const chartLabel = computed(() => store.chartData.label);
const chartData = computed(() => store.chartData.data);

// Fetch data based on filter value
const fetchData = () => store.fetchLine(filter.value);

// Reactive chart options and series
const chartOptions = ref({
  chart: { type: 'bar', toolbar: { show: true } },
  stroke: { curve: 'smooth' },
  colors: ['#079246'],
  xaxis: { categories: [] },
  noData: { text: 'Loading...' }
});

const chartSeries = ref([{ name: 'Karyawan terlambat', data: [] }]);

// Key to force re-rendering of ApexCharts
const chartKey = ref(0);

// Watchers to update chart options and series reactively
watch(chartLabel, (newVal) => {
  chartOptions.value.xaxis.categories = newVal;
  chartKey.value++; // Increment key to force re-render
});

watch(chartData, (newVal) => {
  chartSeries.value[0].data = newVal;
});

// Fetch initial data on mount
onMounted(fetchData);
</script>

<template>
  <v-card class="mx-auto" prepend-icon="mdi-fingerprint" flat append-icon="mdi-refresh" @click.append="fetchData">
    <template v-slot:title>
      <span class="font-weight-black">Grafik absensi terlambat</span>
    </template>
    <v-card-text>
      <v-select
        label="Filter data"
        :items="['tahun', 'bulan', 'hari']"
        variant="outlined"
        density="compact"
        v-model="filter"
        @update:model-value="fetchData"
      />
    </v-card-text>
    <v-card-text>
      <ApexCharts :key="chartKey" type="bar" :options="chartOptions" :series="chartSeries" />
    </v-card-text>
  </v-card>
</template>
