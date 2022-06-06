import Phaser from "phaser";
import { Status } from "~/utils/Enums";
import { Enemy } from "./Enemies";

export default class Ghost extends Enemy{

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: number | undefined){
        super(scene, x, y, texture, frame);
        
        this.setupStats(7, 13, 10, 10, 12, 17);
        this._ac = 11
        
        this._healthState = Status.HEALTHY;

    }

    onPlayerCollision(dir: Phaser.Math.Vector2): void {
        super.onPlayerCollision(dir)
    }

    preUpdate(time: number, delta: number){
        super.preUpdate(time, delta);

        if (this._gameOver || this._justHit) {
            return; 
        }

        switch(this._healthState){

            case Status.HEALTHY:
                this.setAggro();
                if(this.body.velocity.x > 0 ){
                    this.anims.play('ghost_move', true)
                    this.flipX = false;
                }
                else if(this.body.velocity.x < 0){
                    this.anims.play('ghost_move', true)
                    this.flipX = true;
                }
                else{
                    this.anims.play('ghost_idle', true)
                }
                this.setTint(0xffffff);
                this._damageTime = 0;
                break;
            case Status.DAMAGED:
                this.setVelocity(0)
                this.setTint(0xff0000);
                this.anims.play('ghost_hurt', true);
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
                this.anims.play('ghost_death', true);
                this.once('animationcomplete', () => {
                        this.destroy();
                })
                break;
        }
    }

    update() {

        super.update()

        if(this._justHit || this._gameOver || this._healthState == Status.DAMAGED)
            return;

        if(this._aggro)
            this.scene.physics.moveToObject(this, this._target!, this._speed)
        else{
            this.setVelocity(0,0)
        }
    }
}