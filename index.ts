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
    createCircleSprite() {
        let p = new Graphics();
        p.beginFill(0x0FF000);
        p.lineStyle(0);
        p.drawCircle(10, 10, 10);
        p.endFill();
        const t = this.renderer.generateTexture(p);
        const sprite = new PIXI.Sprite(t);
        this.stage.addChild(sprite);
        sprite.tint=0x004523
        sprite.x=200;
        sprite.y=200;
        return sprite
    }

    startGame() {
        const s = this.createCircleSprite()
    }
}

(window as any).context = new CrazyAgar();