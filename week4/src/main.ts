import * as PIXI from 'pixi.js';
import * as dat from 'dat.gui';
import { Application, Graphics, graphicsUtils } from 'pixi.js';
import TWEEN from '@tweenjs/tween.js';
import { Easing } from '@tweenjs/tween.js';
import gsap from 'gsap';

let t1 = gsap.timeline();

const load = (app: PIXI.Application) => {
  return new Promise<void>((resolve) => {
    app.loader.add('').load(() => {
      resolve();
    });
  });
};

const state = {};

let graphics: Array<PIXI.Graphics> = [];
let sizes: any = [];
let colors: any = [];
let heights: any = [];
let squareHeight = window.innerHeight / 30;
let gapHeight = window.innerHeight / 30 / 2;

const main = async () => {
  // Actual app
  let app = new PIXI.Application({
    backgroundColor: 0xf2f0ff,
    antialias: true,
  });
  // Display application properly
  document.body.style.margin = '0';
  app.renderer.view.style.position = 'absolute';
  app.renderer.view.style.display = 'block';

  // View size = windows
  app.renderer.resize(window.innerWidth, window.innerHeight);

  // Load assets
  await load(app);

  // Handle window resizing
  window.addEventListener('resize', (_e) => {
    app.renderer.resize(window.innerWidth, window.innerHeight);
  });
  document.body.appendChild(app.view);

  for (let i = 0; i < 20; i++) {
    const element = new PIXI.Graphics();
    element.x = 0;
    element.y = i * (squareHeight + gapHeight);
    graphics.push(element);
    sizes[i] = {
      value: 0,
    };
    colors[i] = {
      value: 0x93b5cf,
    };
    heights[i] = {
      value: squareHeight,
    };
    app.stage.addChild(element);
  }

  let context = {
    //   velocity: { x: 1, y: 1 },
    graphics,
  };

  // sizes.forEach((size: any, i: number) => {
  //   t1.to(sizes[i], { value: window.innerWidth}, '+=1');
  //   t1.to(sizes[i], { value: 0});
  // });

  app.ticker.add(update, context);
};

let elaspsedTime = 0;

// Cannot be an arrow function. Arrow functions cannot have a 'this' parameter.
function update(this: any, delta: number) {
  elaspsedTime += 0.1;
  this.graphics.x += Math.sin(elaspsedTime);
  this.graphics.forEach((element: PIXI.Graphics, i: number) => {
    element.clear();
    element.beginFill(colors[i].value);
    element.drawRect(0, 0, sizes[i].value, heights[i].value);
  });
  t1.to(sizes, { value: window.innerWidth, duration: 1 });
  t1.to(colors, { value: 0xffffff * Math.random(), duration: 0.001 });
  t1.to(heights, { value: 3 * squareHeight, duration: 1 });
  t1.to(heights, { value: squareHeight, duration: 1 });
  t1.to(sizes, { value: 0, duration: 1 });
  for (let i = 0; i < sizes.length; i++) {
    t1.to(sizes[i], { value: window.innerWidth, duration: 0.5 }, '<2%');
    t1.to(sizes[i], { value: 0, duration: 5 }, '>10%');
  }
  t1.to(sizes, { value: window.innerWidth, duration: 1 });
  t1.to(colors, { value: 0xffffff * Math.random(), duration: 0.001 });
  t1.to(heights, { value: 3 * squareHeight, duration: 1 });
  t1.to(heights, { value: squareHeight, duration: 1 });
  t1.to(sizes, { value: 0, duration: 1 });
  for (let i = sizes.length; i > 0; i--) {
    t1.to(sizes[i], { value: window.innerWidth, duration: 0.5 }, '<2%');
    t1.to(sizes[i], { value: 0, duration: 5 }, '>10%');
  }
  t1.to(sizes, { value: window.innerWidth, duration: 1 });
  t1.to(colors, { value: 0xffffff * Math.random(), duration: 0.001 });
  t1.to(heights, { value: 3 * squareHeight, duration: 1 });
  t1.to(heights, { value: squareHeight, duration: 1 });
  t1.to(sizes, { value: 0, duration: 1 });
  for (let i = 0; i < sizes.length; i++) {
    t1.to(sizes[i], { value: window.innerWidth, duration: 0.5 }, '<2%');
    t1.to(sizes[i], { value: 0, duration: 5 }, '>10%');
  }
  t1.to(sizes, { value: window.innerWidth, duration: 1 });
  t1.to(colors, { value: 0xffffff * Math.random(), duration: 0.001 });
  t1.to(heights, { value: 3 * squareHeight, duration: 1 });
  t1.to(heights, { value: squareHeight, duration: 1 });
  t1.to(sizes, { value: 0, duration: 1 });
}

main();
