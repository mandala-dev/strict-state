# strict-state
# WIP

## State machine editing and simulation
![alt text](https://github.com/LemiBijafra/strict-state/blob/main/screenshot.png?raw=true)

Internally uses these projects:
- `xyflow` because it rocks for drawing graphs in JavaScript.
- Fork of the `state-machine-cat` because it parses SCXML and its own format into an AST object on top of which this project defines its own, executable state machine definition.

Currently just some unit tests for the early version of the state machine execution and contraption POC UI.
Hopefully more to come.

`npm install`
`npm run dev`
There's no auto arrangement of nodes for now.
