<template>
  <div class="menu-button-container">
    <button class="menu-button" @click="toggleMenu" ref="buttonRef">
      <span class="badge">{{ images.length }}</span>
      Images
    </button>
    <Teleport to="body">
      <div v-if="menuOpen" class="popover-backdrop" @click="closeMenu"></div>
      <div v-if="menuOpen" class="popover" :style="popoverStyle" @click.stop>
        <div class="menu">
          <div 
            v-for="(img, idx) in images" 
            :key="`image-${idx}`"
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
          <button class="menu-item add-button" @click.stop="handleAddImages">
            <span>+</span>
            Add Images
          </button>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script>
import { ref } from 'vue'
import { Teleport } from 'vue'
import { usePhotostripStore } from './composables/usePhotostripStore'
import { useClickOutside } from './composables/useClickOutside'

export default {
  name: 'ImagesMenu',
  components: {
    Teleport
  },
  setup() {
    const menuOpen = ref(false)
    const buttonRef = ref(null)
    const popoverStyle = ref({})
    
    const {
      images,
      openAddImages,
      moveFile,
      removeFile,
      rotateImage
    } = usePhotostripStore()

    const toggleMenu = (event) => {
      event.preventDefault()
      if (!menuOpen.value) {
        const rect = event.currentTarget.getBoundingClientRect()
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

    const handleAddImages = (event) => {
      event?.stopPropagation()
      closeMenu()
      // Use nextTick to ensure menu closes before opening modal
      setTimeout(() => {
        openAddImages()
      }, 0)
    }

    useClickOutside(buttonRef, closeMenu)

    return {
      menuOpen,
      buttonRef,
      popoverStyle,
      images,
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
