// Icon Registry System

import solidIcons from './solid-icons';
import regularIcons from './regular-icons';
import lightIcons from './light-icons';

export type IconStyle = 'solid' | 'regular' | 'light';
export type IconName = string;

// Icon Registry
const iconRegistry = {
  solid: solidIcons,
  regular: regularIcons,
  light: lightIcons,
} as const;

// CDN Configuration
const CDN_CONFIG = {
  baseUrl:
    'https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.7.2/svgs',
  enabled: true,
};

/**
 * Icon Registry System
 *
 * Provides categorized icon storage with CDN fallback
 * Usage: getIcon('star', 'solid') or getIcon('star') // defaults to solid
 */

/**
 * Get icon from registry with fallback to CDN
 * @param name - Icon name (e.g., 'star', 'heart')
 * @param style - Icon style (solid, regular, light)
 * @returns Promise<string> - SVG string or empty string if not found
 */
export async function getIcon(
  name: IconName,
  style: IconStyle = 'solid'
): Promise<string> {
  // 1. Check local registry first
  const localIcon = (iconRegistry[style] as Record<string, string>)[name];
  if (localIcon) {
    return localIcon;
  }

  // 2. Try CDN fallback if enabled
  if (CDN_CONFIG.enabled) {
    try {
      const cdnUrl = `${CDN_CONFIG.baseUrl}/${style}/${name}.svg`;
      const response = await fetch(cdnUrl);
      if (response.ok) {
        const svgContent = await response.text();
        // Cache the icon for future use
        cacheIcon(name, style, svgContent);
        return svgContent;
      }
    } catch (error) {
      console.warn(`Failed to fetch icon from CDN: ${name} (${style})`, error);
    }
  }

  // 3. Return empty string if not found
  console.warn(`Icon not found: ${name} (${style})`);
  return '';
}

/**
 * Check if icon exists in local registry
 * @param name - Icon name
 * @param style - Icon style
 * @returns boolean
 */
export function hasIcon(name: IconName, style: IconStyle = 'solid'): boolean {
  return (iconRegistry[style] as Record<string, string>)[name] !== undefined;
}

/**
 * Get all available icons for a specific style
 * @param style - Icon style
 * @returns IconName[]
 */
export function getAvailableIcons(style: IconStyle = 'solid'): IconName[] {
  return Object.keys(iconRegistry[style] || {});
}

/**
 * Cache icon for future use (in-memory cache)
 * @param name - Icon name
 * @param style - Icon style
 * @param svg - SVG content
 */
const iconCache = new Map<string, string>();

function cacheIcon(name: IconName, style: IconStyle, svg: string): void {
  const cacheKey = `${style}-${name}`;
  iconCache.set(cacheKey, svg);
}

/**
 * Get icon from cache
 * @param name - Icon name
 * @param style - Icon style
 * @returns string | undefined
 */
export function getCachedIcon(
  name: IconName,
  style: IconStyle = 'solid'
): string | undefined {
  const cacheKey = `${style}-${name}`;
  return iconCache.get(cacheKey);
}

/**
 * Register custom icon
 * @param name - Icon name
 * @param style - Icon style
 * @param svg - SVG content
 */
export function registerIcon(
  name: IconName,
  style: IconStyle,
  svg: string
): void {
  (iconRegistry[style] as Record<string, string>)[name] = svg;
}

// Export type definitions
export type CoreSolidIcon = keyof typeof solidIcons;
export type CoreRegularIcon = keyof typeof regularIcons;
export type CoreLightIcon = keyof typeof lightIcons;
export type CoreIcon = CoreSolidIcon | CoreRegularIcon | CoreLightIcon;
