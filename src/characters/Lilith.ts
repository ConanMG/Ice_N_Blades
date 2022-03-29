import Phaser from "phaser";

declare global{
    namespace Phaser.GameObjects{
        interface GameObjectFactory{
            Lilith(x:number, y:number, texture:string, frame?:string|number): Lilith;
        }
    }
}

enum Status{
    HEALTHY,
    DAMAGED,
}

export default class Lilith extends Phaser.Physics.Arcade.Sprite{

    private healthState?:Status;
    private damageTime:number=0;

    constructor(scene:Phaser.Scene, x:number, y:number, texture: string, frame?:string|number){
        super(scene,x,y,texture,frame);
        this.healthState=Status.HEALTHY

        this.anims.play("stand");
    }

    onHit(dir:Phaser.Math.Vector2) {

        if(this.healthState === Status.DAMAGED){
            return;
        }
        this.setVelocity(dir.x,dir.y);
        this.setTint(0xff0000);
        this.healthState=Status.DAMAGED;
        this.damageTime=0;
    }

    preUpdate(time: number, delta: number) {

        super.preUpdate(time, delta);

        switch(this.healthState){
            case Status.HEALTHY:
            break;
            case Status.DAMAGED:
                this.damageTime+=delta;
                if(this.damageTime >= 250){
                    this.healthState=Status.HEALTHY
                    this.setTint(0xffffff);
                    this.damageTime=0;
                }
            break;
        }
    }

    update(cursors: Phaser.Types.Input.Keyboard.CursorKeys) {

        if(this.healthState === Status.DAMAGED){
            return;
        }

        if (cursors.left.isDown) {
            this.setVelocityX(-150);
            this.setVelocityY(0);
            this.anims.play('walkR', true);
        } else if (cursors.right.isDown) {
            this.setVelocityX(150);
            this.setVelocityY(0);
            this.anims.play('walkL', true);
        }else if (cursors.down.isDown) {
            this.setVelocityY(150);
            this.setVelocityX(0);
            this.anims.play('walkF', true);
        }else if (cursors.up.isDown) {
            this.setVelocityY(-150);
            this.setVelocityX(0);
            this.anims.play('walkB', true);
        } else {
            this.setVelocityX(0);
            this.setVelocityY(0);
            this.play('stand', true)
        }
        
    }

}

Phaser.GameObjects.GameObjectFactory.register("Lilith", function(this:Phaser.GameObjects.GameObjectFactory, x:number, y:number, texture:string, frame?:string|number){
    var sprite= new Lilith(this.scene, x, y, texture, frame);

    this.displayList.add(sprite);
    this.updateList.add(sprite);

    this.scene.physics.world.enableBody(sprite, Phaser.Physics.Arcade.DYNAMIC_BODY);
    sprite.setScale(0.5,0.5);

    return sprite;
})