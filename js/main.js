import { createApp } from 'vue'
import App from '../app/App.vue'

// Add basic global styles
const style = document.createElement('style')
style.textContent = `
  * {
    box-sizing: border-box;
  }
  
  body {
    margin: 0;
    font-family: Tahoma, Geneva, sans-serif;
    font-size: 14px;
    line-height: 1.6;
    color: #222;
  }
  
  button {
    font-family: inherit;
  }
  
  input {
    font-family: inherit;
  }
`
document.head.appendChild(style)

window.initiatePhotoStitch = function(element) {
  const app = createApp(App)
  app.mount(element)
}

