import Phaser from "phaser";
import { Status } from "~/utils/Predet"
import { Character } from "./Character";

declare global{
    namespace Phaser.GameObjects{
        interface GameObjectFactory{
            Lilith(x:number, y:number, texture:string, frame?:string|number): Lilith;
        }
    }
}

export default class Lilith extends Character {

    constructor(scene:Phaser.Scene, x:number, y:number, texture: string, frame?:string|number){
        super(scene,x,y,texture,frame);
        this._healthState=Status.HEALTHY

        this.anims.play("idle");
    }

    preUpdate(time: number, delta: number) {

        super.preUpdate(time, delta);

        switch(this._healthState){
            case Status.HEALTHY:
            break;
            case Status.DAMAGED:
                this._damageTime+=delta;
                if(this._damageTime >= 150){
                    this._healthState=Status.HEALTHY;
                    this._hp = this._hp - 1; 
                    this.setTint(0xffffff);
                    this._damageTime=0;
                }
            break;
            case Status.DEAD:
                this.anims.play('death', true);
            break;
        }
    }

    private attack(){

        if(!this._weapon){
            return
        }

        const direction = this.anims.currentAnim.key.toString();
        const vec = new Phaser.Math.Vector2(0,0)

        switch(direction){
            case 'down':
                vec.y = 1
            break;
            case 'up':
                vec.y = -1
            break;
            case 'left':
                vec.x = -1
            break;
            case 'right':
                vec.x = 1
            break;
            default:
                vec.x = 1
            break;
        }

        const angle = vec.angle()
        const knife = this._weapon.get(this.x, this.y, 'knife') as Phaser.Physics.Arcade.Image

        knife.setActive(true)
        knife.setVisible(true)

        knife.setRotation(angle)
        knife.setVelocity(vec.x * 300, vec.y *300)
    }

    update(cursors: Phaser.Types.Input.Keyboard.CursorKeys) {

        this.checkXp();
        
        if(this._healthState === Status.DAMAGED){
            this.anims.play('hurt', true);
            return;
        }

        if(this._healthState === Status.DEAD){
            this.setVelocity(0, 0);
            return
        }

        if(Phaser.Input.Keyboard.JustDown(cursors.space)){
            this.attack()

            return
        }

        if (cursors.left.isDown) {
            this.setVelocityX(-150);
            this.setVelocityY(0);
            this.anims.play('left', true);
        } else if (cursors.right.isDown) {
            this.setVelocityX(150);
            this.setVelocityY(0);
            this.anims.play('right', true);
        }else if (cursors.down.isDown) {
            this.setVelocityY(150);
            this.setVelocityX(0);
            this.anims.play('down', true);
        }else if (cursors.up.isDown) {
            this.setVelocityY(-150);
            this.setVelocityX(0);
            this.anims.play('up', true);
        } else {
            this.setVelocityX(0);
            this.setVelocityY(0);
            this.play('idle', true)
        }
        
    }

}

Phaser.GameObjects.GameObjectFactory.register("Lilith", function(this:Phaser.GameObjects.GameObjectFactory, x:number, y:number, texture:string, frame?:string|number){
    var sprite= new Lilith(this.scene, x, y, texture, frame);

    this.displayList.add(sprite);
    this.updateList.add(sprite);

    this.scene.physics.world.enableBody(sprite, Phaser.Physics.Arcade.DYNAMIC_BODY);

    return sprite;
})