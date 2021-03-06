import Phaser, { Tilemaps } from "phaser";
import { sceneEvents } from "~/events/EventManager";
import ICaster from "~/interfaces/ICaster";
import { Ailments, Direction, Skills, Status } from "~/utils/Enums"
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

    /**
     * TODO/ Cast the selected spell
     * @param spellKey 
     */
    castSpell(spellKey: string) {
        throw new Error("Method not implemented.");
    }

    /**
     * Sets the spells known by the character
     */
    setSpellsPerInt(){
        if(this._skills[Skills.INTELLIGENCE] >= 10){
            if(!this.spells.includes('Misty Step'))
                this.spells.push('Misty Step')
        }
        if(this._skills[Skills.INTELLIGENCE] >= 12){
            if(!this.spells.includes('Hellish Rebuke'))
                this.spells.push('Hellish Rebuke')
        }
        if(this._skills[Skills.INTELLIGENCE] >= 14){
            if(!this.spells.includes('Fire Ball'))
                this.spells.push('Fire Ball')
        }
        if(this._skills[Skills.INTELLIGENCE] >= 16){
            if(!this.spells.includes('Phantasmal Form'))
                this.spells.push('Phantasmal Form')
        }
        if(this._skills[Skills.INTELLIGENCE] >= 18){
            if(!this.spells.includes('Blur'))
                this.spells.push('Blur')
        }
        if(this._skills[Skills.INTELLIGENCE] >= 20){
            if(!this.spells.includes('Power Word: Death'))
                this.spells.push('Power Word: Death')
        }
    }
    
    raiseSkill(skill: Skills) {
        super.raiseSkill(skill);
        this.setSpellsPerInt();
    }

    /**
     * Launches a knife in the last direction the character moved
     */
    attack(){

        if(!this._weapon || this._statusAilments === Ailments.PETRIFIED || this._healthState === Status.DEAD){
            return
        }
        const vec = new Phaser.Math.Vector2(0,0)

        switch(this._lastDirection){
            case Direction.DOWN:
                vec.y = 1
            break;
            case Direction.UP:
                vec.y = -1
            break;
            case Direction.LEFT:
                vec.x = -1
            break;
            case Direction.RIGHT:
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

    /**
     * Performs a dash that gants the character invulnerability while active.
     * @param dir The direction towards which the character dashes
     * @param worldBound current world
     */
    mistyStep(dir: Direction, worldBound: Phaser.Physics.Arcade.World) {
        this.mistyStepPlaying = true;
        if(dir === Direction.LEFT){
            this.setFlipX(true)
        }

        this.anims.play('disappear', true);
        this._healthBar.hide()
        this.once('animationcomplete', () => {
            this.anims.play('appear', true)
            switch(dir) {
                case Direction.RIGHT:
                    if(!(this.x + 100 > worldBound.bounds.right))
                    this.setPosition(this.x + 100, this.y);
                    else if(!(this.x + 50 > worldBound.bounds.right))
                    this.setPosition(this.x + 50, this.y);
                    break;
                case Direction.LEFT:
                    if(!(this.x - 100 < worldBound.bounds.left))
                    this.setPosition(this.x - 100, this.y);
                    else if(!(this.x - 50 < worldBound.bounds.left))
                    this.setPosition(this.x - 50, this.y);
                    break;
                case Direction.UP:
                    if(!(this.y - 100 < worldBound.bounds.top))
                    this.setPosition(this.x, this.y - 100);
                    else if(!(this.y - 50 < worldBound.bounds.top))
                    this.setPosition(this.x, this.y - 50);
                    break;
                case Direction.DOWN:
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

/**
    GameFactory allows the creation of the character and the implementation of that same character with
    with only one method.
*/
Phaser.GameObjects.GameObjectFactory.register("Lilith", function(this:Phaser.GameObjects.GameObjectFactory, x:number, y:number, texture:string, frame?:string|number){
    var sprite= new Lilith(this.scene, x, y, texture, frame);

    this.displayList.add(sprite);
    this.updateList.add(sprite);

    this.scene.physics.world.enableBody(sprite, Phaser.Physics.Arcade.DYNAMIC_BODY);

    return sprite;
})