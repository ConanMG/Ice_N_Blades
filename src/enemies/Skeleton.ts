import Phaser from "phaser";
import { Enemy } from "./Enemies";

export default class Skeleton extends Enemy{
    
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: number | undefined){
        super(scene, x, y, texture, frame);

        this.setupStats(10, 14, 15, 6, 8, 5);
        this._ac = 13;

    }
    
    preUpdate(time: number, delta: number) {
        
        if(this._gameOver){
            let probability = Math.random() * 100;
            if (probability >= 80){
                this._gameOver = false;
                this._hp = this.FULL_HP
            }
            else
                return;
        }

        if(this._justHit){
            return;
        }

    }

}