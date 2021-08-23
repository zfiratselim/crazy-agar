import * as PIXI from "pixi.js";
import { SmoothGraphics as Graphics } from '@pixi/graphics-smooth';


export default class CrazyAgar extends PIXI.Application {
    constructor() {
        super({
            view: <HTMLCanvasElement>document.querySelector('#canvas'),
            transparent: true,
            width: 600,
            height: 320,
        });
    }

}

(window as any).context = new CrazyAgar();