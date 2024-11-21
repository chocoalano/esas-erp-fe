/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App
 */

// Plugins
import { registerPlugins } from '@/plugins'
import { requestNotificationPermission } from '@/plugins/notification'
import globalMixin from '@/mixins/globalMixin'
import '@/styles/style.css'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';

// Components & Composables
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

// Register plugins
registerPlugins(app)
requestNotificationPermission()

// Register global mixins
app.use(globalMixin)
app.component('QuillEditor', QuillEditor)

app.mount('#app')
