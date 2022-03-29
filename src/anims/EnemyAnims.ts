import Phaser from 'phaser';

const createThiefAnims = (anims: Phaser.Animations.AnimationManager)=>{
    
    anims.create(
        {
            key: 'thiefIdle',
            frames: anims.generateFrameNames('Thief', { prefix: 'idle', end: 3, zeroPad: 4 }),
            frameRate: 5,
            repeat: -1
        }
    );
    anims.create(
        {
            key: 'thiefRun',
            frames: anims.generateFrameNames('Thief', { prefix: 'run', end: 5, zeroPad: 4 }),
            frameRate: 5,
            repeat: -1
        }
    );

}

export{
    createThiefAnims
}