<script lang="ts">
	import { SvelteFlow, Controls, MiniMap, Panel, Background } from '@xyflow/svelte';
	import '@xyflow/svelte/dist/style.css';
	import { smSrc, nodeTypes, edgeTypes, statechart } from './lib/sm-state.svelte';
	import { autoLayout } from './auto-layout'
	function onAutoLayout() {
		const newStatechart = autoLayout(statechart);
		statechart.n = newStatechart.n;
		statechart.e = newStatechart.e;
	}
</script>

<!-- {#key smSrc.triggerUpdate} -->
<!-- <div style:width="100%" style:height="100%"> -->
{#key smSrc.text}
	<SvelteFlow {nodeTypes} {edgeTypes} bind:nodes={statechart.n} bind:edges={statechart.e} fitView>
		<!-- <Panel position="top-right">
			<button onclick={onAutoLayout}>tree layout</button>
		</Panel> -->
		<!-- <div class="updatenode__controls">
			<button onclick={() => {update();}}>Update</button>
		</div> -->
		<Background />
		<Controls />
		<!-- <MiniMap /> -->
	</SvelteFlow>
{/key}

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
