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
    import { onMount } from "svelte";

    import "@xyflow/svelte/dist/style.css";
    import {
        getNodes,
        getEdges,
        setNodes,
        setEdges,
        initialNodes,
        initialEdges,
        sm,
    } from "./lib/shared.svelte.js";

    function foo() {
        //alert("foo")
        //statechart.nodes[0].data.label = "fsdf";
        //console.log(sm.curstate);
    }

    let nodes = $state.raw<Node[]>(initialNodes);
    let edges = $state.raw<Edge[]>(initialEdges);

    onMount(async () => {
        //console.log($sm.curstate)
    });
</script>

<!-- bind:nodes={getNodes, setNodes}
bind:edges={getEdges, setEdges} -->

<div style="height:100vh;">
    <button on:click={() => foo()}> Reload </button>
    <!-- <SvelteFlow
        bind:nodes
        bind:edges
        fitView
        minZoom={0.1}
        maxZoom={2.5}
        defaultEdgeOptions={{ zIndex: 1 }}
    >
        <Controls />
        <Background variant={BackgroundVariant.Dots} />
        <MiniMap />
    </SvelteFlow> -->
</div>

<style>
    main {
        height: 100vh;
    }

    :global(.svelte-flow .svelte-flow__node.parent) {
        background-color: rgba(220, 220, 255, 0.4);
    }
</style>
