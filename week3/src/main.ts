import * as PIXI from 'pixi.js';
import * as dat from 'dat.gui';
import { Application } from 'pixi.js';

const baseUrl = 'https://fewwwww.github.io/DM-UY-4913-NYUTANDON/';

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
}

const state = {};


const main = async () => {
  // Actual app
  let app = new PIXI.Application({ backgroundColor: 0xf2f0ff });
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
    //   sprite.x = window.innerWidth / 2 - sprite.width / 2;
    //   sprite.y = window.innerHeight / 2 - sprite.height / 2;
  });

  document.body.appendChild(app.view);

  let context = {
    velocity: { x: 1, y: 1 },
    //   sprite
  };

  app.ticker.add(update, context);

  setInterval(() => {
    beat();
    const graphics = drawClock();
    app.stage.addChild(graphics);
  }, 1000)
};

const beat = () => {
  const body = document.getElementsByTagName('body')[0];
  body.style.filter = 'blur(1px) hue-rotate(90deg)';
  setTimeout(() => {
    body.style.filter = 'hue-rotate(0deg)';
  }, 300)
};

const drawClock = () => {
  let time = getTime();
  const graphics = new PIXI.Graphics();
  for (let i = 0; i < time.hour - 1; i++) {
    for (let j = 0; j < 60; j++) {
      let fillColor = '0x';
      // i * n should be smaller than ff, which is 255.
      fillColor += extendString(String(i * 9));
      fillColor += extendString(String(j));
      fillColor += extendString(String(time.date * 3));
      graphics.beginFill(Number(fillColor));
      graphics.drawRect(
        (j * window.innerWidth) / 60,
        (i * window.innerHeight) / 24,
        window.innerWidth / 60,
        window.innerHeight / 24,
      );
    }
  }
  for (let k = 0; k < time.minute - 1; k++) {
    let fillColor = '0x';
    fillColor += extendString(String(time.hour * 9));
    fillColor += extendString(String(k));
    fillColor += extendString(String(time.date * 3));
    graphics.beginFill(Number(fillColor));
    graphics.drawRect(
      (k * window.innerWidth) / 60,
      ((time.hour - 1) * window.innerHeight) / 24,
      window.innerWidth / 60,
      window.innerHeight / 24,
    );
  }
  graphics.beginFill(0x000000);
  graphics.drawRect(
    ((time.minute - 1) * window.innerWidth) / 60,
    ((time.hour - 1) * window.innerHeight) / 24,
    window.innerWidth / 60,
    window.innerHeight / 24,
  );
  graphics.endFill();
  return graphics;
}

// Cannot be an arrow function. Arrow functions cannot have a 'this' parameter.
function update(this: any, delta: number) {
  //   const newScale = (Math.sin(Date.now()/10000 + 1)) / 2;
  //   this.sprite.scale.set(newScale, newScale);
  //   if (this.sprite.x <= 0 || this.sprite.x >= window.innerWidth - this.sprite.width) {
  //       this.velocity.x = -this.velocity.x;
  //   }
  //   if (this.sprite.y <= 0 || this.sprite.y >= window.innerHeight - this.sprite.height) {
  //       this.velocity.y = -this.velocity.y;
  //   }
  //   this.sprite.x += this.velocity.x * delta;
  //   this.sprite.y += this.velocity.y * delta;
}

main();
