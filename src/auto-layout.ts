import { type Statechart } from "./lib/sm-state.svelte";
import { stratify, tree } from 'd3-hierarchy';


const g = tree();

const getLayoutedElements = (nodes, edges, options?) => {
    if (nodes.length === 0) return { nodes, edges };

    const { width, height } = document
        .querySelector(`[data-id="${nodes[0].id}"]`)
        .getBoundingClientRect();
    const hierarchy = stratify()
        .id((node) => node.id)
        .parentId((node) => edges.find((edge) => edge.target === node.id)?.source);
    const root = hierarchy(nodes);
    const layout = g.nodeSize([width * 2, height * 2])(root);

    return {
        nodes: layout
            .descendants()
            .map((node) => ({ ...node.data, position: { x: node.x, y: node.y } })),
        edges
    };
};

export function autoLayout(statechart: Statechart): Statechart {
    const layouted = getLayoutedElements(statechart.n, statechart.e);
    return { n: [...layouted.nodes], e: [...layouted.edges] };
}