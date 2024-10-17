import { defineStore } from 'pinia'
import api from '@/plugins/axios';
import Swal from 'sweetalert2'

export const useGroupAbsenStore = defineStore('group_absen', {
  state: () => ({
    data: [],
    totaldata: 0,
    userOptions: [],
    loading: false,
    errors: [],
  }),
  actions: {
    deleteGroupAbsen(id) {
      this.deleteGroupAbsenData(id)
      this.data = this.data.filter(item => item.id !== id);
    },
    // Action to set form data
    async getGroupAbsen(payload) {
      const { page, itemsPerPage, search } = payload
      this.loading = true;
      try {
        const { data } = await api.get(`/web/attendance-group?page=${page}&perpage=${itemsPerPage}&search=${search}`);
        this.data = data['group']['data']
        this.totaldata = data['group']['meta']['total']
        this.userOptions = data['user_option']
      } catch (error) {
        this.showAlert(error.response.status, error.response.message)
      } finally {
        this.loading = false;
      }
    },
    // Action to set form data
    async deleteGroupAbsenData(id) {
      const { status } = await api.delete(`/web/attendance-group/${id}`);
      if (status === 200) {
        this.getGroupAbsen()
      }
    },
    // Action to handle form submission
    async submitForm(dataform) {
      this.loading = true;
      try {
        const { status } = await api.post(`/web/attendance-group`, dataform);
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
