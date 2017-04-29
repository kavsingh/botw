const withAlpha = (r, g, b) => (a = 1) => `rgba(${r}, ${g}, ${b}, ${a})`

export const black = withAlpha(0, 0, 0)
export const primaryText = withAlpha(209, 212, 192)
export const secondaryText = withAlpha(225, 200, 35)
export const highlightText = withAlpha(255, 255, 255)
