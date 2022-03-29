import Phaser from "phaser";

export default class World01_Preloader extends Phaser.Scene {

    constructor() {
        super({key:'preloader'})
    }

    preload() {
        this.load.atlas('Lilith', 'character/Lilith.png', 'character/Lilith.json');
        this.load.atlas('Thief', 'enemies/Thief.png', 'enemies/Thief.json');
        this.load.image('tiles', 'tiles/TilesExtruded.png')
        this.load.tilemapTiledJSON('map', 'dungeons/Mapa.json')
    }

    create() {
        this.scene.start('World01')
    }

}