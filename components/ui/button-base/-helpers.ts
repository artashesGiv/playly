import type { ButtonProps } from '@/components/ui/button-base/index.vue'

type ButtonsSize = Exclude<ButtonProps['size'], undefined>

// prettier-ignore
export const radiusBySize: Record<ButtonsSize, number> = {
  /* radius = 18 */ 60: 18, 58: 18, 56: 18, 54: 18, 52: 18, 50: 18,
  /* radius = 16 */ 48: 16, 46: 16, 44: 16, 42: 16, 40: 16,
  /* radius = 14 */ 38: 14, 36: 14, 34: 14, 32: 14,
  /* radius = 12 */ 30: 12,
} as const

// prettier-ignore
export const fontBySize: Record<ButtonsSize, number> = {
  /* font = 14 */ 60: 16, 58: 16, 56: 16, 54: 16, 52: 16, 50: 16, 48: 16,
  /* font = 13 */ 46: 14, 44: 14, 42: 14, 40: 14, 38: 14,
  /* font = 12 */ 36: 12, 34: 12, 32: 12, 30: 12,
} as const

// prettier-ignore
export const iconFontSize: Record<ButtonsSize, number> = {
  /* font = 22 */ 60: 22, 58: 22, 56: 22,
  /* font = 20 */ 54: 20, 52: 20, 50: 20, 48: 20, 46: 20,
  /* font = 16 */ 44: 16, 42: 16,
  /* font = 14 */ 40: 14, 38: 14, 36: 14, 34: 14, 32: 14, 30: 14,
} as const
