# DM-UY-4913-NYUTANDON

## TypeScript

```ts
// number
let x: number = 10;
// string
let y: string = 'a';
// boolean
let z: boolean = true;
// array
let l: number[] = [1];
// object
let o: { a: number } = { a: 1 };
// tuple
let t: [ number, string ] = [ 2, 'b' ]
// function
function sum(a: number, b: number): number { return 1; }
// enum
enum USCoin {
    penny = 1,
    nickle = 2,
    dime = 3
}
// interface
interface i {
    a: number,
    b: string
}
const j: interface = {
    a: 1,
    b: ''
}
// class
class Point2D {
    x: number;
    y: number;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}
// union, intersaction
const u: string | number;
const i: string & number;
// type
type GenericPoint = Point2D | Point3D;
```

## Pixi.js

### Scenegraph

a way of organizing project where every object is a child or parent of another object.

### Graphics

```js
let graphics = new PIXI.Graphics();
graphics.lineStyle(...)
graphics.beginFill(...)
graphics.drawCircle(...)
```

### Container

contain children for managing

```js
let container = new PIXI.Container();
container.x = ...
container.y = ...
app.stage.container(container)
container.addChild(...)
```

### Shader & Filters

### Interaction

```js
{sprite}.on('eventname', callback)

let button = new PIXI.Graphics();
button.interactive = true;
button.buttonMode = true;
button.beginFill(0x0000ff);
button.drawRoundedRect(100, 100, 200, 100, 15);
  button.on('pointerdown', () => {
    ...
  });
  button.on('pointerup', () => {
    ...
  })
  button.on('pointerover', () => {
    ...
  });
  button.on('pointerout', () => {
    ...
  })
```

### GUI

Using dat.GUI

Should be 'addChild' at the same level as app

```js
const gui = new dat.GUI();

gui.add(buttonData, 'width', 0, 500)
...
```

### MVC

control (update) updates model (data)
model (data) informs view (display)
view (display) notifies control (update)

Data vs Behavior

### Animation

sin/cos of time

```js
// circling
this.sprite.x = window.innerWidth/2 + Math.cos(this.model.elapsedTime)
this.sprite.y = window.innerHeight/2 + Math.sin(this.model.elapsedTime)

//
this.sprite.scale.set(Math.cos(this.model.elapsedTime * 0.05) * 0.5, ...)
this.sprite.alpha = (Math.cos(this.model.elapsedTime * 0.125) + 1) * 0.5
```

#### Linear Interpolation / LERP-ING

Time = % between 0 and 1

```ts
// a: start, b: end, pct: "speed"
function lerp(a: number, b: number, pct: number): number {
  pct = Math.min(1, Math.max(0, pct))
  return a * (1 - pct) + b * pct;
}
function easeIn(t: number): number {
  return t * t;
}
this.sprite.y = lerp(this.sprite.y, window.innerHeight, 0.01)
this.sprite.y = lerp(this.sprite.y, this.model.mousePos.y, 0.01)
```

#### GreenSock Animation Platform

TWEEN/GreenSock

## Electron

### Current workflow

Electron + Vite

```js
mainWindow.webContents.send(colod)
mainWindow.webContents.openDevTools()
```

## Serial

Button, LED <-> Arduino <-> Serial <-> Node.js

Use Johnny-Five lib