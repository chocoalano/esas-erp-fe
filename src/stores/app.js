import { defineStore } from 'pinia';
import api from '@/plugins/axios';

export const useAppStore = defineStore('app', {
  state: () => ({
    isDrawer: true,
    totalInfo: 0,
    dataNotification: {
      page: 1,
      lastPage: 1,
      limit: 10,
      notifLoading: false,
      total: 0,
      data: []
    }
  }),
  actions: {
    toggleDrawer() {
      this.isDrawer = !this.isDrawer;
    },

    async fetchNotification() {
      this.dataNotification.notifLoading = true;
      try {
        const { data } = await api.get('/web/notification', {
          params: {
            page: this.dataNotification.page,
            limit: this.dataNotification.limit
          }
        })
        this.totalInfo = data.isReadTotalNotifications
        data.notifications.data.forEach(item => {
          this.dataNotification.data.push(item)
        });
        this.dataNotification.total = data?.meta?.total ?? 0
        this.lastPage = data.notifications.meta.lastPage ?? 1
        if (this.page <= this.lastPage) {
          this.dataNotification.page += 1;
        }
      } catch (error) {
        console.error('Failed to fetch notifications:', error);
      } finally {
        this.dataNotification.notifLoading = false;
      }
    },
    async readNotification(id){
      try {
        const { data } = await api.get(`/web/notification/${id}`)
        console.log(data)
      } catch (error) {
        console.error('Failed to fetch notifications:', error);
      }
    }
  }
});
