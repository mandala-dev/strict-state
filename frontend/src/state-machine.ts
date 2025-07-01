import type {
    IRenderOptions,
    IStateMachine,
    IState
} from "../../state-machine-cat/types/state-machine-cat.mjs";

interface IStateWithParent extends IState {
    parent: IExeStateMachine
}

// Executable state machine
interface IExeStateMachine extends IStateMachine {
    parent: IExeStateMachine
    curstate: IStateWithParent
}

// Deliberately using state-machine-cat interfaces, cast downstream if needed
export function findStateShallow(sm: IStateMachine, state: string): IState | null {
    for (let j = 0; j < sm.states.length; ++j) {
        if (sm.states[j].name == state) {
            return sm.states[j]
        }
    }
    return null
}

// Deliberately using state-machine-cat interfaces, cast downstream if needed
export function findStateDeep(sm: IStateMachine, stateName: string): IState | null {
    // Try to find in direct child states
    for (let j = 0; j < sm.states.length; ++j) {
        if (sm.states[j].name == stateName) {
            return sm.states[j]
        }
    }
    // Try to find in children of child states
    for (let j = 0; j < sm.states.length; ++j) {
        if (sm.states[j].hasOwnProperty('statemachine')) {
            const foundState = findStateDeep(sm.states[j].statemachine, stateName)
            if (foundState)
                return foundState
        }
    }
    return null
}

// Kicks off the state machine by finding its initial state and transitioning to it
export function startStateMachine(sm: IExeStateMachine): void {
    if (!sm.transitions) {
        return
    }
    for (let i = 0; i < sm.transitions.length; ++i) {
        if (sm.transitions[i].from == "initial") {
            const newState = findStateShallow(sm, sm.transitions[i].to) as IStateWithParent
            if (newState) {
                sm.curstate = newState
                return
            }
        }
    }
    // This shouldn't happen on a properly defined statechart
    sm.curstate = null
}

export function fireEvent(sm: IExeStateMachine, event: string) : void {
    const parentSm = sm.curstate.parent.parent
    if (!parentSm.transitions)
        return
    for (let i = 0; i < parentSm.transitions.length; ++i) {
        if (parentSm.transitions[i].event == event && parentSm.transitions[i].from == sm.curstate.name) {
            sm.curstate = findStateDeep(parentSm, parentSm.transitions[i].to) as IStateWithParent || sm.curstate
        }
    }
}