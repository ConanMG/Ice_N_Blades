import Phaser from "phaser";
import { Enemy } from "./Enemies";

export default class Hydra extends Enemy{
    
    private regenEvent: Phaser.Time.TimerEvent;

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: number | undefined){
        super(scene, x, y, texture, frame);
        this.setupStats(20, 12, 20, 2, 10, 7);
        this._ac = 15

        this.regenEvent = scene.time.addEvent({
            delay:6000,
            callback: () => {
                this._hp += Math.round(Math.random() * (this.FULL_HP - this._hp))
            },
            loop: true
        });
    }

    preUpdate(time: number, delta: number) {
        super.preUpdate(time, delta)

        if(this._gameOver || this._justHit){
            return;
        }

        if(this._hp <= 25) {
            this.regenEvent.destroy();
        }
    }
}