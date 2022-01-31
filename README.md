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