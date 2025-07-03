
<script lang="ts">
	import {
		SvelteFlow,
		Controls,
		MiniMap,
		Position,
		type Node,
		type Edge,
		type XYPosition,
		Background
	} from '@xyflow/svelte';

	import { sm } from './lib/sm-state.svelte';

	import ResizableNodeSelected from './ResizableNodeSelected.svelte';
	import CustomResizerNode from './CustomResizerNode.svelte';

	import '@xyflow/svelte/dist/style.css';
	//import '@../index.css'
	
	import type { IExeStateMachine } from '../state-machine-cat/src/exec/index.mjs';

	const nodeTypes = {
		selectorNode: CustomResizerNode,
		customResizerNode: CustomResizerNode,
	};

	let { nodes1, edges1 } = $props();
	nodes1 = new Array<Node>();
	edges1 = new Array<Edge>();

	let initPos = { x: 0, y: 0 };

	let dim = 400;
	const nodeDefaults = {
		sourcePosition: Position.Right,
		targetPosition: Position.Left,
  	};
	function addNodes(
		statemachine: IExeStateMachine,
		out: Node[],
		parentPos: XYPosition,
		parentDim: number,
		parentId: string | null
	) {
		// nodes (states)
		for (let prop = 0; prop != statemachine.states.length; ++prop) {
			const childDim = parentDim / 2;
			const childPos = { x: parentPos.x + 10 + prop * 2, y: parentPos.y };
			const id = statemachine.states[prop].name;
			//console.log(statemachine.states[prop].name)
			let node = {
				id: id,
				//type: 'default',
				//type: 'ResizableNodeSelected',
				type: 'customResizerNode',
				//type: 'selectorNode',

				data: { label: id },
				position: childPos,
				width: childDim,
				height: childDim,
			};
			if (parentId) {
				node.parentId = parentId;
			}
			out.push(node);

			if (statemachine.states[prop].hasOwnProperty('statemachine')) {
				addNodes(
					statemachine.states[prop].statemachine as IExeStateMachine,
					out,
					childPos,
					childDim,
					id
				);
			}
		}
		// edges (transitions)
		if (statemachine.hasOwnProperty('transitions') && statemachine.transitions) {
			for (let prop = 0; prop != statemachine.transitions.length; ++prop) {
				let edge = {
					id: statemachine.transitions[prop].id,
					source: statemachine.transitions[prop].from,
					target: statemachine.transitions[prop].to,
				}
				if (statemachine.transitions[prop].label) {
					edge.label = statemachine.transitions[prop].label;
				}
				edges1.push(edge)
			}
		}
	}
	addNodes(sm, nodes1, initPos, dim, null);

	let nodes = $state.raw<Node[]>(nodes1);
	let edges = $state.raw<Edge[]>(edges1);
	console.log(nodes1);
	console.log(edges1);

	// setInterval(() => {
  	// 	console.log(nodes);
	// 	console.log(edges);
	// }, 10000);
</script>  


<SvelteFlow bind:nodes bind:edges {nodeTypes} fitView>
  <Background />
  <Controls />
  <MiniMap />
</SvelteFlow>
