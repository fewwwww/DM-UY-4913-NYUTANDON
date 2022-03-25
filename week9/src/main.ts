import './style.scss';
import * as THREE from 'three';
import Stats from 'three/examples/jsm/libs/stats.module';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { ShaderMaterial } from 'three';

let renderer: THREE.WebGLRenderer;
let scene: THREE.Scene;
let shell: THREE.Object3D = new THREE.Object3D();
let racquet: THREE.Object3D = new THREE.Object3D();
let camera: THREE.PerspectiveCamera;
let clock = new THREE.Clock();

let lightAmbient: THREE.AmbientLight;
let lightPoint: THREE.PointLight;

let controls: OrbitControls;
let stats: any;

let exampleModel: THREE.Group;
let exampleTexture: THREE.Texture;

import vertexShader from '../resources/shaders/shader.vert?raw';
import fragmentShader from '../resources/shaders/shader.frag?raw';
let shaderMat: ShaderMaterial;

function main() {
	initScene();
	initStats();
	initListeners();
}

function initStats() {
	stats = new (Stats as any)();
	document.body.appendChild(stats.dom);
}

function initScene() {
	scene = new THREE.Scene();
	scene.background = new THREE.Color(0xe6f6ff);

	camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 1000);
	camera.position.z = 8;
	camera.position.y = 3;

	renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.PCFSoftShadowMap;
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(window.innerWidth, window.innerHeight);

	document.body.appendChild(renderer.domElement);

	// controls = new OrbitControls(camera, renderer.domElement);

	// lightAmbient = new THREE.AmbientLight(0x404040);
	// scene.add(lightAmbient);

	// Add a point light to add shadows
	// https://github.com/mrdoob/three.js/pull/14087#issuecomment-431003830
	const shadowIntensity = 0.25;

	lightPoint = new THREE.PointLight(0xffffff);
	lightPoint.position.set(-0.5, 0.5, 4);
	lightPoint.castShadow = true;
	lightPoint.intensity = shadowIntensity;
	scene.add(lightPoint);

	lightPoint = new THREE.PointLight(0xffffff);
	lightPoint.position.set(1, 1, 1);
	lightPoint.castShadow = true;
	lightPoint.intensity = 0.1;
	scene.add(lightPoint);

	lightPoint = new THREE.PointLight(0xffffff);
	lightPoint.position.set(-1, 1, 1);
	lightPoint.castShadow = true;
	lightPoint.intensity = 0.5;
	scene.add(lightPoint);

	const lightPoint2 = lightPoint.clone();
	lightPoint2.intensity = 1 - shadowIntensity;
	lightPoint2.castShadow = false;
	scene.add(lightPoint2);

	const mapSize = 1024; // Default 512
	const cameraNear = 0.5; // Default 0.5
	const cameraFar = 500; // Default 500
	lightPoint.shadow.mapSize.width = mapSize;
	lightPoint.shadow.mapSize.height = mapSize;
	lightPoint.shadow.camera.near = cameraNear;
	lightPoint.shadow.camera.far = cameraFar;

	// add the 3d shell
	const loader1 = new OBJLoader();
	loader1.load('./resources/shell.obj', (obj: any) => {
		shell = obj;
		shell.castShadow = true;
		shell.scale.x = 0.02;
		shell.scale.y = 0.02;
		shell.scale.z = 0.02;
		shell.position.x = -3;
		shell.rotateY(-1);
		scene.add(shell);
	});

	// add the racquet
	const loader2 = new GLTFLoader();
	loader2.load('./resources/racquet.gltf', (gltf: any) => {
		racquet = gltf.scene;
		racquet.castShadow = true;
		racquet.scale.x = 0.02;
		racquet.scale.y = 0.02;
		racquet.scale.z = 0.02;
		racquet.position.x = 3;
		racquet.position.y = 2;
		racquet.rotateY(-1);
		scene.add(racquet);
	});

	const uniforms = {
		u_time: { type: 'f', value: 1.0 },
		u_resolution: { type: 'v2', value: new THREE.Vector2(800, 800) },
		u_mouse: { type: 'v2', value: new THREE.Vector2() },
	};

	shaderMat = new THREE.ShaderMaterial({
		uniforms: uniforms,
		vertexShader: vertexShader,
		fragmentShader: fragmentShader,
	});

	// Init animation
	animate();
}

function initListeners() {
	window.addEventListener('resize', onWindowResize, false);

	window.addEventListener('keydown', (event) => {
		const { key } = event;

		switch (key) {
			case 'e':
				const win = window.open('', 'Canvas Image');

				const { domElement } = renderer;

				// Makse sure scene is rendered.
				renderer.render(scene, camera);

				const src = domElement.toDataURL();

				if (!win) return;

				win.document.write(`<img src='${src}' width='${domElement.width}' height='${domElement.height}'>`);
				break;

			default:
				break;
		}
	});
}

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
	requestAnimationFrame(() => {
		animate();
	});

	let delta = clock.getDelta();

	shell.rotateY(0.001);
	shell.rotateZ(0.001);
	shell.rotateX(0.001);
	racquet.rotateY(-0.001);
	racquet.rotateZ(-0.001);
	racquet.rotateX(-0.001);

	shaderMat.uniforms.u_time.value += delta;

	if (exampleModel != undefined) {
		exampleModel.rotateX(0.01);
		exampleModel.rotateY(0.01);
	}

	if (stats) stats.update();

	// if (controls) controls.update();

	renderer.render(scene, camera);
}

main();
