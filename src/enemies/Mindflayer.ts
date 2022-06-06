import Phaser from "phaser";
import { sceneEvents } from "~/events/EventManager";
import ICaster from "~/interfaces/ICaster";
import { Status } from "~/utils/Enums";
import { Enemy } from "./Enemies";

export default class Mindflayer extends Enemy implements ICaster{

    cooldown: number;
    spells: Array<string>;
    cooldownTimer!: Phaser.Time.TimerEvent;

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: number | undefined){
        super(scene, x, y, texture, frame);
        
        this.setupStats(11, 12, 12, 19, 17, 17);
        this._ac = 15;
        this.cooldown = 12 - (this._stats['int'] / 4);

        this.spells = new Array<string>();
        this.spells.push('Extract Brain');
        this.spells.push('Mind Blast');

        this._healthState = Status.HEALTHY;
    }

    castSpell(spellKey: string) {

        //TODO
        throw new Error('Method not implemented.');

        switch(spellKey){
            case 'Extract Brain':
                this.anims.play('mindflayer_extract_brain', true);
                this.on('animationcomplete', ()=>{
                    sceneEvents.emit('player')
                })
                this.cooldown = 20;
                this.cooldownTimer = this.scene.time.addEvent({
                    delay:1000,
                    callback: () => {
                        this.cooldown--;
                    },
                    loop: this.cooldown!=0
                })
                break;
            case 'Mind Blast':
                var AoE = new Phaser.GameObjects.Zone(this.scene, this.x, this.y, 60, 60);
                AoE.setCircleDropZone(30).setVisible(true)
                this.cooldown = 20;
                this.cooldownTimer = this.scene.time.addEvent({
                    delay:1000,
                    callback: () => {
                        this.cooldown--;
                    },
                    loop: this.cooldown!=0
                })
                break;
            default:
                console.log('ERROR. No spell key')
                break;
        }
    }

    onPlayerCollision(dir: Phaser.Math.Vector2): void {
        this.anims.play('mindflayer_attack')
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
                    this.anims.play('mindflayer_move', true)
                    this.flipX = false;
                }
                else if(this.body.velocity.x < 0){
                    this.anims.play('mindflayer_move', true)
                    this.flipX = true;
                }
                else{
                    this.anims.play('mindflayer_idle', true)
                }
                this.setTint(0xffffff);
                this._damageTime = 0;
                break;
            case Status.DAMAGED:
                this.setVelocity(0)
                this.setTint(0xff0000);
                this.anims.play('mindflayer_hurt', true);
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
                this.anims.play('mindflayer_death', true);
                this.once('animationcomplete', () => {
                        this.destroy();
                })
                break;
        }
    }

    update() {

        super.update()

        if(this._justHit || this._gameOver || this.anims.currentAnim === this.anims.get('mindflayer_attack'))
            return;

        if(this._aggro)
            this.scene.physics.moveToObject(this, this._target!, this._speed)
        else{
            this.setVelocity(0,0)
        }
    }


}