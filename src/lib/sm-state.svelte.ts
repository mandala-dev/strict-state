import smcat from "../../state-machine-cat/src/parse/index.mts"
import { root, addParents, startStateMachine, type IExeStateMachine } from "../../state-machine-cat/src/exec/index.mjs"

import {
  SvelteFlow,
  Controls,
  MiniMap,
  Position,
  type Node,
  type Edge,
  type XYPosition,
  Background
} from '@xyflow/svelte';
import CustomResizerNode from '../CustomResizerNode.svelte';
import Statechart_Initial_State from '../Statechart_Initial_State.svelte'
import '@xyflow/svelte/dist/style.css';
import { uid } from "../util";

export let canvas = $state({ w: 0, h: 0});

export let smSrc = $state({
  //triggerUpdate: false,
  //inputType: 'scxml',
  inputType: 'SMCAT',
  text: '',
  layout: '',
})

const defSmFile = './abc.sm';
//const defSmFile = './scxml/simple.scxml';

await fetch(defSmFile)
  .then(r => r.text())
  .then(t => smSrc.text = t)

await fetch('./abc.sm.layout')
  .then(r => r.text())
  .then(t => smSrc.layout = t)

export let sm: IExeStateMachine;

export function updateAst(inputType) {
  sm = smcat.getAST(smSrc.text, { inputType: inputType.toLowerCase() });
  root.statemachine = sm;
  addParents(sm, root);
  startStateMachine(sm);
}

export let nodes = $state.raw<Node[]>(new Array<Node>());
export let edges = $state.raw<Edge[]>(new Array<Edge>());
export let statechart = $state({ n: nodes, e: edges });

export const nodeTypes = {
  selectorNode: CustomResizerNode,
  customResizerNode: CustomResizerNode,
  initialStateNode: Statechart_Initial_State,
};

let initPos : XYPosition;
let dim : number;

// Svelte Flow has some issues with dots in ID names?
// Apparently not, still keeping this.
function fixId(id : string) : string {
  //return id.replace('.', '_');
  return id;
}

function initNodes() {
  statechart.n = new Array<Node>();
  statechart.e = new Array<Edge>();
  initPos = { x: 0, y: 0 };
  dim = 400;
}

function addNodes(
  statemachine: IExeStateMachine,
  out: Node[],
  parentPos: XYPosition,
  parentDim: number,
  parentId: string | null
) {
  // nodes (states)
  for (let prop = 0; prop != statemachine.states.length; ++prop) {
    const childDim = parentDim / 2;
    const childPos = { x: parentPos.x + 10 + prop * 2, y: parentPos.y };
    // const id = statemachine.states[prop].name;
    const id = fixId(statemachine.states[prop].name);
    let node : Node = {
      id: id,
      data: { label: id },
      position: childPos,
      width: childDim,
      height: childDim
    };
    if (statemachine.states[prop].name == 'initial') {
      //node.type = 'initialStateNode';
      node.type = 'customResizerNode';
    }
    else
      node.type = 'customResizerNode';
    // node.targetHandleCount = 3;
    if (parentId) {
      node.parentId = parentId;
    }
    out.push(node);

    if (statemachine.states[prop].hasOwnProperty('statemachine')) {
      addNodes(
        statemachine.states[prop].statemachine as IExeStateMachine,
        out,
        childPos,
        childDim,
        id
      );
    }
  }
  // edges (transitions)
  if (statemachine.hasOwnProperty('transitions') && statemachine.transitions) {
    for (let prop = 0; prop != statemachine.transitions.length; ++prop) {
      let edge = {
        // id: statemachine.transitions[prop].id,  // These can be duplicated which eventually troubles Svelte Flow
        id: uid.get(),
        source: fixId(statemachine.transitions[prop].from),
        target: fixId(statemachine.transitions[prop].to),
        markerEnd: { type: 'arrowclosed' },
      };
      if (statemachine.transitions[prop].label) {
        edge.label = statemachine.transitions[prop].label;
      }
      statechart.e.push(edge);
    }
  }
}

export function recreateGraph(inputType) {
  uid.reset();  // reset the UID seed
  initNodes();
  updateAst(inputType);
  addNodes(sm, statechart.n, initPos, dim, null);
  //smSrc.triggerUpdate = !smSrc.triggerUpdate; // why does this work only every second click?
  smSrc.text = smSrc.text;
}