<script lang="ts">
    import {
        SvelteFlow,
        Controls,
        Background,
        BackgroundVariant,
        MiniMap,
        type Node,
        type Edge,
    } from "@xyflow/svelte";

    import "@xyflow/svelte/dist/style.css"
    import { statechart } from "./lib/shared.svelte.js";

    //let nodes = $state.raw<Node[]>(initialNodes);
    //let edges = $state.raw<Edge[]>(initialEdges);
</script>

<div style="height:100vh;">
    <SvelteFlow
        bind:nodes={statechart.nodes}
        bind:edges={statechart.edges}
        fitView
        minZoom={0.1}
        maxZoom={2.5}
        defaultEdgeOptions={{ zIndex: 1 }}
    >
        <Controls />
        <Background variant={BackgroundVariant.Dots} />
        <MiniMap />
    </SvelteFlow>
</div>

<style>
    main {
        height: 100vh;
    }

    :global(.svelte-flow .svelte-flow__node.parent) {
        background-color: rgba(220, 220, 255, 0.4);
    }
</style>
