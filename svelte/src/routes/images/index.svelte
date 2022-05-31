<script lang="ts">
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
			<div class="card">
				<picture>
					<img class="image" src={`http://0.0.0.0:4000/api/images/${image.id}`} alt="" />
				</picture>
				<h2 class="title">{image.title}</h2>
			</div>
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

	.title {
		font-weight: 500;
	}

	.grid {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		grid-template-rows: repeat(1fr);
		gap: 10px 10px;
	}

	.image {
		height: 200px;
		width: 100%;
		object-fit: cover;
	}
</style>
