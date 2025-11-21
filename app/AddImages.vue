<template>
  <Teleport to="body">
    <div v-if="open" class="dialog-overlay" @click="close">
      <div class="dialog" @click.stop>
        <div class="dialog-header">
          <h2>{{ title }}</h2>
          <button class="close-button" @click="close" aria-label="Close">×</button>
        </div>
        <div class="dialog-content">
          <h2 class="instructions">There are three options to add image files:</h2>
          
          <div class="options-container">
            <div class="option">
              <h4>Paste an image from your clipboard</h4>
              <div class="option-icon">
                <div class="avatar-large">📋</div>
              </div>
            </div>
            
            <div 
              class="option dropzone"
              :class="{ 'drag-over': isDragOver }"
              @drop.prevent="handleDrop"
              @dragover.prevent="isDragOver = true"
              @dragleave.prevent="isDragOver = false"
              @click="triggerFileInput"
            >
              <h4>Drag 'n Drop</h4>
              <div class="dropzone-content">
                DROP<br/>FILES<br/>HERE
              </div>
            </div>
            
            <div class="option">
              <h4>Select an image from your local machine</h4>
              <button class="select-button" @click="triggerFileInput">
                SELECT<br/>FILES
              </button>
            </div>
          </div>
          
          <input 
            ref="fileInput"
            type="file" 
            multiple 
            accept="image/*"
            class="hidden-input"
            @change="handleFileSelect" 
          />
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script>
import { ref, computed } from 'vue'
import { Teleport } from 'vue'
import { usePhotostripStore } from './composables/usePhotostripStore'

const myURL = window.URL || window.webkitURL

export default {
  name: 'AddImages',
  components: {
    Teleport
  },
  props: {
    open: {
      type: Boolean,
      required: true
    }
  },
  emits: ['close'],
  setup(props, { emit }) {
    const fileInput = ref(null)
    const isDragOver = ref(false)
    const { images, addFile } = usePhotostripStore()

    const title = computed(() => {
      return images.value.length > 0 ? 'Add More Images' : 'Add Images'
    })

    const processPic = (pic) => {
      if (!pic.type.startsWith('image/')) {
        return false
      }
      const source = myURL.createObjectURL(pic)
      addFile(pic.name, source)
      return true
    }

    const handleFileSelect = (event) => {
      const files = Array.from(event.target.files)
      files.forEach((file) => {
        if (!processPic(file)) {
          alert(`Could not add ${file.name} because it is not a valid image file.`)
        }
      })
      emit('close')
      if (fileInput.value) {
        fileInput.value.value = ''
      }
    }

    const handleDrop = (event) => {
      isDragOver.value = false
      const files = Array.from(event.dataTransfer.files)
      files.forEach((file) => {
        if (!processPic(file)) {
          alert(`Could not add ${file.name} because it is not a valid image file.`)
        }
      })
      emit('close')
    }

    const triggerFileInput = () => {
      fileInput.value?.click()
    }

    const close = () => {
      emit('close')
    }

    return {
      fileInput,
      isDragOver,
      title,
      handleFileSelect,
      handleDrop,
      triggerFileInput,
      close
    }
  }
}
</script>

<style scoped>
.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.dialog {
  background: white;
  border-radius: 4px;
  max-width: 90%;
  width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
}

.dialog-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5em;
  border-bottom: 1px solid #e0e0e0;
}

.dialog-header h2 {
  margin: 0;
  font-size: 1.5em;
  font-weight: 400;
}

.close-button {
  background: none;
  border: none;
  font-size: 2em;
  cursor: pointer;
  color: #666;
  line-height: 1;
  padding: 0;
  width: 32px;
  height: 32px;
}

.close-button:hover {
  color: #000;
}

.dialog-content {
  padding: 2em;
}

.instructions {
  text-align: center;
  margin-bottom: 2em;
  font-size: 1.2em;
}

.options-container {
  display: flex;
  gap: 2%;
  justify-content: space-between;
}

.option {
  flex: 1;
  text-align: center;
  padding: 1em;
}

.option h4 {
  margin: 0 0 1em 0;
  font-size: 1em;
  font-weight: 500;
}

.avatar-large {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #2F6A90;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3em;
  margin: 35px auto 0;
}

.dropzone {
  border: dashed #2F6A90 2px;
  border-radius: 10px;
  padding: 40px;
  cursor: pointer;
  transition: all 0.2s;
}

.dropzone.drag-over {
  background-color: rgba(47, 106, 144, 0.1);
  border-color: #153C54;
}

.dropzone-content {
  color: #2F6A90;
  font-size: 40px;
  line-height: 1.2;
  padding-top: 40px;
  padding-bottom: 40px;
}

.select-button {
  background-color: #2F6A90;
  color: white;
  border: none;
  padding: 1.5em;
  margin-top: 45px;
  font-size: 1.5em;
  height: 4em;
  border-radius: 0.25em;
  cursor: pointer;
  transition: background-color 0.2s;
  line-height: 1.2;
}

.select-button:hover {
  background-color: #1f4a6a;
}

.hidden-input {
  display: none;
}
</style>
