<script>
	import { biblehubParts } from '$lib/utils/biblehub.js';

	/** @type {{ refs: string }} */
	let { refs } = $props();
	const parts = $derived(biblehubParts(refs));
</script>

{#each parts as part, i}{#if i > 0} · {/if}{#if part.href}<a class="verse-ref" href={part.href} target="_blank" rel="noopener noreferrer">{part.text}</a>{:else}{part.text}{/if}{/each}

<style>
	.verse-ref {
		color: inherit;
		text-decoration: underline;
		text-decoration-color: currentColor;
		text-underline-offset: 0.2em;
		text-decoration-thickness: 1px;
	}
	.verse-ref:hover { opacity: 0.8; }
</style>
