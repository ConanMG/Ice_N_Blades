import Phaser from "phaser";

import { sceneEvents } from "~/events/EventManager";

export default class World01_UI extends Phaser.Scene{

    private hearts !: Phaser.GameObjects.Group

    constructor(){
        super({'key':'World01_UI'});
    }

    create(){
        this.hearts = this.add.group({
            classType: Phaser.GameObjects.Image
        })

        this.hearts.createMultiple({
            key: 'heartFull',
            setXY:{
                x:20,
                y:20,
                stepX:40,
            },
            quantity:3,
            setScale:{
                x:3,
                y:3
            }
        })
        
        sceneEvents.on('player-took-damage', this.playerHealthDecreased, this)

        sceneEvents.on(Phaser.Scenes.Events.SHUTDOWN, ()=>{
            sceneEvents.off('player-took-damage', this.playerHealthDecreased, this)
        })
    }

    private playerHealthDecreased(health:number){
        this.hearts.children.each((go, i) =>{
            const heart = go as Phaser.GameObjects.Image
            if(i < health){
                heart.setTexture('heartFull')
            }
            else{
                heart.setTexture('heartEmpty')
            }
        })
    }

}