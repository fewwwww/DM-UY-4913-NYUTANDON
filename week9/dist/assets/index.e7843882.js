import{O as h,S as b,a as x,C as L,P,W as _,b as M,c as p,d as U,G as z,e as N,f as C,V as y}from"./vendor.b98df37d.js";const O=function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))d(t);new MutationObserver(t=>{for(const n of t)if(n.type==="childList")for(const w of n.addedNodes)w.tagName==="LINK"&&w.rel==="modulepreload"&&d(w)}).observe(document,{childList:!0,subtree:!0});function l(t){const n={};return t.integrity&&(n.integrity=t.integrity),t.referrerpolicy&&(n.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?n.credentials="include":t.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function d(t){if(t.ep)return;t.ep=!0;const n=l(t);fetch(t.href,n)}};O();var V=`precision mediump float;

uniform float u_time;

varying vec2 UV;

void main(){
	UV = uv;
	vec4 mvPosition = modelViewMatrix*vec4(position,1.);
	gl_Position = projectionMatrix*mvPosition;
}`,k=`precision mediump float;

uniform vec2 u_resolution;
uniform float u_time;

varying vec2 UV;

void main(void){
	vec2 position = UV * 2. - 1.;
	
	float red = abs( 
		sin(position.x * position.y + u_time / 5.)
	);
	float green = abs( 
		sin(position.x * position.y + u_time / 4.) 
	);
	float blue = abs( 
		sin(position.x * position.y + u_time / 3.) 
	);

	gl_FragColor=vec4(UV.x, UV.y, 0., 1.0);
}`;let a,r,i=new h,o=new h,u,Y=new C,e,m,v;function D(){F(),W(),j()}function W(){m=new b,document.body.appendChild(m.dom)}function F(){r=new x,r.background=new L(15136511),u=new P(100,window.innerWidth/window.innerHeight,.1,1e3),u.position.z=8,u.position.y=3,a=new _({antialias:!0}),a.shadowMap.enabled=!0,a.shadowMap.type=M,a.setPixelRatio(window.devicePixelRatio),a.setSize(window.innerWidth,window.innerHeight),document.body.appendChild(a.domElement);const c=.25;e=new p(16777215),e.position.set(-.5,.5,4),e.castShadow=!0,e.intensity=c,r.add(e),e=new p(16777215),e.position.set(1,1,1),e.castShadow=!0,e.intensity=.1,r.add(e),e=new p(16777215),e.position.set(-1,1,1),e.castShadow=!0,e.intensity=.5,r.add(e);const s=e.clone();s.intensity=1-c,s.castShadow=!1,r.add(s);const l=1024,d=.5,t=500;e.shadow.mapSize.width=l,e.shadow.mapSize.height=l,e.shadow.camera.near=d,e.shadow.camera.far=t,new U().load("https://raw.githubusercontent.com/fewwwww/DM-UY-4913-NYUTANDON/main/week9/resources/shell.obj",f=>{i=f,i.castShadow=!0,i.scale.x=.02,i.scale.y=.02,i.scale.z=.02,i.position.x=-3,i.rotateY(-1),r.add(i)}),new z().load("https://raw.githubusercontent.com/fewwwww/DM-UY-4913-NYUTANDON/main/week9/resources/racquet.gltf",f=>{o=f.scene,o.castShadow=!0,o.scale.x=.02,o.scale.y=.02,o.scale.z=.02,o.position.x=3,o.position.y=2,o.rotateY(-1),r.add(o)});const S={u_time:{type:"f",value:1},u_resolution:{type:"v2",value:new y(800,800)},u_mouse:{type:"v2",value:new y}};v=new N({uniforms:S,vertexShader:V,fragmentShader:k}),g()}function j(){window.addEventListener("resize",E,!1),window.addEventListener("keydown",c=>{const{key:s}=c;switch(s){case"e":const l=window.open("","Canvas Image"),{domElement:d}=a;a.render(r,u);const t=d.toDataURL();if(!l)return;l.document.write(`<img src='${t}' width='${d.width}' height='${d.height}'>`);break}})}function E(){u.aspect=window.innerWidth/window.innerHeight,u.updateProjectionMatrix(),a.setSize(window.innerWidth,window.innerHeight)}function g(){requestAnimationFrame(()=>{g()});let c=Y.getDelta();i.rotateY(.001),i.rotateZ(.001),i.rotateX(.001),o.rotateY(-.001),o.rotateZ(-.001),o.rotateX(-.001),v.uniforms.u_time.value+=c,m&&m.update(),a.render(r,u)}D();
