import Phaser from 'phaser'

import { createMainCharAnims } from '../anims/MainCharAnims';
import { createThiefAnims } from '../anims/EnemyAnims'
import { debugCollisions } from '../utils/debug'

import Thief from '../enemies/Thief'
import '../characters/Lilith';
import Lilith from '../characters/Lilith';
import { sceneEvents } from '~/events/EventManager';

export default class World01 extends Phaser.Scene
{
    private thiefLiliColl! : Phaser.Physics.Arcade.Collider
    private cursors! : Phaser.Types.Input.Keyboard.CursorKeys;
    
    private lilith! : Lilith;
    private knives! : Phaser.Physics.Arcade.Group
    private thieves! : Phaser.Physics.Arcade.Group

	constructor()
	{
		super({key:'World01'})
	}

    preload() {
        this.cursors=this.input.keyboard.createCursorKeys();
    }

    create() {

        this.scene.run('World01_UI')

        const { width, height } = this.scale

        //Animaciones

        createMainCharAnims(this.anims);
        createThiefAnims(this.anims);

        //Mapa

        var map=this.make.tilemap({key:'map'});
        var tileset=map.addTilesetImage('Tiles', 'tiles', 16, 16, 1, 2);

        const ground=map.createLayer('Ground', tileset);
        const walls=map.createLayer('Walls', tileset);

        walls.setCollisionByProperty({collide: true})

        //debugCollisions(walls, this)

        this.knives = this.physics.add.group({
            classType: Phaser.Physics.Arcade.Image
        })

        //Añadir los objetos al mapa y activar las colisiones de los mismos

        this.lilith = this.add.Lilith(48, 48, 'Lilith');
        this.lilith.setWeapon(this.knives)
        
        this.thieves = this.physics.add.group({
            classType: Thief,
            createCallback: (go)=>{
                const thief = go as Thief;
                thief.body.onCollide = true;
            }
        })
        this.thieves.get(this.scale.width*0.3, this.scale.height*0.3,'Thief').setTarget(this.lilith)

        this.physics.add.collider(this.lilith, walls);
        this.physics.add.collider(this.thieves, walls);
        this.physics.add.collider(this.knives, walls, this.onKnifeWallCollision, undefined, this)
        this.physics.add.collider(this.thieves, this.knives, this.onKnifeThiefCollision, undefined, this)
        this.thiefLiliColl = this.physics.add.collider(this.thieves, this.lilith, this.onThiefCollision, undefined, this);
        this.cameras.main.startFollow(this.lilith, true);

    }

    private onKnifeWallCollision(knife: Phaser.GameObjects.GameObject, wall: Phaser.GameObjects.GameObject){
        
        this.knives.killAndHide(knife);

        knife.destroy();
    }

    private onKnifeThiefCollision(thief: Phaser.GameObjects.GameObject, knife: Phaser.GameObjects.GameObject){
        this.knives.killAndHide(knife);
        this.thieves.killAndHide(thief);

        knife.destroy();
        thief.destroy();
    }

    private onThiefCollision(player:Phaser.GameObjects.GameObject, attacker:Phaser.GameObjects.GameObject){
        
        const enemy=attacker as Thief;

        const dx=this.lilith.x - enemy.x
        const dy=this.lilith.y - enemy.y

        const dir = new Phaser.Math.Vector2(dx,dy).normalize().scale(200);

        this.lilith.onHit(dir);
        sceneEvents.emit('player-took-damage', this.lilith.hp())

        if(this.lilith.hp()<=0){
            this.thiefLiliColl?.destroy();
        }

    }

    update() {

        if (this.lilith){
            this.lilith.update(this.cursors);
        }

    }
}
