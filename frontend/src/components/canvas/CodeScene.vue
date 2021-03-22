<template>
    <div class="w-full h-full">
        <div
            ref="canvas"
            class="w-full h-full"
        >

        </div>
        <div>
            <script
                ref="vertexShader"
                id="vertexShader"
                type="x-shader/x-vertex"
            >

                #include <morphtarget_pars_vertex>

			    void main()	{
			
                    #include <begin_vertex>
                    #include <morphtarget_vertex>

                    gl_Position = vec4( transformed, 1.0 );

			}

            </script>

            <script
                ref="fragmentShader"
                id="fragmentShader"
                type="x-shader/x-fragment"
            >

                void main()	{

				gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );

			}

            </script>
        </div>
    </div>

</template>

<script>
import * as THREE from "three";

export default {
    name: "CodeScene",
    data() {
        return {
            camera: null,
            scene: null,
            renderer: null,
            cube: null,
            zoom: 4,
            width: 0,
            height: 0,
            fancyShader: null,
            timestamp: 0,
            wireframeGrid: null,
        };
    },

    //
    //
    // MIGRATING ALL OF THIS CODE OVER TO PROTOAST-3D REPO AND
    // I WILL INCLUDE IT AS A PLUGIN FOR THIS
    //
    //

    mounted() {
        //     this.init();
        //     this.animate();
    },

    methods: {
        // setupInit() {
        //     this.width = this.$refs.canvas.clientWidth;
        //     this.height = this.$refs.canvas.clientHeight;
        //     this.aspect = this.width / this.height;
        //     this.scene = new THREE.Scene();
        //     const fov = 45;
        //     const near = 1;
        //     const far = 500;
        //     this.camera = new THREE.PerspectiveCamera(
        //         fov,
        //         this.aspect,
        //         near,
        //         far
        //     );
        //     this.camera.position.set(0, 0, 100);
        //     this.camera.lookAt(0, 0, 0);
        //     this.renderer = new THREE.WebGLRenderer({ alpha: true });
        //     this.renderer.setSize(this.width, this.height);
        //     this.$refs.canvas.appendChild(this.renderer.domElement);
        // },
        // init() {
        //     this.setupInit();
        //     this.adjustLighting();
        //     this.addWireframeGrid();
        //     this.addCube();
        //     this.addRoundedRect();
        //     // this.addCustomShader();
        //     this.animate();
        // },
        // animate() {
        //     requestAnimationFrame(this.animate);
        //     // this.timestamp += 0.01;
        //     // this.fancyShader.morphTargetInfluences[0] = Math.abs(
        //     //     Math.sin(this.timestamp)
        //     // );
        //     this.cube.rotation.x += 0.01;
        //     this.cube.rotation.y += 0.02;
        //     this.renderer.render(this.scene, this.camera);
        // },
        // addRoundedRect() {
        //     // Rounded rectangle
        //     const roundedRectShape = new THREE.Shape();
        //     this.roundedRect(roundedRectShape, 0, -10, 10, 5, 1);
        //     const extrudeSettings = {
        //         depth: 0.25,
        //         bevelEnabled: true,
        //         bevelSegments: 5,
        //         steps: 2,
        //         bevelSize: 0.2,
        //         bevelThickness: 1,
        //     };
        //     this.addShape(
        //         roundedRectShape,
        //         extrudeSettings,
        //         0x2f9bda,
        //         -150,
        //         150,
        //         0,
        //         0,
        //         0,
        //         0,
        //         1
        //     );
        // },
        // roundedRect(ctx, x, y, width, height, radius) {
        //     ctx.moveTo(x, y + radius);
        //     ctx.lineTo(x, y + height - radius);
        //     ctx.quadraticCurveTo(x, y + height, x + radius, y + height);
        //     ctx.lineTo(x + width - radius, y + height);
        //     ctx.quadraticCurveTo(
        //         x + width,
        //         y + height,
        //         x + width,
        //         y + height - radius
        //     );
        //     ctx.lineTo(x + width, y + radius);
        //     ctx.quadraticCurveTo(x + width, y, x + width - radius, y);
        //     ctx.lineTo(x + radius, y);
        //     ctx.quadraticCurveTo(x, y, x, y + radius);
        // },
        // addShape(shape, extrudeSettings, color, x, y, z, rx, ry, rz, s) {
        //     // extruded shape
        //     var geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
        //     var mesh = new THREE.Mesh(
        //         geometry,
        //         new THREE.MeshPhongMaterial({ color: color })
        //     );
        //     mesh.position.z = -3;
        //     mesh.position.y = 20;
        //     this.scene.add(mesh);
        // },
        // addCube() {
        //     const geometry = new THREE.BoxGeometry();
        //     const material = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
        //     this.cube = new THREE.Mesh(geometry, material);
        //     this.cube.position.z = 2;
        //     this.cube.position.y = 7;
        //     this.scene.add(this.cube);
        // },
        // vertexShader() {
        //     const shader = this.$refs.vertexShader.textContent;
        //     return String(shader);
        // },
        // fragmentShader() {
        //     const shader = this.$refs.fragmentShader.textContent;
        //     return String(shader);
        // },
        // coordinatesDebugAid() {},
        // addWireframeGrid() {
        //     var height = 5;
        //     var width = 20;
        //     const geometry = new THREE.PlaneGeometry(width, height);
        //     const material = new THREE.MeshPhongMaterial({
        //         color: 0xae81ff,
        //         side: THREE.DoubleSide,
        //     });
        //     const plane = new THREE.Mesh(geometry, material);
        //     plane.position.z = 1;
        //     this.scene.add(plane);
        // },
        // addCustomShader() {
        //     var geometry = new THREE.PlaneBufferGeometry();
        //     // generate morph targets
        //     var morphTargets = [];
        //     var morphTarget = geometry.attributes.position.clone();
        //     morphTarget.name = "morphTarget1";
        //     var v = new THREE.Vector3();
        //     for (var i = 0; i < morphTarget.count; i++) {
        //         v.fromBufferAttribute(morphTarget, i);
        //         v.multiplyScalar(0.25);
        //         morphTarget.setXYZ(i, v.x, v.y, v.z);
        //     }
        //     morphTargets.push(morphTarget);
        //     geometry.morphAttributes.position = morphTargets;
        //     var material = new THREE.ShaderMaterial({
        //         vertexShader: this.vertexShader(),
        //         fragmentShader: this.fragmentShader(),
        //     });
        //     material.morphTargets = true;
        //     this.fancyShader = new THREE.Mesh(geometry, material);
        //     this.fancyShader.position.z = -400;
        //     this.scene.add(this.fancyShader);
        // },
        // adjustLighting() {
        //     let pointLight = new THREE.PointLight(0xdddddd);
        //     pointLight.position.set(-5, -3, 7);
        //     this.scene.add(pointLight);
        //     let ambientLight = new THREE.AmbientLight(0x505050);
        //     ambientLight.position.set(0, 0, 10);
        //     this.scene.add(ambientLight);
        // },
    },
};
</script>