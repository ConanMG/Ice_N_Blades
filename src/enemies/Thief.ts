import { Status } from '~/utils/Enums';
import { Enemy } from './Enemies';


export default class Thief extends Enemy {


    constructor(scene: Phaser.Scene, x:number, y:number, texture:string, frame?:string | number){
        super(scene, x, y, texture, frame);
        this.setupStats(11, 12, 12, 10, 10, 10);
        this._ac = 12;

        this.anims.play('thief_idle');
        this._healthState = Status.HEALTHY;

    }

    preUpdate(time: number, delta: number): void {
        
        super.preUpdate(time,delta);
        
        if (this._gameOver || this._justHit) {
            return; 
        }

        this.setAggro();

        switch(this._healthState){

            case Status.HEALTHY:
                if(this.body.velocity.x > 0){
                    this.anims.play('thief_run', true)
                    this.flipX = true;
                }
                else if(this.body.velocity.x < 0){
                    this.anims.play('thief_run', true)
                    this.flipX = false;
                }
                else{
                    this.anims.play('thief_idle', true)
                }
                this.setTint(0xffffff);
                this._damageTime = 0;
                break;
            case Status.DAMAGED:
                this.setVelocity(0)
                this.setTint(0xff0000);
                this.anims.play('thief_hurt', true);
                this.on('animationcomplete', ()=>{
                    this._healthState = Status.HEALTHY;
                })
                break;
            case Status.DEAD:
                this.setVelocity(0);
                this._gameOver = true;
                this.body.onCollide = false;
                this.anims.stop()
                this.anims.play('thief_death', true);
                this.on("animationcomplete", ()=>{
                    this.destroy();
                });
                break;
        }
    }

    update() {
        
        super.update();

        if(this._justHit || this._gameOver) {
            return; 
        }

        if(this._aggro){
            this.scene.physics.moveToObject(this, this._target!, this._speed)
        }
        else{
            this.setVelocity(0,0)
        }
    }

}