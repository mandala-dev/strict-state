## Purpose
State machine editing and simulation.

## Screenshot
![alt text](https://github.com/LemiBijafra/strict-state/blob/main/screenshot.png?raw=true)

## Status
WIP
Contributors more than welcome.

# Running
You have to clone the repo and update submodules, downloading a ZIP archive will not cut it because of submodules use.

`npm install`

`npm run dev`

## References
Internally uses these projects:
- `xyflow` because it rocks for drawing graphs in JavaScript.
- Fork of the `state-machine-cat` because it parses SCXML and its own format into an AST object on top of which this project defines its own, executable state machine definition.

# TODOs

- Automatic node arrangement.
- Simple simulation UI: fireing events and visualizing transitions.
- Drag and drop of state machine and layout text.