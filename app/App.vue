<template>
  <Wrapper>
    <AddImages 
      :open="imagesDialogOpen" 
      @close="closeAddImages" 
    />
    <Display 
      :settings="settings" 
      :canvas="canvas" 
    />
  </Wrapper>
</template>

<script>
import { ref, computed, onMounted, provide } from 'vue'
import Wrapper from './Wrapper.vue'
import Display from './Display.vue'
import AddImages from './AddImages.vue'
import saveAs from 'file-saver'

const canvas = document.createElement('canvas')
let pastedCount = 0

export default {
  name: 'App',
  components: {
    Wrapper,
    Display,
    AddImages
  },
  setup() {
    const imagesDialogOpen = ref(false)
    const images = ref([])
    const color = ref('#ffffff')
    const margin = ref(10)
    const direction = ref('vertical')

    const newImage = (source) => {
      const img = new Image()
      img.onload = function() {
        this.setAttribute('rel', 'loaded')
        console.log('image size:', this.width, this.height)
      }
      img.src = source
      return img
    }

    const addFile = (name, source) => {
      const file = {
        name: name,
        image: newImage(source)
      }
      images.value.push(file)
    }

    const moveFile = (idx, delta) => {
      const curFiles = [...images.value]
      ;[curFiles[idx], curFiles[idx + delta]] = [curFiles[idx + delta], curFiles[idx]]
      images.value = curFiles
    }

    const rotateImage = (idx, deg) => {
      const img = images.value[idx]
      const tmpCanvas = document.createElement('canvas')
      tmpCanvas.width = img.image.height
      tmpCanvas.height = img.image.width
      const ctx = tmpCanvas.getContext('2d')
      ctx.translate(tmpCanvas.width / 2, tmpCanvas.height / 2)
      ctx.rotate((deg * Math.PI) / 180)
      ctx.drawImage(img.image, -img.image.width / 2, -img.image.height / 2)
      img.image = newImage(tmpCanvas.toDataURL('image/png'))
      const curFiles = [...images.value]
      curFiles[idx] = img
      images.value = curFiles
    }

    const removeFile = (idx) => {
      const files = [...images.value]
      files.splice(idx, 1)
      images.value = files
    }

    const setDirection = (dir) => {
      direction.value = dir
    }

    const setMargin = (m) => {
      margin.value = m
    }

    const setColor = (c) => {
      color.value = c
    }

    const saveImage = () => {
      canvas.toBlob((blob) => {
        saveAs(blob, `photostrip-${direction.value}-${images.value.length}.png`)
      })
    }

    const openAddImages = () => {
      imagesDialogOpen.value = true
    }

    const closeAddImages = () => {
      imagesDialogOpen.value = false
    }

    const settings = computed(() => ({
      images: images.value,
      color: color.value,
      margin: margin.value,
      direction: direction.value
    }))

    // Handle paste events
    document.onpaste = (event) => {
      const items = (event.clipboardData || event.originalEvent.clipboardData).items
      Object.keys(items).forEach((index) => {
        const item = items[index]
        if (item.kind === 'file') {
          const blob = item.getAsFile()
          const reader = new FileReader()
          reader.onload = (e) => {
            addFile(`Pasted Image #${++pastedCount}`, e.target.result)
          }
          reader.readAsDataURL(blob)
        }
      })
    }

    // Provide context to child components
    provide('images', images)
    provide('direction', direction)
    provide('margin', margin)
    provide('color', color)
    provide('canvas', canvas)
    provide('addFile', addFile)
    provide('moveFile', moveFile)
    provide('removeFile', removeFile)
    provide('rotateImage', rotateImage)
    provide('setDirection', setDirection)
    provide('setMargin', setMargin)
    provide('setColor', setColor)
    provide('saveImage', saveImage)
    provide('openAddImages', openAddImages)

    onMounted(() => {
      if (images.value.length === 0) {
        imagesDialogOpen.value = true
      }
    })

    return {
      imagesDialogOpen,
      images,
      color,
      margin,
      direction,
      canvas,
      settings,
      closeAddImages
    }
  }
}
</script>

