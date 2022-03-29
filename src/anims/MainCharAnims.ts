import Phaser from 'phaser';

const createMainCharAnims = (anims: Phaser.Animations.AnimationManager)=>{
    

    anims.create(
        {
            key: 'stand',
            frames: anims.generateFrameNames('Lilith', { prefix: 'idle', end: 3, zeroPad: 4 }),
            frameRate: 5,
            repeat: -1
        }
    );
    anims.create(
        {
            key: 'walkL',
            frames: anims.generateFrameNames('Lilith', { prefix: 'walkL', end: 7, zeroPad: 4 }),
            frameRate: 10,
            repeat: -1
        }
    );
    anims.create(
        {
            key: 'walkR',
            frames: anims.generateFrameNames('Lilith', { prefix: 'walkR', end: 7, zeroPad: 4 }),
            frameRate: 10,
            repeat: -1
        }
    );
    anims.create(
        {
            key: 'walkF',
            frames: anims.generateFrameNames('Lilith', { prefix: 'walkF', end: 7, zeroPad: 4 }),
            frameRate: 10,
            repeat: -1
        }
    );
    anims.create(
        {
            key: 'walkB',
            frames: anims.generateFrameNames('Lilith', { prefix: 'walkB', end: 7, zeroPad: 4 }),
            frameRate: 10,
            repeat: -1
        }
    );
}

export{
    createMainCharAnims
}