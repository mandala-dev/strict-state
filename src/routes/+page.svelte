<script module>
	class BgColor {
		current = $state('#F7F9FB');
	}
	export const bgColor = new BgColor();
</script>

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

	import { sm } from '$lib/sm-state.svelte';

	import ColorSelectorNode from '../ColorSelectorNode.svelte';
	import ResizableNodeSelected from '../ResizableNodeSelected.svelte';
	import CustomResizerNode from '../CustomResizerNode.svelte';

	import '@xyflow/svelte/dist/style.css';
	//import '../index.css'
	import type { IExeStateMachine } from '../../state-machine-cat/src/exec/index.mjs';

	const nodeTypes = {
		selectorNode: ColorSelectorNode,
		ResizableNodeSelected,
		CustomResizerNode
	};

	const initialNodes: Node[] = [
		{
			id: '1',
			type: 'input',
			data: { label: 'An input node' },
			position: { x: 0, y: 50 },
			sourcePosition: Position.Right
		},
		{
			id: '2',
			type: 'selectorNode',
			data: {},
			position: { x: 300, y: 50 }
		},
		{
			id: '3',
			type: 'output',
			data: { label: 'Output A' },
			position: { x: 650, y: 25 },
			targetPosition: Position.Left
		},
		{
			id: '4',
			type: 'output',
			data: { label: 'Output B' },
			position: { x: 650, y: 100 },
			targetPosition: Position.Left
		}
	];

	const initialEdges: Edge[] = [
		{
			id: 'e1-2',
			source: '1',
			target: '2',
			animated: true
		},
		{
			id: 'e2a-3',
			source: '2',
			target: '3',
			animated: true
		},
		{
			id: 'e2b-4',
			source: '2',
			target: '4',
			animated: true
		}
	];

	let { nodes, edges } = $props();
	nodes = new Array<Node>();
	edges = new Array<Edge>();

	let initPos = { x: 0, y: 0 };

	let dim = 400;

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
			const childPos = { x: parentPos.x + 10 + prop * 2, y: parentPos.y + 10 };
			const id = statemachine.states[prop].name;
			//console.log(statemachine.states[prop].name)
			let node = {
				id: id,
				//type: 'input',
				//type: 'ResizableNodeSelected',
				type: 'CustomResizerNode',
				data: { label: id },
				position: childPos,
				sourcePosition: Position.Right,
				width: childDim,
				height: childDim
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
				edges.push({
					id: statemachine.transitions[prop].id,
					source: statemachine.transitions[prop].from,
					target: statemachine.transitions[prop].to,
				})
			}
		}
	}
	addNodes(sm, nodes, initPos, dim, null);

	//let nodes = $state.raw<Node[]>(initialNodes);
	//let edges = $state.raw<Edge[]>(initialEdges);

	$inspect(bgColor.current);
</script>

<div>
	<SvelteFlow bind:nodes bind:edges {nodeTypes} fitView>
		<Background bgColor={bgColor.current} />
		<Controls />
		<MiniMap />
	</SvelteFlow>
</div>

<style>
	@import url(https://fonts.googleapis.com/css?family=Rubik);

	div {
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: gray;
		width: 100vw;
		height: 100vh;
		padding: 0;
		margin: 0;
	}
	.node {
		width: 100%;
		height: 100%;
		background-color: yellow;
		border-radius: 8px;
		border: 2px solid black;
	}
	.selected {
		border: 4px solid black;
	}
</style>
