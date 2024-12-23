import { defineStore } from 'pinia'
import api from '@/plugins/axios';
import Swal from 'sweetalert2'

export const useJadwalGroupAbsenStore = defineStore('jadwal_group_absen', {
  state: () => ({
    data: [],
    totaldata: 0,
    groupOptions: [],
    jamOptions: [],
    userOptions: [],
    loading: false,
    errors: [],
  }),
  actions: {
    deleteJadwalGroupAbsen(id) {
      this.deleteJadwalGroupAbsenData(id)
      this.data = this.data.filter(item => item.id !== id);
    },
    // Action to set form data
    async getJadwalGroupAbsen(payload) {
      const { page, itemsPerPage, search } = payload
      this.loading = true;
      try {
        const { data } = await api.get(`/web/attendance-group-schedule?page=${page}&limit=${itemsPerPage}&search=${search}`);
        this.data = data['list']['data']
        this.totaldata = data['list']['meta']['total']
        this.groupOptions = data['group']
        this.jamOptions = data['jam']
      } catch (error) {
        this.showAlert(error.response.status, error.response.message)
      } finally {
        this.loading = false;
      }
    },
    // Action to set form data
    async deleteJadwalGroupAbsenData(id) {
      const { status } = await api.delete(`/web/attendance-group-schedule/${id}`);
      if (status === 200) {
        this.getJadwalGroupAbsen()
      }
    },
    async get_attr_form() {
      try {
        const url = `/web/attendance-group-schedule-forms`
        const { status, data } = await api.get(url);
        if (status === 200) {
          this.groupOptions = data.group ?? [];
          this.jamOptions = data.time ?? [];
          this.userOptions = data.user ?? [];
        } else {
          console.warn('Unexpected status code:', status);
        }
      } catch (error) {
        console.error('Error fetching form attributes:', error);
      }
    },
    async submitForm(dataform) {
      this.loading = true;
      try {
        const { status } = await api.post(`/web/attendance-group-schedule`, dataform);
        this.showAlert(status, 'Data berhasil disimpan!')
      } catch (error) {
        this.errors = error.response.data
        this.showAlert(error.response.status, error.response.message)
      } finally {
        this.loading = false;
      }
    },
    // Action to handle form edit
    async submitEditForm(id, dataform) {
      this.loading = true;
      try {
        const { status } = await api.put(`/web/attendance-group-schedule/${id}`, dataform);
        this.showAlert(status, 'Data berhasil disimpan!')
      } catch (error) {
        this.errors = error.response.data
        this.showAlert(error.response.status, error.response.message)
      } finally {
        this.loading = false;
      }
    },
    showAlert(status, msg) {
      Swal.fire({
        title: status === 200 ? "Success" : "Error!",
        text: msg,
        icon: status === 200 ? "success" : "error",
        confirmButtonText: "Tutup",
        customClass: {
          confirmButton: 'sweet-confirm-button-class',
        }
      });
    }
  }
});
