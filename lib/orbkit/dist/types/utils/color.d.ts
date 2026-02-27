import type { HslColor } from '../types';
/**
 * Convert a hex color string (#RRGGBB) to HSL.
 */
export declare function hexToHsl(hex: string): HslColor;
/**
 * Convert HSL values to a hex color string (#RRGGBB).
 */
export declare function hslToHex(h: number, s: number, l: number): string;
/**
 * Adjust the saturation of a hex color.
 * @param hex - Hex color string
 * @param saturation - Target saturation 0-100
 */
export declare function applySaturation(hex: string, saturation: number): string;
/**
 * Convert a hex color string to an rgba() CSS string.
 * Used by canvas renderer for gradient color stops.
 * @param hex - Hex color string (#RRGGBB)
 * @param alpha - Opacity 0-1 (default: 1)
 */
export declare function hexToRgba(hex: string, alpha?: number): string;
//# sourceMappingURL=color.d.ts.map