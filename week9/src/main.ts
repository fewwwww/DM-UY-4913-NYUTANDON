import './style.scss';
import * as THREE from 'three';
import Stats from 'three/examples/jsm/libs/stats.module';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { ShaderMaterial } from 'three';

let renderer: THREE.WebGLRenderer;
let scene: THREE.Scene;
let muffin: THREE.Object3D = new THREE.Object3D();
let fruit: THREE.Object3D = new THREE.Object3D();
let burger: THREE.Object3D = new THREE.Object3D();
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

	// add the muffin
	const loader1 = new GLTFLoader();
	loader1.load('./resources/jumbo_muffins/scene.gltf', (gltf: any) => {
		muffin = gltf.scene;
		muffin.castShadow = true;
		muffin.scale.x = 10;
		muffin.scale.y = 10;
		muffin.scale.z = 10;
		muffin.position.y = -3.6;
		muffin.rotateY(-1);
		scene.add(muffin);
	});

	// add the still life
	const loader2 = new GLTFLoader();
	loader2.load('./resources/nature/scene.gltf', (gltf: any) => {
		fruit = gltf.scene;
		fruit.castShadow = true;
		fruit.scale.x = 10;
		fruit.scale.y = 10;
		fruit.scale.z = 10;
		scene.add(fruit);
	});

	// load a texture
	// let textureMaterial: THREE.Material;
	// new THREE.TextureLoader().load('/resources/textures/uv_grid_opengl.jpg', function (texture) {

	//     texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
	//     texture.anisotropy = renderer.capabilities.getMaxAnisotropy();

	//     exampleTexture = texture;

	//     textureMaterial = new THREE.MeshBasicMaterial({ map: texture });
	//     // cube.material = textureMaterial;

	//     const loader = new GLTFLoader().setPath('/resources/models/');
	//     loader.load('exampleModel.gltf', function (gltf) {
	//         exampleModel = gltf.scene;

	//         interface gltfMesh extends THREE.Object3D<THREE.Event> {
	//             material: THREE.Material
	//         }

	//         console.log(exampleModel);

	//         exampleModel.traverse((child: THREE.Object3D<THREE.Event>) => {
	//             console.log(child);
	//             console.log(child.type === "Mesh");
	//             (child as gltfMesh).material = textureMaterial;
	//         })

	//         scene.add(exampleModel);
	//     });
	// });

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

	muffin.rotateY(0.001);
	fruit.rotateY(0.001);
	burger.rotateY(0.001);

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
