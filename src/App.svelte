<script lang="ts">

	import { Pane, Splitpanes } from 'svelte-splitpanes';
	import JSONTree from './svelte-json-tree/index.ts';
	import Statechart from './Statechart.svelte';

	import { sm, smSrc } from './lib/sm-state.svelte';

	import CodeMirror from 'svelte-codemirror-editor';

	
	//import '@../index.css'

	

	// setInterval(() => {
	// 	console.log(nodes);
	// 	console.log(edges);
	// }, 10000);
</script>

<Splitpanes horizontal={true} style="height: 100vh">
	<Pane>
		<Splitpanes>
			<Pane minSize={20}>
				<CodeMirror bind:value={smSrc.text} />
			</Pane>
			<Pane>
				<JSONTree value={sm} />
			</Pane>
		</Splitpanes>
	</Pane>
	<Pane>
		<Statechart/>	
	</Pane>
</Splitpanes>
