import Phaser from 'phaser';

const createLamiaAnims = (anims: Phaser.Animations.AnimationManager)=>{
    
    anims.create(
        {
            key: 'lamia_idle',
            frames: anims.generateFrameNames('Lamia', { prefix: 'Idle', end: 4, zeroPad: 4 }),
            frameRate: 12,
            repeat: -1
        }
    );
    anims.create(
        {
            key: 'lamia_move',
            frames: anims.generateFrameNames('Lamia', { prefix: 'Move', end: 4, zeroPad: 4 }),
            frameRate: 12,
            repeat: -1
        }
    );
    anims.create(
        {
            key: 'lamia_attack',
            frames: anims.generateFrameNames('Lamia', { prefix: 'Attack', end: 3, zeroPad: 4 }),
            frameRate: 12,
            repeat: 0
        }
    );
    anims.create(
        {
            key: 'lamia_hurt',
            frames: anims.generateFrameNames('Lamia', { prefix: 'Hurt', end: 3, zeroPad: 4 }),
            frameRate: 12,
            repeat: 0
        }
    );
    anims.create(
        {
            key: 'lamia_death',
            frames: anims.generateFrameNames('Lamia', { prefix: 'Death', end: 9, zeroPad: 4 }),
            frameRate: 12,
            repeat: 0
        }
    );

}

export{
    createLamiaAnims
}