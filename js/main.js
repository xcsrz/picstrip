import { createApp } from 'vue'
import App from '../app/App.vue'
import '../css/global.css'

window.initiatePhotoStitch = function(element) {
  const app = createApp(App)
  app.mount(element)
}

