<script lang="ts">
	import type { Video } from 'src/types';

	export let video: Video;

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

<div class="card" on:click={() => setPlaying(video.id)}>
	<picture>
		<img class="image" src={`http://0.0.0.0:4000/api/videos/posters/${video.id}`} alt="" />
	</picture>
	<h2 class="title">{video.title}</h2>
</div>

<style>
	.title {
		font-weight: 500;
	}

	.image {
		height: 200px;
		width: auto;
	}
</style>
