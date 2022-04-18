import Phaser from 'phaser'

import World01 from './scenes/World01'
import Preloader_World01 from './scenes/World01_Preloader'
import World01_UI from './scenes/World01_UI'


const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	physics: {
		default: 'arcade',
		arcade: {
			debug:false
		}
	},
	scene: [Preloader_World01, World01, World01_UI],
	scale:{
		zoom:2.5
	}
}

export default new Phaser.Game(config)
