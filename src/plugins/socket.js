// src/plugins/socket.js
import { io } from 'socket.io-client'

const socket = io('https://api.sinergiabadisentosa.com')

export default {
  install(app) {
    app.config.globalProperties.$socket = socket;
  },
};
