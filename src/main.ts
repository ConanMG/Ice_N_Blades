import Phaser from 'phaser'

import World01 from './scenes/World01'
import Preloader_World01 from './scenes/World01_Preloader'


const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	physics: {
		default: 'arcade',
		arcade: {
		}
	},
	scene: [Preloader_World01, World01],
	scale:{
		zoom:1.5
	}
}

export default new Phaser.Game(config)
