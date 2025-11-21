<template>
  <Wrapper>
    <Teleport to="body">
      <AddImages 
        :open="imagesDialogOpen" 
        @close="closeAddImages" 
      />
    </Teleport>
    <Display />
  </Wrapper>
</template>

<script>
import { onMounted, onUnmounted, Teleport, computed } from 'vue'
import Wrapper from './Wrapper.vue'
import Display from './Display.vue'
import AddImages from './AddImages.vue'
import { usePhotostripStore } from './composables/usePhotostripStore'

export default {
  name: 'App',
  components: {
    Wrapper,
    Display,
    AddImages,
    Teleport
  },
  setup() {
    const store = usePhotostripStore()

    onMounted(() => {
      document.addEventListener('paste', store.handlePaste)
      if (store.images.value.length === 0) {
        store.openAddImages()
      }
    })

    onUnmounted(() => {
      document.removeEventListener('paste', store.handlePaste)
    })

    return {
      // Return the ref directly - Vue will unwrap it in template
      imagesDialogOpen: store.imagesDialogOpen,
      closeAddImages: store.closeAddImages
    }
  }
}
</script>
