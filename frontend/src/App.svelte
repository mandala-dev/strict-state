<script>
  import { Canvas } from "@threlte/core";
  import Scene from "./Scene.svelte";
  import AnimTimeline from "./AnimTimeline.svelte"
  import Timeline from "./Timeline.svelte"
  import Scene1 from "./Scene1.svelte";

  import Prism from "prismjs";
  import CodeInput from "@srsholmes/svelte-code-input/CodeInput.svelte";

  import { AceEditor } from "svelte-ace";
  import "brace/mode/json";
  import "brace/theme/chrome";
  import TreeView from "./TreeView.svelte";
  let text = "";
  import JSONTree from "./lib/svelte-json-tree/index";
  import CodeMirror from "svelte-codemirror-editor";
  import { javascript } from "@codemirror/lang-javascript";
  import Draggable from './Draggable.svelte';
  import { oneDark } from "@codemirror/theme-one-dark";
  import StateMachineEditor from "./StateMachineEditor.svelte";
  import Nodes1 from "./Nodes1.svelte";
  import Statechart from "./Statechart.svelte";

  let redrawn = 0;
  let redraw = () => {
    ++redrawn;
  }; // <= you can bind to this, too

  // const handleWheel = e => {
  // console.log(e);
  // e.preventDefault();
  //
  import { shader, toggleRedraw } from "./lib/shared.svelte.js";
  import { Pane, Splitpanes } from "svelte-splitpanes";

  //  setInterval(() => {
  //    console.log(redrawn)
  //  }, 5000)
  const value = {
    array: [1, 2, 3],
    bool: true,
    object: {
      foo: "bar",
    },
  };
  let tree_data = [
    {
      name: "Group",
      selected: true,
      children: [
        {
          name: "Sub Group",
          children: [
            {
              name: "Item 1.1.1",
            },
            {
              name: "Item 1.1.2",
            },
          ],
        },
        {
          name: "Group",
        },
      ],
    },
    {
      name: "Item 2",
      children: [
        {
          name: "Item 2.1",
        },
        {
          name: "Item 2.2",
        },
      ],
    },
    {
      name: "Item 3",
    },
  ];
</script>

<!-- <svelte:window on:wheel|preventDefault={handleWheel} /> -->
<!-- <CodeMirror bind:value lang={javascript()} theme={oneDark} /> -->

<!-- <TreeView tree_data={document.getRootNode()} /> -->

<Splitpanes horizontal={true} style="height: 100vh">
  <Pane>
    <Splitpanes>
      <Pane minSize={20}>
        1
        <br />
        <em class="specs">I have a min width of 20%</em>
         <button on:click={() => {toggleRedraw()}}>Apply</button>
        <CodeMirror bind:value={shader.fragment} lang={javascript()} />
      </Pane>
      <Pane minSize={20}>
        1
        <br />
        <em class="specs">I have a min width of 20%</em>
         <button on:click={() => {toggleRedraw()}}>Apply</button>
        <CodeMirror bind:value={shader.vertex} lang={javascript()} />
      </Pane>
      <Pane minSize={15}>
        2
        <br />
        <em class="specs">I have a min height of 15%</em>
        <Canvas>
          <Scene />
        </Canvas>
      </Pane>
        <Pane>
          <JSONTree {value} />
          5</Pane>
    </Splitpanes>
  </Pane>
  <Pane>
    <!-- <Canvas>
      <Scene1 bind:redraw={redrawn} />
    </Canvas> -->
    <!-- <StateMachineEditor/> -->
     <Nodes1/>
      <!-- <Statechart/> -->
    </Pane>
    <Pane><Timeline/></Pane>
    <Pane>
      <AnimTimeline
        time={0}
  model={{
    rows: [
      {
        keyframes: [
          {
            val: 40,
          },
          {
            val: 3000,
          },
        ],
      },
    ],
  }}>
  </AnimTimeline>
    </Pane>
</Splitpanes>

<!-- <TreeView tree_data = {tree_data} /> -->

<!-- <AceEditor
  on:selectionChange={(obj) => console.log(obj.detail)}
  on:paste={(obj) => console.log(obj.detail)}
  on:input={(obj) => console.log(obj.detail)}
  on:focus={() => console.log('focus')}
  on:documentChange={(obj) => console.log(`document change : ${obj.detail}`)}
  on:cut={() => console.log('cut')}
  on:cursorChange={() => console.log('cursor change')}
  on:copy={() => console.log('copy')}
  on:init={(editor) => console.log(editor.detail)}
  on:commandKey={(obj) => console.log(obj.detail)}
  on:changeMode={(obj) => console.log(`change mode : ${obj.detail}`)}
  on:blur={() => console.log('blur')}
  width='100%'
  height='300px'
  lang="glsl"
  theme="twilight"
  value={text} /> -->

<style>
  :global(body, html) {
    margin: 0;
  }
</style>
