import { assert, expect, test } from 'vitest'
import { root, startStateMachine, addParents, fireEvent, IExeStateMachine, IStateWithParent} from "../state-machine-cat/src/exec/index.mts"
import smcat from "../state-machine-cat/src/parse/index.mts";
const util = require('util');

const smSrc = `
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


a => b;


# note for a => b
a => b;


a => b: a => b;


# note for caa => final: caa => final
a => b: a => b;


caa => final;


# note for caa => final
caa => final;


caa => final: caa => final;


# note for caa => final: caa => final
caa => final: caa => final;
`;

root.statemachine = smcat.getAST(smSrc, 'smcat')
addParents(root.statemachine as IExeStateMachine, root);


console.log('curstate');
//console.log(root.statemachine.curstate);

test('Starting state machine', () => {
    startStateMachine(root.statemachine as IExeStateMachine);
    assert((root.statemachine as IExeStateMachine).curstate.name == 'a', 'Initial state should be "a"');
})

test('Transition "a => b"', () => {
    startStateMachine(root.statemachine as IExeStateMachine);
    fireEvent(root.statemachine as IExeStateMachine, "a => b");
    assert((root.statemachine as IExeStateMachine).curstate.name == 'b', 'State should be "b"');
})

test('Transition "a => b"', () => {
    startStateMachine(root.statemachine as IExeStateMachine);
    fireEvent(root.statemachine as IExeStateMachine, "a => caaa");
    assert((root.statemachine as IExeStateMachine).curstate.name == 'caaa', 'State should be "caaa"');
})