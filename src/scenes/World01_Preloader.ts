import Phaser from "phaser";
import { sceneEvents } from "~/events/EventManager";

export default class World01_Preloader extends Phaser.Scene {

    constructor() {
        super({key:'preloader'})
    }

    // This scene preloads all resources and launches the rest of scenes afterwards

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
        this.load.atlas('Skeleton', 'enemies/Skeleton_Spritesheet.png', 'enemies/Skeleton_Spritesheet.json');
        this.load.atlas('Slime', 'enemies/Slime_Spritesheet.png', 'enemies/Slime_Spritesheet.json');
        this.load.atlas('Lamia', 'enemies/Lamia_Spritesheet.png', 'enemies/Lamia_Spritesheet.json');
        this.load.atlas('Mindflayer', 'enemies/Mindflayer_Spritesheet.png', 'enemies/Mindflayer_Spritesheet.json');
        this.load.atlas('Troll', 'enemies/Troll_Spritesheet.png', 'enemies/Troll_Spritesheet.json');
        this.load.atlas('Ghost', 'enemies/Ghost_Spritesheet.png', 'enemies/Ghost_Spritesheet.json');
        this.load.atlas('Firebolt', 'items/Firebolt.png', 'items/Firebolt.json');
        this.load.image('tiles', 'tiles/stygia.png');
        this.load.image('Scroll', 'ui/Scroll.png');
        this.load.tilemapTiledJSON('map', 'dungeons/Mapa.json');

        this.load.image('heartFull', 'ui/heartFull.png');
        this.load.image('heartEmpty', 'ui/heartEmpty.png');
        this.load.image('knife', 'items/knife.png');
    }

    

    create() {
        this.scene.start('World01')
        this.scene.start("World01_UI");
    }

}