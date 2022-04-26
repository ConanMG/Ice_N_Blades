import Phaser from 'phaser';

const createMainCharAnims = (anims: Phaser.Animations.AnimationManager)=>{
    

    anims.create(
        {
            key: 'idle',
            frames: anims.generateFrameNames('Lilith', { prefix: 'Idle', end: 3, zeroPad: 4 }),
            frameRate: 6,
            repeat: -1
        }
    );
    anims.create(
        {
            key: 'left',
            frames: anims.generateFrameNames('Lilith', { prefix: 'Left', end: 7, zeroPad: 4 }),
            frameRate: 12,
            repeat: -1
        }
    );
    anims.create(
        {
            key: 'right',
            frames: anims.generateFrameNames('Lilith', { prefix: 'Right', end: 7, zeroPad: 4 }),
            frameRate: 12,
            repeat: -1
        }
    );
    anims.create(
        {
            key: 'up',
            frames: anims.generateFrameNames('Lilith', { prefix: 'Up', end: 8, zeroPad: 4 }),
            frameRate: 12,
            repeat: -1
        }
    );
    anims.create(
        {
            key: 'down',
            frames: anims.generateFrameNames('Lilith', { prefix: 'Down', end: 7, zeroPad: 4 }),
            frameRate: 12,
            repeat: -1
        }
    );
    anims.create(
        {
            key: 'hurt',
            frames: anims.generateFrameNames('Lilith', { prefix: 'Hurt', end: 3, zeroPad: 4 }),
            frameRate: 6,
            repeat: 0
        }
    );
    anims.create(
        {
            key: 'death',
            frames: anims.generateFrameNames('Lilith', { prefix: 'Death', end: 6, zeroPad: 4 }),
            frameRate: 12,
            repeat: 0
        }
    );
}

export{
    createMainCharAnims
}