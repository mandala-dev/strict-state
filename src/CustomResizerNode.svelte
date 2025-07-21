<script lang="ts">
  import {
    Handle,
    Position,
    type NodeProps,
    NodeResizeControl,
  } from '@xyflow/svelte';
 
  let { targetHandleCount, isConnectable, data }= $props();
  const DEFAULT_HANDLE_STYLE = 'width: 6px; height: 6px; bottom: -3px; background; rgba(128, 64, 64, 32)';
</script>
 
<NodeResizeControl
  minWidth={100}
  minHeight={5}
  style="background: transparent; border: none;"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    stroke-width="2"
    stroke="rgb(255, 64, 0)"
    fill="none"
    stroke-linecap="round"
    stroke-linejoin="round"
    style="position: absolute; right: 5px; bottom: 5px"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <polyline points="16 20 20 20 20 16" />
    <line x1="14" y1="14" x2="20" y2="20" />
    <polyline points="8 4 4 4 4 8" />
    <line x1="4" y1="4" x2="10" y2="10" />
  </svg>
</NodeResizeControl>
<!-- {#each {length: targetHandleCount}} -->
<!-- {#each {length: 3}} -->
  <Handle
    id="1"
    type="source"
    position={Position.Left}
    style="{DEFAULT_HANDLE_STYLE}; top: 25%"
    {isConnectable}
  />
  <Handle
    id="2"
    type="target"
    position={Position.Left}
    style="{DEFAULT_HANDLE_STYLE}; top: 75%"
    {isConnectable}
  />
  <Handle
    id="3"
    type="source"
    position={Position.Bottom}
    style="{DEFAULT_HANDLE_STYLE}; left: 25%"
    {isConnectable}
  />
  <Handle
    id="4"
    type="target"
    position={Position.Bottom}
    style="{DEFAULT_HANDLE_STYLE}; left: 75%"
    {isConnectable}
  />
  <Handle
    id="5"
    type="source"
    position={Position.Right}
    style="{DEFAULT_HANDLE_STYLE}; top: 25%"
    {isConnectable}
  />
  <Handle
    id="6"
    type="target"
    position={Position.Right}
    style="{DEFAULT_HANDLE_STYLE}; top: 75%"
    {isConnectable}
  />
  <Handle
    id="7"
    type="source"
    position={Position.Top}
    style="{DEFAULT_HANDLE_STYLE}; left: 25%"
    {isConnectable}
  />
  <Handle
    id="8"
    type="target"
    position={Position.Top}
    style="{DEFAULT_HANDLE_STYLE}; left: 75%"
    {isConnectable}
  />
<!-- {/each} -->
<div>{data.label}</div>