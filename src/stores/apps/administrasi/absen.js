import { defineStore } from 'pinia'
import api from '@/plugins/axios';
import Swal from 'sweetalert2'

export const useAbsenStore = defineStore('absen', {
  state: () => ({
    data: [],
    totaldata: 0,
    loading: false,
    errors: [],
  }),
  actions: {
    deleteAbsen(id) {
      this.deleteAbsenData(id)
      this.data = this.data.filter(item => item.id !== id);
    },
    // Action to set form data
    async getAbsen(payload) {
      const { page, itemsPerPage, search } = payload
      this.loading = true;
      try {
        const { data } = await api.get(`/web/attendance?page=${page}&limit=${itemsPerPage}&search=${search}`);
        this.data = data['data']
        this.totaldata = data['meta']['total']
      } catch (error) {
        this.showAlert(error.response.status, error.response.message)
      } finally {
        this.loading = false;
      }
    },
    // Action to set form data
    async deleteAbsenData(id) {
      const { status } = await api.delete(`/web/attendance/${id}`);
      if (status === 200) {
        this.getAbsen()
      }
    },
    // Action to handle form submission
    async submitForm(dataform) {
      this.loading = true;
      try {
        const { status } = await api.post(`/web/attendance`, dataform);
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
        const { status } = await api.put(`/web/attendance/${id}`, dataform);
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
