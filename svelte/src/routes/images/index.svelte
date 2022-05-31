<script lang="ts">
	import ImageCard from '$lib/image/ImageCard.svelte';
	import type { Image } from 'src/types/base';
	export let images: Image[];
</script>

<svelte:head>
	<title>Images</title>
	<meta name="description" content="A todo list app" />
</svelte:head>

<div class="images">
	<h1>Images</h1>
	<div class="grid">
		{#each images as image (image.id)}
			<ImageCard {image} />
		{/each}
	</div>
</div>

<style>
	.images {
		width: 100%;
		max-width: var(--column-width);
		margin: var(--column-margin-top) auto 0 auto;
		line-height: 1;
	}

	.grid {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		grid-template-rows: repeat(1fr);
		gap: 10px 10px;
	}
</style>
