import { defineStore } from 'pinia';
import api from '@/plugins/axios';
import axios from 'axios';

export const useDashboardStore = defineStore('dashboard', {
  state: () => ({
    isDrawer: true,
    cards: [
      {
        title: "Data Users",
        subtitle: "Data Users",
        icon: "mdi-account-group",
        value: 0,
        color: "surface",
        color_circle: "primary",
        name_route: "users-data"
      },
      {
        title: "Data Departemen",
        subtitle: "Data Departemen",
        icon: "mdi-account-tag",
        value: 0,
        color: "surface",
        color_circle: "secondary",
        name_route: "dept"
      },
      {
        title: "Data Posisi",
        subtitle: "Data Posisi",
        icon: "mdi-account-hard-hat",
        value: 0,
        color: "surface",
        color_circle: "info",
        name_route: "jabatan"
      },
      {
        title: "Data Absensi",
        subtitle: "Data Absensi",
        icon: "mdi-fingerprint",
        value: 0,
        color: "surface",
        color_circle: "error",
        name_route: "absen"
      }
    ],
    chartData: {
      label: [],
      data: [],
    },
    ultah: [],
    absenTerlambat: {
      page: 1,
      limit: 10,
      loading: false,
      total: 0,
      data: []
    },
    quote:''
  }),
  actions: {
    async fetchQuotes() {
      try {
        const response = await axios.get('http://api.quotable.io/random')
        this.quote = response.data.content
      } catch (error) {
        console.error('Failed to fetch grid data:', error);
      }
    },
    async fetchGrid() {
      try {
        const { data } = await api.get('/web/dashboard');
        this.cards[0].value = data.gridcount.user
        this.cards[1].value = data.gridcount.dept
        this.cards[2].value = data.gridcount.posisi
        this.cards[3].value = data.gridcount.absen
        this.ultah = data.ultahdata
      } catch (error) {
        console.error('Failed to fetch grid data:', error);
      }
    },
    async fetchLine(perday) {
      try {
        const { data } = await api.get('/web/dashboard', {
          params: { perday }
        });
        if (data && data.label && data.data) {
          this.chartData.data = data.data;
          this.chartData.label = data.label;
        } else {
          console.error('Invalid data for chart:', data);
        }
      } catch (error) {
        console.error('Failed to fetch line chart data:', error);
      }
    },
    async fetchAbsenTelat() {
      this.absenTerlambat.loading = true;
      try {
        const { data } = await api.get('/web/dashboard', {
          params: {
            page: this.absenTerlambat.page,
            limit: this.absenTerlambat.limit
          }
        });
        this.absenTerlambat.data = data.data || [];
        this.absenTerlambat.total = data.meta?.total || 0;
        this.absenTerlambat.page++;
      } catch (error) {
        console.error('Failed to fetch absen telat data:', error);
      } finally {
        this.absenTerlambat.loading = false;
      }
    }
  }
});
