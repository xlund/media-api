<script context="module" lang="ts">
	/** @type {import('./__types/[id]').Load} */
	export async function load({ params, fetch, session, stuff }: any) {
		const base = 'http://0.0.0.0:4000/api';
		const resource = `videos/single/${params.id}`;
		const response = await fetch(`${base}/${resource}`, {
			method: 'GET',
			headers: {
				'content-type': 'application/json'
			}
		});
		return {
			status: response.status,
			props: {
				video: response.ok && (await response.json())
			}
		};
	}
</script>

<script lang="ts">
	import type { Video } from 'src/types/types';
	export let video: Video;
</script>

<div class="wrapper">
	<picture>
		<img src={`http://0.0.0.0:4000/api/videos/posters/${video.id}`} alt="" class="poster" />
	</picture>
	<div class="content">
		<h1>{video.title}</h1>
		<p>{video.description}</p>
	</div>
</div>

<style>
	.wrapper,
	.content {
		display: flex;
		gap: 1rem;
	}

	.content {
		flex-direction: column;
		align-items: flex-start;
	}
	.poster {
		height: 500px;
	}
</style>
