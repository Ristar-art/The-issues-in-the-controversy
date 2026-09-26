/**
 * Focal point for a featured image.
 *
 * A featured image is always shown with `object-fit: cover`, so whatever does
 * not fit the frame gets cropped away. The focal point says which part of the
 * image must survive that crop: it is stored as percentages of the image's own
 * width/height and applied as `object-position`.
 *
 * 50/50 is the browser default (dead centre) and is what everything falls back
 * to when no focus has been chosen.
 */

/** @typedef {{ x: number, y: number }} Focus */

/** @type {Focus} */
export const DEFAULT_FOCUS = { x: 50, y: 50 };

/**
 * Clamps a single axis to 0–100, rounded to one decimal.
 * Anything unusable (NaN, null, a string that is not a number) becomes 50.
 *
 * @param {unknown} value
 * @returns {number}
 */
function clampPercent(value) {
  const num = typeof value === 'number' ? value : Number(value);
  if (!Number.isFinite(num)) return 50;
  return Math.min(100, Math.max(0, Math.round(num * 10) / 10));
}

/**
 * Coerces stored/user data into a usable focus object.
 *
 * @param {unknown} value
 * @returns {Focus}
 */
export function normalizeFocus(value) {
  if (!value || typeof value !== 'object') return { ...DEFAULT_FOCUS };
  const focus = /** @type {Record<string, unknown>} */ (value);
  return { x: clampPercent(focus.x), y: clampPercent(focus.y) };
}

/**
 * True when the focus is the default centre — used to avoid storing noise.
 *
 * @param {unknown} value
 * @returns {boolean}
 */
export function isDefaultFocus(value) {
  const { x, y } = normalizeFocus(value);
  return x === DEFAULT_FOCUS.x && y === DEFAULT_FOCUS.y;
}

/**
 * Renders a focus as an `object-position` value.
 *
 * @param {unknown} value
 * @returns {string}
 */
export function focusToObjectPosition(value) {
  const { x, y } = normalizeFocus(value);
  return `${x}% ${y}%`;
}
