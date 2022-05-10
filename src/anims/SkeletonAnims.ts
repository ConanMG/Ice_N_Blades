import Phaser from 'phaser';

const createSkeletonAnims = (anims: Phaser.Animations.AnimationManager)=>{
    
    anims.create(
        {
            key: 'skeleton_idle',
            frames: anims.generateFrameNames('Skeleton', { prefix: 'Idle', end: 4, zeroPad: 4 }),
            frameRate: 12,
            repeat: -1
        }
    );
    anims.create(
        {
            key: 'skeleton_walk',
            frames: anims.generateFrameNames('Skeleton', { prefix: 'Walk', end: 7, zeroPad: 4 }),
            frameRate: 12,
            repeat: -1
        }
    );
    anims.create(
        {
            key: 'skeleton_attack',
            frames: anims.generateFrameNames('Skeleton', { prefix: 'Attack', end: 4, zeroPad: 4 }),
            frameRate: 12,
            repeat: 0
        }
    );
    anims.create(
        {
            key: 'skeleton_hurt',
            frames: anims.generateFrameNames('Skeleton', { prefix: 'Hurt', end: 4, zeroPad: 4 }),
            frameRate: 12,
            repeat: 0
        }
    );
    anims.create(
        {
            key: 'skeleton_rise',
            frames: anims.generateFrameNames('Skeleton', { prefix: 'Revive', end: 4, zeroPad: 4 }),
            frameRate: 12,
            repeat: 0
        }
    );
    anims.create(
        {
            key: 'skeleton_death',
            frames: anims.generateFrameNames('Skeleton', { prefix: 'Death', end: 3, zeroPad: 4 }),
            frameRate: 12,
            repeat: 0
        }
    );

}

export{
    createSkeletonAnims
}