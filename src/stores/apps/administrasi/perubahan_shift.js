import { defineStore } from 'pinia';
import api from '@/plugins/axios';
import Swal from 'sweetalert2';

export const usePerubahanShiftStore = defineStore('perubahan_shift', {
  state: () => ({
    meta: {
      data: [],
      totaldata: 0,
      page: 1,
      limit: 10,
      search: '',
      expanded: [],
      loading: false,
    },
    loading: false,
    dialog: false,
    forms: {
      userId: '',
      date: null,
      currentGroup: '',
      currentShift: '',
      adjustShift: '',
      status: 'w',
      lineId: '',
      lineApprove: 'w',
      hrId: '',
      hrApprove: 'w',
    },
    idform: null,
    groupAbsenOptions: [],
    shiftOptions: [],
    usersOptions: [],
    usersLineApprovalOptions: [],
    usersHrgaApprovalOptions: [],
    errors: [],
  }),
  actions: {
    resetForms() {
      this.forms = {
        userId: '',
        date: '',
        currentGroup: '',
        currentShift: '',
        adjustShift: '',
        status: 'w',
        lineId: '',
        lineApprove: 'w',
        hrId: '',
        hrApprove: 'w',
      };
    },
    async fetchUserApprovalOptions(userId) {
      try {
        const { data } = await api.get('/web/perubahan-shift', {
          params: { userIdSelected: userId }
        });
        this.usersLineApprovalOptions = data.line;
        this.usersHrgaApprovalOptions = data.hrga;
      } catch (error) {
        this.handleError(error);
      }
    },
    async fetchCurrentScheduleOptions(userId, tanggal) {
      try {
        const { data } = await api.get('/web/perubahan-shift', {
          params: { userIdSelected: userId, date:tanggal }
        });
        this.forms.currentGroup = data['group_attendance']['id']
        this.forms.currentShift = data['time']['id']
      } catch (error) {
        this.handleError(error);
      }
    },
    async fetchUsers() {
      try {
        const { data } = await api.get('/web/perubahan-shift');
        this.groupAbsenOptions = data['groupAbsenOptions'];
        this.shiftOptions = data['shiftOptions'];
        this.usersOptions = data['userOptions'];
      } catch (error) {
        this.handleError(error);
      }
    },
    async fetchData({ page, itemsPerPage, search }) {
      Object.assign(this.meta, { page, limit: itemsPerPage, search });
      this.meta.loading = true;
      try {
        const { data } = await api.get('/web/perubahan-shift', {
          params: { page: this.meta.page, limit: this.meta.limit, search: this.meta.search }
        });
        this.meta.data = data.data;
        this.meta.totaldata = data.meta.total;
      } catch (error) {
        this.handleError(error);
      } finally {
        this.meta.loading = false;
      }
    },
    async editForm(id) {
      this.loading = true;
      try {
        const { data } = await api.get(`/web/perubahan-shift/${id}`);
        Object.assign(this.forms, data);
        await this.fetchUserApprovalOptions(data.userId);
      } catch (error) {
        this.handleError(error);
      } finally {
        this.loading = false;
      }
    },
    async deleteItem(id) {
      try {
        const { status } = await api.delete(`/web/perubahan-shift/${id}`);
        if (status === 200) {
          this.meta.data = this.meta.data.filter(item => item.id !== id);
          this.showAlert('Data berhasil dihapus!', 'success');
        }
      } catch (error) {
        this.handleError(error);
      }
    },
    async submitForm(id = null) {
      const url = id ? `/web/perubahan-shift/${id}` : '/web/perubahan-shift';
      const method = id ? 'put' : 'post';
      const message = id ? 'Data berhasil diperbarui!' : 'Data berhasil disimpan!';

      await this.handleSubmit(url, this.forms, message, method);
    },
    async handleSubmit(url, data, successMessage, method = 'post') {
      this.loading = true;
      try {
        const { status } = await api[method](url, data);
        this.showAlert(successMessage, 'success');
        let paramsIndex = { page: this.meta.page, itemsPerPage: this.meta.limit, search: this.meta.search }
        await this.fetchData(paramsIndex);
        this.dialog = false;
        this.resetForms();
      } catch (error) {
        this.handleError(error);
      } finally {
        this.loading = false;
      }
    },
    showAlert(message, icon = 'success') {
      Swal.fire({
        title: icon === 'success' ? 'Success' : 'Error',
        text: message,
        icon,
        confirmButtonText: 'Tutup',
        customClass: { confirmButton: 'sweet-confirm-button-class' },
      });
    },
    handleError(error) {
      const { status, data } = error.response || {};
      this.errors = data || [];
      this.showAlert(data?.message || 'Terjadi kesalahan', 'error');
    }
  }
});
