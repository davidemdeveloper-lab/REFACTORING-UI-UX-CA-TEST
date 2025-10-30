// React Native style props that should NOT be passed to DOM elements
const INVALID_DOM_PROPS = new Set([
  // Layout & Flex
  'alignItems',
  'justifyContent',
  'flexDirection',
  'flexWrap',
  // Border
  'borderColor',
  'borderRadius',
  'borderWidth',
  'borderBottomColor',
  'borderBottomWidth',
  'borderTopColor',
  'borderTopWidth',
  'borderLeftColor',
  'borderLeftWidth',
  'borderRightColor',
  'borderRightWidth',
  // Size
  'w',
  'h',
  'maxW',
  'minW',
  'minH',
  // Spacing (shorthand)
  'bg',
  'px',
  'py',
  'pt',
  'pb',
  'pl',
  'pr',
  'mx',
  'my',
  'mt',
  'mb',
  'ml',
  'mr',
  'gap',
  // Shadow
  'shadowColor',
  'shadowOffset',
  'shadowOpacity',
  'shadowRadius',
  // Text
  'lineHeight',
  'fontSize',
  'fontWeight',
  'color',
  // Other
  'space',
  'reversed',
]);

/**
 * Filters out React Native/invalid DOM props from an object
 */
export function filterDOMProps<T extends Record<string, any>>(props: T): Partial<T> {
  const filtered: Partial<T> = {};

  for (const key in props) {
    if (!INVALID_DOM_PROPS.has(key)) {
      filtered[key] = props[key];
    }
  }

  return filtered;
}
