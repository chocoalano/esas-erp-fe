import { defineStore } from 'pinia'
import api from '@/plugins/axios';
import Swal from 'sweetalert2'

export const useBranchStore = defineStore('branch', {
  state: () => ({
    data: [],
    loading: false,
  }),
  actions: {
    addCabang(cabang) {
      this.data.push(cabang);
    },
    deleteCabang(id) {
      this.deleteCabangData(id)
      this.data = this.data.filter(item => item.id !== id);
    },
    // Action to set form data
    async getCabang() {
      this.loading = true;
      this.formDisabled = true;
      try {
        const { data } = await api.get(`/web/branch`);
        this.data = data
      } catch (error) {
        this.showAlert(error.response.status, error.response.message)
      } finally {
        this.loading = false;
      }
    },
    // Action to set form data
    async deleteCabangData(id) {
      const { status } = await api.delete(`/web/branch/${id}`);
      if (status === 200) {
        this.getCabang()
      }
    },
    // Action to handle form submission
    async submitForm() {
      this.loading = true;
      try {
        const { status } = await api.post(`/web/branch`, { data: this.data });
        this.showAlert(status, 'Data berhasil disimpan!')
      } catch (error) {
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
