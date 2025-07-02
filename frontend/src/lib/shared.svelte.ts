import fragmentShader from '../fragment.glsl?raw'
import vertexShader from '../vertex.glsl?raw'
import smcat from "../../../state-machine-cat/src/parse/index.mts";
import {
  type Node,
  type Edge
} from "@xyflow/svelte";

import { writable } from "svelte/store";

export let shader = $state({
  vertex: vertexShader,
  fragment: fragmentShader,
  redraw: false
})

export let smSrc = $state({
  text: `
a :    entry/ write unit test
       write code
       exit/ ...,
b {
    # ba is really part of b's statemachine
    # and not of the outer statemachine
    ba, bb {
        bba, bbb;
        bba => bbb;
        bbb => bba;
    };
    ba => bb: one;
    ba => bc: two;
},
c {
    ca {
      caa {
        caaa;
        caaa => final;
      };
    };
},
final;


a => caaa : a => caaa;
initial => a;
a => ba;

/* transition to composite ... */
/* ... bare */
a => b;

/* ... with a note */
# note for a => b
a => b;

/* ... with a label */
a => b: a => b;

/* ... with a note and a label */
# note for caa => final: caa => final
a => b: a => b;

/* transition from composite ... */
/* ... bare */
caa => final;

/* ... with a note */
# note for caa => final
caa => final;

/* ... with a label */
caa => final: caa => final;

/* ... with a note and a label */
# note for caa => final: caa => final
caa => final: caa => final;
`})

const ast = smcat.getAST(smSrc.text, null)

export let sm = $state({
  addParents: function () {
    for (var i in this) {
      if (typeof this[i] == "object") {
        this[i].addParents = this.addParents;
        this[i].addParents();
        this[i].parent = this;
      }
    }
    return this;
  },
  ...ast
})

sm.addParents()

// export let toggleRedraw = () => {
//   shader.redraw = !shader.redraw
// }

export const initialNodes: Node[] = [
  {
    id: "1",
    type: "input",
    data: { label: "Node 0" },
    position: { x: 250, y: 5 },
    class: "light",
  },
  {
    id: "2",
    data: { label: "Group A" },
    position: { x: 100, y: 100 },
    class: "light",
    style: "background-color: rgba(255, 0, 0, 0.2); width: 200px; height: 200px;",
  },
  {
    id: "2a",
    data: { label: "Node A.1" },
    position: { x: 10, y: 50 },
    parentId: "2",
  },
  {
    id: "3",
    data: { label: "Node 1" },
    position: { x: 320, y: 100 },
    class: "light",
  },
  {
    id: "4",
    data: { label: "Group B" },
    position: { x: 320, y: 200 },
    class: "light",
    style: "background-color: rgba(255, 0, 0, 0.2); width: 300px; height: 300px;",
    type: "group",
  },
  {
    id: "4a",
    data: { label: "Node B.1" },
    position: { x: 15, y: 65 },
    class: "light",
    parentId: "4",
    extent: "parent",
  },
  {
    id: "4b",
    data: { label: "Group B.A" },
    position: { x: 15, y: 120 },
    class: "light",
    style: "background-color: rgba(255, 0, 255, 0.2); width: 270px; height: 150px;",
    parentId: "4",
  },
  {
    id: "4b1",
    data: { label: "Node B.A.1" },
    position: { x: 20, y: 40 },
    class: "light",
    parentId: "4b",
  },
  {
    id: "4b2",
    data: { label: "Node B.A.2" },
    position: { x: 100, y: 100 },
    class: "light",
    parentId: "4b",
  },
];

export const initialEdges: Edge[] = [
  { id: "e1-2", source: "1", target: "2", animated: true },
  { id: "e1-3", source: "1", target: "3" },
  { id: "e2a-4a", source: "2a", target: "4a" },
  { id: "e3-4b", source: "3", target: "4b" },
  { id: "e4a-4b1", source: "4a", target: "4b1" },
  { id: "e4a-4b2", source: "4a", target: "4b2" },
  { id: "e4b1-4b2", source: "4b1", target: "4b2" },
];

// Example:
//export let statechart = { nodes : writable<Node[]>(initialNodes), edges : writable<Edge[]>(initialEdges)}

export let statechart = { nodes : writable<Node[]>(initialNodes), edges : writable<Edge[]>(initialEdges)}