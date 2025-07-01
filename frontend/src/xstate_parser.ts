import { SvelteFlow, Background, type Edge, type Node } from '@xyflow/svelte';
import { createActor, StateMachine } from 'xstate';

function parseState(sm) {
}

export function xstateToNodes(config: any) : Node[] {
    return
    [
        { id: '1', data: { label: '-' }, position: { x: 100, y: 100 }},
        { id: '2', data: { label: 'Node 2' }, position: { x: 100, y: 200 },  type: 'ResizableNodeSelected' },
        { id: '3', data: { label: 'Node 3' }, position: { x: 0, y: 0 }, parentId: '2', extent: 'parent' } 
    ]
    // for (const [key, value] of Object.entries(sm)) {

    // }
}