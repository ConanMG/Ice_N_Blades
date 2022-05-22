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

        let txtEnemiesLeft = this.add.text(10, 10, `Enemies Left: ${this.enemiesLeft}`, { font: '4em Georgia', color: '#000000' }).setDepth(-2);
        let txtLevel = this.add.text(10, 48, `Level: ${this.level}`, { font: '2em Georgia', color: '#000000' }).setDepth(-2);
        let txtWave = this.add.text(screenCenterX + screenCenterX, 10, `Wave ${this.wave}`, { font: '4em Georgia', color: '#000000' }).setDepth(-2);
        txtWave.setX(txtWave.x - (txtWave.width + 5))
        let deathScreen = this.add.text(screenCenterX, screenCenterY, "", { font: '7em Georgia', color: '#B20000' })
        let leaderboard = this.add.text(screenCenterX, screenCenterY, "", { font: '5em Georgia', color: '#FFFFFF' })
        let board = this.add.image(0,0,'Scroll').setVisible(false);

        var nextWave = this.add.text(screenCenterX, (screenCenterY + screenCenterY) - 48, "Press '↵ Enter' to release the horde.", {font: '2em Georgia', color: '#000000' });
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

        sceneEvents.on('player-died', async () => {
            deathScreen.alpha = 0;
            this.tweens.add({
                targets: deathScreen,
                duration: 1500,
                alpha: 1
            }); 
            deathScreen.setText("YOU DIED");
            deathScreen.setX(deathScreen.x - (deathScreen.width / 2))
            deathScreen.setX(deathScreen.y - (deathScreen.height / 2))

            var data = { "_kills": this.killCount.valueOf(), "_wave": this.wave.valueOf()}
            /*var config = {
                method: 'POST',
                url: 'https://videogame-api-conanmg.herokuapp.com/score',
                headers: { 
                  'Content-Type': 'application/json'
                },
                data : data
              };
              
              axios(config)
              .then(function (response) {
                    Object.entries(response.data).forEach(score => {
                        const [key, value] = score;
                        console.log(`${key}: ${value}`)
                    });
              })
              .catch(function (error) {
                console.log(error);
              });
            */
              var config = {
                method: 'GET',
                url: 'https://videogame-api-conanmg.herokuapp.com/scores',
                headers: { 
                  'Content-Type': 'application/json'
                },
                data : data
              };
              
              await setTimeout(() => {
              axios(config)
              .then(function (response) {
                    var max = 0
                    var leaderboardString = 'LEADERBOARD\n'
                    response.data.forEach((score) => {
                        deathScreen.destroy();
                        if(max < 5){
                            leaderboardString += '\n' + 'kills: ' + score._kills + 'wave: ' +  score._wave
                        }
                        leaderboard.text = leaderboardString
                        leaderboard.setX(screenCenterX - leaderboard.width/2)
                        leaderboard.setY(screenCenterY - leaderboard.height/2)
                        
                        /* board.fillRect(leaderboard.x - 20, leaderboard.y - 20, leaderboard.width + 40, leaderboard.height + 40)
                        board.setDepth(-1)
                        board.fillStyle(0, 1) */
                        board.setX(screenCenterX)
                        board.setY(screenCenterY)
                        board.setDepth(-1);
                        board.setVisible(true);
                        max++   
                    })
              })
              .catch(function (error) {
                console.log(error);
              });
            }, 3000)
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

}