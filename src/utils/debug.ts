import Phaser from "phaser";

const debugCollisions=(map:Phaser.Tilemaps.TilemapLayer, scene:Phaser.Scene)=>{

    const debugGraphics= scene.add.graphics().setAlpha(0.7);
    map.renderDebug(debugGraphics, {
        tileColor: null,
        collidingTileColor: new Phaser.Display.Color(243, 234, 48, 75),
        faceColor: new Phaser.Display.Color(40, 39, 37, 255)
    })

}

export{
    debugCollisions
}