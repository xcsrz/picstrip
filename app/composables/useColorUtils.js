export function useColorUtils() {
  const isDarkColor = (colorHex) => {
    if (!colorHex || !colorHex.startsWith('#')) return false
    
    const codes = {
      '0': 0, '1': 1, '2': 2, '3': 3, '4': 4, '5': 5,
      '6': 6, '7': 7, '8': 8, '9': 9,
      'a': 10, 'b': 11, 'c': 12, 'd': 13, 'e': 14, 'f': 15
    }
    
    // Convert hex to RGB values
    const r = codes[colorHex[1]?.toLowerCase()] * 16 + (codes[colorHex[2]?.toLowerCase()] || 0)
    const g = codes[colorHex[3]?.toLowerCase()] * 16 + (codes[colorHex[4]?.toLowerCase()] || 0)
    const b = codes[colorHex[5]?.toLowerCase()] * 16 + (codes[colorHex[6]?.toLowerCase()] || 0)
    
    // Calculate luminance
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
    return luminance < 0.5
  }

  const isValidHexColor = (value) => {
    return /^#[0-9A-Fa-f]{6}$/.test(value)
  }

  return {
    isDarkColor,
    isValidHexColor
  }
}

