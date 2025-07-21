<script lang="ts">
	import JSONTree from './svelte-json-tree/index.ts';
	import Statechart from './Statechart.svelte';
	//import Statechart1 from './own-node-editor/Statechart1.svelte';
	import { statechart } from './lib/sm-state.svelte';
	import { smSrc, recreateGraph } from './lib/sm-state.svelte';
	import { onMount } from 'svelte';
	import Comm from './Comm.svelte';
	import { HSplitPane, VSplitPane } from 'svelte-split-pane';

	let layout = $derived.by(() => {
		//TODO disable updates while dragging?

		//smSrc.layout = JSON.stringify(statechart.n, null, '   ');
		//return smSrc.layout;
		return JSON.stringify({ nodes: statechart.n, edges: statechart.e }, null, '   ');
	});

	const inputTypes = ['SCXML', 'SMCAT'];

	function applyStateMachine() {
		recreateGraph(smSrc.inputType);
	}

	function applyLayoutFromEditor() {
		//TODO Svelte Flow docs mention some restrictions for manual change of some fields
		const obj = JSON.parse(layout);
		statechart.n = obj.nodes;
		statechart.e = obj.edges;
	}

	function applyLayoutRaw(str) {
		//TODO Svelte Flow docs mention some restrictions for manual change of some fields
		const obj = JSON.parse(str);
		statechart.n = obj.nodes;
		statechart.e = obj.edges;
	}

	applyStateMachine();
	applyLayoutRaw(smSrc.layout);

	const dividerColor = 'black';
	const dividerThickness = '20px';
</script>

<main>
	<div class="form-button">
		<div style="display: flex">
			<button class="left-button" onclick={() => applyStateMachine()}>Apply State Machine</button>
			{#each inputTypes as type (type)}
				<div>
					<input type="radio" bind:group={smSrc.inputType} value={type} />
					{type}
				</div>
			{/each}
			<button class="right-button" onclick={() => applyLayoutFromEditor()}
				>Apply Layout<i class="icon-right"></i></button
			>
		</div>
	</div>

	<div class="wrapper">
		<VSplitPane>
			<top slot="top">
				<HSplitPane
					updateCallback={() => {
						console.log('HSplitPane Updated!');
					}}
				>
					<left slot="left">
						<textarea style="width: 100%; height: 100%" bind:value={smSrc.text}></textarea>
					</left>
					<right slot="right">
						<textarea style="width: 100%; height: 100%" bind:value={layout}></textarea>
					</right>
				</HSplitPane>
			</top>
			<down slot="down">
				<Statechart />
				<!-- <Statechart1 /> -->
			</down>
		</VSplitPane>
	</div>
	<!-- <Splitpanes horizontal={true} style="width: 100vw; height: 100vh">
		<Pane size={30}>
			<Splitpanes>
				<Pane>
					<textarea style="width: 100%; height: 100%">{smSrc.text}</textarea>
				</Pane>

				<Pane>
					<textarea style="width: 100%; height: 100%">{layout}</textarea>
				</Pane>
			</Splitpanes>
		</Pane>
		<Pane>
			<Splitpanes>
				<Pane>
					<Statechart />
				</Pane>
				<Pane size={20}>
					<Comm />
				</Pane>
			</Splitpanes>
		</Pane>
	</Splitpanes> -->
</main>

<style>
	.form-button {
		width: 95vw;
		display: inline-block;
		overflow: auto;
		white-space: nowrap;
		margin: 0px auto;
	}

	.left-button {
		float: left;
	}

	.right-button {
		float: right;
	}

	left,
	right {
		width: 100%;
		height: 100%;
		display: block;
		text-align: center;
	}
	div.wrapper {
		width: 95%;
		/* height: 400px; */
		height: 95vh;
		margin: auto;
	}
</style>
