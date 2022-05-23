import Phaser from 'phaser';

const createSlimeAnims = (anims: Phaser.Animations.AnimationManager)=>{
    
    anims.create(
        {
            key: 'slime_idle',
            frames: anims.generateFrameNames('Slime', { prefix: 'Idle', end: 3, zeroPad: 4 }),
            frameRate: 12,
            repeat: -1
        }
    );
    anims.create(
        {
            key: 'slime_run',
            frames: anims.generateFrameNames('Slime', { prefix: 'Run', end: 7, zeroPad: 4 }),
            frameRate: 12,
            repeat: -1
        }
    );
    anims.create(
        {
            key: 'slime_attack',
            frames: anims.generateFrameNames('Slime', { prefix: 'Attack', end: 2, zeroPad: 4 }),
            frameRate: 12,
            repeat: 0
        }
    );
    anims.create(
        {
            key: 'slime_hurt',
            frames: anims.generateFrameNames('Slime', { prefix: 'Hurt', end: 2, zeroPad: 4 }),
            frameRate: 12,
            repeat: 0
        }
    );
    anims.create(
        {
            key: 'slime_death',
            frames: anims.generateFrameNames('Slime', { prefix: 'Death', end: 4, zeroPad: 4 }),
            frameRate: 12,
            repeat: 0
        }
    );

}

export{
    createSlimeAnims
}