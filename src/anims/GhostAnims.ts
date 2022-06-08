import Phaser from 'phaser';

const createGhostAnims = (anims: Phaser.Animations.AnimationManager)=>{
    
    anims.create(
        {
            key: 'ghost_idle',
            frames: anims.generateFrameNames('Ghost', { prefix: 'Idle', end: 4, zeroPad: 4 }),
            frameRate: 6,
            repeat: -1
        }
    );
    anims.create(
        {
            key: 'ghost_move',
            frames: anims.generateFrameNames('Ghost', { prefix: 'Move', end: 3, zeroPad: 4 }),
            frameRate: 12,
            repeat: -1
        }
    );
    anims.create(
        {
            key: 'ghost_hurt',
            frames: anims.generateFrameNames('Ghost', { prefix: 'Hurt', end: 2, zeroPad: 4 }),
            frameRate: 12,
            repeat: 0
        }
    );
    anims.create(
        {
            key: 'ghost_death',
            frames: anims.generateFrameNames('Ghost', { prefix: 'Death', end: 5, zeroPad: 4 }),
            frameRate: 12,
            repeat: 0
        }
    );

}

export{
    createGhostAnims
}