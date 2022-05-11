import Phaser from "phaser";
import { Character } from "~/characters/Character";
import { Direction, Status } from "~/utils/Predet";
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

        if (this._justHit) {
            return;
        }

        switch (this._healthState) {
            case Status.HEALTHY:
                this.setTint(0xffffff);
                this._damageTime = 0;
                break;
            case Status.DAMAGED:
                this.setVelocity(0)
                this.setTint(0xff0000);
                this.anims.play('skeleton_hurt', true);
                this.on('animationcomplete', () => {
                    this._healthState = Status.HEALTHY;
                    this.anims.play('skeleton_walk', true);
                })
                return;
            case Status.DEAD:
                this.setVelocity(0);
                this.anims.play('skeleton_death', true);
                this.on("animationcomplete", () => {
                    this._gameOver = true;
                });
                return;
        }

        if (this._target) {
            var character: Character = this._target as Character
            if (character.healthState() != Status.DEAD)
                this.setAggro()
            else
                this._aggro = false;
        }

    }

    update() {

        super.update()

        if (this._gameOver) {
            let probability = Math.random() * 100;
            if (probability >= 80) {
                console.log('rises');
                this._gameOver = false;
                this._hp = this.FULL_HP;
                this.anims.play('skeleton_rise')
            }
            else {
                this.destroy();
                return;
            }
        }

        if (this._gameOver || this._justHit) {
            return;
        }
        if (!this._aggro) {

        }
        else {
            this.scene.physics.moveToObject(this, this._target!, this._speed)
        }
    }

}