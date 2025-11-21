import { ref, computed } from 'vue'
import saveAs from 'file-saver'

// Shared state - singleton pattern
const canvas = document.createElement('canvas')
let pastedCount = 0

// Shared reactive state
const images = ref([])
const color = ref('#ffffff')
const margin = ref(10)
const direction = ref('vertical')
const imagesDialogOpen = ref(false)

export function usePhotostripStore() {

  const newImage = (source) => {
    const img = new Image()
    img.onload = function() {
      this.setAttribute('rel', 'loaded')
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

  const handlePaste = (event) => {
    const items = (event.clipboardData || event.originalEvent?.clipboardData)?.items
    if (!items) return

    Array.from(items).forEach((item) => {
      if (item.kind === 'file' && item.type.startsWith('image/')) {
        const blob = item.getAsFile()
        const reader = new FileReader()
        reader.onload = (e) => {
          addFile(`Pasted Image #${++pastedCount}`, e.target.result)
        }
        reader.readAsDataURL(blob)
      }
    })
  }

  const settings = computed(() => ({
    images: images.value,
    color: color.value,
    margin: margin.value,
    direction: direction.value
  }))

  return {
    // State
    images,
    color,
    margin,
    direction,
    imagesDialogOpen,
    canvas,
    settings,
    // Actions
    addFile,
    moveFile,
    rotateImage,
    removeFile,
    setDirection,
    setMargin,
    setColor,
    saveImage,
    openAddImages,
    closeAddImages,
    handlePaste
  }
}

