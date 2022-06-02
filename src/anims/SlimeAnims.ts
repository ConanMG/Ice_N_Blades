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
            key: 'slime_move',
            frames: anims.generateFrameNames('Slime', { prefix: 'Move', end: 10, zeroPad: 4 }),
            frameRate: 12,
            repeat: -1
        }
    );
    anims.create(
        {
            key: 'slime_attack',
            frames: anims.generateFrameNames('Slime', { prefix: 'Attack', end: 3, zeroPad: 4 }),
            frameRate: 12,
            repeat: 0
        }
    );
    anims.create(
        {
            key: 'slime_hurt',
            frames: anims.generateFrameNames('Slime', { prefix: 'Hurt', end: 5, zeroPad: 4 }),
            frameRate: 12,
            repeat: 0
        }
    );
    anims.create(
        {
            key: 'slime_death',
            frames: anims.generateFrameNames('Slime', { prefix: 'Death', end: 6, zeroPad: 4 }),
            frameRate: 12,
            repeat: 0
        }
    );

}

export{
    createSlimeAnims
}