import Phaser from 'phaser';

const createMindflayerAnims = (anims: Phaser.Animations.AnimationManager)=>{
    
    anims.create(
        {
            key: 'mindflayer_idle',
            frames: anims.generateFrameNames('Mindflayer', { prefix: 'Idle', end: 3, zeroPad: 4 }),
            frameRate: 12,
            repeat: -1
        }
    );
    anims.create(
        {
            key: 'mindflayer_run',
            frames: anims.generateFrameNames('Mindflayer', { prefix: 'Run', end: 7, zeroPad: 4 }),
            frameRate: 12,
            repeat: -1
        }
    );
    anims.create(
        {
            key: 'mindflayer_attack',
            frames: anims.generateFrameNames('Mindflayer', { prefix: 'Attack', end: 2, zeroPad: 4 }),
            frameRate: 12,
            repeat: 0
        }
    );
    anims.create(
        {
            key: 'mindflayer_psychic_beam',
            frames: anims.generateFrameNames('Mindflayer', { prefix: 'PhsychicBeam', end: 2, zeroPad: 4 }),
            frameRate: 12,
            repeat: 0
        }
    );
    anims.create(
        {
            key: 'mindflayer_hurt',
            frames: anims.generateFrameNames('Mindflayer', { prefix: 'Hurt', end: 2, zeroPad: 4 }),
            frameRate: 12,
            repeat: 0
        }
    );
    anims.create(
        {
            key: 'mindflayer_death',
            frames: anims.generateFrameNames('Mindflayer', { prefix: 'Death', end: 4, zeroPad: 4 }),
            frameRate: 12,
            repeat: 0
        }
    );

}

export{
    createMindflayerAnims as createThiefAnims
}