import Phaser from 'phaser'

import World01 from './scenes/World01'
import Preloader_World01 from './scenes/World01_Preloader'
import World01_UI from './scenes/World01_UI'


const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	width: 900,
	height: 400,
	physics: {
		default: 'arcade',
		arcade: {
			fixedStep: false,
			debug: true
		}
	},
	scene: [Preloader_World01, World01, World01_UI],
	scale:{
		zoom: 1
	}
}

export default new Phaser.Game(config)
