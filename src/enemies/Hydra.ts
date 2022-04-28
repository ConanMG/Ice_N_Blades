import Phaser from "phaser";
import IBoss from "~/interfaces/IBoss";
import { Direction } from "~/utils/Predet";
import { Enemy } from "./Enemies";

const movementPattern = (exclude:Direction)=>{

    let newDirection = Phaser.Math.Between(0,4);

    while(newDirection === exclude){

        newDirection = Phaser.Math.Between(0,4);

    }
    
    return newDirection;
}
export default class Hydra extends Enemy implements IBoss{
    
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
    
    activateBossSkill() {
        throw new Error("Method not implemented.");
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