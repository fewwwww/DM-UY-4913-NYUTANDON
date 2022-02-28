import * as PIXI from 'pixi.js';
import {
  Application,
  Graphics,
  graphicsUtils,
  MIPMAP_MODES,
  ParticleContainer,
} from 'pixi.js';
import gsap from 'gsap';
import { waldos } from './waldo';
import { takeScreenshot, checkIfBrowserSupported } from '@xata.io/screenshot';

let t1 = gsap.timeline();

const load = (app: PIXI.Application) => {
  return new Promise<void>((resolve) => {
    app.loader.add('').load(() => {
      resolve();
    });
  });
};

// for the initial animation and counting down of game
let elaspsedTime = 0;
let graphics: Array<PIXI.Graphics> = [];
let colors: any = [];
let heights: any = [];
let squareHeight = window.innerHeight / 30;
let gapHeight = window.innerHeight / 30 / 2;

// count click time of the mouse to determine map revealing rate
let mouseCount: number = 0;
// show different maps of find waldo game
let waldoIndex: number = 0;

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

  // draw landing bars
  for (let i = 0; i < 20; i++) {
    const element = new PIXI.Graphics();
    element.x = 0;
    element.y = i * (squareHeight + gapHeight);
    graphics.push(element);
    colors[i] = {
      value: 0x93b5cf,
    };
    heights[i] = {
      value: squareHeight,
    };
    app.stage.addChild(element);
  }
  // landing bars animation
  t1.to(colors, { value: 0xffffff * Math.random(), duration: 0.001 });
  t1.to(heights, { value: 3 * squareHeight, duration: 10 });
  t1.to(heights, { value: 0, duration: 300 });

  // draw little 🔍
  const mouse = new PIXI.Graphics();
  mouse.beginFill(0xe9ccd3);
  mouse.drawCircle(0, 0, 30);
  mouse.endFill();
  mouse.interactive = true;
  mouse.on('mousemove', function (event) {
    mouse.x = event.data.global.x + 40;
    mouse.y = event.data.global.y + 40;
  });

  // load the first find waldo map
  const waldo = PIXI.Texture.from(waldos[waldoIndex]);
  const waldoMask = new PIXI.TilingSprite(
    waldo,
    window.innerWidth,
    window.innerHeight,
  );
  app.stage.addChild(waldoMask);
  // mask on!
  waldoMask.mask = mouse;
  app.stage.addChild(mouse);

  // make stage interactive
  app.stage.interactive = true;
  // if clicked (wont work after 5 minutes, times up!)
  app.stage.on('mousedown', () => {
    // disable moving 🔍
    if (mouseCount === 0) {
      mouse.interactive = false;
    }
    // reveal horizontal line
    if (mouseCount === 1) {
      mouse.scale.x = window.innerWidth;
    }
    // reveal vertical line
    if (mouseCount === 2) {
      mouse.scale.x = 1;
      mouse.scale.y = window.innerHeight;
    }
    // reveal whole map
    if (mouseCount === 3) {
      mouse.scale.x = window.innerWidth;
    }
    // go on to another map!
    if (mouseCount === 4) {
      waldoIndex += 1;
      // go back to first map
      if (waldoIndex > waldos.length - 1) {
        waldoIndex = 0;
      }

      // load new map
      const waldoNew = PIXI.Texture.from(waldos[waldoIndex]);
      const waldoMaskNew = new PIXI.TilingSprite(
        waldoNew,
        window.innerWidth,
        window.innerHeight,
      );
      app.stage.addChild(waldoMaskNew);
      waldoMaskNew.mask = mouse;
    }
    mouseCount += 1;
    // make 🔍 normal
    if (mouseCount > 4) {
      mouseCount = 0;
      mouse.interactive = true;
      mouse.scale.x = 1;
      mouse.scale.y = 1;
    }
  });

  // take screen shots!
  app.stage.on('rightdown', () => {
    // if browser supports
    if (checkIfBrowserSupported()) {
      // take a screen shot
      takeScreenshot().then((screenShot) => {
        // generate a shot with base64 string of screenShot
        const shot = PIXI.Texture.from(screenShot);
        const shotSprite = new PIXI.TilingSprite(
          shot,
          window.innerWidth,
          window.innerHeight,
        );
        // tint it a little bit to make difference
        shotSprite.tint = 0xeeeeee;
        shotSprite.scale.x = 0.3;
        shotSprite.scale.y = 0.3;
        app.stage.addChild(shotSprite);
        shotSprite.interactive = true;
        // click it to remove it
        shotSprite.on('mousedown', () => {
          shotSprite.scale.x = 0;
          shotSprite.scale.y = 0;
          // make it not interfere with our 🔍
          mouseCount -= 1;
        });
      });
    }
  });

  let context = {
    graphics,
  };

  app.ticker.add(update, context);
};

// Cannot be an arrow function. Arrow functions cannot have a 'this' parameter.
function update(this: any) {
  // animation for the landing loading
  elaspsedTime += 0.1;
  this.graphics.x += Math.sin(elaspsedTime);
  this.graphics.forEach((element: PIXI.Graphics, i: number) => {
    element.clear();
    element.beginFill(colors[i].value);
    element.drawRect(0, 0, window.innerWidth, heights[i].value);
  });
}

main();
