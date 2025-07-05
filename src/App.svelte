<script lang="ts">
	import { Pane, Splitpanes } from 'svelte-splitpanes';
	import JSONTree from './svelte-json-tree/index.ts';
	import Statechart from './Statechart.svelte';
	import { statechart } from './lib/sm-state.svelte';

	import { sm, smSrc } from './lib/sm-state.svelte';

	import CodeMirror from 'svelte-codemirror-editor';

	let layout = $derived.by(() => {
		return JSON.stringify(statechart.n, null, '   ');
		//TODO disable updates while dragging?
	});
	//let layout = $derived(statechart.n);
</script>

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
