import * as PIXI from "pixi.js";
import { SmoothGraphics as Graphics } from '@pixi/graphics-smooth';
import { Sprite } from "pixi.js";


export default class CrazyAgar extends PIXI.Application {
    private myCircle: Sprite;
    constructor() {
        super({
            view: <HTMLCanvasElement>document.querySelector('#canvas'),
            backgroundColor: 0x000000,
            width: 1000,
            height: 620,
        });
        this.stage.interactive = true;
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
        sprite.anchor.set(.5);
        sprite.x = x;
        sprite.y = y;
        this.stage.addChild(sprite);
        return sprite
    }

    followPointer() {
        this.stage.on("pointermove", e => {
            this.myCircle.position.copyFrom(e.data.global);
        })
    }
    startGame() {
        this.myCircle = this.createCircleSprite(100, 100, 15, 0xFFFFFF);
        this.followPointer();
    }
}

(window as any).context = new CrazyAgar();