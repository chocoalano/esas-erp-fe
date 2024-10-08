import { defineStore } from 'pinia';
import api from '@/plugins/axios';
import Swal from 'sweetalert2';

export const useLemburStore = defineStore('lembur', {
  state: () => ({
    meta: {
      data: [],
      totaldata: 0,
      page: 1,
      limit: 10,
      search: '',
    },
    loading: false,
    errors: [],
    users: [],
    usersDataAdm: [],
    usersDataLine: [],
    usersDataGm: [],
    usersDataHr: [],
    usersDataDirector: [],
    usersDataFat: [],
    organizations: [],
    positions: [],
    forms: [createForm()],
  }),
  actions: {
    addForm() {
      this.forms.push(createForm());
    },
    delForm(index) {
      this.forms.splice(index, 1);
    },
    async fetchUser(organizationId, jobPositionId) {
      const { data } = await api.get(`/web/work-overtime`, {params: { organizationId, jobPositionId }});
      this.users = data
    },
    async fetchUserApproval(userId) {
      const { data } = await api.get(`/web/work-overtime`, {params: { userId }});
      this.usersDataAdm = data['adm']
      this.usersDataLine = data['line']
      this.usersDataGm = data['gm']
      this.usersDataHr = data['hr']
      this.usersDataDirector = data['director']
      this.usersDataFat = data['fat']
    },
    async getAbsen({ page, itemsPerPage, search }) {
      Object.assign(this.meta, { page, limit: itemsPerPage, search });
      this.loading = true;
      try {
        const { data } = await api.get(`/web/work-overtime`, {
          params: { page: this.meta.page, limit: this.meta.limit, search: this.meta.search }
        });
        Object.assign(this, {
          organizations: data['dept'],
          positions: data['pos'],
          users: data['users'],
          meta: {
            ...this.meta,
            data: data['list']['data'],
            totaldata: data['list']['meta']['total']
          }
        });
      } finally {
        this.loading = false;
      }
    },
    async deleteAbsen(id) {
      try {
        const { status } = await api.delete(`/web/work-overtime/${id}`);
        if (status === 200) {
          this.meta.data = this.meta.data.filter(item => item.id !== id);
          this.showAlert(status, 'Data berhasil dihapus!');
        }
      } catch (error) {
        this.handleError(error);
      }
    },
    async submitForm() {
      await this.handleSubmit(`/web/work-overtime`, this.forms, 'Data berhasil disimpan!');
    },
    async submitEditForm(id, dataform) {
      await this.handleSubmit(`/web/work-overtime/${id}`, dataform, 'Data berhasil diperbarui!', 'put');
    },
    async handleSubmit(url, data, successMessage, method = 'post') {
      this.loading = true;
      try {
        const { status } = await api[method](url, { datapost: data });
        this.showAlert(status, successMessage);
      } catch (error) {
        this.handleError(error);
      } finally {
        this.getAbsen(this.meta.page, this.meta.limit, this.meta.search)
        this.loading = false;
      }
    },
    showAlert(status, msg) {
      Swal.fire({
        title: status === 200 ? 'Success' : 'Error!',
        text: msg,
        icon: status === 200 ? 'success' : 'error',
        confirmButtonText: 'Tutup',
        customClass: {
          confirmButton: 'sweet-confirm-button-class',
        }
      });
    },
    handleError(error) {
      const { status, data } = error.response;
      this.errors = data;
      this.showAlert(status, data.message || 'Terjadi kesalahan');
    }
  }
});

// Helper function to create a form
function createForm() {
  return {
    userIdCreated: '',
    organizationId: '',
    jobPositionId: '',
    overtimeDayStatus: '',
    dateSpl: '',
    dateOvertimeAt: '',
    userAdm: '',
    userLine: '',
    userGm: '',
    userHr: '',
    userDirector: '',
    userFat: '',
  };
}
