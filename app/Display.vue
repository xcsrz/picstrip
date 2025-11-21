<template>
  <div class="display-container">
    <img 
      v-if="settings.images.length > 0" 
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
import { ref, watch, inject, onMounted, nextTick } from 'vue'

export default {
  name: 'Display',
  props: {
    settings: {
      type: Object,
      required: true
    },
    canvas: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const displayImg = ref(null)
    const displaySrc = ref('')
    const canvas = props.canvas

    const updateCanvas = () => {
      if (props.settings.images.length === 0) {
        return
      }

      const widths = []
      const heights = []
      
      props.settings.images.forEach((img) => {
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

      const narrowest = Math.min.apply(null, widths)
      const shortest = Math.min.apply(null, heights)

      let rx = props.settings.margin
      let ry = props.settings.margin
      const images = props.settings.images.map((img) => {
        const obj = {
          image: img.image,
          x: rx,
          y: ry,
          w: 100,
          h: 100
        }
        if (props.settings.direction === 'vertical') {
          const fac = narrowest / img.image.width
          obj.w = img.image.width * fac
          obj.h = img.image.height * fac
          ry += obj.h + props.settings.margin
        } else if (props.settings.direction === 'horizontal') {
          const fac = shortest / img.image.height
          obj.w = img.image.width * fac
          obj.h = img.image.height * fac
          rx += obj.w + props.settings.margin
        } else {
          return null
        }
        return obj
      })

      if (props.settings.direction === 'vertical') {
        canvas.width = narrowest + (2 * props.settings.margin)
        canvas.height = ry
      } else if (props.settings.direction === 'horizontal') {
        canvas.width = rx
        canvas.height = shortest + (2 * props.settings.margin)
      }

      const ctx = canvas.getContext('2d')
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = props.settings.color
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      images.forEach((img) => {
        if (img) {
          ctx.drawImage(img.image, img.x, img.y, img.w, img.h)
        }
      })

      displaySrc.value = canvas.toDataURL('image/png')
    }

    watch(
      () => [props.settings.images, props.settings.color, props.settings.margin, props.settings.direction],
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
      displaySrc
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

