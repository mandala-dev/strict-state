<script lang="ts">
  import { writable } from "svelte/store";
  import { SvelteFlow, Background, type Edge, type Node } from "@xyflow/svelte";
  import ResizableNodeSelected from "./ResizableNodeSelected.svelte";
  import { stopwatchMachine } from "./stopwatchMachine";
  import { createActor } from "xstate";
  import { onMount } from "svelte";
  import { startStateMachine, fireEvent} from "./state-machine"

  import foo from "../../state-machine-cat/src/parse/index.mts";

  import "@xyflow/svelte/dist/style.css";

  //const initialNodes: Node[] = xstateToNodes(stopwatchMachine)
  const initialNodes: Node[] = [
    { id: "1", data: { label: "-" }, position: { x: 100, y: 100 } },
    {
      id: "2",
      data: { label: "Node 2" },
      position: { x: 100, y: 200 },
      type: "ResizableNodeSelected",
    },
    {
      id: "3",
      data: { label: "Node 3" },
      position: { x: 0, y: 0 },
      parentId: "2",
      extent: "parent",
    },
  ];
  //style: 'width: 170px; height: 140px;',
  const nodeTypes = {
    ResizableNodeSelected,
  };

  const initialEdges: Edge[] = [{ id: "e1-2", source: "1", target: "2" }];
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
`;
  let ast = foo.getAST(sm, null);

  let gronk = {
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
  
  gronk.addParents()

  const eventMap = new Map();
  
  function createEventMap(obj: any) {
    //for (let i in Object.keys(obj)) {
    //if (!obj.hasOwnProperty(i)) continue;
    for (let i in obj) {
      //console.log(i);
      //console.log(obj[i])
      if (typeof obj[i] == "object" && obj[i] !== null && i != "parent") {
        //if (i == "event") console.log(i);
        createEventMap(obj[i]);
      } else {
        if (i == "event") {
          // if (!eventMap.has(obj[i])) {
          //   eventMap[obj[i]] = new Set()
          // }
          //eventMap[obj[i]].add({ from: obj.from, to: obj.to})
          eventMap[obj[i]] = obj
          //console.log('Event')
          //console.log(obj[i])
        }
      }
    }
  }

  createEventMap(gronk)
  //console.log(eventMap)
  console.log(gronk)
  startStateMachine(gronk)
  //fireEvent(gronk.ast, "a => b")
  fireEvent(gronk, "a => caaa")
  console.log(gronk)
  

  let nodes = writable<Node[]>(initialNodes);
  //let nodes = $state.raw<Node[]>(initialNodes);
  let edges = writable(initialEdges);
  //let edges = $state.raw<Edge[]>(initialEdges);

  let elapsed = 0;
  let nodeName = "Node 1";
  let nodeBg = "#eee";
  let nodeHidden = false;

  const stopwatchActor = createActor(stopwatchMachine);
  stopwatchActor.subscribe((snapshot) => {
    elapsed = snapshot.context.elapsed.toString();
  });
  stopwatchActor.start();

  $: updateNode({ nodeName, nodeBg, nodeHidden });

  function updateNode({
    nodeName,
    nodeBg,
    nodeHidden,
  }: {
    nodeName?: string;
    nodeBg?: string;
    nodeHidden?: boolean;
  }) {
    $nodes.forEach((node) => {
      if (node.id === nodeName) {
        if (nodeBg) {
          node.style = `background: ${nodeBg}`;
        }
        if (node.id === "1") {
          stopwatchActor.send({ type: "start" });
          if (nodeName) {
            // IMPORTANT: You need to mutate the data object
            // otherwise the node will not be updated
            node.data = {
              ...node.data,
              label: nodeName,
            };
          }

          if (nodeHidden !== undefined) {
            node.hidden = nodeHidden;

            $edges.forEach((edge) => {
              if (edge.id === "e1-2") {
                edge.hidden = nodeHidden;
              }
            });
          }
        } else if (node.id === "2") {
          stopwatchActor.send({ type: "stop" });
          node.height = 500;
          node.width = 500;
        } else if (node.id === "3") {
          stopwatchActor.send({ type: "reset" });
          console.log(node.position.x);
          console.log(node.position.y);
        }
        $nodes = $nodes;
        $edges = $edges;
      }
    });
  }
</script>

<div style="height:100vh;">
  <SvelteFlow bind:nodes {nodeTypes} bind:edges fitView>
    <div class="updatenode__controls">
      <label>label:</label>
      <input
        value={nodeName}
        on:input={(evt) => (nodeName = evt.target?.value)}
      />

      <label class="updatenode__bglabel">background:</label>
      <input value={nodeBg} on:input={(evt) => (nodeBg = evt.target?.value)} />

      <div>{(elapsed / 1000).toFixed(1)}s</div>

      <div class="updatenode__checkboxwrapper">
        <label>hidden:</label>
        <input
          type="checkbox"
          checked={nodeHidden}
          on:input={(evt) => (nodeHidden = evt.target?.checked)}
        />
      </div>
    </div>
    <Background />
  </SvelteFlow>
</div>

<style>
  :global(.updatenode__controls) {
    position: absolute;
    right: 10px;
    top: 10px;
    z-index: 4;
    font-size: 12px;
  }

  :global(.updatenode__controls label) {
    display: block;
  }

  :global(.updatenode__bglabel) {
    margin-top: 10px;
  }

  :global(.updatenode__checkboxwrapper) {
    margin-top: 10px;
    display: flex;
    align-items: center;
  }
</style>
