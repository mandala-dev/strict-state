<style>
  .draggable {
    -webkit-touch-callout:none;
    -ms-touch-action:none; touch-action:none;
    -moz-user-select:none; -webkit-user-select:none; -ms-user-select:none; user-select:none;
  }

  .Handle {
    display:block; position:absolute;
    width:8px; height:8px;
    border:solid 1px black;
    background:yellow;
    cursor:move;
  }

  .Handle:global(.ui-draggable-helper) { visibility:hidden }
</style>

<script>
  import { draggable } from 'svelte-agnostic-draggable'

  let [x0,y0, x1,y1, x2,y2, x3,y3] = [120,160, 180,20, 220,20, 280,160]

/**** map all touch events to mouse events ****/

  import mapTouchToMouseFor from 'svelte-touch-to-mouse'
  mapTouchToMouseFor('.draggable')

/**** Svelte Event Handling ****/

  function onDragMove_0 (Event) {
    x0 = Event.detail.position.left+5
    y0 = Event.detail.position.top +5
  }

  function onDragMove_1 (Event) {
    x1 = Event.detail.position.left+5
    y1 = Event.detail.position.top +5
  }

  function onDragMove_2 (Event) {
    x2 = Event.detail.position.left+5
    y2 = Event.detail.position.top +5
  }

  function onDragMove_3 (Event) {
    x3 = Event.detail.position.left+5
    y3 = Event.detail.position.top +5
  }
</script>

<p style="line-height:150%">
  Drag any handle around:
</p>

<div style="
  display:block; position:relative;
  width:400px; height:400px;
  margin:20px;
  border:solid 1px black
">
  <svg viewBox="0 0 400 400" style="overflow:visible">
    <path d="M {x0} {y0} C {x1} {y1}, {x2} {y2}, {x3} {y3}" stroke="black" stroke-width=2
      fill="transparent" />
    <line x1={x0} y1={y0} x2={x1} y2={y1} stroke="red" stroke-width=2/>
    <line x1={x2} y1={y2} x2={x3} y2={y3} stroke="red" stroke-width=2/>
  </svg>

  <div class="draggable Handle" style="left:{x0-5}px; top:{y0-5}px"
    use:draggable={{ helper:'clone', containment:'parent' }}
    on:drag:move={onDragMove_0}
  ></div>
  <div class="draggable Handle" style="left:{x1-5}px; top:{y1-5}px"
    use:draggable={{ helper:'clone', containment:'parent' }}
    on:drag:move={onDragMove_1}
  ></div>
  <div class="draggable Handle" style="left:{x2-5}px; top:{y2-5}px"
    use:draggable={{ helper:'clone', containment:'parent' }}
    on:drag:move={onDragMove_2}
  ></div>
  <div class="draggable Handle" style="left:{x3-5}px; top:{y3-5}px"
    use:draggable={{ helper:'clone', containment:'parent' }}
    on:drag:move={onDragMove_3}
  ></div>
</div>
