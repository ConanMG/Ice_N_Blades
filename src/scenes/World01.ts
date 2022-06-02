import Phaser from "phaser";

import { createMainCharAnims } from "../anims/LilithAnims";
import { createThiefAnims } from "../anims/ThiefAnims";
import { debugCollisions } from "../utils/debug";

import Thief from "../enemies/Thief";
import "../characters/Lilith";
import Lilith from "../characters/Lilith";
import { sceneEvents } from "~/events/EventManager";
import { HealthBar } from "~/utils/Healthbar";
import { Enemy } from "~/enemies/Enemies";
import Skeleton from "~/enemies/Skeleton";
import { createSkeletonAnims } from "~/anims/SkeletonAnims";
import { Status } from "~/utils/Predet";
import Slime from "~/enemies/Slime";
import { createSlimeAnims } from "~/anims/SlimeAnims";
import { createLamiaAnims } from "~/anims/LamiaAnims";
import Lamia from "~/enemies/Lamia";

export default class World01 extends Phaser.Scene {
    private characterCollisions: Array<Phaser.Physics.Arcade.Collider> = new Array<Phaser.Physics.Arcade.Collider>()
    private thiefLiliColl!: Phaser.Physics.Arcade.Collider;
    private skeletonLiliColl!: Phaser.Physics.Arcade.Collider;
    private slimeLiliColl!: Phaser.Physics.Arcade.Collider;
    private lamiaLiliColl!: Phaser.Physics.Arcade.Collider;
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;

    private character!: Lilith;
    private knives!: Phaser.Physics.Arcade.Group;
    private thieves!: Phaser.Physics.Arcade.Group;
    private skeletons!: Phaser.Physics.Arcade.Group;
    private slimes!: Phaser.Physics.Arcade.Group;
    private lamias!: Phaser.Physics.Arcade.Group;

    private enemySpawner!: Phaser.Time.TimerEvent;
    private waveLength: number = 10;
    private enemiesLeft: number = 0;
    private nextWave: Boolean = true;
    private waveOngoing: boolean = false;
    private _dodgeActive: boolean = false;

    constructor() {
        super({ key: "World01" });
    }

