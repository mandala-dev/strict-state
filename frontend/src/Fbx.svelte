<script>
    import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
    import { T, useTask, useThrelte } from '@threlte/core'
    import * as THREE from 'three'
    const { autoRenderTask, camera, scene, size } = useThrelte()
    let uniforms = {color: {type: 'vec3', value: new THREE.Color(0xffff00)}}
    let { redraw = $bindable(), vert = $bindable(), frag = $bindable() } = $props();

    let vertFoo = `
    void main() {
      vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
      gl_Position = projectionMatrix * modelViewPosition; 
    }
    `
    let fragFoo = `
        uniform vec3 color;
        void main() {
            gl_FragColor = vec4(color, 1.0);
        }
    `
    let material =  new THREE.ShaderMaterial({
        uniforms: uniforms,
        fragmentShader: fragFoo,
        vertexShader: vertFoo,
    })
    const fbxLoader = new FBXLoader()
    fbxLoader.load(
        'ACTOR_TYPE_Car2.fbx',
        (group) => {
            // console.log('Yeah')
            // console.log("my object: %o", group)
            group.children[0].material = material
            scene.add(group)
        })

    // useTask(
    // () => {
    // },
    // { before: autoRenderTask }
    //)
</script>

<!-- position={[-70, 50, 10]} -->

<T.Object3D>
    
</T.Object3D>