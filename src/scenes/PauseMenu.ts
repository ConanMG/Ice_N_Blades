import Phaser from "phaser";
import { sceneEvents } from "~/events/EventManager";

export default class PauseMenu extends Phaser.Scene {

    constructor() {
        super({key:'PauseMenu'})
    }

    preload() {
    }

    create() {
        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;


        let rectangle = this.add.rectangle(0, 0, this.cameras.main.width, this.cameras.main.height, Phaser.Display.Color.GetColor32(0, 0, 0, 0.5)).setAlpha(0.2).setOrigin(0);
        let textPaused = this.add.text(screenCenterX, screenCenterY, 'PAUSED', { font: '7em Georgia', color: '#000000' }).setOrigin(0)
        textPaused.setX(textPaused.x - textPaused.width/2);
        textPaused.setY(textPaused.y - textPaused.height/2);

        this.input.keyboard.on('keydown-' + 'ESC', () =>{
            sceneEvents.emit('unpause-game');
        })

        sceneEvents.on('unpause-game', ()=>{
            this.scene.resume('World01');
            this.scene.resume('World01_UI')
            this.scene.stop(this);
        })
    }

}