import { defineStore } from 'pinia'
import api from '@/plugins/axios';
import Swal from 'sweetalert2'

export const useCompanyStore = defineStore('company', {
  state: () => ({
    form: {
      name: '',
      latitude: '',
      longitude: '',
      radius: '',
      fullAddress: '',
    },
    loading: false,
    formDisabled: false
  }),
  actions: {
    // Action to set form data
    setFormData(data) {
      this.form = {
        name: data.name,
        latitude: data.latitude,
        longitude: data.longitude,
        radius: data.radius,
        fullAddress: data.fullAddress,
      }
    },
    async getCompany() {
      this.loading = true;
      this.formDisabled = true;
      try {
        const { data } = await api.get(`/web/company`);
        this.setFormData(data)
      } catch (error) {
        this.showAlert(error.response.status, error.response.message)
      } finally {
        this.loading = false;
      }
    },
    // Action to handle form submission
    async submitForm() {
      this.loading = true;
      try {
        const { status } = await api.post(`/web/company`, this.form);
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
