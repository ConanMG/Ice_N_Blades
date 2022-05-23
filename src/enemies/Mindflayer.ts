import Phaser from "phaser";
import { sceneEvents } from "~/events/EventManager";
import ICaster from "~/interfaces/ICaster";
import { Enemy } from "./Enemies";

export default class Mindflayer extends Enemy implements ICaster{

    cooldown: number;
    spells: Array<string>;
    cooldownTimer!: Phaser.Time.TimerEvent;

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: number | undefined){
        super(scene, x, y, texture, frame);
        
        this.setupStats(11, 12, 12, 19, 17, 17);
        this._ac = 15;
        this.cooldown = 12 - (this._stats['int'] / 4);

        this.spells = new Array<string>();
        this.spells.push('Extract Brain');
        this.spells.push('Mind Blast');

    }

    castSpell(spellKey: string) {

        switch(spellKey){
            case 'Extract Brain':
                this.anims.play('mindflayer_extract_brain', true);
                this.on('animationcomplete', ()=>{
                    sceneEvents.emit('player')
                })
                this.cooldown = 20;
                this.cooldownTimer = this.scene.time.addEvent({
                    delay:1000,
                    callback: () => {
                        this.cooldown--;
                    },
                    loop: this.cooldown!=0
                })
                break;
            case 'Mind Blast':
                var AoE = new Phaser.GameObjects.Zone(this.scene, this.x, this.y, 60, 60);
                AoE.setCircleDropZone(30).setVisible(true)
                this.cooldown = 20;
                this.cooldownTimer = this.scene.time.addEvent({
                    delay:1000,
                    callback: () => {
                        this.cooldown--;
                    },
                    loop: this.cooldown!=0
                })
                break;
            default:
                console.log('ERROR. No spell key')
                break;
        }
    }

    preUpdate(time: number, delta: number) {
        super.preUpdate(time, delta)
        
        if (this._gameOver || this._justHit){
            return;
        }

        if (this._aggro){
            if (this.cooldown === 0) {
                let length = Math.random() * this.spells.length;
                this.castSpell(this.spells[length]);
            }
        }

    }


}