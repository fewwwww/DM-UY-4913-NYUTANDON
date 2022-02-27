import * as PIXI from 'pixi.js';
import {
  Application,
  Graphics,
  graphicsUtils,
  ParticleContainer,
} from 'pixi.js';
import gsap from 'gsap';
import { getRobotInfo } from './getRobotInfo';

let t1 = gsap.timeline();

const load = (app: PIXI.Application) => {
  return new Promise<void>((resolve) => {
    app.loader.add('').load(() => {
      resolve();
    });
  });
};

let graphics: Array<PIXI.Graphics> = [];
let robotParts: any = [];
let colors: any = [];
let heights: any = [];
let squareHeight = window.innerHeight / 30;
let gapHeight = window.innerHeight / 30 / 2;

let elaspsedTime = 0;

const main = async () => {
  const robotInfo = getRobotInfo();

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
  t1.to(heights, { value: 3 * squareHeight, duration: 1 });
  t1.to(heights, { value: 0, duration: 1 });

  // draw robot
  // draw head
  const head = new PIXI.Graphics();
  head.x = window.innerWidth / 2;
  head.y = window.innerHeight / 2 - 20;
  head.beginFill(robotInfo.headColor[0]);
  head.arc(0, 0, 10 * squareHeight, Math.PI, 2 * Math.PI);
  head.alpha = 0;
  app.stage.addChild(head);
  robotParts.push(head);

  // draw mouth
  const mouth = new PIXI.Graphics();
  mouth.x = window.innerWidth / 2;
  mouth.y = window.innerHeight / 2 - 20;
  mouth.beginFill(robotInfo.mouthColor[0]);
  mouth.drawRoundedRect(
    -10 * squareHeight,
    10,
    20 * squareHeight,
    2 * squareHeight,
    squareHeight / 2,
  );
  mouth.alpha = 0;
  app.stage.addChild(mouth);
  robotParts.push(mouth);

  // draw eyes
  const leftEye = new PIXI.Graphics();
  const rightEye = new PIXI.Graphics();
  leftEye.x = window.innerWidth / 2;
  rightEye.x = window.innerWidth / 2;
  leftEye.y = window.innerHeight / 2;
  rightEye.y = window.innerHeight / 2;
  leftEye.beginFill(0xffffff);
  rightEye.beginFill(0xffffff);
  leftEye.drawCircle(-3.5 * squareHeight, -4 * squareHeight, squareHeight);
  rightEye.drawCircle(
    3.5 * squareHeight,
    -4 * squareHeight,
    squareHeight * 1.2,
  );
  leftEye.alpha = 0;
  rightEye.alpha = 0;
  app.stage.addChild(leftEye);
  app.stage.addChild(rightEye);
  robotParts.push(leftEye);
  robotParts.push(rightEye);

  // draw "hair"
  const leftHair = new PIXI.Graphics();
  const rightHair = new PIXI.Graphics();
  leftHair.x = window.innerWidth / 2;
  rightHair.x = window.innerWidth / 2;
  leftHair.y = window.innerHeight / 2;
  rightHair.y = window.innerHeight / 2;
  leftHair.beginFill(robotInfo.hairColor0[0]);
  rightHair.beginFill(robotInfo.hairColor1[0]);
  leftHair.drawRoundedRect(
    -5 * squareHeight,
    -11 * squareHeight,
    squareHeight,
    squareHeight * 2,
    squareHeight / 10,
  );
  rightHair.drawRoundedRect(
    4 * squareHeight,
    -11 * squareHeight,
    squareHeight,
    squareHeight * 2,
    squareHeight / 10,
  );
  leftHair.alpha = 0;
  rightHair.alpha = 0;
  app.stage.addChild(leftHair);
  app.stage.addChild(rightHair);
  robotParts.push(leftHair);
  robotParts.push(rightHair);
  if (robotInfo.hairNumber === 3) {
    const midHair = new PIXI.Graphics();
    midHair.x = window.innerWidth / 2;
    midHair.y = window.innerHeight / 2;
    midHair.beginFill(0xf09819);
    midHair.drawRoundedRect(
      -0.5 * squareHeight,
      -12.5 * squareHeight,
      squareHeight,
      squareHeight * 2.5,
      squareHeight / 10,
    );
    midHair.alpha = 0;
    app.stage.addChild(midHair);
    robotParts.push(midHair);
  }

  // draw name
  const style = new PIXI.TextStyle({
    dropShadowAngle: -0.5,
    fill: [robotInfo.colorName0, robotInfo.colorName1],
    fillGradientType: 1,
    fillGradientStops: [0.5],
    fontFamily: '"Courier New", Courier, monospace',
    fontSize: 3 * squareHeight,
    fontWeight: 'bold',
    lineJoin: 'bevel',
    miterLimit: 2,
    strokeThickness: 11,
  });
  const name = new PIXI.Text(robotInfo.name[0], style);
  name.alpha = 0;
  name.x = window.innerWidth / 2 - 80;
  name.y = window.innerHeight / 2 + 50;
  app.stage.addChild(name);
  robotParts.push(name);

  // draw little mouse pet
  const texture1 = PIXI.Texture.from('https://st2.depositphotos.com/3768069/5354/i/950/depositphotos_53544825-stock-photo-cookies-seamless-texture-tile.jpg');
  const tilingSprite1 = new PIXI.TilingSprite(
    texture1,
    window.innerWidth,
    window.innerHeight,
  );
  const mouse = new PIXI.Graphics();
  mouse.beginFill(0xe9ccd3);
  mouse.drawCircle(0, 0, 7);
  mouse.endFill();
  mouse.interactive = true;
  mouse.on('mousemove', function(event) {
    mouse.x = event.data.global.x + 25
    mouse.y = event.data.global.y + 25
  })
  app.stage.addChild(mouse)
  app.stage.addChild(tilingSprite1)
  tilingSprite1.mask = mouse

  // write rarity


  let context = {
    graphics,
    robotParts,
  };

  app.ticker.add(update, context);
};

// Cannot be an arrow function. Arrow functions cannot have a 'this' parameter.
function update(this: any) {
  elaspsedTime += 0.1;
  this.graphics.x += Math.sin(elaspsedTime);
  this.graphics.forEach((element: PIXI.Graphics, i: number) => {
    element.clear();
    element.beginFill(colors[i].value);
    element.drawRect(0, 0, window.innerWidth, heights[i].value);
  });

  // minting nft!
  this.robotParts.forEach((part: PIXI.Graphics, i: number) => {
    if (part.alpha < 0.2) {
      part.alpha += 0.0002;
    }
    if (0.2 <= part.alpha && part.alpha < 1) {
      part.alpha += 0.01;
    }
  });
}

main();
