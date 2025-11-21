import { onMounted, onUnmounted } from 'vue'

export function useClickOutside(elementRef, callback) {
  const handleClickOutside = (event) => {
    if (!elementRef.value) return
    
    const clickedElement = event.target
    const isInsideButton = elementRef.value.contains(clickedElement)
    const isInsidePopover = clickedElement.closest('.popover')
    
    // Don't close if clicking inside the button or popover
    if (!isInsideButton && !isInsidePopover) {
      callback()
    }
  }

  onMounted(() => {
    document.addEventListener('click', handleClickOutside)
  })

  onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
  })
}

