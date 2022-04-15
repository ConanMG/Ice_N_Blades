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
        this.setupStats(6, 8, 8, 2, 4, 2);


    }

    onTileCollision(go: Phaser.GameObjects.GameObject) {
        if (go !== this){
            return;
        }

        this._direction = randomDirection(this._direction);
    }
    
    onHit(dir:Phaser.Math.Vector2) {

        this.setVelocity(dir.x,dir.y);
        this.setTint(0xff0000);
        this._hp = this._hp - 1

        if(this._hp <= 0){
            this.anims.stop()
        }
    }

}