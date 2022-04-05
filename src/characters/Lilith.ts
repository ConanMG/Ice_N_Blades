import Phaser from "phaser";
import { Status } from "~/utils/Predet"

declare global{
    namespace Phaser.GameObjects{
        interface GameObjectFactory{
            Lilith(x:number, y:number, texture:string, frame?:string|number): Lilith;
        }
    }
}

export default class Lilith extends Phaser.Physics.Arcade.Sprite{

    private hp : number = 3;
    private healthState? : Status;
    private knives? : Phaser.Physics.Arcade.Group

    private damageTime : number = 0;

    constructor(scene:Phaser.Scene, x:number, y:number, texture: string, frame?:string|number){
        super(scene,x,y,texture,frame);
        this.healthState=Status.HEALTHY

        this.anims.play("stand");
    }

    setKnives(knives: Phaser.Physics.Arcade.Group){
        this.knives = knives
    }

    public getHp(){
        return this.hp;
    }

    public setHp(hp:number){
        this.hp = hp
    }

    onHit(dir:Phaser.Math.Vector2) {

        if(this.healthState === Status.DAMAGED || this.healthState === Status.DEAD){
            return;
        }

        this.setVelocity(dir.x,dir.y);
        this.setTint(0xff0000);
        this.healthState=Status.DAMAGED;
        this.damageTime = 0;
        this.hp = this.hp-1

        if(this.hp <= 0){
            this.healthState = Status.DEAD
            this.setFrame("idle0000")
            this.anims.stop()
        }
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
            case Status.DEAD:
                
            break;
        }
    }

    private attack(){

        if(!this.knives){
            return
        }

        const direction = this.anims.currentAnim.key.charAt(4);
        const vec = new Phaser.Math.Vector2(0,0)

        switch(direction){
            case 'F':
                vec.y = 1
            break;
            case 'B':
                vec.y = -1
            break;
            case 'R':
                vec.x = -1
            break;
            case 'L':
                vec.x = 1
            break;
            default:
                vec.x = 1
            break;
        }

        const angle = vec.angle()
        const knife = this.knives.get(this.x, this.y, 'knife') as Phaser.Physics.Arcade.Image

        knife.setActive(true)
        knife.setVisible(true)

        knife.setRotation(angle)
        knife.setVelocity(vec.x * 300, vec.y *300)
    }

    update(cursors: Phaser.Types.Input.Keyboard.CursorKeys) {

        if(this.healthState === Status.DAMAGED){
            return;
        }

        if(this.healthState === Status.DEAD){
            this.setVelocity(0, 0)
            return
        }

        if(Phaser.Input.Keyboard.JustDown(cursors.space)){
            this.attack()

            return
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