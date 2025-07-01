<script lang="js">
    import { DEG2RAD } from 'three/src/math/MathUtils.js'
    import { OrbitControls } from '@threlte/extras'
    import { PlaneGeometry, Vector3 } from 'three'
    import { SimplexNoise } from 'three/examples/jsm/Addons.js'
    import { T } from '@threlte/core'
    import { Tween } from 'svelte/motion'
    import { interactivity } from '@threlte/extras'
    import { quadOut } from 'svelte/easing'
    import { shader } from './lib/shared.svelte.js'
    import MyShaderMaterial from './MyShaderMaterial.svelte'
  
    // Terrain setup
    const terrainSize = 30
    const geometry = new PlaneGeometry(terrainSize, terrainSize, 100, 100)
    const noise = new SimplexNoise()
  
    const vertices = geometry.getAttribute('position')
    for (let i = 0; i < vertices.count; i += 1) {
      const x = vertices.getX(i)
      const y = vertices.getY(i)
      vertices.setZ(i, noise.noise(x / 5, y / 5) * 2 + noise.noise(x / 40, y / 40) * 3)
    }
    geometry.computeVertexNormals()
  
    // Interactivity and shader variables
    interactivity()
    const pulsePosition = new Vector3()
    const pulseTimer = new Tween(0, {
      easing: quadOut
    })
    
    let { redraw = $bindable(), fragmentShader = $bindable() } = $props();
  </script>

  <T.PerspectiveCamera
    makeDefault
    position={[-70, 50, 10]}
    fov={15}
  >
    <OrbitControls
      target.y={1.5}
      autoRotateSpeed={0.2}
    />
  </T.PerspectiveCamera>
  <T.Mesh
    {geometry}
    rotation.x={DEG2RAD * -90}
  >

  <!-- <T.Mesh
    {geometry}
    rotation.x={DEG2RAD * -90}
    onclick={({ point }) => {
      pulsePosition.copy(point)
      pulseTimer
        .set(0, {
          duration: 0
        })
        .then(() => {
          pulseTimer.set(1, { duration: 2000 })
        })
    }}
  > -->
  <MyShaderMaterial
      bind:frag = {shader.fragment}    
      bind:vert = {shader.vertex}
      bind:redraw
    />
    <!-- <MyShaderMaterial
      fragmentShader = {shader.fragment}
      vertexShader = {shader.vertex}
      
      uniforms={{
        pulseTimer: {
          value: 0
        },
        pulsePosition: {
          value: 0
        }
      }}
      uniforms.pulseTimer.value={pulseTimer.current}
      uniforms.pulsePosition.value={pulsePosition}
    /> -->
  </T.Mesh>