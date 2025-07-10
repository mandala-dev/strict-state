<script lang="ts">
  import { Handle, Position, type NodeProps } from '@xyflow/svelte';

  let { isConnectable }: NodeProps = $props();
</script>

<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
  <circle cx="10" cy="10" r="10" />
</svg>

<div></div>
<Handle type="source" position={Position.Right} {isConnectable} />
