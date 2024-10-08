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

// Components & Composables
import { createApp } from 'vue'
import App from './App.vue'
import components from './components' // Group component imports

const app = createApp(App)

// Register plugins
registerPlugins(app)
requestNotificationPermission()

// Register global mixins
app.mixin(globalMixin)

// Register global components
Object.entries(components).forEach(([name, component]) => {
  app.component(name, component)
})

app.mount('#app')
