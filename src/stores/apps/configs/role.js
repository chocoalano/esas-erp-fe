import { defineStore } from 'pinia';
import api from '@/plugins/axios';
import Swal from 'sweetalert2';

export const useRoleStore = defineStore('role', {
  state: () => ({
    datatables: {
      data: [],
      totaldata: 0,
      page: 1,
      limit: 10,
      search: '',
      expanded: [],
      loading: false,
    },
    loading: false,
    forms: {
      name: '',
      userId: [],
      permissionId: [],
    },
    errors: [],
    usersOptions: [],
    permissionOptions: [],
  }),

  actions: {
    resetForms() {
      this.forms = {
        name: '',
        userId: [],
        permissionId: [],
      };
    },

    async fetchData({ page, itemsPerPage, search }) {
      Object.assign(this.datatables, { page: page, limit: itemsPerPage, search: search });
      this.datatables.loading = true;
      try {
        const { data } = await api.get('/web/role', {
          params: {
            page: this.datatables.page,
            limit: this.datatables.limit,
            search: this.datatables.search,
          }
        });

        this.datatables.data = data.data;
        this.datatables.totaldata = data.meta.total;
      } catch (error) {
        this.handleError(error);
      } finally {
        this.datatables.loading = false;
      }
    },

    async fetchKelengkapanForms() {
      this.loading = true;

      try {
        const { data } = await api.get('/web/role');
        this.usersOptions = data.userList;
        this.permissionOptions = data.permissionList;
      } catch (error) {
        this.handleError(error);
      } finally {
        this.loading = false;
      }
    },

    async editForm(id) {
      this.loading = true;

      try {
        const { data } = await api.get(`/web/role/${id}`);
        this.forms = {
          name: data.name,
          userId: data.users.map(user => user.id),
          permissionId: data.permissions.map(permission => permission.id),
        };
      } catch (error) {
        this.handleError(error);
      } finally {
        this.loading = false;
      }
    },

    async deleteItem(id) {
      try {
        await api.delete(`/web/role/${id}`);
        this.datatables.data = this.datatables.data.filter(item => item.id !== id);
        this.showAlert('Data berhasil dihapus!', 'success');
      } catch (error) {
        this.handleError(error);
      }
    },

    async submitForm(id = null) {
      const url = id ? `/web/role/${id}` : '/web/role';
      const method = id ? 'put' : 'post';
      const successMessage = id ? 'Data berhasil diperbarui!' : 'Data berhasil disimpan!';

      await this.handleSubmit(url, this.forms, successMessage, method);
    },

    async handleSubmit(url, data, successMessage, method = 'post') {
      this.loading = true;

      try {
        await api[method](url, data);
        this.showAlert(successMessage, 'success');
        await this.fetchData({
          page: this.datatables.page,
          itemsPerPage: this.datatables.limit,
          search: this.datatables.search,
        });
        if (method === 'post') {
          this.resetForms();
        }
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
      const { data } = error.response || {};
      this.errors = data || [];
      this.showAlert(data?.message || 'Terjadi kesalahan', 'error');
    }
  }
});
