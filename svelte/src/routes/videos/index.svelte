<script lang="ts">
	import VideoCard from '$lib/video/VideoCard.svelte';
	import { CardType, type Video } from 'src/types';
	export let videos: Video[];
</script>

<svelte:head>
	<title>Videos</title>
</svelte:head>

<div class="videos">
	<h1>Videos</h1>
	<div class="grid">
		{#each videos as video (video.id)}
			<VideoCard {video} />
		{/each}
	</div>
</div>

<style>
	.videos {
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
