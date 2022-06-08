import { now } from "mongoose";
import Phaser from "phaser";
import 'regenerator-runtime/runtime'

import { sceneEvents } from "~/events/EventManager";

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
        let leaderboard = this.add.text(screenCenterX, screenCenterY, "", { font: '3.5em Georgia', color: '#FFFFFF', align:'center' })
        let board = this.add.image(0, 0, 'Scroll').setVisible(false);

        var nextWave = this.add.text(screenCenterX, (screenCenterY + screenCenterY) - 48, "Press '↵ Enter' to release the horde.", { font: '2em Georgia', color: '#000000' });
        nextWave.setX(nextWave.x - nextWave.width / 2)

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
            if (this.enemiesLeft === 0)
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

            var data = { "_kills": this.killCount.valueOf(), "_wave": this.wave.valueOf() }
            var leaderboardString: string = "";


            await setTimeout(() => {
                var config = {
                    method: 'GET',
                    url: 'https://videogame-api-conanmg.herokuapp.com/scores',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: data
                };
                axios(config)
                    .then(function (response) {
                        var max = 0
                        leaderboardString = 'LEADERBOARD\n'
                        response.data.forEach((score) => {
                            deathScreen.destroy();
                            max++;
                            if (max < 5) {
                                leaderboardString += '\n' + max + ' Wave ' + score._wave + ' Kills ' + score._kills
                            }
                        })
                        
                        var config = {
                            method: 'POST',
                            url: 'https://videogame-api-conanmg.herokuapp.com/score',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            data: data
                        };

                        axios(config)
                            .then((response) => {
                                leaderboardString += '\n\nYOUR SCORE \n'
                                leaderboardString += '\n Wave ' + response.data._wave + ' Kills ' + response.data._kills;
                                leaderboard.text = leaderboardString
                                leaderboard.setX(screenCenterX - leaderboard.width / 2)
                                leaderboard.setY(screenCenterY - leaderboard.height / 2)
                                board.setX(screenCenterX)
                                board.setY(screenCenterY)
                                board.setDepth(-1);
                                board.setVisible(true);
                            })
                            .catch(function (error) {
                                console.log(error);
                            });
                        })
                    .catch(function (error) {
                        console.log(error);
                    });
            }, 3000);

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