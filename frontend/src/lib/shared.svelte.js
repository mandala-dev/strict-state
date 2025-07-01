import fragmentShader from '../fragment.glsl?raw'
import vertexShader from '../vertex.glsl?raw'

export let shader = $state({
	vertex: vertexShader,
  fragment: fragmentShader,
  redraw: false
})

export let toggleRedraw = () => {
  shader.redraw = !shader.redraw
}

// export let shader =
//   class {
//     vertex = $state()
//     fragment = $state()
//     redraw = $state(false)
//     toggleRedraw() {
//       this.redraw = !this.redraw
//     }
//     constructor() {
//       this.vertex = vertexShader
//       this.fragment = fragmentShader
//     }
//   }


