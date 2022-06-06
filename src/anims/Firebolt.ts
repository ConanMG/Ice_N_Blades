import Phaser from 'phaser';

const createFireboltAnims = (anims: Phaser.Animations.AnimationManager)=>{
    
    anims.create(
        {
            key: 'firebolt',
            frames: anims.generateFrameNames('Firebolt', { prefix: 'Firebolt', end: 3, zeroPad: 4 }),
            frameRate: 6,
            repeat: 0
        }
    );
}

export {
    createFireboltAnims
}