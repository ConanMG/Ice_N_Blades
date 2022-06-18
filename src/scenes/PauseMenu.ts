import Phaser from "phaser";
import { sceneEvents } from "~/events/EventManager";

export default class PauseMenu extends Phaser.Scene {

    constructor() {
        super({key:'PauseMenu'})
    }

    preload() {
    }

    create() {
        
        //#region "Scene setup"
        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;


        let rectangle = this.add.rectangle(0, 0, this.cameras.main.width, this.cameras.main.height, Phaser.Display.Color.GetColor32(0, 0, 0, 0.5)).setAlpha(0.2).setOrigin(0);
        let textPaused = this.add.text(screenCenterX, screenCenterY, 'PAUSED', { font: '7em Georgia', color: '#000000' }).setOrigin(0)
        let txtMovement = this.add.text(screenCenterX, screenCenterY + textPaused.height + 8, `↑ up, ↓ down, ← left, → right to move`, { font: '2em Georgia', color: '#000000' }).setDepth(-2);
        let txtAttack = this.add.text(screenCenterX, txtMovement.y + txtMovement.height + 8, `Spacebar to attack`, { font: '2em Georgia', color: '#000000' }).setDepth(-2);
        let txtDash = this.add.text(screenCenterX, txtAttack.y + txtAttack.height + 8, `'⇧ Shift' to attack`, { font: '2em Georgia', color: '#000000' }).setDepth(-2);
        txtDash.setX(txtDash.x - txtDash.width/2);
        txtMovement.setX(txtMovement.x - txtMovement.width/2);
        txtAttack.setX(txtAttack.x - txtAttack.width/2);
        textPaused.setX(textPaused.x - textPaused.width/2);
        textPaused.setY(textPaused.y - textPaused.height/2);

        //#endregion "Scene setup"

        //#region "Events"
        this.input.keyboard.on('keydown-' + 'ESC', () =>{
            sceneEvents.emit('unpause-game');
        })

        sceneEvents.on('unpause-game', ()=>{
            this.scene.resume('World01');
            this.scene.resume('World01_UI')
            this.scene.stop(this);
        })
        //#endregion "Events"
    }

}