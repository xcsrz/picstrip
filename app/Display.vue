<template>
  <div class="display-container">
    <img 
      v-if="settings && settings.images.length > 0" 
      ref="displayImg"
      :src="displaySrc"
      class="display-image"
    />
    <p v-else class="empty-message">
      <em>
        You need to add images. Click on 
        <span class="chip">IMAGES</span> 
        button above.
      </em>
    </p>
  </div>
</template>

<script>
import { ref, watch, onMounted, nextTick } from 'vue'
import { usePhotostripStore } from './composables/usePhotostripStore'

export default {
  name: 'Display',
  setup() {
    const displayImg = ref(null)
    const displaySrc = ref('')
    const { settings, canvas } = usePhotostripStore()

    const updateCanvas = () => {
      const currentSettings = settings.value
      if (currentSettings.images.length === 0) {
        return
      }

      const widths = []
      const heights = []
      
      currentSettings.images.forEach((img) => {
        if (!img.image.hasAttribute('rel') || img.image.getAttribute('rel') !== 'loaded') {
          setTimeout(() => {
            updateCanvas()
          }, 500)
          return
        }
        widths.push(img.image.width)
        heights.push(img.image.height)
      })

      if (widths.length === 0) {
        return
      }

      const narrowest = Math.min(...widths)
      const shortest = Math.min(...heights)

      let rx = currentSettings.margin
      let ry = currentSettings.margin
      const imageLayouts = currentSettings.images.map((img) => {
        const obj = {
          image: img.image,
          x: rx,
          y: ry,
          w: 100,
          h: 100
        }
        if (currentSettings.direction === 'vertical') {
          const fac = narrowest / img.image.width
          obj.w = img.image.width * fac
          obj.h = img.image.height * fac
          ry += obj.h + currentSettings.margin
        } else if (currentSettings.direction === 'horizontal') {
          const fac = shortest / img.image.height
          obj.w = img.image.width * fac
          obj.h = img.image.height * fac
          rx += obj.w + currentSettings.margin
        } else {
          return null
        }
        return obj
      })

      if (currentSettings.direction === 'vertical') {
        canvas.width = narrowest + (2 * currentSettings.margin)
        canvas.height = ry
      } else if (currentSettings.direction === 'horizontal') {
        canvas.width = rx
        canvas.height = shortest + (2 * currentSettings.margin)
      }

      const ctx = canvas.getContext('2d')
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = currentSettings.color
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      imageLayouts.forEach((img) => {
        if (img) {
          ctx.drawImage(img.image, img.x, img.y, img.w, img.h)
        }
      })

      displaySrc.value = canvas.toDataURL('image/png')
    }

    watch(
      () => settings.value,
      () => {
        nextTick(() => {
          updateCanvas()
        })
      },
      { deep: true }
    )

    onMounted(() => {
      updateCanvas()
    })

    return {
      displayImg,
      displaySrc,
      settings
    }
  }
}
</script>

<style scoped>
.display-container {
  text-align: center;
}

.display-image {
  max-width: 100%;
  border: solid black 1px;
  margin: 1em;
}

.empty-message {
  margin: 3em;
}

.chip {
  display: inline-block;
  background-color: #e0e0e0;
  padding: 0.2em 0.5em;
  border-radius: 16px;
  font-size: 0.9em;
  margin: 0 0.2em;
}
</style>

