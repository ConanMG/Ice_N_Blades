import Phaser, { Tilemaps } from "phaser";
import { sceneEvents } from "~/events/EventManager";
import ICaster from "~/interfaces/ICaster";
import { Status } from "~/utils/Predet"
import { Character } from "./Character";

declare global{
    namespace Phaser.GameObjects{
        interface GameObjectFactory{
            Lilith(x:number, y:number, texture:string, frame?:string|number): Lilith;
        }
    }
}

export default class Lilith extends Character implements ICaster {

    cooldown!: number;
    spells!: String[];
    cooldownTimer!: Phaser.Time.TimerEvent;
    mistyStepPlaying: boolean = false;

    constructor(scene:Phaser.Scene, x:number, y:number, texture: string, frame?:string|number){
        super(scene,x,y,texture,frame);

        this._healthState=Status.HEALTHY
        
        this.setupSkills(7, 14, 12, 16, 15, 18);
        this.spells = new Array<string>();
        this.setSpellsPerInt();
        this._hp = this._MAX_HP;
        this._ac = 11;

        this.anims.play("idle");
    }

    castSpell(spellKey: string) {
        throw new Error("Method not implemented.");
    }

    setSpellsPerInt(){
        if(this._skills['int'] >= 10){
            if(!this.spells.includes('Misty Step'))
                this.spells.push('Misty Step')
        }
        if(this._skills['int'] >= 12){
            if(!this.spells.includes('Hellish Rebuke'))
                this.spells.push('Hellish Rebuke')
        }
        if(this._skills['int'] >= 14){
            if(!this.spells.includes('Fire Ball'))
                this.spells.push('Fire Ball')
        }
        if(this._skills['int'] >= 16){
            if(!this.spells.includes('Phantasmal Form'))
                this.spells.push('Phantasmal Form')
        }
        if(this._skills['int'] >= 18){
            if(!this.spells.includes('Blur'))
                this.spells.push('Blur')
        }
        if(this._skills['int'] >= 20){
            if(!this.spells.includes('Power Word: Death'))
                this.spells.push('Power Word: Death')
        }
    }

    raiseSkill(skill: string) {
        super.raiseSkill(skill);
        this.setSpellsPerInt();
    }

    attack(){

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

    preUpdate(time: number, delta: number) {

        super.preUpdate(time, delta);
        if(this.mistyStepPlaying)
            return
            

        sceneEvents.on('player-died', () => {
            this._healthState = Status.DEAD;
        })

        switch(this._healthState){
            case Status.HEALTHY:
            break;
            case Status.DAMAGED:
                this._damageTime += delta;
                if(this._damageTime >= 150){
                    this.body.onCollide = true;
                    this._healthState = Status.HEALTHY;
                    this.setTint(0xffffff);
                    this._damageTime = 0;
                }
            break;
            case Status.DEAD:
                this.clearTint();
                this._healthBar.destroy();
            break;
        }
    }

    update(cursors: Phaser.Types.Input.Keyboard.CursorKeys) {
        if(this.mistyStepPlaying)
            return
            
        super.update(cursors);

        if(Phaser.Input.Keyboard.JustDown(cursors.space) && this._healthState === Status.HEALTHY){
            this.attack();
            return
        }
    }

    mistyStep(dir: string, worldBound: Phaser.Physics.Arcade.World) {
        this.mistyStepPlaying = true;
        if(dir === 'left'){
            this.setFlipX(true)
        }

        this.anims.play('disappear', true);
        this._healthBar.hide()
        this.once('animationcomplete', () => {
            console.log(dir)
            this.anims.play('appear', true)
            switch(dir) {
                case 'right':
                    if(!(this.x + 100 > worldBound.bounds.right))
                    this.setPosition(this.x + 100, this.y);
                    else if(!(this.x + 50 > worldBound.bounds.right))
                    this.setPosition(this.x + 50, this.y);
                    break;
                case 'left':
                    if(!(this.x - 100 < worldBound.bounds.left))
                    this.setPosition(this.x - 100, this.y);
                    else if(!(this.x - 50 < worldBound.bounds.left))
                    this.setPosition(this.x - 50, this.y);
                    break;
                case 'up':
                    if(!(this.y - 100 < worldBound.bounds.top))
                    this.setPosition(this.x, this.y - 100);
                    else if(!(this.y - 50 > worldBound.bounds.top))
                    this.setPosition(this.x, this.y - 50);
                    break;
                case 'down':
                    if(!(this.y + 100 > worldBound.bounds.bottom))
                    this.setPosition(this.x, this.y + 100);
                    else if(!(this.y + 50 > worldBound.bounds.bottom))
                    this.setPosition(this.x, this.y + 50);
                    break;
            }
            this.once('animationcomplete', () => {
                this._healthBar.show()
                this.setFlipX(false)
                this.mistyStepPlaying = false;
            })
        })
    }


}

Phaser.GameObjects.GameObjectFactory.register("Lilith", function(this:Phaser.GameObjects.GameObjectFactory, x:number, y:number, texture:string, frame?:string|number){
    var sprite= new Lilith(this.scene, x, y, texture, frame);

    this.displayList.add(sprite);
    this.updateList.add(sprite);

    this.scene.physics.world.enableBody(sprite, Phaser.Physics.Arcade.DYNAMIC_BODY);

    return sprite;
})