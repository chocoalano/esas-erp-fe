// src/mixins/globalMixin.js
import { useAuthStore } from '@/stores/apps/auth'

export default {
  methods: {
    baseApiUrl() {
      return 'https://api.sinergiabadisentosa.com'
    },
    baseFileUrl() {
      return 'https://api.sinergiabadisentosa.com/files'
    },
    errInput(dataArray, keyname) {
      if (dataArray.length > 0) {
        const result = dataArray.filter(error => error.field === keyname);
        if (result.length > 0) {
          return result[0].message;
        } else {
          return '';
        }
      } else {
        return '';
      }
    },
    hasPermissions(str) {
      const store = useAuthStore()
      return store.permission.includes(str)
    },
    hasRole(str) {
      const store = useAuthStore()
      return store.role.includes(str)
    },
  }
}