    preload() {
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    create() {
        this.scene.run("World01_UI");

        const { width, height } = this.scale;
    
        //Animaciones

        createMainCharAnims(this.anims);
        createThiefAnims(this.anims);
        createSkeletonAnims(this.anims);
        createSlimeAnims(this.anims);
        createLamiaAnims(this.anims);

        //Mapa

        var map = this.make.tilemap({ key: "map" });
        var tileset = map.addTilesetImage("stygia", "tiles", 16, 16, 0, 0);

        const ground = map.createLayer("Ground", tileset);
        const walls = map.createLayer("Walls", tileset);
        this.physics.world.setBounds(105, 115, 1154, 1140, true, true, true, true);
        walls.setCollisionByProperty({ collide: true });

        //Añadir personaje y armas al mapa

        this.knives = this.physics.add.group({
            classType: Phaser.Physics.Arcade.Image,
        });

        this.character = this.add.Lilith(width/2, height/2, "Lilith");
        this.character.setWeapon(this.knives);
        this.physics.world.wrap(this.character);

        sceneEvents.on(
            "enemy-killed",
            (xpAmount: number) => {
                console.log(xpAmount)
                this.character.setXp(xpAmount);
            },
            this
        );

        //Crear los grupos de enemigos

        this.thieves = this.physics.add.group({
            classType: Thief,
            createCallback: (go) => {
                const thief = go as Thief;
                thief.body.onCollide = true;
            },
        });

        this.skeletons = this.physics.add.group({
            classType: Skeleton,
            createCallback: (go) => {
                const skeleton = go as Skeleton;
                skeleton.body.onCollide = true;
            },
        });

        this.slimes = this.physics.add.group({
            classType: Slime,
            createCallback: (go) => {
                const slime = go as Slime;
                slime.body.onCollide = true;
            },
        });

        this.lamias = this.physics.add.group({
            classType: Lamia,
            createCallback: (go) => {
                const lamia = go as Lamia;
                lamia.body.onCollide = true;
            },
        });

        // Programación de la generación de enemigos

        this.input.keyboard.on('keydown-' + 'ENTER', () => {

            if (!this.waveOngoing) {
                console.log("registered event")
                sceneEvents.emit('wave-started', this.waveLength)
                this.waveOngoing = true;

                this.enemySpawner = this.time.addEvent({
                    delay: 1000,
                    callback: () => {
                        var rand = Math.round(Math.random() * 3);
                        console.log(rand);
                        switch (rand) {
                            case 1:
                                this.thieves
                                    .get(
                                        (1154) * Math.random() + 105,
                                        (1140) * Math.random() + 115,
                                        "Thief"
                                    )
                                    .setTarget(this.character);
                                console.log('spawned Thief');
                                break;
                            case 0:
                                this.skeletons
                                    .get(
                                        (1154 * Math.random()) + 105,
                                        (1140 * Math.random()) + 115,
                                        "Skeleton"
                                    )
                                    .setTarget(this.character);
                                console.log('spawned Skeleton');
                                break;
                            case 2:
                                this.slimes
                                    .get(
                                        (1154 * Math.random()) + 105,
                                        (1140 * Math.random()) + 115,
                                        "Slime"
                                    )
                                    .setTarget(this.character)
                                console.log('spawned Slime');
                                break;
                            case 3:
                                this.lamias
                                    .get(
                                        (1154 * Math.random()) + 105,
                                        (1140 * Math.random()) + 115,
                                        "Lamia"
                                    )
                                    .setTarget(this.character)
                                console.log('spawned Lamia');
                                break;
                            case 4:
                                break;
                            default:
                                break;
                        }
                        this.enemiesLeft++;
                    },
                    repeat: this.waveLength - 1
                });

                this.waveLength *= 2;
            }
        });

        sceneEvents.emit('wave-ended')

        sceneEvents.on('player-died', () => {
            if (this.character.healthState() === Status.DEAD)
                return;
            this.thiefLiliColl.destroy()
        })

        sceneEvents.on('wave-ended', () => {
            this.waveOngoing = false;
        })

        // Adición de físicas y colisiones

        this.physics.add.collider(this.character, walls);
        this.physics.add.collider(this.thieves, walls);
        this.physics.add.collider(this.skeletons, walls);
        this.physics.add.collider(this.slimes, walls);
        this.physics.add.collider(this.lamias, walls);

        this.physics.add.collider(
            this.knives,
            walls,
            this.onKnifeWallCollision,
            undefined,
            this
        );
        this.physics.add.collider(
            this.thieves,
            this.knives,
            this.onKnifeEnemyCollision,
            undefined,
            this
        );
        this.physics.add.collider(
            this.skeletons,
            this.knives,
            this.onKnifeEnemyCollision,
            undefined,
            this
        );
        this.physics.add.collider(
            this.slimes,
            this.knives,
            this.onKnifeEnemyCollision,
            undefined,
            this
        );
        this.physics.add.collider(
            this.lamias,
            this.knives,
            this.onKnifeEnemyCollision,
            undefined,
            this
        );

        this.thiefLiliColl = this.physics.add.collider(
            this.thieves,
            this.character,
            this.onEnemyHit,
            undefined,
            this
        );
        this.skeletonLiliColl = this.physics.add.collider(
            this.skeletons,
            this.character,
            this.onEnemyHit,
            undefined,
            this
        );
        this.slimeLiliColl = this.physics.add.collider(
            this.slimes,
            this.character,
            this.onEnemyHit,
            undefined,
            this
        );
        this.lamiaLiliColl = this.physics.add.collider(
            this.lamias,
            this.character,
            this.onEnemyHit,
            undefined,
            this
        );

        this.characterCollisions.push(this.thiefLiliColl);
        this.characterCollisions.push(this.skeletonLiliColl);
        this.characterCollisions.push(this.slimeLiliColl);
        this.characterCollisions.push(this.lamiaLiliColl);

        var mistyStep = this.input.keyboard.on('keydown-SHIFT', ()=>{
            var lilith = this.character as Lilith
            if (lilith.healthState() === Status.DEAD)
                return
            lilith.mistyStep(lilith.lastDirection(), this.physics.world);
        });

        // Manejo de la cámara
        this.cameras.main.startFollow(this.character, true, 1, 1);
        this.cameras.main.centerOn(this.character.x, this.character.y);
        this.cameras.main.zoom = 3;
    }

    private onKnifeWallCollision(
        knife: Phaser.GameObjects.GameObject,
        wall: Phaser.GameObjects.GameObject
    ) {
        this.knives.killAndHide(knife);

        knife.destroy();
    }

    private onKnifeEnemyCollision(
        obj1: Phaser.GameObjects.GameObject,
        knife: Phaser.GameObjects.GameObject
    ) {
        var enemy = obj1 as Enemy;
        this.knives.killAndHide(knife);

        enemy.onHit(this.character.damage());

        knife.destroy();
    }

    private onEnemyHit(
        player: Phaser.GameObjects.GameObject,
        attacker: Phaser.GameObjects.GameObject
    ) {
        if(this._dodgeActive)
            return
        
        const enemy = attacker as Enemy;

        const dx = this.character.x - enemy.x;
        const dy = this.character.y - enemy.y;

        const dir = new Phaser.Math.Vector2(dx, dy).normalize().scale(200);

        enemy.onPlayerCollision(dir);
        this.character.onHit(dir, enemy.damage());
        sceneEvents.emit("player-took-damage", this.character.hp());

        if (this.character.hp() <= 0 && this.character.healthState() != Status.DEAD) {
            sceneEvents.emit("player-died");
        }
    }

    update() {

        this._dodgeActive = (this.character as Lilith).mistyStepPlaying;

        if(this.character.healthState() != Status.DEAD){
            if(this._dodgeActive){
                this.character.body.enable = false
            }
            else{
                this.character.body.enable = true
            }
        }

        if (this.enemiesLeft === 0) {
            sceneEvents.emit('wave_ended')
        }

        if (this.character) {
            this.character.update(this.cursors);
        }

        if (this.thieves.children) {
            this.thieves.getChildren().forEach((thief) => {
                thief.update();
            });
        }

        if (this.skeletons.children) {
            this.skeletons.getChildren().forEach((skeleton) => {
                skeleton.update();
            });
        }

        if (this.slimes.children) {
            this.slimes.getChildren().forEach((slime) => {
                slime.update();
            });
        }

        if (this.lamias.children) {
            this.lamias.getChildren().forEach((lamia) => {
                lamia.update();
            });
        }
    }
}
