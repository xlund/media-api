<script lang="ts">
	import type { Image } from 'src/types/base';
	export let image: Image;
</script>

<div class="card">
	<picture>
		<img class="image" src={`http://0.0.0.0:4000/api/images/${image.id}`} alt="" />
	</picture>
	<h2 class="title">{image.title}</h2>
</div>

<style>
	.title {
		font-weight: 500;
	}

	.image {
		height: 200px;
		object-fit: cover;
		width: 100%;
	}
</style>
