<template>
  <div class="menu-button-container">
    <button class="menu-button" @click="toggleMenu" ref="buttonRef">
      <span class="badge" :style="badgeStyle">{{ margin }}</span>
      Margin
    </button>
    <Teleport to="body">
      <div v-if="menuOpen" class="popover-backdrop" @click="closeMenu"></div>
      <div v-if="menuOpen" class="popover" :style="popoverStyle" @click.stop>
        <div class="popover-content">
          <div class="slider-container">
            <label>Margin: {{ margin }}px</label>
            <input 
              type="range" 
              :value="margin" 
              min="0" 
              max="50" 
              step="1"
              @input="handleMarginChange"
              class="slider"
            />
          </div>
          <div class="color-picker-container">
            <label>Background Color:</label>
            <div class="color-picker">
              <input 
                type="color" 
                :value="color" 
                @input="handleColorChange"
                class="color-input"
              />
              <input 
                type="text" 
                :value="color" 
                @input="handleColorTextChange"
                class="color-text-input"
                placeholder="#ffffff"
              />
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { Teleport } from 'vue'
import { usePhotostripStore } from './composables/usePhotostripStore'
import { useColorUtils } from './composables/useColorUtils'
import { useClickOutside } from './composables/useClickOutside'

export default {
  name: 'MarginMenu',
  components: {
    Teleport
  },
  setup() {
    const menuOpen = ref(false)
    const buttonRef = ref(null)
    const popoverStyle = ref({})
    
    const {
      margin,
      color,
      setMargin,
      setColor
    } = usePhotostripStore()

    const { isDarkColor, isValidHexColor } = useColorUtils()

    const badgeStyle = computed(() => {
      return {
        backgroundColor: color.value,
        color: isDarkColor(color.value) ? 'white' : 'black'
      }
    })

    const toggleMenu = (event) => {
      event.preventDefault()
      if (!menuOpen.value) {
        const rect = event.currentTarget.getBoundingClientRect()
        popoverStyle.value = {
          position: 'fixed',
          right: `${window.innerWidth - rect.right}px`,
          top: `${rect.bottom}px`,
          minWidth: '250px'
        }
      }
      menuOpen.value = !menuOpen.value
    }

    const closeMenu = () => {
      menuOpen.value = false
    }

    const handleMarginChange = (event) => {
      setMargin(parseInt(event.target.value, 10))
    }

    const handleColorChange = (event) => {
      setColor(event.target.value)
    }

    const handleColorTextChange = (event) => {
      const value = event.target.value
      if (isValidHexColor(value)) {
        setColor(value)
      }
    }

    useClickOutside(buttonRef, closeMenu)

    return {
      menuOpen,
      buttonRef,
      popoverStyle,
      margin,
      color,
      badgeStyle,
      toggleMenu,
      closeMenu,
      handleMarginChange,
      handleColorChange,
      handleColorTextChange
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
}

.menu-button:hover {
  background-color: #1f4a6a;
}

.badge {
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
}

.popover-content {
  padding: 2em;
}

.slider-container {
  margin-bottom: 2em;
}

.slider-container label {
  display: block;
  margin-bottom: 0.5em;
  font-weight: 500;
}

.slider {
  width: 100%;
  height: 6px;
  border-radius: 3px;
  background: #ddd;
  outline: none;
  -webkit-appearance: none;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #2F6A90;
  cursor: pointer;
}

.slider::-moz-range-thumb {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #2F6A90;
  cursor: pointer;
  border: none;
}

.color-picker-container label {
  display: block;
  margin-bottom: 0.5em;
  font-weight: 500;
}

.color-picker {
  display: flex;
  gap: 0.5em;
  align-items: center;
}

.color-input {
  width: 60px;
  height: 40px;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
}

.color-text-input {
  flex: 1;
  padding: 0.5em;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-family: monospace;
}
</style>
