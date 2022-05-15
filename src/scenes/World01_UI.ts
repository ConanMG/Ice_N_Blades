import { now } from "mongoose";
import Phaser from "phaser";
import 'regenerator-runtime/runtime'

import { sceneEvents } from "~/events/EventManager";
import { HealthBar } from "~/utils/Healthbar";

const dataApiKey="DpaplKZQTv04TGLdVdgwoGAhxk6KH016HXqh4Po72JQfafFC1ncgVefgLPw9BE17"
var axios = require('axios');

export default class World01_UI extends Phaser.Scene {

    private level: number;
    private waveBlink!: Phaser.Time.TimerEvent;
    private wave: number = 0;
    private enemiesLeft: number = 0;
    private killCount: number = 0;

    constructor() {
        super({ 'key': 'World01_UI' });

        this.level = 1;
    }

    create() {

        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

        let txtEnemiesLeft = this.add.text(10, 10, `Enemies Left: ${this.enemiesLeft}`, { font: '4em Georgia', color: '#000000' });
        let txtLevel = this.add.text(10, 48, `Level: ${this.level}`, { font: '2em Georgia', color: '#000000' });
        let txtWave = this.add.text(screenCenterX + screenCenterX, 10, `Wave ${this.wave}`, { font: '4em Georgia', color: '#000000' });
        txtWave.setX(txtWave.x - (txtWave.width + 5))
        let deathScreen = this.add.text(screenCenterX, screenCenterY, "", { font: '7em Georgia', color: '#B20000' })

        var nextWave = this.add.text(screenCenterX, (screenCenterY + screenCenterY) - 48, "Press '↵ Enter' to release the horde.", { font: '2em Georgia', color: '#000000' });
        nextWave.setX(nextWave.x - nextWave.width/2)

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

        sceneEvents.on('enemy-killed', () => {
            this.enemiesLeft--;
            this.killCount++;
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

            var data = { "_kills": this.killCount.valueOf(), "_wave": this.wave.valueOf()}
            this.makeRequest("POST", 'https://videogame-api-conanmg.herokuapp.com/score', data)
            this.makeRequest("GET", 'https://videogame-api-conanmg.herokuapp.com/scores')
            deathScreen.alpha = 0;
            this.tweens.add({
                targets: deathScreen,
                duration: 1500,
                alpha: 1
            }); 
            deathScreen.setText("YOU DIED");
            deathScreen.setX(deathScreen.x - (deathScreen.width / 2))
        })

        sceneEvents.on('player-leveled-up', () => {
            this.level += 1;

            txtLevel.setText(`Level: ${this.level}`)
        }, this)

        sceneEvents.on('enemy-revived', () => {
            this.enemiesLeft++;
            txtEnemiesLeft.setText(`Enemies Left: ${this.enemiesLeft}`);
        }, this)
    }

    async makeRequest(method: string ,myUrl: string, data?: Object) {
          var config = {
            method: method,
            url: myUrl,
            headers: { 
              'Content-Type': 'application/json'
            },
            data : data
          };
          
          axios(config)
          .then(function (response) {
            console.log(JSON.stringify(response.data));
          })
          .catch(function (error) {
            console.log(error);
          });
    }

}