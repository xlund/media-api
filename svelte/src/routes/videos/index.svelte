<script lang="ts">
	import type { Video } from 'src/types/base';
	export let videos: Video[];

	async function setPlaying(id: number) {
		const res = await fetch('http://localhost:4000/api/videos/playing/', {
			method: 'POST',
			headers: {
				'content-type': 'application/json'
			},
			body: JSON.stringify({
				videoId: id
			})
		});
		const data = await res.text();
		console.log(data);
	}
</script>

<svelte:head>
	<title>Videos</title>
</svelte:head>

<div class="videos">
	<h1>Videos</h1>
	<div class="grid">
		{#each videos as video (video.id)}
			<div class="card" on:click={() => setPlaying(video.id)}>
				<picture>
					<img class="image" src={`http://0.0.0.0:4000/api/videos/posters/${video.id}`} alt="" />
				</picture>
				<h2 class="title">{video.title}</h2>
			</div>
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

	.title {
		font-weight: 500;
	}

	.image {
		height: 200px;
		width: auto;
	}

	.grid {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		grid-template-rows: repeat(1fr);
		gap: 10px 10px;
	}
</style>
