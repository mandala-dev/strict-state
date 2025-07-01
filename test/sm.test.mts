import { assert, expect, test } from 'vitest'
import { startStateMachine, fireEvent} from "../state-machine-cat/src/exec/index.mts"
import smcat from "../state-machine-cat/src/parse/index.mts";

const sm = `
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
let ast = smcat.getAST(sm, null);

let sme = {
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

sme.addParents()
console.log(ast)

//fireEvent(sm, "a => b")
//fireEvent(sme, "a => caaa")
//console.log(sme)

test('Starting state machine', () => {
    startStateMachine(sme)
    assert(sme.curstate.name == 'a', 'Initial state should be "a"')
})