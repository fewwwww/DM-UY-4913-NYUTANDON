import{O as b,S as E,a as N,P as O,W as U,b as C,c as j,A as V,d as S,e as x,f as W,M as F,D as P,g as R,h as T,C as H,V as Y}from"./vendor.80266bc1.js";const I=function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))l(e);new MutationObserver(e=>{for(const a of e)if(a.type==="childList")for(const g of a.addedNodes)g.tagName==="LINK"&&g.rel==="modulepreload"&&l(g)}).observe(document,{childList:!0,subtree:!0});function s(e){const a={};return e.integrity&&(a.integrity=e.integrity),e.referrerpolicy&&(a.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?a.credentials="include":e.crossorigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function l(e){if(e.ep)return;e.ep=!0;const a=s(e);fetch(e.href,a)}};I();var $=`precision mediump float;

uniform float u_time;

varying vec2 UV;

void main(){
	UV = uv;
	vec4 mvPosition = modelViewMatrix*vec4(position,1.);
	mvPosition.y += sin(u_time / 2. + uv.x) * 2.0;
	mvPosition.x += cos(u_time / 1.3 + uv.y) * 2.0;
	gl_Position = projectionMatrix*mvPosition;
}`,q=`precision mediump float;

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

	gl_FragColor=vec4(red, green, blue, 1.0);
}`;let r,d,u,y=new H,o=new b,c=new b,w=!1,f=!1,z=0,B=document.getElementsByTagName("span")[0],M,i,h,v,p,L;function G(){K(),J(),Z()}function J(){v=new E,document.body.appendChild(v.dom)}function K(){d=new N,u=new O(75,window.innerWidth/window.innerHeight,.1,1e3),u.position.z=1,u.position.y=-5,r=new U({antialias:!0}),r.shadowMap.enabled=!0,r.shadowMap.type=C,r.setPixelRatio(window.devicePixelRatio),r.setSize(window.innerWidth,window.innerHeight),document.body.appendChild(r.domElement),h=new j(u,r.domElement),M=new V(3355443),d.add(M);const t=.25;i=new S(16777215),i.position.set(-.5,.5,4),i.castShadow=!0,i.intensity=t,d.add(i),i=new S(16777215),i.position.set(-.5,.5,4),i.castShadow=!0,i.intensity=t,d.add(i);const n=i.clone();n.intensity=1-t,n.castShadow=!1,d.add(n);const s=1024,l=.5,e=500;i.shadow.mapSize.width=s,i.shadow.mapSize.height=s,i.shadow.camera.near=l,i.shadow.camera.far=e,new x().load("https://raw.githubusercontent.com/fewwwww/DM-UY-4913-NYUTANDON/main/week10/resources/dino.obj",m=>{o=m,o.castShadow=!0,o.scale.x=.3,o.scale.y=.3,o.scale.z=.3,o.position.x=-5,o.position.z=-2,d.add(o)}),new x().load("https://raw.githubusercontent.com/fewwwww/DM-UY-4913-NYUTANDON/main/week10/resources/cactus.obj",m=>{c=m,c.castShadow=!0,c.scale.x=.3,c.scale.y=.3,c.scale.z=.2,c.position.x=-5,c.position.z=-2,d.add(c)});const A=new W(100,12,10,10),k=new F({color:6710886,side:P,flatShading:!0}),D={u_time:{type:"f",value:1},u_resolution:{type:"v2",value:new Y(800,800)}};L=new R({uniforms:D,vertexShader:$,fragmentShader:q,side:P}),p=new T(A,k),p.position.z=-2,p.receiveShadow=!0,d.add(p),h.addEventListener("dragstart",function(m){m.object.material.emissive.set(11184810)}),h.addEventListener("dragend",function(m){m.object.material.emissive.set(0)}),_()}function Z(){window.addEventListener("resize",Q,!1),window.addEventListener("keydown",t=>{const{key:n}=t;switch(n){case"e":const s=window.open("","Canvas Image"),{domElement:l}=r;r.render(d,u);const e=l.toDataURL();if(!s)return;s.document.write(`<img src='${e}' width='${l.width}' height='${l.height}'>`);break;case" ":!w&&!f&&(w=!0);break;case"ArrowUp":!w&&!f&&(w=!0);break;case"ArrowRight":o.position.x+=.3;break;case"ArrowLeft":o.position.x-=.3;break;case"ArrowDown":o.position.z-=.1}})}function Q(){u.aspect=window.innerWidth/window.innerHeight,u.updateProjectionMatrix(),r.setSize(window.innerWidth,window.innerHeight)}function X(t){t.position.z<-2?f=!1:t.position.z-=.05}function ee(t){t.position.z>2?(w=!1,f=!0):t.position.z+=.03}function te(t,n){n.position.x+1<=t.position.x&&n.position.x+3.6>=t.position.x&&t.position.z<-1&&(z+=1)}function _(){requestAnimationFrame(()=>{_()}),te(o,c),B.innerHTML=String(z),w&&ee(o),f&&X(o);let t=y.getDelta();L.uniforms.u_time.value+=t;const n=p.geometry.attributes.position;for(let s=0;s<n.count;s++)n.setZ(s,Math.sin(y.getElapsedTime()+s-n.count/2)*.03+Math.cos(y.getElapsedTime()-s)*.03);p.geometry.attributes.position.needsUpdate=!0,v&&v.update(),h&&h.update(),r.render(d,u)}G();
