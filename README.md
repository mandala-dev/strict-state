## Purpose
Visual state machine editing and simulation.

## Screenshot
![alt text](https://github.com/LemiBijafra/strict-state/blob/main/screenshot.png?raw=true)
## Status
Functional WIP.

Contributors are more than welcome.

If you consider contributing something, please pick some subject from the TODOs list and open a discussion.

## Running
You have to clone the repo and update submodules, downloading a ZIP archive will not cut it because of submodules use.

`npm install`

`npm run dev`

To run some experimental state machine transition tests:

`npm run test sm.test.mts`

## Using

The left pane hosts the state machine editor. The primary language for defining state machines was borrowed from the `state-machine-cat` project: https://state-machine-cat.js.org/, a short tutorial: https://github.com/sverweij/state-machine-cat/blob/main/README.md#short-tutorial

SCXML is supported as well, also through the `smcat` project.

The right pane is a state machine-agnostic, i.e. pure graphical definition of the graph, a.k.a. layout. It gets automatically created when applying the state machine (pressing `Apply State Machine` button) and visually editing the graph. However, manual layout changes can be propagated to the graph editor by pressing the `Apply Layout` button. This is especially useful if you want to save the layout in an external file to copy/paste it as needed (check out example files/layouts).

The opening example gets fetched from the `public` folder. There you will find SCXML and SMCAT examples with captured layouts.

The state machine editor should be self-explanatory. For more information on customizing appearance etc. be sure to visit this awesome project's home page: https://svelteflow.dev/

## References
The following projects are internally used:
- `Svelte Flow` because it rocks for drawing graphs in JavaScript.
- `state-machine-cat` (its fork) because it parses SCXML and its own format into an AST object on top of which this project defines its own, executable state machine definition.

## TODOs
- UML-like CSS.
- Visual creation/deletion of states and transitions.
- Displaying actions.
- Simple simulation UI: fireing events, executing actions and proper handling of transitions.
- Automatic node arrangement.
- Drag and drop of state machine and layout text.
- Reading files from the `public` folder and downloading changes.