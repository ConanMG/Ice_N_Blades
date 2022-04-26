import Phaser from 'phaser';

const createSkeletonAnims = (anims: Phaser.Animations.AnimationManager)=>{
    
    anims.create(
        {
            key: 'skeleton_idle',
            frames: anims.generateFrameNames('Skeleton', { prefix: 'Idle', end: 3, zeroPad: 4 }),
            frameRate: 12,
            repeat: -1
        }
    );
    anims.create(
        {
            key: 'skeleton_run',
            frames: anims.generateFrameNames('Skeleton', { prefix: 'Run', end: 7, zeroPad: 4 }),
            frameRate: 12,
            repeat: -1
        }
    );
    anims.create(
        {
            key: 'skeleton_attack',
            frames: anims.generateFrameNames('Skeleton', { prefix: 'Attack', end: 2, zeroPad: 4 }),
            frameRate: 12,
            repeat: 0
        }
    );
    anims.create(
        {
            key: 'skeleton_hurt',
            frames: anims.generateFrameNames('Skeleton', { prefix: 'Hurt', end: 2, zeroPad: 4 }),
            frameRate: 12,
            repeat: 0
        }
    );
    anims.create(
        {
            key: 'skeleton_death',
            frames: anims.generateFrameNames('Skeleton', { prefix: 'Death', end: 4, zeroPad: 4 }),
            frameRate: 12,
            repeat: 0
        }
    );

}

export{
    createSkeletonAnims
}