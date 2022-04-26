import Phaser from "phaser";
import ICaster from "~/interfaces/ICaster";
import { Enemy } from "./Enemies";

export default class Succubus extends Enemy implements ICaster{
    
    Cooldown: number;
    spells: Array<string>;

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: number | undefined){
        super(scene, x, y, texture, frame);
        
        this.setupStats(8, 17, 13, 15, 12, 20);
        this._ac = 15
        this.Cooldown = 12 - (this._stats['int'] / 4)
        
        this.spells = new Array<string>();
        this.spells.push('Charm');
        this.spells.push('Draining Kiss');

    }

    checkCooldown() {
        throw new Error("Method not implemented.");
    }
    recoverSpells() {
        throw new Error("Method not implemented.");
    }

    castSpell(spellName: string){

        switch(spellName){
            case 'Charm':
                break;
            case 'Draining Kiss':
                break;
            default:
                console.log('ERROR. No spell key')
                break;
        }

    }

    preUpdate(time: number, delta: number){
        super.preUpdate(time, delta);

        if(this._aggro) {
            if(this.Cooldown === 0){
                let length = Math.random() * this.spells.length
                this.castSpell(this.spells[length])
            }
            else
                this.scene.physics.moveToObject(this, this._target!, this._speed)
        }
        else {
            
        }
    }
}