import Phaser, { Physics } from 'phaser';
import { Character } from '~/characters/Character';
import { sceneEvents } from '~/events/EventManager';
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

    private _moveEvent!: Phaser.Time.TimerEvent;

    constructor(scene: Phaser.Scene, x:number, y:number, texture:string, frame?:string | number){
        super(scene, x, y, texture, frame);
        this.setupStats(11, 12, 12, 10, 10, 10);
        this._ac = 12;

        this.anims.play('thief_idle');
        this._healthState = Status.HEALTHY;

        scene.physics.world.on(Phaser.Physics.Arcade.Events.TILE_COLLIDE, this.onTileCollision, this)

        this._moveEvent=scene.time.addEvent({
            delay:2000,
            callback: ()=>{
                this._direction = randomDirection(this._direction);
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
                this.setVelocity(0)
                this._moveEvent.reset({});
                this.setTint(0xff0000);
                this.anims.play('thief_hurt', true);
                this.on('animationcomplete', ()=>{
                    this._healthState = Status.HEALTHY;
                    this.anims.play('thief_run', true);
                    this._moveEvent;
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
            var character: Character = this._target as Character
            if(character.healthState() != Status.DEAD)
                this.setAggro()
            else
                this._aggro=false;
        }
    }

    update() {
        
        super.update()

        if (this._gameOver || this._justHit) {
            return; 
        }
    
        if(!this._aggro && this._healthState == Status.HEALTHY) {
            switch(this._direction){
                case Direction.UP:
                    this.anims.play('thief_run', true)
                    this.setFlipX(true);
                    this.setVelocityY(-this._speed)
                    this.setVelocityX(0)
                break;
                case Direction.DOWN:
                    this.anims.play('thief_run', true)
                    this.setFlipX(false);
                    this.setVelocityY(this._speed)
                    this.setVelocityX(0)
                break;
                case Direction.LEFT:
                    this.anims.play('thief_run', true)
                    this.setFlipX(false);
                    this.setVelocityX(-this._speed)
                    this.setVelocityY(0)
                break;
                case Direction.RIGHT:
                    this.anims.play('thief_run', true)
                    this.setFlipX(true);
                    this.setVelocityX(this._speed)
                    this.setVelocityY(0)
                break;
                case Direction.STOP:
                    this.anims.play('thief_idle', true)
                    this.setVelocity(0)
                break;
            }
        }
        else{
            this.scene.physics.moveToObject(this, this._target!, this._speed)
        }
    }

}