import { defineStore } from 'pinia'
import api from '@/plugins/axios';
import Swal from 'sweetalert2'

export const useDeptStore = defineStore('dept', {
  state: () => ({
    data: [],
    loading: false,
  }),
  actions: {
    addDept(dt) {
      this.data.push(dt);
    },
    deleteDept(id) {
      this.deleteDeptData(id)
      this.data = this.data.filter(item => item.id !== id);
    },
    // Action to set form data
    async getDept() {
      this.loading = true;
      this.formDisabled = true;
      try {
        const { data } = await api.get(`/web/dept`);
        this.data = data
      } catch (error) {
        this.showAlert(error.response.status, error.response.message)
      } finally {
        this.loading = false;
      }
    },
    // Action to set form data
    async deleteDeptData(id) {
      const { status } = await api.delete(`/web/dept/${id}`);
      if (status === 200) {
        this.getDept()
      }
    },
    // Action to handle form submission
    async submitForm() {
      this.loading = true;
      try {
        const { status } = await api.post(`/web/dept`, { data: this.data });
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
