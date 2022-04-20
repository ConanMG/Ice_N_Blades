import Phaser, { Physics } from 'phaser';
import { Character } from '~/characters/Character';
import { Direction, Status } from '~/utils/Predet';
import { Enemy } from './Enemies';

const randomDirection = (exclude:Direction)=>{

    let newDirection = Phaser.Math.Between(0,4);

    while(newDirection === exclude){

        newDirection = Phaser.Math.Between(0,4);

    }
    
    return newDirection;
}

export default class Thief extends Enemy {

    constructor(scene: Phaser.Scene, x:number, y:number, texture:string, frame?:string | number){
        super(scene, x, y, texture, frame);
        this.setupStats(12, 16, 10, 8, 6, 14);

        this.anims.play('thief_run');
        this._healthState = Status.HEALTHY;

        scene.physics.world.on(Phaser.Physics.Arcade.Events.TILE_COLLIDE, this.onTileCollision, this)
        this._moveEvent=scene.time.addEvent({
            delay:2000,
            callback: ()=>{
                this._direction=randomDirection(this._direction);
                if(this._direction === Direction.STOP){
                    this.anims.play('thief_idle')
                }
                else {
                    this.anims.play('thief_run')
                }
            },
            loop:true
        })
    }

    destroy(fromScene?: boolean): void {
        this._moveEvent.destroy();

        super.destroy(fromScene)
    }

    onTileCollision(go:Phaser.GameObjects.GameObject){
        if (go !== this){
            return;
        }

        this._direction = randomDirection(this._direction);
    }

    preUpdate(time: number, delta: number): void {
        
        super.preUpdate(time,delta);
        
        if (this._gameOver) {
            return; 
        }

        switch(this._healthState){
            case Status.HEALTHY:
                this.setTint(0xffffff);
                this._damageTime = 0;
                break;
            case Status.DAMAGED:
                this.setVelocity(0, 0)
                this.setTint(0xff0000);
                this.anims.play('thief_hurt', true);
                this.on('animationcomplete', ()=>{
                    this._healthState = Status.HEALTHY;
                    this.anims.play('thief_run')
                })
                return;
            case Status.DEAD:
                this.setVelocity(0, 0)
                this.anims.play('thief_death', true)
                this.on("animationcomplete", ()=>{
                    this._gameOver = true;
                    this.destroy()
                })
                return;
        }
    
        if(this._target){
            var character: Character = this._target as Character
            if(character.healthState() != Status.DEAD)
                this.setAggro()
            else
                this._aggro=false;
        }
    
        if(!this._aggro ) {
            switch(this._direction){
                case Direction.UP:
                    this.setFlipX(true);
                    this.setVelocityY(-this._speed)
                    this.setVelocityX(0)
                break;
                case Direction.DOWN:
                    this.setFlipX(false);
                    this.setVelocityY(this._speed)
                    this.setVelocityX(0)
                break;
                case Direction.LEFT:
                    this.setFlipX(false);
                    this.setVelocityX(-this._speed)
                    this.setVelocityY(0)
                break;
                case Direction.RIGHT:
                    this.setFlipX(true);
                    this.setVelocityX(this._speed)
                    this.setVelocityY(0)
                break;
            }
        }
        else{
            this.scene.physics.moveToObject(this, this._target!, this._speed)
        }
    }

}