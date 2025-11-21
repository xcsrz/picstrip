<template>
  <div class="menu-button-container">
    <button class="menu-button" @click="swapDirection">
      <span class="menu-icon">🔄</span>
      {{ label }}
    </button>
  </div>
</template>

<script>
import { computed, inject } from 'vue'

export default {
  name: 'DirectionMenu',
  setup() {
    const direction = inject('direction')
    const setDirection = inject('setDirection')

    const label = computed(() => {
      return direction.value.charAt(0).toUpperCase() + direction.value.slice(1)
    })

    const swapDirection = () => {
      if (direction.value === 'vertical') {
        setDirection('horizontal')
      } else {
        setDirection('vertical')
      }
    }

    return {
      label,
      swapDirection
    }
  }
}
</script>

<style scoped>
.menu-button-container {
  height: auto;
  padding: 0.8em 0;
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

.menu-icon {
  font-size: 1em;
}
</style>

