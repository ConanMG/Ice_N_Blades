import Phaser from 'phaser';

const createHydraAnims = (anims: Phaser.Animations.AnimationManager)=>{
    
    anims.create(
        {
            key: 'hydra_idle',
            frames: anims.generateFrameNames('Hydra', { prefix: 'Idle', end: 3, zeroPad: 4 }),
            frameRate: 12,
            repeat: -1
        }
    );
    anims.create(
        {
            key: 'hydra_run',
            frames: anims.generateFrameNames('Hydra', { prefix: 'Run', end: 7, zeroPad: 4 }),
            frameRate: 12,
            repeat: -1
        }
    );
    anims.create(
        {
            key: 'hydra_bite',
            frames: anims.generateFrameNames('Hydra', { prefix: 'Bite', end: 4, zeroPad: 4 }),
            frameRate: 12,
            repeat: 0
        }
    );
    anims.create(
        {
            key: 'hydra_hurt',
            frames: anims.generateFrameNames('Hydra', { prefix: 'Hurt', end: 2, zeroPad: 4 }),
            frameRate: 12,
            repeat: 0
        }
    );
    anims.create(
        {
            key: 'hydra_death',
            frames: anims.generateFrameNames('Hydra', { prefix: 'Death', end: 4, zeroPad: 4 }),
            frameRate: 12,
            repeat: 0
        }
    );

}

export{
    createHydraAnims
}