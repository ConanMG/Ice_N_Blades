import Phaser from "phaser";
import IBoss from "~/interfaces/IBoss";
import { Direction, Skills, Status } from "~/utils/Enums";
import { Enemy } from "./Enemies";

export default class Troll extends Enemy implements IBoss{
    
    //Troll's unique ability allows them to heal every 6 seconds and gain statistics each time they receive damage

    private regenEvent: Phaser.Time.TimerEvent;

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: number | undefined){
        super(scene, x, y, texture, frame);
        this.setupStats(20, 0, 20, 2, 10, 7);
        this._ac = 16

        this.regenEvent = scene.time.addEvent({
            delay:6000,
            callback: () => {
                if(this._hp < this.FULL_HP)
                    this._hp += Math.round(Math.random() * (this.FULL_HP - this._hp))
            },
            loop: true
        });

        this.FULL_HP = this._stats.get(Skills.CONSTITUTION)! + 50 + (Enemy.difficulty * 5);
        this._healthState = Status.HEALTHY;
        this.setScale(1.2);
    }
    
    activateBossSkill() {
        throw new Error("Method not implemented.");
    }

    onHit(damage: number): void {
        super.onHit(damage);
        this._stats['str'] += 10;
        this._stats['dex'] += 10;
    }

    onPlayerCollision(dir: Phaser.Math.Vector2): void {
        this.anims.play('troll_attack')
        super.onPlayerCollision(dir)
    }

    preUpdate(time: number, delta: number){
        super.preUpdate(time, delta);

        if (this._gameOver || this._justHit) {
            return; 
        }

        switch(this._healthState){

            case Status.HEALTHY:
                this.setAggro();
                if(this.body.velocity.x > 0 ){
                    this.anims.play('troll_move', true)
                    this.flipX = false;
                }
                else if(this.body.velocity.x < 0){
                    this.anims.play('troll_move', true)
                    this.flipX = true;
                }
                else{
                    this.anims.play('troll_idle', true)
                }
                this.setTint(0xffffff);
                this._damageTime = 0;
                break;
            case Status.DAMAGED:
                this.setVelocity(0)
                this.setTint(0xff0000);
                this.anims.play('troll_hurt', true);
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
                this.anims.play('troll_death', true);
                this.once('animationcomplete', () => {
                        this.destroy();
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