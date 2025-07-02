<script>
  let text = "";
  import JSONTree from "./lib/svelte-json-tree/index";
  import CodeMirror from "svelte-codemirror-editor";
  import { javascript } from "@codemirror/lang-javascript";
  import { oneDark } from "@codemirror/theme-one-dark";
  import Statechart from "./Statechart.svelte";

  import { sm, smSrc, shader } from "./lib/shared.svelte.js";
  import { Pane, Splitpanes } from "svelte-splitpanes";

  const ast = sm;
</script>

<Splitpanes horizontal={true} style="height: 100vh">
  <Pane>
    <Splitpanes>
      <Pane minSize={20}>
        1
        <br />
        <em class="specs">I have a min width of 20%</em>
        <button on:click={() => {}}>Apply</button>
        <CodeMirror bind:value={smSrc.text} lang={javascript()} />
      </Pane>
      <Pane>
        <JSONTree value={ast} />
      </Pane>
    </Splitpanes>
  </Pane>
  <Pane>
    <Statechart />
  </Pane>
</Splitpanes>

<style>
  :global(body, html) {
    margin: 0;
  }
</style>
