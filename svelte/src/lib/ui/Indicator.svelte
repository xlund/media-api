<script lang="ts">
	export let position: number;
	export let length: number;
	import { readableTime } from '../../helpers/_utils';
	function getPlaybackPosition(position: number, length: number) {
		return (position / length) * 10000;
	}
</script>

<div class="playback">
	<span class="time beginning">0:00:00</span>
	<div class="canvas">
		<span class="time indicator" style="left: {getPlaybackPosition(position, length)}%" />
	</div>
	<span class="time end">{readableTime(length)}</span>
</div>

<style>
	.playback {
		padding: 20px;
		display: flex;
		width: 100%;
		justify-content: space-between;
		background-color: #ededed;
	}

	.canvas {
		position: relative;
		width: 100%;
		margin: 0 var(--spacing-small);
	}

	.indicator {
		position: absolute;
		height: 100%;
		width: 2px;
		background-color: black;
		top: 0;
		bottom: 0;
	}
</style>
