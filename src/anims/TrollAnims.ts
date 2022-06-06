import Phaser from 'phaser';

const createTrollAnims = (anims: Phaser.Animations.AnimationManager)=>{
    
    anims.create(
        {
            key: 'troll_idle',
            frames: anims.generateFrameNames('Troll', { prefix: 'Idle', end: 4, zeroPad: 4 }),
            frameRate: 6,
            repeat: -1
        }
    );
    anims.create(
        {
            key: 'troll_move',
            frames: anims.generateFrameNames('Troll', { prefix: 'Move', end: 3, zeroPad: 4 }),
            frameRate: 6,
            repeat: -1
        }
    );
    anims.create(
        {
            key: 'troll_attack',
            frames: anims.generateFrameNames('Troll', { prefix: 'Attack', end: 2, zeroPad: 4 }),
            frameRate: 8,
            repeat: 0
        }
    );
    anims.create(
        {
            key: 'troll_hurt',
            frames: anims.generateFrameNames('Troll', { prefix: 'Hurt', end: 2, zeroPad: 4 }),
            frameRate: 8,
            repeat: 0
        }
    );
    anims.create(
        {
            key: 'troll_death',
            frames: anims.generateFrameNames('Troll', { prefix: 'Death', end: 7, zeroPad: 4 }),
            frameRate: 12,
            repeat: 0
        }
    );

}

export{
    createTrollAnims
}