<script lang="ts">
	import { canvas, smSrc, nodeTypes, statechart } from './lib/sm-state.svelte';
	import Draggable from './Draggable.svelte';
</script>

<!-- {#key smSrc.triggerUpdate} -->
<!-- <div style:width="100%" style:height="100%"> -->
<div bind:clientWidth={canvas.w} bind:clientHeight={canvas.h}>
	{#key smSrc.text}
		<Draggable>
			<h1>Drag Me</h1>
		</Draggable>
	{/key}
</div>

<!-- </div> -->

<!-- <label>label:</label>
				<input value={''} />

				<label class="updatenode__bglabel">background:</label>
				<input value={''} /> -->
<!-- <div class="updatenode__checkboxwrapper">
					<label>hidden:</label>
					<input
						type="checkbox"
						checked={nodeHidden}
						on:input={(evt) => (nodeHidden = evt.target?.checked)}
					/>
				</div> -->

<style>
	:global(.updatenode__controls) {
		position: absolute;
		right: 10px;
		top: 10px;
		z-index: 4;
		font-size: 12px;
	}

	:global(.updatenode__controls label) {
		display: block;
	}

	:global(.updatenode__bglabel) {
		margin-top: 10px;
	}

	:global(.updatenode__checkboxwrapper) {
		margin-top: 10px;
		display: flex;
		align-items: center;
	}
</style>
