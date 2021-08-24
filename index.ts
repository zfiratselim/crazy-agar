import * as PIXI from "pixi.js";
import { SmoothGraphics as Graphics } from '@pixi/graphics-smooth';
import { Sprite } from "pixi.js";


export default class CrazyAgar extends PIXI.Application {
    private myCircle: Sprite;
    private enemies: Sprite[] = [];
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

        let randomX = Math.floor((Math.random() * (this.W + 100)) - 50);
        let randomY = Math.floor((Math.random() * (this.H + 100)) - 50);
        if (randomX > 0 && randomX < this.W && randomY > 0 && randomY < this.H) {
            if (Math.floor(Math.random() * 10) % 2 == 1) {
                if (Math.floor(Math.random() * 10) % 2 == 1) {
                    randomX = -50
                } else {
                    randomX = this.W + 50;
                }
            } else {
                if (Math.floor(Math.random() * 10) % 2 == 1) {
                    randomY = -50
                } else {
                    randomY = this.W + 50;
                }
            }
        }
        const randomRot = Math.atan2(Math.floor(Math.random() * 200 - 100 + this.H / 2 - randomY), Math.floor(Math.random() * 400 - 200 + this.W / 2 - randomX));
        const randomSize = Math.floor(Math.random() * (this.myCircle.width * 2 - this.myCircle.width / 3) + this.myCircle.width / 3);
        const randomColor = colors[Math.floor(Math.random() * (colors.length - 0.1))];
        const enemie = this.createCircleSprite(randomX, randomY, randomSize, randomColor);
        enemie.rotation = randomRot;
        this.enemies.push(enemie);
    }
    tickerFunc() {
        const l = 2;
        this.ticker.add(delta => {
            console.log(this.enemies.length)
            this.enemies.forEach((enemie, i) => {
                enemie.x += Math.floor(Math.cos(enemie.rotation) * l);
                enemie.y += Math.floor(Math.sin(enemie.rotation) * l);
                if (enemie.x > this.W + 100 || enemie.x < -100 || enemie.y > this.H + 100 || enemie.y < -100) {
                    enemie.parent.removeChild(enemie);
                    enemie.destroy();
                    this.enemies.splice(i, 1);
                }
            })
        })
    }
    followPointer() {
        this.stage.on("pointermove", e => {
            this.myCircle.position.copyFrom(e.data.global);
        })
    }
    startGame() {
        this.myCircle = this.createCircleSprite(500, 310, 12, 0xFFFFFF);
        this.followPointer();
        let i = 0;
        const interval = setInterval(() => {
            i++
            this.createEnemie();
            if (i == 50) {
                clearInterval(interval);
            }
        }, 200)
        this.tickerFunc();
    }
}

(window as any).context = new CrazyAgar(1000, 620);