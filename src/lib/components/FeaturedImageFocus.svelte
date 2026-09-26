<script>
  import { normalizeFocus, focusToObjectPosition, DEFAULT_FOCUS } from '$lib/utils/image-focus';

  /** Image being positioned. */
  export let src = '';
  /** Focal point, bindable. Percentages of the image's own width/height. */
  export let focus = { ...DEFAULT_FOCUS };

  let frameEl;
  let dragging = false;

  $: safeFocus = normalizeFocus(focus);
  $: objectPosition = focusToObjectPosition(safeFocus);

  /**
   * The frame shrink-wraps the image exactly (inline-block around a block img),
   * so the frame's box and the image's box are the same rectangle — pointer
   * coordinates map straight onto image percentages, no letterbox maths.
   */
  function setFocusFromPointer(event) {
    if (!frameEl) return;
    const rect = frameEl.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    focus = normalizeFocus({
      x: ((event.clientX - rect.left) / rect.width) * 100,
      y: ((event.clientY - rect.top) / rect.height) * 100
    });
  }

  function handlePointerDown(event) {
    // Ignore secondary buttons so a right-click never yanks the focal point.
    if (event.button !== 0 && event.pointerType === 'mouse') return;
    dragging = true;
    frameEl?.setPointerCapture?.(event.pointerId);
    setFocusFromPointer(event);
    event.preventDefault();
  }

  function handlePointerMove(event) {
    if (!dragging) return;
    setFocusFromPointer(event);
  }

  function handlePointerUp(event) {
    if (!dragging) return;
    dragging = false;
    frameEl?.releasePointerCapture?.(event.pointerId);
  }

  function nudge(dx, dy) {
    focus = normalizeFocus({ x: safeFocus.x + dx, y: safeFocus.y + dy });
  }

  function handleKeydown(event) {
    const step = event.shiftKey ? 10 : 1;
    switch (event.key) {
      case 'ArrowLeft':
        nudge(-step, 0);
        break;
      case 'ArrowRight':
        nudge(step, 0);
        break;
      case 'ArrowUp':
        nudge(0, -step);
        break;
      case 'ArrowDown':
        nudge(0, step);
        break;
      default:
        return;
    }
    event.preventDefault();
  }

  function recentre() {
    focus = { ...DEFAULT_FOCUS };
  }
</script>

<div class="focus-picker">
  <div class="focus-stage">
    <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
    <div
      class="focus-frame"
      class:is-dragging={dragging}
      bind:this={frameEl}
      role="group"
      aria-label="Featured image focal point"
      onpointerdown={handlePointerDown}
      onpointermove={handlePointerMove}
      onpointerup={handlePointerUp}
      onpointercancel={handlePointerUp}
    >
      <img {src} alt="" draggable="false" />
      <button
        type="button"
        class="focus-marker"
        style="left: {safeFocus.x}%; top: {safeFocus.y}%;"
        aria-label="Focal point at {safeFocus.x}% across, {safeFocus.y}% down. Use arrow keys to adjust."
        onkeydown={handleKeydown}
        onpointerdown={(e) => e.stopPropagation()}
      ></button>
    </div>
  </div>

  <p class="focus-hint">
    Drag the dot (or use arrow keys) to set the part of the image that stays visible when it is cropped.
  </p>

  <div class="focus-previews">
    <figure>
      <div class="focus-crop focus-crop--wide">
        <img {src} alt="" style="object-position: {objectPosition};" />
      </div>
      <figcaption>Desktop hero</figcaption>
    </figure>
    <figure>
      <div class="focus-crop focus-crop--tall">
        <img {src} alt="" style="object-position: {objectPosition};" />
      </div>
      <figcaption>Mobile</figcaption>
    </figure>
  </div>

  <div class="focus-footer">
    <span class="focus-readout">{safeFocus.x}% × {safeFocus.y}%</span>
    <button type="button" class="focus-reset" onclick={recentre}>Re-centre</button>
  </div>
</div>

<style>
  .focus-picker {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .focus-stage {
    display: flex;
    justify-content: center;
    background: var(--color-cream, #f7f4ef);
    padding: 0.5rem;
  }

  .focus-frame {
    position: relative;
    display: inline-block;
    line-height: 0;
    max-width: 100%;
    cursor: crosshair;
    touch-action: none;
  }

  .focus-frame.is-dragging {
    cursor: grabbing;
  }

  .focus-frame > img {
    display: block;
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 16rem;
    user-select: none;
    -webkit-user-drag: none;
  }

  .focus-marker {
    position: absolute;
    width: 1.5rem;
    height: 1.5rem;
    margin: 0;
    padding: 0;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    border: 2px solid #ffffff;
    background: rgba(0, 0, 0, 0.35);
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.5), 0 2px 8px rgba(0, 0, 0, 0.4);
    cursor: grab;
  }

  .focus-marker::after {
    content: '';
    position: absolute;
    inset: 0.45rem;
    border-radius: 50%;
    background: #ffffff;
  }

  .focus-marker:focus-visible {
    outline: 2px solid var(--color-accent, #b45309);
    outline-offset: 3px;
  }

  .focus-hint {
    font-size: 0.75rem;
    line-height: 1.4;
    color: var(--color-stone, #6b6257);
  }

  .focus-previews {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 0.5rem;
  }

  .focus-previews figure {
    margin: 0;
  }

  .focus-crop {
    overflow: hidden;
    border: 1px solid var(--color-pearl, #e3ded5);
    background: var(--color-cream, #f7f4ef);
  }

  .focus-crop--wide {
    aspect-ratio: 3 / 1;
  }

  .focus-crop--tall {
    aspect-ratio: 4 / 5;
  }

  .focus-crop img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .focus-previews figcaption {
    margin-top: 0.25rem;
    font-size: 0.625rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--color-stone, #6b6257);
  }

  .focus-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
  }

  .focus-readout {
    font-size: 0.75rem;
    color: var(--color-stone, #6b6257);
    font-variant-numeric: tabular-nums;
  }

  .focus-reset {
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--color-stone, #6b6257);
    background: none;
    border: 1px solid var(--color-pearl, #e3ded5);
    padding: 0.3rem 0.6rem;
    cursor: pointer;
    font-family: inherit;
    transition: border-color 0.2s, color 0.2s;
  }

  .focus-reset:hover {
    border-color: var(--color-accent, #b45309);
    color: var(--color-ink, #1c1a17);
  }
</style>
