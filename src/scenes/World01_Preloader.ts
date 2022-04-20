import Phaser from "phaser";

export default class World01_Preloader extends Phaser.Scene {

    constructor() {
        super({key:'preloader'})
    }

    preload() {
        var progressBar = this.add.graphics();
        var progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(240, 270, 320, 50);

        this.load.on('progress', function (value) {
            console.log(value);
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(250, 280, 300 * value, 30);
        });
                    
        this.load.on('fileprogress', function (file) {
            console.log(file.src);
        });
        this.load.on('complete', function () {
            console.log('complete');
            progressBar.destroy();
            progressBox.destroy();
        });

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