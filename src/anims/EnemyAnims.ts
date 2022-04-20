import Phaser from 'phaser';

const createThiefAnims = (anims: Phaser.Animations.AnimationManager)=>{
    
    anims.create(
        {
            key: 'thief_idle',
            frames: anims.generateFrameNames('Thief', { prefix: 'Idle', end: 3, zeroPad: 4 }),
            frameRate: 10,
            repeat: -1
        }
    );
    anims.create(
        {
            key: 'thief_run',
            frames: anims.generateFrameNames('Thief', { prefix: 'Run', end: 7, zeroPad: 4 }),
            frameRate: 10,
            repeat: -1
        }
    );
    anims.create(
        {
            key: 'thief_hurt',
            frames: anims.generateFrameNames('Thief', { prefix: 'Hurt', end: 2, zeroPad: 4 }),
            frameRate: 5,
            repeat: 0
        }
    );
    anims.create(
        {
            key: 'thief_death',
            frames: anims.generateFrameNames('Thief', { prefix: 'Death', end: 4, zeroPad: 4 }),
            frameRate: 5,
            repeat: 0
        }
    );

}

export{
    createThiefAnims
}