import Phaser from "phaser";
import { Direction } from "~/utils/Predet";
import { Enemy } from "./Enemies";

const randomDirection = (exclude:Direction)=>{

    let newDirection = Phaser.Math.Between(0,3);

    while(newDirection === exclude){

        newDirection = Phaser.Math.Between(0,3);

    }
    
    return newDirection;
}

export default class Slime extends Enemy {

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string | number) {
        super(scene, x, y, texture, frame);
        
        this.setupStats(12, 6, 16, 1, 6, 2);
        this._ac = 8;

    }

}