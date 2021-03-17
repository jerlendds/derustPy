<template>
    <div
        ref="canvas"
        class="w-full h-full"
    >

    </div>
</template>

<script>
import * as THREE from "three";
// TODO BROKEN ON BUILD STEP
// var createBackground = require("three-vignette-background");

export default {
    name: "CodeScene",
    data() {
        return {
            camera: null,
            scene: null,
            renderer: null,
            mesh: null,
        };
    },
    methods: {
        //         createBackgroundGradient(opt) {
        //             opt = opt;
        //             var geometry = opt.geometry || new THREE.PlaneGeometry(2, 2, 1);
        //             var material = new THREE.RawShaderMaterial({
        //                 vertexShader: `
        // attribute vec3 position;
        // uniform mat4 modelViewMatrix;
        // uniform mat4 projectionMatrix;
        // varying vec2 vUv;
        // void main() {
        //   gl_Position = vec4(position, 1.0);
        //   vUv = vec2(position.x, position.y) * 0.5 + 0.5;
        // }`,
        //                 fragmentShader: `precision mediump float;
        // #pragma glslify: grain = require('glsl-film-grain')
        // #pragma glslify: blend = require('glsl-blend-soft-light')

        // uniform vec3 color1;
        // uniform vec3 color2;
        // uniform float aspect;
        // uniform vec2 offset;
        // uniform vec2 scale;
        // uniform float noiseAlpha;
        // uniform bool aspectCorrection;
        // uniform float grainScale;
        // uniform float grainTime;
        // uniform vec2 smooth;

        // varying vec2 vUv;

        // void main() {
        //   vec2 q = vec2(vUv - 0.5);
        //   if (aspectCorrection) {
        //     q.x *= aspect;
        //   }
        //   q /= scale;
        //   q -= offset;
        //   float dst = length(q);
        //   dst = smoothstep(smooth.x, smooth.y, dst);
        //   vec3 color = mix(color1, color2, dst);

        //   if (noiseAlpha > 0.0 && grainScale > 0.0) {
        //     float gSize = 1.0 / grainScale;
        //     float g = grain(vUv, vec2(gSize * aspect, gSize), grainTime);
        //     vec3 noiseColor = blend(color, vec3(g));
        //     gl_FragColor.rgb = mix(color, noiseColor, noiseAlpha);
        //   } else {
        //     gl_FragColor.rgb = color;
        //   }
        //   gl_FragColor.a = 1.0;
        // }`,
        //                 side: THREE.DoubleSide,
        //                 uniforms: {
        //                     aspectCorrection: { type: "i", value: false },
        //                     aspect: { type: "f", value: 1 },
        //                     grainScale: { type: "f", value: 0.005 },
        //                     grainTime: { type: "f", value: 0 },
        //                     noiseAlpha: { type: "f", value: 0.25 },
        //                     offset: { type: "v2", value: new THREE.Vector2(0, 0) },
        //                     scale: { type: "v2", value: new THREE.Vector2(1, 1) },
        //                     smooth: { type: "v2", value: new THREE.Vector2(0.0, 1.0) },
        //                     color1: { type: "c", value: new THREE.Color("#979797") },
        //                     color2: { type: "c", value: new THREE.Color("#283844") },
        //                 },
        //                 depthTest: false,
        //             });

        //             var mesh = new THREE.Mesh(geometry, material);
        //             mesh.frustumCulled = false;
        //             mesh.style = style;

        //             if (opt) mesh.style(opt);
        //             return mesh;

        //             function style(opt) {
        //                 opt = opt || {};
        //                 if (Array.isArray(opt.colors)) {
        //                     var colors = opt.colors.map(function (c) {
        //                         if (typeof c === "string" || typeof c === "number") {
        //                             return new THREE.Color(c);
        //                         }
        //                         return c;
        //                     });
        //                     material.uniforms.color1.value.copy(colors[0]);
        //                     material.uniforms.color2.value.copy(colors[1]);
        //                 }
        //                 if (typeof opt.aspect === "number") {
        //                     material.uniforms.aspect.value = opt.aspect;
        //                 }
        //                 if (typeof opt.grainScale === "number") {
        //                     material.uniforms.grainScale.value = opt.grainScale;
        //                 }
        //                 if (typeof opt.grainTime === "number") {
        //                     material.uniforms.grainTime.value = opt.grainTime;
        //                 }
        //                 if (opt.smooth) {
        //                     var smooth = fromArray(opt.smooth, THREE.Vector2);
        //                     material.uniforms.smooth.value.copy(smooth);
        //                 }
        //                 if (opt.offset) {
        //                     var offset = fromArray(opt.offset, THREE.Vector2);
        //                     material.uniforms.offset.value.copy(offset);
        //                 }
        //                 if (typeof opt.noiseAlpha === "number") {
        //                     material.uniforms.noiseAlpha.value = opt.noiseAlpha;
        //                 }
        //                 if (typeof opt.scale !== "undefined") {
        //                     var scale = opt.scale;
        //                     if (typeof scale === "number") {
        //                         scale = [scale, scale];
        //                     }
        //                     scale = fromArray(scale, THREE.Vector2);
        //                     material.uniforms.scale.value.copy(scale);
        //                 }
        //                 if (typeof opt.aspectCorrection !== "undefined") {
        //                     material.uniforms.aspectCorrection.value = Boolean(
        //                         opt.aspectCorrection
        //                     );
        //                 }
        //             }

        //             function fromArray(array, VectorType) {
        //                 if (Array.isArray(array)) {
        //                     return new VectorType().fromArray(array);
        //                 }
        //                 return array;
        //             }
        // },

        init: function () {
            let container = this.$refs.canvas;
            this.camera = new THREE.PerspectiveCamera(
                70,
                container.clientWidth / container.clientHeight,
                0.01,
                10
            );
            this.camera.position.z = 1;

            this.scene = new THREE.Scene();
            this.scene.clearAlpha = 1.0;
            let geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
            let material = new THREE.MeshNormalMaterial();
            this.mesh = new THREE.Mesh(geometry, material);
            this.scene.add(this.mesh);

            //TODO: BROKEN ON BUILD STEP
            // var background = createBackground();
            // this.scene.add(background);

            this.renderer = new THREE.WebGLRenderer({ antialias: true });
            this.renderer.setSize(
                container.clientWidth,
                container.clientHeight
            );

            // ⚫ Set the default clear color when calling `gl.clear`
            this.renderer.clearColor(0.0, 0.0, 0.0, 0.0);
            console.log(this.renderer);
            container.appendChild(this.renderer.domElement);
        },
        animate: function () {
            requestAnimationFrame(this.animate);
            this.mesh.rotation.x += 0.01;
            this.mesh.rotation.y += 0.02;
            this.renderer.render(this.scene, this.camera);
        },
    },
    mounted() {
        this.init();
        this.animate();
    },
};
</script>