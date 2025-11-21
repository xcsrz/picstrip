<template>
  <div class="wrapper">
    <div class="app-bar">
      <h1 class="app-bar-title">Photostrip Generator</h1>
      <div class="app-bar-actions">
        <DirectionMenu />
        <ImagesMenu :images="images" />
        <MarginMenu />
        <button class="save-button" @click="saveImage">
          <span class="save-icon">💾</span>
          Save Image
        </button>
      </div>
    </div>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { inject } from 'vue'
import DirectionMenu from './DirectionMenu.vue'
import ImagesMenu from './ImagesMenu.vue'
import MarginMenu from './MarginMenu.vue'

export default {
  name: 'Wrapper',
  components: {
    DirectionMenu,
    ImagesMenu,
    MarginMenu
  },
  setup() {
    const images = inject('images')
    const saveImage = inject('saveImage')

    return {
      images,
      saveImage
    }
  }
}
</script>

<style scoped>
.wrapper {
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  overflow: hidden;
}

.app-bar {
  background-color: #153C54;
  color: white;
  padding: 0.8em 1em;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1em;
}

.app-bar-title {
  margin: 0;
  font-size: 1.25em;
  font-weight: 400;
}

.app-bar-actions {
  display: flex;
  align-items: center;
  gap: 0.5em;
  flex-wrap: wrap;
}

.save-button {
  background-color: #2F6A90;
  color: white;
  border: none;
  padding: 0.6em 1em;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5em;
  font-size: 0.9em;
  transition: background-color 0.2s;
}

.save-button:hover {
  background-color: #1f4a6a;
}

.save-icon {
  font-size: 1em;
}

.content {
  padding: 1em;
}
</style>

