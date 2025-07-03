<script lang="ts">
  import { Handle, Position, type NodeProps } from '@xyflow/svelte';

  let { isConnectable }: NodeProps = $props();
</script>

<Handle type="target" position={Position.Left} {isConnectable} />
<div>
  Custom Color Picker Node: 
</div>
<input class="nodrag" type="color" />
<Handle type="source" position={Position.Right} {isConnectable} />
