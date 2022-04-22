import Phaser from "phaser";

import { sceneEvents } from "~/events/EventManager";
import { HealthBar } from "~/utils/Healthbar";

export default class World01_UI extends Phaser.Scene{

    private level: number;
    private characterHealth!: HealthBar;

    constructor(){
        super({'key':'World01_UI'});

        this.level = 1;
    }

    create(){
        
        let txtName = this.add.text(10, 10, 'Lilith', { font: '48px Volantis', color:'#FFFFFF'});
        let txtLevel = this.add.text(10, 48, `Level: ${this.level}`, { font: '24px Volantis', color:'#FFFFFF'});
        let txtWorld = this.add.text(10, 82, 'World01', { font: '48px Volantis', color:'#FFFFFF'});

        sceneEvents.on('player-leveled-up', ()=>{
            this.level += 1;

            txtLevel.setText(`Level: ${this.level}`)
        }, this)        
    }

}