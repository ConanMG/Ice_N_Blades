import Phaser from "phaser";

import { sceneEvents } from "~/events/EventManager";
import { HealthBar } from "~/utils/Healthbar";

export default class World01_UI extends Phaser.Scene {

    private level: number;
    private waveBlink!: Phaser.Time.TimerEvent;
    private wave: number = 0;
    private enemiesLeft: number = 0;

    constructor() {
        super({ 'key': 'World01_UI' });

        this.level = 1;
    }

    create() {
        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

        let txtEnemiesLeft = this.add.text(10, 10, `Enemies Left: ${this.enemiesLeft}`, { font: '4em Georgia', color: '#FFFFFF' });
        let txtLevel = this.add.text(10, 48, `Level: ${this.level}`, { font: '2em Georgia', color: '#FFFFFF' });
        let txtWave = this.add.text(screenCenterX, 10, `Wave ${this.wave}`, { font: '4em Georgia', color: '#FFFFFF' });
        txtWave.setX(txtWave.x - (txtWave.width / 2))
        let deathScreen = this.add.text(screenCenterX, screenCenterY, "", { font: '7em Georgia', color: '#B20000' })

        var nextWave = this.add.text(screenCenterX, (screenCenterY + screenCenterY) - 48, "Press '↵ Enter' to release the horde.", { font: '2em Georgia', color: '#FFFFFF' });

        this.waveBlink = this.time.addEvent({
            delay: 500,
            callback: () => {
                if (nextWave.alpha > 0)
                    nextWave.setAlpha(nextWave.alpha - 10)
                else
                    nextWave.setAlpha(nextWave.alpha + 10)
            },
            loop: true
        })

        var menuKey = this.input.keyboard.addKey('ESC');
        menuKey.on('keyup', (eventArgs) => {

        })

        sceneEvents.on('enemy-killed', (xpAmount) => {
            this.enemiesLeft--;
            if(this.enemiesLeft === 0)
                sceneEvents.emit('wave-ended');
            txtEnemiesLeft.setText(`Enemies Left: ${this.enemiesLeft}`);
        })

        sceneEvents.on('wave-started', (waveSpan) => {
            this.enemiesLeft = waveSpan;
            txtEnemiesLeft.setText(`Enemies Left: ${this.enemiesLeft}`);
            this.wave++
            txtWave.setText(`Wave ${this.wave}`);
            nextWave.visible = false;
            this.waveBlink.paused = true;
        })

        sceneEvents.on('wave-ended', () => {
            nextWave.visible = true;
            this.waveBlink.paused = false;
        })

        sceneEvents.on('player-died', () => {
            deathScreen.alpha = 0;
            this.tweens.add({
                targets: deathScreen,
                duration: 500,
                alpha: 1
            });
            deathScreen.setText("YOU DIED");
            deathScreen.setX(deathScreen.x - (deathScreen.width / 2))
        })

        sceneEvents.on('player-leveled-up', () => {
            this.level += 1;

            txtLevel.setText(`Level: ${this.level}`)
        }, this)

        sceneEvents.on
    }

}