import Phaser from 'phaser'

import World01 from './scenes/World01'
import Preloader_World01 from './scenes/World01_Preloader'
import World01_UI from './scenes/World01_UI'


const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	physics: {
		default: 'arcade',
		arcade: {
			fixedStep: false,
			debug: false
		}
	},
	scene: [Preloader_World01, World01, World01_UI],
	scale:{
        mode: Phaser.Scale.FIT,
        parent: 'phaser-example',
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 800,
        height: 600
	}
}

export default new Phaser.Game(config)
