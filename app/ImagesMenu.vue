<template>
  <div class="menu-button-container">
    <button class="menu-button" @click="toggleMenu">
      <span class="badge">{{ images.length }}</span>
      Images
    </button>
    <div v-if="menuOpen" class="popover" :style="popoverStyle" @click.stop>
      <div class="menu">
        <div 
          v-for="(img, idx) in images" 
          :key="'image-' + idx"
          class="menu-item"
        >
          <span class="menu-item-text">{{ img.name }}</span>
          <div class="menu-item-actions">
            <button 
              v-if="idx > 0"
              class="action-button"
              @click="moveFile(idx, -1)"
              title="Move Up"
            >
              ↑
            </button>
            <button 
              v-if="idx < images.length - 1"
              class="action-button"
              @click="moveFile(idx, 1)"
              title="Move Down"
            >
              ↓
            </button>
            <button 
              class="action-button rotate-left"
              @click="rotateImage(idx, -90)"
              title="Rotate Left"
            >
              ↶
            </button>
            <button 
              class="action-button rotate-right"
              @click="rotateImage(idx, 90)"
              title="Rotate Right"
            >
              ↷
            </button>
            <button 
              class="action-button delete"
              @click="removeFile(idx)"
              title="Delete"
            >
              ×
            </button>
          </div>
        </div>
        <div v-if="images.length > 0" class="menu-divider"></div>
        <button class="menu-item add-button" @click="handleAddImages">
          <span>+</span>
          Add Images
        </button>
      </div>
    </div>
    <div v-if="menuOpen" class="popover-backdrop" @click="closeMenu"></div>
  </div>
</template>

<script>
import { ref, inject, onMounted, onUnmounted } from 'vue'

export default {
  name: 'ImagesMenu',
  props: {
    images: {
      type: Array,
      required: true
    }
  },
  setup() {
    const menuOpen = ref(false)
    const anchorEl = ref(null)
    const popoverStyle = ref({})
    const openAddImages = inject('openAddImages')
    const moveFile = inject('moveFile')
    const removeFile = inject('removeFile')
    const rotateImage = inject('rotateImage')

    const toggleMenu = (event) => {
      event.preventDefault()
      if (!menuOpen.value) {
        anchorEl.value = event.currentTarget
        const rect = anchorEl.value.getBoundingClientRect()
        popoverStyle.value = {
          position: 'fixed',
          left: `${rect.left}px`,
          top: `${rect.bottom}px`,
          minWidth: '250px'
        }
      }
      menuOpen.value = !menuOpen.value
    }

    const closeMenu = () => {
      menuOpen.value = false
    }

    const handleAddImages = () => {
      closeMenu()
      openAddImages()
    }

    const handleClickOutside = (event) => {
      if (menuOpen.value && anchorEl.value && !anchorEl.value.contains(event.target)) {
        const popover = event.target.closest('.popover')
        if (!popover) {
          closeMenu()
        }
      }
    }

    onMounted(() => {
      document.addEventListener('click', handleClickOutside)
    })

    onUnmounted(() => {
      document.removeEventListener('click', handleClickOutside)
    })

    return {
      menuOpen,
      popoverStyle,
      toggleMenu,
      closeMenu,
      handleAddImages,
      moveFile,
      removeFile,
      rotateImage
    }
  }
}
</script>

<style scoped>
.menu-button-container {
  height: auto;
  padding: 0.8em 0;
  position: relative;
}

.menu-button {
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
  position: relative;
}

.menu-button:hover {
  background-color: #1f4a6a;
}

.badge {
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 12px;
  padding: 0.1em 0.5em;
  font-size: 0.9em;
  min-width: 20px;
  text-align: center;
}

.popover-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 998;
}

.popover {
  background: white;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  z-index: 999;
  max-height: 400px;
  overflow-y: auto;
}

.menu {
  min-width: 250px;
  padding: 0.5em 0;
}

.menu-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.8em 1em;
  cursor: pointer;
  transition: background-color 0.2s;
}

.menu-item:hover {
  background-color: #f5f5f5;
}

.menu-item-text {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.menu-item-actions {
  display: flex;
  gap: 0.3em;
  margin-left: 1em;
}

.action-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.3em 0.5em;
  font-size: 1.2em;
  color: #666;
  transition: color 0.2s;
  line-height: 1;
}

.action-button:hover {
  color: #000;
}

.action-button.delete:hover {
  color: #d32f2f;
}

.add-button {
  width: 100%;
  justify-content: flex-start;
  font-weight: 500;
}

.add-button span {
  margin-right: 0.5em;
  font-size: 1.2em;
}

.menu-divider {
  height: 1px;
  background-color: #e0e0e0;
  margin: 0.5em 0;
}
</style>

