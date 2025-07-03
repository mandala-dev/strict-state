<script lang="ts">
  import { Handle, Position, type NodeProps } from '@xyflow/svelte';
  class BgColor {
    current = $state('#F7F9FB');
  }
  export const bgColor = new BgColor();

 
  let { isConnectable }: NodeProps = $props();
</script>
 
<Handle type="target" position={Position.Left} {isConnectable} />
<div>
  Custom Color Picker Node: <strong>{bgColor.current}</strong>
</div>
<input class="nodrag" type="color" bind:value={bgColor.current} />
<Handle type="source" position={Position.Right} {isConnectable} />