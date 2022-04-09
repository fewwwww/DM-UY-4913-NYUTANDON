import './style.scss';
import * as THREE from 'three';
import Stats from 'three/examples/jsm/libs/stats.module';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { ShaderMaterial } from 'three';

let renderer: THREE.WebGLRenderer;
let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let clock = new THREE.Clock();

let dino: THREE.Object3D = new THREE.Object3D();
let cactus: THREE.Object3D = new THREE.Object3D();
let cactuses: Array<THREE.Object3D> = [];
let cactusesPositionX: Array<number> = [20];

let isJump: boolean = false;
let isFall: boolean = false;
let isStart: boolean = false;
let extinctCount: number = 0;
const extinctDOM = document.getElementsByTagName('span')[0];
const startDOM = document.getElementById('start');

let lightAmbient: THREE.AmbientLight;
let lightPoint: THREE.PointLight;

let controls: OrbitControls;
let stats: any;

let plane: THREE.Mesh;

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

function initCactusesPositionX() {
	for (let i = 1; i < 200; i++) {
		cactusesPositionX.push(cactusesPositionX[cactusesPositionX.length - 1] + Math.floor(Math.random() * (35 - 15) + 15));
	}
}

function initScene() {
	scene = new THREE.Scene();

	camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
	camera.position.z = 1;
	camera.position.y = -5;

	renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.PCFSoftShadowMap;
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(window.innerWidth, window.innerHeight);

	document.body.appendChild(renderer.domElement);

	controls = new OrbitControls(camera, renderer.domElement);

	lightAmbient = new THREE.AmbientLight(0x333333);
	scene.add(lightAmbient);

	const shadowIntensity = 0.25;

	lightPoint = new THREE.PointLight(0xffffff);
	lightPoint.position.set(-0.5, 0.5, 4);
	lightPoint.castShadow = true;
	lightPoint.intensity = shadowIntensity;
	scene.add(lightPoint);

	lightPoint = new THREE.PointLight(0xffffff);
	lightPoint.position.set(-0.5, 0.5, 4);
	lightPoint.castShadow = true;
	lightPoint.intensity = shadowIntensity;
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

	// add the dino
	const loader1 = new OBJLoader();
	// loader1.load('https://raw.githubusercontent.com/fewwwww/DM-UY-4913-NYUTANDON/main/week10/resources/dino.obj', (obj: any) => {
	loader1.load('./resources/dino.obj', (obj: any) => {
		dino = obj;
		dino.castShadow = true;
		dino.scale.x = 0.3;
		dino.scale.y = 0.3;
		dino.scale.z = 0.3;
		dino.position.x = -5;
		dino.position.z = -2;
		scene.add(dino);
	});

	initCactusesPositionX();
	// add the cactus
	const loader2 = new OBJLoader();
	for (let x of cactusesPositionX) {
		// loader2.load('https://raw.githubusercontent.com/fewwwww/DM-UY-4913-NYUTANDON/main/week10/resources/cactus.obj', (obj: any) => {
		loader2.load('./resources/cactus.obj', (obj: any) => {
			cactus = obj;
			cactus.castShadow = true;
			cactus.scale.x = 0.3;
			cactus.scale.y = 0.3;
			cactus.scale.z = 0.2;
			cactus.position.x = x - 5;
			cactus.position.z = -2;
			cactuses.push(cactus);
			scene.add(cactus);
		});
	}
	console.log(cactuses);

	// // Add a plane
	const geometryPlane = new THREE.PlaneBufferGeometry(100, 12, 10, 10);
	const materialPlane = new THREE.MeshPhongMaterial({
		color: 0x666666,
		side: THREE.DoubleSide,
		flatShading: true,
	});

	const uniforms = {
		u_time: { type: 'f', value: 1.0 },
		u_resolution: { type: 'v2', value: new THREE.Vector2(800, 800) },
		// u_mouse: { type: 'v2', value: new THREE.Vector2() },
	};

	shaderMat = new THREE.ShaderMaterial({
		uniforms: uniforms,
		vertexShader: vertexShader,
		fragmentShader: fragmentShader,
		side: THREE.DoubleSide,
	});

	plane = new THREE.Mesh(geometryPlane, materialPlane);
	plane.position.z = -2;
	plane.receiveShadow = true;
	scene.add(plane);

	// add event listener to highlight dragged objects

	controls.addEventListener('dragstart', function (event) {
		event.object.material.emissive.set(0xaaaaaa);
	});

	controls.addEventListener('dragend', function (event) {
		event.object.material.emissive.set(0x000000);
	});

	// // Init animation
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

			case ' ':
				if (!isStart) {
					isStart = true;
				}
				if (!isJump && !isFall) {
					isJump = true;
				}
				break;
			case 'ArrowUp':
				if (!isJump && !isFall) {
					isJump = true;
				}
				break;
			// case 'ArrowRight':
			// 	dino.position.x += 0.3;
			// 	break
			// case 'ArrowLeft':
			// 	dino.position.x -= 0.3;
			// 	break
			// case 'ArrowDown':
			// 	// intended
			// 	dino.position.z -= 0.1;
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

function fall(dino: THREE.Object3D) {
	if (dino.position.z < -2) {
		isFall = false;
	} else {
		dino.position.z -= 0.07;
	}
}

function jump(dino: THREE.Object3D) {
	if (dino.position.z > 2) {
		isJump = false;
		isFall = true;
	} else {
		dino.position.z += 0.03;
	}
}

function touch(dino: THREE.Object3D, cactuses: Array<THREE.Object3D>) {
	// dino.position.z is determined by the height of cactus
	for (let cactus of cactuses) {
		if (cactus.position.x + 1 <= dino.position.x && cactus.position.x + 3.6 >= dino.position.x && dino.position.z < -1) {
			extinctCount += 1;
		}
	}
}

function start(speed: any) {
	startDOM.style.display = 'none';
	for (let cactus of cactuses) {
		cactus.position.x -= speed;
	}
}

function animate() {
	requestAnimationFrame(() => {
		animate();
	});

	let speed = (clock.elapsedTime * 0.001).toFixed(2)
	if (speed < 0.02) {
		speed = 0.03
	}
	if (speed > 0.1) {
		speed = 0.1
	}
	if (isStart) {
		start(speed);
	}

	touch(dino, cactuses);

	extinctDOM.innerHTML = String(extinctCount);

	if (isJump) {
		jump(dino);
	}

	if (isFall) {
		fall(dino);
	}

	let delta = clock.getDelta();

	shaderMat.uniforms.u_time.value += delta;

	const vertArray = plane.geometry.attributes.position;
	for (let i = 0; i < vertArray.count; i++) {
		vertArray.setZ(i, Math.sin(clock.getElapsedTime() + i - vertArray.count / 2) * 0.03 + Math.cos(clock.getElapsedTime() - i) * 0.03);
	}
	plane.geometry.attributes.position.needsUpdate = true;

	if (stats) stats.update();

	if (controls) controls.update();

	renderer.render(scene, camera);
}

main();
