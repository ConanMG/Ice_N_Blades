import Phaser from 'phaser';
import { Direction } from '~/utils/Predet';

const randomDirection = (exclude:Direction)=>{

    let newDirection = Phaser.Math.Between(0,3);

    while(newDirection === exclude){

        newDirection = Phaser.Math.Between(0,3);

    }
    
    return newDirection;
}

export default class Thief extends Phaser.Physics.Arcade.Sprite {

    private movement = Direction.RIGHT;
    private moveEvent: Phaser.Time.TimerEvent;
    private target? : Phaser.GameObjects.Components.Transform;
    private aggro : boolean = false;

    constructor(scene: Phaser.Scene, x:number, y:number, texture:string, frame?:string | number){
        super(scene, x, y, texture, frame);

        this.anims.play('thiefRun');

        scene.physics.world.on(Phaser.Physics.Arcade.Events.TILE_COLLIDE, this.onTileCollision, this)
        this.moveEvent=scene.time.addEvent({
            delay:2000,
            callback: ()=>{
                this.movement=randomDirection(this.movement);
            },
            loop:true
        })
    }

    destroy(fromScene?: boolean): void {
        this.moveEvent.destroy();

        super.destroy(fromScene)
    }

    public setTarget(target: Phaser.GameObjects.Components.Transform) {
        this.target=target;
    }

    public setAggro() {
        var xDistance = this.x - this.target!.x
        var yDistance = this.y - this.target!.y
        if(xDistance < 50 && xDistance > -50 || yDistance < 50 && yDistance > -50) {
            this.aggro = true;
        }
        else {
            this.aggro = false;
        }
    }

    private onTileCollision(go:Phaser.GameObjects.GameObject){
        if (go !== this){
            return;
        }

        this.movement=randomDirection(this.movement);
    }

    preUpdate(time: number, delta: number): void {
        
        super.preUpdate(time,delta);

        const speed = 100;

        if(this.target){
            this.setAggro()
        }

        if(!this.aggro) {
            switch(this.movement){
                case Direction.UP:
                    this.setFlipX(true);
                    this.setVelocityY(-speed)
                    this.setVelocityX(0)
                break;
                case Direction.DOWN:
                    this.setFlipX(false);
                    this.setVelocityY(speed)
                    this.setVelocityX(0)
                break;
                case Direction.LEFT:
                    this.setFlipX(true);
                    this.setVelocityX(-speed)
                    this.setVelocityY(0)
                break;
                case Direction.RIGHT:
                    this.setFlipX(false);
                    this.setVelocityX(speed)
                    this.setVelocityY(0)
                break;
            }
        }
        else{
            this.scene.physics.moveToObject(this, this.target!, 150)
        }
    }

}