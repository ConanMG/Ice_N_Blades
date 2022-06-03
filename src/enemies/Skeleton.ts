import Phaser from "phaser";
import { Character } from "~/characters/Character";
import { sceneEvents } from "~/events/EventManager";
import { Direction, Status } from "~/utils/Enums";
import { Enemy } from "./Enemies";

export default class Skeleton extends Enemy {

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: number | undefined) {
        super(scene, x, y, texture, frame);

        this.setupStats(10, 14, 15, 6, 8, 5);
        this._ac = 13;

        this.anims.play('skeleton_idle');
        this._healthState = Status.HEALTHY;

    }

    onPlayerCollision(dir: Phaser.Math.Vector2): void {
        this.anims.play('skeleton_attack')
        super.onPlayerCollision(dir)
    }

    preUpdate(time: number, delta: number) {
        super.preUpdate(time, delta);

        if (this._gameOver || this._justHit) {
            return; 
        }

        switch(this._healthState){

            case Status.HEALTHY:
                this.setAggro();
                if(this.body.velocity.x > 0 ){
                    this.anims.play('skeleton_walk', true)
                    this.flipX = false;
                }
                else if(this.body.velocity.x < 0){
                    this.anims.play('skeleton_walk', true)
                    this.flipX = true;
                }
                else{
                    this.anims.play('skeleton_idle', true)
                }
                this.setTint(0xffffff);
                this._damageTime = 0;
                break;
            case Status.DAMAGED:
                this.setVelocity(0)
                this.setTint(0xff0000);
                this.anims.play('skeleton_hurt', true);
                this.on('animationcomplete', ()=>{
                    this._healthState = Status.HEALTHY;
                })
                this.setAggro();
                break;
            case Status.DEAD:
                this.setAggro();
                this.setVelocity(0);
                this._gameOver = true;
                this.body.onCollide = false;
                this.anims.stop()
                this.anims.play('skeleton_death', true);

                this.once('animationcomplete', () => {
                    let probability = Math.random() * 100;
                    if (probability >= 80) {
                        this.anims.play('skeleton_rise', true)
                        this.once('animationcomplete', () => {
                                this.body.onCollide = true;
                                this._hp = this.FULL_HP;
                                this._healthState = Status.HEALTHY
                                this._gameOver = false;
                                sceneEvents.emit('enemy-revived')
                        })
                    }
                    else{
                        this.destroy();
                    }
                })
                break;
        }
    }

    update() {

        super.update()

        if(this._justHit || this._gameOver)
            return;

        if(this._aggro)
            this.scene.physics.moveToObject(this, this._target!, this._speed)
        else{
            this.setVelocity(0,0)
        }
    }

}