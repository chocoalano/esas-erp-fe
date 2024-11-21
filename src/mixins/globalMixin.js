import { useAuthStore } from '@/stores/apps/auth';
export default {
  install(app) {
    app.mixin({
      methods: {
        errInput(dataArray, keyname) {
          const error = dataArray?.find(error => error.field === keyname);
          return error ? error.message : '';
        },
        hasPermissions(permission) {
          const store = useAuthStore();
          return store?.permission?.includes(permission);
        },
        hasRole(role) {
          const store = useAuthStore();
          return store?.role?.includes(role);
        },
        hasPosition(position) {
          const store = useAuthStore();
          return store?.user.employe.job.name === position;
        }
      }
    });
  }
};
