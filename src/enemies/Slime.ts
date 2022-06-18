import Phaser from "phaser";
import { Direction, Status } from "~/utils/Enums";
import { Enemy } from "./Enemies";

const randomDirection = (exclude:Direction)=>{

    let newDirection = Phaser.Math.Between(0,3);

    while(newDirection === exclude){

        newDirection = Phaser.Math.Between(0,3);

    }
    
    return newDirection;
}

export default class Slime extends Enemy {

    //Slime's unique ability has a chance to poison enemies on hit

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string | number) {
        super(scene, x, y, texture, frame);
        
        this.setupStats(12, 6, 16, 1, 6, 2);
        this._ac = 8;

        this.anims.play('slime_idle');
        this._healthState = Status.HEALTHY;
        this.setScale(0.5, 0.5);

    }

    onPlayerCollision(dir: Phaser.Math.Vector2): void {
        this.anims.play('slime_attack')
        super.onPlayerCollision(dir)
    }

    preUpdate(time: number, delta: number) {
        
        super.preUpdate(time, delta);

        if (this._gameOver || this._justHit) {
            return; 
        }

        switch(this._healthState){

            case Status.HEALTHY:
                this.setAggro();
                if(this.body.velocity.x > 0 ){
                    this.anims.play('slime_move', true)
                    this.flipX = false;
                }
                else if(this.body.velocity.x < 0){
                    this.anims.play('slime_move', true)
                    this.flipX = true;
                }
                else{
                    this.anims.play('slime_idle', true)
                }
                this.setTint(0xffffff);
                this._damageTime = 0;
                break;
            case Status.DAMAGED:
                this.setVelocity(0)
                this.setTint(0xff0000);
                this.anims.play('slime_hurt', true);
                this.on('animationcomplete', ()=>{
                    this._healthState = Status.HEALTHY;
                })
                this.setAggro();
                break;
            case Status.DEAD:
                this.setAggro();
                this.setVelocity(0);
                this._gameOver = true;
                this.body.onCollide = false;
                this.anims.stop()
                this.anims.play('slime_death', true);
                this.once('animationcomplete', () => {
                        this.destroy();
                })
                break;
        }
    }

    update() {

        super.update()

        if(this._justHit || this._gameOver){
            return;
        }

        if(this._aggro){
            this.scene.physics.moveToObject(this, this._target!, this._speed)
        }
    }

}