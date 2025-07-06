<script lang="ts">
	import { Pane, Splitpanes } from 'svelte-splitpanes';
	import JSONTree from './svelte-json-tree/index.ts';
	import Statechart from './Statechart.svelte';
	import { statechart } from './lib/sm-state.svelte';

	import { sm, smSrc, update} from './lib/sm-state.svelte';

	import CodeMirror from 'svelte-codemirror-editor';

	let layout = $derived.by(() => {
		//TODO disable updates while dragging?

		//smSrc.layout = JSON.stringify(statechart.n, null, '   ');
		//return smSrc.layout;
		return JSON.stringify(statechart.n, null, '   ');
	});

	function applyStateMachine() {
		update();
	}

	function applyLayout() {
		statechart.n = JSON.parse(layout);
	}
</script>

<div class="form-button">
	<button class="left-button" onclick={()=>applyStateMachine()}
		>Apply State Machine</button
	>
	<button class="right-button" onclick={()=>applyLayout()}
		>Apply Layout<i class="icon-right"></i></button
	>
</div>

<Splitpanes horizontal={true} style="height: 100vh">
	<Pane>
		<Splitpanes>
			<Pane minSize={20}>
				<CodeMirror bind:value={smSrc.text} />
			</Pane>

			<Pane>
				<CodeMirror bind:value={layout} />
				<!-- <JSONTree value={layout} /> -->
			</Pane>
		</Splitpanes>
	</Pane>
	<Pane>
		<Statechart />
	</Pane>
</Splitpanes>

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
</style>
