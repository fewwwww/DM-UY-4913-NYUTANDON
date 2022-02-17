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

const getTime = () => {
  const time = new Date();
  return {
    date: time.getDate(),
    hour: time.getHours(),
    minute: time.getMinutes(),
  };
};

const extendString = (str: String) => {
  if (str.length < 2) {
    return '0' + str;
  }
  return str;
};

const state = {};

let graphics: Array<PIXI.Graphics> = [];
let sizes: any = [];
let colors: any = [];

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

  for (let i = 0; i < 6; i++) {
    const element = new PIXI.Graphics();
    element.x = window.innerWidth / 2;
    element.y = window.innerHeight / 2;
    element.x += 50 * Math.sin(i) * Math.PI;
    element.y += 50 * Math.cos(i) * Math.PI;
    graphics.push(element);
    sizes[i] = {
      value: 100,
    };
    colors[i] = {
      value: 0xffffff,
    };
    app.stage.addChild(element);
  }

  let context = {
    //   velocity: { x: 1, y: 1 },
    graphics,
  };

  sizes.forEach((size: any, i: number) => {
    t1.to(sizes[i], { value: 200, duration: 3 });
    t1.to(colors[i], { value: 0xffffff * Math.random(), duration: 0.001 });
    t1.to(sizes[i], { value: 100, duration: 3 });
    t1.to(colors[i], { value: 0xffffff * Math.random(), duration: 0.001 });
  });

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
    element.drawCircle(0, 0, sizes[i].value);
  });
  t1.to(colors, { value: 0xffffff * Math.random(), duration: 1 });
}

main();
