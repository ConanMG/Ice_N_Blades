import Phaser from "phaser";

export default class World01_Preloader extends Phaser.Scene {

    constructor() {
        super({key:'preloader'})
    }

    preload() {
        this.load.atlas('Lilith', 'character/Main_Spritesheet.png', 'character/Main_Spritesheet.json');
        this.load.atlas('Thief', 'enemies/Thief_Spritesheet.png', 'enemies/Thief_Spritesheet.json');
        this.load.image('tiles', 'tiles/TilesExtruded.png')
        this.load.tilemapTiledJSON('map', 'dungeons/Mapa.json')

        this.load.image('heartFull', 'ui/heartFull.png')
        this.load.image('heartEmpty', 'ui/heartEmpty.png')
        this.load.image('knife', 'items/knife.png')
    }

    create() {
        this.scene.start('World01')
    }

}