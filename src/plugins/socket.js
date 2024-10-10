import { baseApiUrl } from '@/utils/api';
import { io } from 'socket.io-client'

const socket = io(baseApiUrl())

export default {
  install(app) {
    app.config.globalProperties.$socket = socket;
  },
};
