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
	import '@xyflow/svelte/dist/style.css';

export let smSrc = $state({
  triggerUpdate : false,
  layout : ``,
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



export let sm : IExeStateMachine;

export function updateAst() {
  const ast = smcat.getAST(smSrc.text, null)
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
export let statechart = $state({n: nodes, e: edges} );

export const nodeTypes = {
		selectorNode: CustomResizerNode,
		customResizerNode: CustomResizerNode
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
				type: 'customResizerNode',
				//type: 'selectorNode',

				data: { label: id },
				position: childPos,
				width: childDim,
				height: childDim
			};
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
					target: statemachine.transitions[prop].to
				};
				if (statemachine.transitions[prop].label) {
					edge.label = statemachine.transitions[prop].label;
				}
				statechart.e.push(edge);
			}
		}
	}
	export function update() {
		console.log(smSrc.triggerUpdate);
		initNodes();
		updateAst();
		addNodes(sm, statechart.n, initPos, dim, null);
		//smSrc.triggerUpdate = !smSrc.triggerUpdate; // why does this work only every second click?
		smSrc.text = smSrc.text;
	}

