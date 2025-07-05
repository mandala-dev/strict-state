import smcat from "../../state-machine-cat/src/parse/index.mts"
import { startStateMachine, type IExeStateMachine } from "../../state-machine-cat/src/exec/index.mjs"
import {
		type Node,
		type Edge,
	} from '@xyflow/svelte';

export let smSrc = $state({
  triggerUpdate : false,
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