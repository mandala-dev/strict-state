import smcat from "../../state-machine-cat/src/parse/index.mts"
import { startStateMachine, type IExeStateMachine } from "../../state-machine-cat/src/exec/index.mjs"

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

export let smSrc = $state({
  //triggerUpdate: false,
  //inputType: 'scxml',
  inputType: 'smcat',
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
  const ast = smcat.getAST(smSrc.text, inputType);
  sm = {
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
  }
  sm.addParents();
  startStateMachine(sm);
  console.log(sm);
}

export let nodes = $state.raw<Node[]>(new Array<Node>());
export let edges = $state.raw<Edge[]>(new Array<Edge>());
export let statechart = $state({ n: nodes, e: edges });

export const nodeTypes = {
  selectorNode: CustomResizerNode,
  customResizerNode: CustomResizerNode,
  initialStateNode: Statechart_Initial_State,
};
let initPos;
let dim;
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
    const id = statemachine.states[prop].name;
    //console.log(statemachine.states[prop].name)
    let node = {
      id: id,
      //type: 'default',
      //type: 'ResizableNodeSelected',
      //type: 'selectorNode',

      data: { label: id },
      position: childPos,
      width: childDim,
      height: childDim
    };
    if (statemachine.states[prop].name == 'initial')
    {
      //node.type = 'initialStateNode';
      node.type = 'customResizerNode';
      console.log('Yeah!');
    }
    else
      node.type = 'customResizerNode';
    node.targetHandleCount = 3;
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
        id: statemachine.transitions[prop].id,
        source: statemachine.transitions[prop].from,
        target: statemachine.transitions[prop].to,
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
  initNodes();
  updateAst(inputType);
  addNodes(sm, statechart.n, initPos, dim, null);
  //smSrc.triggerUpdate = !smSrc.triggerUpdate; // why does this work only every second click?
  smSrc.text = smSrc.text;
}