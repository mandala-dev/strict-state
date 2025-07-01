<script lang="ts">
  import { Timeline } from "animation-timeline-js";
  import type { TimelineModel } from "animation-timeline-js";
  import { onMount } from "svelte";

  export let time: number = 0;
  export let model: TimelineModel;

  let timelineEl!: HTMLDivElement;
  let timeline: Timeline | null = null;

  // Equivalent to componentDidMount and componentWillUnmount
  onMount(() => {
    let newTimeline: Timeline | null = null;
    if (timelineEl) {
      newTimeline = new Timeline({ id: timelineEl });
    }
    timeline = newTimeline;
    // Cleanup
    return () => {
      if (newTimeline) {
        newTimeline.dispose();
      }
    };
  });
  $: if (model) {
    // Reactive statements for model and time
    timeline?.setModel(model);
  }
  $: if (time || time === 0) {
    timeline?.setTime(time);
  }
</script>

<div bind:this={timelineEl} class="editor"></div>

<style>
  .editor {
    width: 100%;
    min-height: 300px;
  }
</style>
