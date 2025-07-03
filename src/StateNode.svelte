<script lang="ts">
	import { Group, Node, Anchor, Resizer } from 'svelvet';
	import type { IExeStateMachine } from '../state-machine-cat/src/exec/index.mjs';

	export let statemachine: IExeStateMachine;
	export let parentPos;
	export let parentSize;
</script>

{#each statemachine.states as state, i}
	<!-- {@const dim = parentSize / (Math.ceil(Math.sqrt(statemachine.states.length))+1)} -->
	{@const dim = parentSize / 2}
	{@const pos = { x: parentPos.x + dim * i, y: parentPos.y }}

	<!-- <Anchor connections = {node.connections}/> -->
	{#if state.hasOwnProperty('statemachine')}
		<Group position={pos} width={dim} height={dim}
			><svelte:self parentPos={pos} parentSize={dim} statemachine={state.statemachine} /></Group
		>
	{:else}
		<Node label={state.name} position={pos} dimensions={{ width: dim, height: dim }}></Node>
	{/if}

	<!-- <Node label={state.name} position={pos} dimensions={{ width: dim, height: dim }}></Node> -->
{/each}
