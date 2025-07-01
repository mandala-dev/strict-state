<script lang="js">
    import { T } from "@threlte/core";
    import newFragShader from "./yellow.glsl?raw";
    import { shader } from "./lib/shared.svelte";
    // export let vertexText
    // export let fragText
    let {
        redraw = $bindable(),
        vert = $bindable(),
        frag = $bindable(),
    } = $props();
    // setTimeout(() => {

    //     console.log(shader.fragment)
    // }, 5000)
</script>

{#key shader.redraw}
    <T.ShaderMaterial
        fragmentShader = {shader.fragment}
        vertexShader = {shader.vertex}
    />
{/key}

<!-- {#key redraw}
    <T.ShaderMaterial
        fragmentShader={shader.fragment}
        vertexShader={shader.vertex}
    />
{/key} -->

<!-- {#key redraw}
<T.ShaderMaterial
    fragmentShader = {frag}
    vertexShader = {vert}
/>
{/key} -->
