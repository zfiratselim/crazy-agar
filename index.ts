import * as PIXI from "pixi.js";
import { SmoothGraphics as Graphics } from '@pixi/graphics-smooth';


export default class CrazyAgar extends PIXI.Application {
    constructor() {
        super({
            view: <HTMLCanvasElement>document.querySelector('#canvas'),
            backgroundColor: 0x000000,
            width: 800,
            height: 520,
        });
        this.startGame();
    }
    createCircleSprite(x: number, y: number, size: number, color: number) {
        let p = new Graphics();
        p.beginFill(color);
        p.lineStyle(0);
        p.drawCircle(0, 0, size);
        p.endFill();
        const t = this.renderer.generateTexture(p);
        const sprite = new PIXI.Sprite(t);
        this.stage.addChild(sprite);
        sprite.x = x;
        sprite.y = y;
        return sprite
    }

    startGame() {
        const s = this.createCircleSprite(100, 100, 20, 0xFFFFFF)
    }
}

(window as any).context = new CrazyAgar();