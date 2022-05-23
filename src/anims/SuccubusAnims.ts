import Phaser from 'phaser';

const createSuccubusAnims = (anims: Phaser.Animations.AnimationManager)=>{
    
    anims.create(
        {
            key: 'succubus_idle',
            frames: anims.generateFrameNames('Succubus', { prefix: 'Idle', end: 3, zeroPad: 4 }),
            frameRate: 12,
            repeat: -1
        }
    );
    anims.create(
        {
            key: 'succubus_run',
            frames: anims.generateFrameNames('Succubus', { prefix: 'Run', end: 7, zeroPad: 4 }),
            frameRate: 12,
            repeat: -1
        }
    );
    anims.create(
        {
            key: 'succubus_draining_kiss',
            frames: anims.generateFrameNames('Succubus', { prefix: 'DrainingKiss', end: 7, zeroPad: 4 }),
            frameRate: 12,
            repeat: 0
        }
    );
    anims.create(
        {
            key: 'succubus_charm',
            frames: anims.generateFrameNames('Succubus', { prefix: 'Charm', end: 7, zeroPad: 4 }),
            frameRate: 12,
            repeat: 0
        }
    );
    anims.create(
        {
            key: 'succubus_attack',
            frames: anims.generateFrameNames('Succubus', { prefix: 'Attack', end: 7, zeroPad: 4 }),
            frameRate: 12,
            repeat: 0
        }
    );
    anims.create(
        {
            key: 'succubus_hurt',
            frames: anims.generateFrameNames('Succubus', { prefix: 'Hurt', end: 2, zeroPad: 4 }),
            frameRate: 12,
            repeat: 0
        }
    );
    anims.create(
        {
            key: 'succubus_death',
            frames: anims.generateFrameNames('Succubus', { prefix: 'Death', end: 4, zeroPad: 4 }),
            frameRate: 12,
            repeat: 0
        }
    );

}

export{
    createSuccubusAnims
}