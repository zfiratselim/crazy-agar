import * as PIXI from "pixi.js";
import { SmoothGraphics as Graphics } from '@pixi/graphics-smooth';
import { Sprite } from "pixi.js";


export default class CrazyAgar extends PIXI.Application {
    private myCircle: Sprite;
    private W: number;
    private H: number;
    constructor(W, H) {
        super({
            view: <HTMLCanvasElement>document.querySelector('#canvas'),
            backgroundColor: 0x000000,
            width: W,
            height: H,
        });
        this.W = W;
        this.H = H;
        this.stage.interactive = true;
        this.startGame();
    }
    createCircleSprite(x: number, y: number, size: number, color: number) {
        console.log(x, y, size, color);
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
    createEnemie() {
        const colors: number[] = [0x45EA9A, 0xFF5652, 0x00FF11, 0xDD2589, 0x56FE12, 0xFF0000, 0x00DEFF, 0x418563, 0xAE85BB];
        const randomX = [50, this.W - 50][Math.floor(Math.random() * 1.9)];
        const randomY = [50, this.H - 50][Math.floor(Math.random() * 1.9)];
        const randomSize = Math.floor(Math.random() * (this.myCircle.width * 2 - this.myCircle.width / 3) + this.myCircle.width / 3);
        const randomColor = colors[Math.floor(Math.random() * (colors.length - 0.1))];
        this.createCircleSprite(randomX, randomY, randomSize, randomColor);
    }
    followPointer() {
        this.stage.on("pointermove", e => {
            this.myCircle.position.copyFrom(e.data.global);
        })
    }
    startGame() {
        this.myCircle = this.createCircleSprite(500, 310, 12, 0xFFFFFF);
        this.followPointer();
        this.createEnemie();
    }
}

(window as any).context = new CrazyAgar(1000, 620);