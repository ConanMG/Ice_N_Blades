import Phaser from "phaser";

import { sceneEvents } from "~/events/EventManager";
import { HealthBar } from "~/utils/Healthbar";

export default class World01_UI extends Phaser.Scene{

    private level: number;

    constructor(){
        super({'key':'World01_UI'});

        this.level = 1;
    }

    create(){
        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

        let txtName = this.add.text(10, 10, 'Lilith', { font: '48px Volantis', color:'#FFFFFF'});
        let txtLevel = this.add.text(10, 48, `Level: ${this.level}`, { font: '24px Volantis', color:'#FFFFFF'});
        let txtWorld = this.add.text(screenCenterX, 10, "Sandbox Dungeon", { font: '60px Volantis', color:'#FFFFFF'});
        txtWorld.setX(txtWorld.x - (txtWorld.width / 2))
        let deathScreen = this.add.text(screenCenterX, screenCenterY, "", {font: '90px Volantis', color: '#B20000'})
        
        
        var menuKey = this.input.keyboard.addKey('ESC');
        menuKey.on('keyup', (eventArgs)=>{
            
        })

        sceneEvents.on('player-died', ()=>{
            deathScreen.alpha = 0;
            this.tweens.add({
                targets: deathScreen,
                duration: 500,
                alpha: 1
            });
            deathScreen.setText("YOU DIED");
            deathScreen.setX(deathScreen.x - (deathScreen.width / 2))
        })

        sceneEvents.on('player-leveled-up', ()=>{
            this.level += 1;

            txtLevel.setText(`Level: ${this.level}`)
        }, this)      
    }

}