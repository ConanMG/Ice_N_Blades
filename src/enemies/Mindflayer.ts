import Phaser from "phaser";
import { sceneEvents } from "~/events/EventManager";
import ICaster from "~/interfaces/ICaster";
import { Enemy } from "./Enemies";

export default class Mindflayer extends Enemy implements ICaster{

    Cooldown: number;
    spells: Array<string>;

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: number | undefined){
        super(scene, x, y, texture, frame);
        
        this.setupStats(11, 12, 12, 19, 17, 17);
        this._ac = 15;
        this.Cooldown = 12 - (this._stats['int'] / 4);

        this.spells = new Array<string>();
        this.spells.push('Extract Brain');
        this.spells.push('Mind Blast');

    }

    checkCooldown() {
        throw new Error("Method not implemented.");
    }

    castSpell(spellKey: string) {

        switch(spellKey){
            case 'Extract Brain':
                this.anims.play('mindflayer_extract_brain', true);
                this.on('animationcomplete', ()=>{
                    sceneEvents.emit('player')
                })
        }
    }
    
    recoverSpells() {
        throw new Error("Method not implemented.");
    }

    preUpdate(time: number, delta: number) {
        super.preUpdate(time, delta)
        
        if(this._gameOver || this._justHit){
            return;
        }

        if(this._aggro){
            
        }

    }


}