'use client'

import { useMediaQuery } from 'usehooks-ts'

// this is based on default tailwind screen sizes - adjust if customized

/** > 640px */
export const useMinSM = () => useMediaQuery('(min-width: 640px)')

/** > 768px */
export const useMinMD = () => useMediaQuery('(min-width: 768px)')

/** > 1024px */
export const useMinLG = () => useMediaQuery('(min-width: 1024px)')

/** > 1280px */
export const useMinXL = () => useMediaQuery('(min-width: 1280px)')

/** > 1536px */
export const useMin2XL = () => useMediaQuery('(min-width: 1536px)')

/** < 640px */
export const useMaxSM = () => useMediaQuery('(max-width: 639px)')

/** < 768px */
export const useMaxMD = () => useMediaQuery('(max-width: 767px)')

/** < 1024px */
export const useMaxLG = () => useMediaQuery('(max-width: 1023px)')

/** < 1280px */
export const useMaxXL = () => useMediaQuery('(max-width: 1279px)')

/** < 1536px */
export const useMax2XL = () => useMediaQuery('(max-width: 1535px)')

// Breakpoint range hooks - true when within that specific breakpoint range

/** 640px - 767px */
export const useSM = () => useMediaQuery('(min-width: 640px) and (max-width: 767px)')

/** 768px - 1023px */
export const useMD = () => useMediaQuery('(min-width: 768px) and (max-width: 1023px)')

/** 1024px - 1279px */
export const useLG = () => useMediaQuery('(min-width: 1024px) and (max-width: 1279px)')

/** 1280px - 1535px */
export const useXL = () => useMediaQuery('(min-width: 1280px) and (max-width: 1535px)')

/** > 1536px */
export const use2XL = () => useMediaQuery('(min-width: 1536px)')

// Orientation

/** Portrait orientation */
export const usePortrait = () => useMediaQuery('(orientation: portrait)')

/** Landscape orientation */
export const useLandscape = () => useMediaQuery('(orientation: landscape)')

// High DPI screens (retina displays)

/** Retina/high-DPI display (≥2dppx) */
export const useRetina = () => useMediaQuery('(min-resolution: 2dppx)')

/** High DPI display (≥1.5x pixel ratio) */
export const useHighDPI = () => useMediaQuery('(min-device-pixel-ratio: 1.5)')

// Touch capabilities

/** Touch device (coarse pointer) */
export const useTouchDevice = () => useMediaQuery('(pointer: coarse)')

/** Mouse device (fine pointer) */
export const useMouseDevice = () => useMediaQuery('(pointer: fine)')

// Dark mode preference

/** User prefers dark mode */
export const usePrefersDark = () => useMediaQuery('(prefers-color-scheme: dark)')

/** User prefers light mode */
export const usePrefersLight = () => useMediaQuery('(prefers-color-scheme: light)')

// Reduced motion (for animations)

/** User prefers reduced motion */
export const usePrefersReducedMotion = () => useMediaQuery('(prefers-reduced-motion: reduce)')

// Mobile devices (small screen + touch)

/** Mobile device (< 768px + touch) */
export const useMobile = () => useMediaQuery('(max-width: 767px) and (pointer: coarse)')

// Tablet range (medium screen + touch)

/** Tablet device (768px-1023px + touch) */
export const useTablet = () =>
  useMediaQuery('(min-width: 768px) and (max-width: 1023px) and (pointer: coarse)')

// Desktop (large screen + mouse)

/** Desktop device (≥1024px + mouse) */
export const useDesktop = () => useMediaQuery('(min-width: 1024px) and (pointer: fine)')
