<script lang="ts">
	import type { Image, Video } from 'src/types/types';
	export let type: string = 'image';
	export let data: Image | Video;
	const base = 'http://0.0.0.0:4000/api';
</script>

<div class="card">
	<picture>
		<img
			class={type == 'image' ? 'image' : 'poster'}
			src={`${base}/${type == 'image' ? 'images' : 'videos/posters'}/${data.id}`}
			alt=""
		/>
	</picture>
	<h2 class="title">{data.title}</h2>
</div>

<style>
	.title {
		font-weight: 500;
	}
	.image,
	.poster {
		height: 200px;
	}
	.image {
		object-fit: cover;
		width: 100%;
	}
</style>
