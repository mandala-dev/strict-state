<script lang="js">
import { createTimeline }  from 'animejs';
import { onMount } from 'svelte';

let speed = 60
let tl
onMount(() => {
    console.log('the component has mounted');
    tl = createTimeline({
    frameRate: speed,
    loop: true,
    })
    .add('.circle', { x: '15rem' })
    .add('.triangle', { x: '15rem' }, '-=500')
    .add('.square', { x: '15rem' }, '-=500');
});

const updateSpeed = (s) => {
  speed = s
  tl.fps = speed
}

</script>

<div class="large row">
  <div class="medium pyramid">
    <div class="triangle"></div>
    <div class="square">
        <svg xmlns="http://www.w3.org/2000/svg">
            <!-- Regular rectangle -->
            <rect width="60" height="40" />

        </svg>
    </div>
    <div class="circle"></div>
  </div>
  <pre class="large log row">
    <span class="label">speed</span>
    <span class="speed value">{speed}</span>
  </pre>
</div>
<div class="large row">
  <fieldset class="controls">
    <input type="range" min=0 max=120 value=60 step=1 class="range" on:input={(evt) => updateSpeed(evt.target?.value)}/>
  </fieldset>
</div>