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

    private _lastDirection!: string;

    constructor(scene:Phaser.Scene, x:number, y:number, texture: string, frame?:string|number){
        super(scene,x,y,texture,frame);
        this._healthState=Status.HEALTHY
        this.setupSkills(7, 14, 12, 16, 15, 18)
        this._hp = this._MAX_HP;

        this.anims.play("idle");
    }

    preUpdate(time: number, delta: number) {

        super.preUpdate(time, delta);

        switch(this._healthState){
            case Status.HEALTHY:
            break;
            case Status.DAMAGED:
                this._damageTime += delta;
                if(this._damageTime >= 150){
                    this._healthState = Status.HEALTHY;
                    this.setTint(0xffffff);
                    this._damageTime = 0;
                }
            break;
            case Status.DEAD:
                this.setTint(0xffffff);
            break;
        }
    }

    private attack(){

        if(!this._weapon){
            return
        }
        const vec = new Phaser.Math.Vector2(0,0)

        switch(this._lastDirection){
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

        if (this._gameOver){
            return;
        }

        this.checkXp();
        
        if(this._healthState === Status.DAMAGED){
            this.anims.play('hurt', true);
            return;
        }

        if(this._healthState === Status.DEAD){
            this.setVelocity(0, 0);
            this.anims.play('death', true);
            this.on("animationcomplete", ()=>{
                this._gameOver = true;
                this.destroy();
            })
            return
        }

        if(Phaser.Input.Keyboard.JustDown(cursors.space)){
            this.attack();
            return
        }

        if (cursors.left.isDown) {
            this.setFlipX(false)
            this.setVelocityX(-this._speed);
            this.setVelocityY(0);
            this._healthBar.updatePosition(this.x - 10, (this.y - this.height - 2))
            this.anims.play('left', true);
            this._lastDirection = this.anims.currentAnim.key;
        } else if (cursors.right.isDown) {
            this.setFlipX(false)
            this.setVelocityX(this._speed);
            this.setVelocityY(0);
            this._healthBar.updatePosition(this.x - 10, (this.y - this.height - 2))
            this.anims.play('right', true);
            this._lastDirection = this.anims.currentAnim.key;
        }else if (cursors.down.isDown) {
            this.setFlipX(false)
            this.setVelocityY(this._speed);
            this.setVelocityX(0);
            this._healthBar.updatePosition(this.x - 10, (this.y - this.height - 2))
            this.anims.play('down', true);
            this._lastDirection = this.anims.currentAnim.key;
        }else if (cursors.up.isDown) {
            this.setFlipX(false)
            this.setVelocityY(-this._speed);
            this.setVelocityX(0);
            this._healthBar.updatePosition(this.x - 10, (this.y - this.height - 2))
            this.anims.play('up', true);
            this._lastDirection = this.anims.currentAnim.key;
        } else {
            this.setVelocityX(0);
            this.setVelocityY(0);

            switch(this._lastDirection){
                case 'right' || 'up':
                    this.setFlipX(false)
                    break;
                case 'left' || 'down':
                    this.setFlipX(true)
                    break;
                default:
                    this.setFlipX(false)
                    break;
            }

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