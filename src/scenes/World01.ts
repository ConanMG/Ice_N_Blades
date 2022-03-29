import Phaser from 'phaser'

import { createMainCharAnims } from '../anims/MainCharAnims';
import { createThiefAnims } from '../anims/EnemyAnims'
import { debugCollisions } from '../utils/debug';

import Thief from '../enemies/Thief'
import '../characters/Lilith';
import Lilith from '../characters/Lilith';

export default class World01 extends Phaser.Scene
{
    private cursors!:Phaser.Types.Input.Keyboard.CursorKeys;
    private lilith!:Lilith;

	constructor()
	{
		super({key:'World01'})
	}

    preload() {
        this.cursors=this.input.keyboard.createCursorKeys();
    }

    create() {

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

        debugCollisions(walls, this)


        //Añadir los objetos al mapa y activar las colisiones de los mismos

        this.lilith = this.add.Lilith(32, 32, 'Lilith');
        
        const thiefs = this.physics.add.group({
            classType: Thief,
            createCallback: (go)=>{
                const thief = go as Thief;
                thief.body.onCollide = true;
            }
        })
        thiefs.get(this.scale.width*0.3, this.scale.height*0.3,'Thief')

        this.physics.add.collider(this.lilith, walls);
        this.physics.add.collider(thiefs, walls);
        this.physics.add.collider(thiefs, this.lilith, this.onThiefCollision, undefined, this);
        this.cameras.main.startFollow(this.lilith, true);

    }

    private onThiefCollision(obj1:Phaser.GameObjects.GameObject, obj2:Phaser.GameObjects.GameObject){
        
        const enemy=obj2 as Thief;

        const dx=this.lilith.x - enemy.x
        const dy=this.lilith.y - enemy.y

        const dir = new Phaser.Math.Vector2(dx,dy).normalize().scale(200);

        this.lilith.onHit(dir);
    }

    update() {

        if (this.lilith){
            this.lilith.update(this.cursors);
        }

    }
}
