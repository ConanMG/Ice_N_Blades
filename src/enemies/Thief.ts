import Phaser, { Physics } from 'phaser';
import { Character } from '~/characters/Character';
import { sceneEvents } from '~/events/EventManager';
import { Direction, Status } from '~/utils/Predet';
import { Enemy } from './Enemies';


export default class Thief extends Enemy {


    constructor(scene: Phaser.Scene, x:number, y:number, texture:string, frame?:string | number){
        super(scene, x, y, texture, frame);
        this.setupStats(11, 12, 12, 10, 10, 10);
        this._ac = 12;

        this.anims.play('thief_idle');
        this._healthState = Status.HEALTHY;

        scene.physics.world.on(Phaser.Physics.Arcade.Events.TILE_COLLIDE, this.onTileCollision, this)
    }

    onTileCollision(go:Phaser.GameObjects.GameObject){
        if (go !== this){
            return;
        }
    }

    preUpdate(time: number, delta: number): void {
        
        super.preUpdate(time,delta);
        
        if (this._gameOver) {
            return; 
        }

        switch(this._healthState){
            case Status.HEALTHY:
                if(this.body.velocity.x > 0 ){
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
                return;
            case Status.DEAD:
                this.setVelocity(0);
                this.anims.play('thief_death', true);
                this.on("animationcomplete", ()=>{
                    this._gameOver = true;
                    this.destroy();
                });
                return;
        }
    
        if(this._target){
                this.setAggro()
        }
    }

    update() {
        
        super.update()

        if (this._gameOver || this._justHit) {
            return; 
        }
        else{
            if(this._aggro)
                this.scene.physics.moveToObject(this, this._target!, this._speed)
        }
    }

}