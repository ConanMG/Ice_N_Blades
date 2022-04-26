import Phaser from "phaser";
import { sceneEvents } from "~/events/EventManager";
import { Direction, Status } from "~/utils/Predet";

export abstract class Enemy extends Phaser.Physics.Arcade.Sprite {

    protected FULL_HP!: number;
    protected _hp!: number;
    protected _healthState!: Status;
    protected _speed!: number;
    protected _damage!: number;
    protected _detectionRange!: number;
    protected _ac!: number;
    protected _direction!: Direction;
    protected _stats!: Map<string, number>;
    
    protected _xpDrop: number = 0;
    protected _target!: Phaser.GameObjects.Components.Transform;
    protected _aggro: boolean = false;
    protected _hitEvent!: Phaser.Time.TimerEvent;

    protected _justHit!: boolean;
    protected _damageTime!: number;
    protected _gameOver!: boolean;

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string | number){
        super(scene, x, y, texture, frame);


    }

    damage() {
        return this._damage;
    }

    setTarget(target: Phaser.GameObjects.Components.Transform){
        this._target = target;
    }
    
    setAggro(){
        var xDistance = this.x - this._target!.x
        var yDistance = this.y - this._target!.y
        if(Math.abs(xDistance) < this._detectionRange || Math.abs(yDistance) < this._detectionRange) {
            this._aggro = true;
        }
        else {
            this._aggro = false;
        }
    }

    continueChase(){
        this._justHit = false;
    }

    setupStats(maxStr: number, maxDex: number, maxCon: number, maxInt: number, maxWis: number, maxCha: number){
        this._stats = new Map<string,number>([
            ['str', 0],
            ['dex', 0],
            ['con', 0],
            ['int', 0],
            ['wis', 0],
            ['cha', 0]
        ])

        this._stats['str'] = Math.random()*maxStr;
        this._stats['dex'] = Math.random()*maxDex;
        this._stats['con'] = Math.random()*maxCon;
        this._stats['int'] = Math.random()*maxInt;
        this._stats['wis'] = Math.random()*maxWis;
        this._stats['cha'] = Math.random()*maxCha;

        this._stats.forEach((stat) =>{
            let minStat = stat / 2;

            if(stat <= minStat)
                stat = minStat;
                
            this._xpDrop += 2 * stat;
        })

        if(this._stats['str'] > this._stats['dex'])
            this._damage = this._stats['str'];
        else
            this._damage = this._stats['dex'];
        
        this.FULL_HP = 10 * this._stats['con'];
        this._hp = this.FULL_HP;
        this._detectionRange = 15 + (this._stats['wis'] / 2);
        this._speed = 100 + (this._stats['dex'] * 2);
    }

    onHit(damage: number) {

        if(this._healthState === Status.DAMAGED){
            return;
        }

        this._healthState = Status.DAMAGED;
        this._hp = this._hp - (damage - (this._ac / 2));

        if(this._hp <= 0){
            sceneEvents.emit('enemy-killed', this._xpDrop);
            this._healthState = Status.DEAD;
        }
    }

    onPlayerCollision(dir: Phaser.Math.Vector2){

        this._aggro = false;
        this._justHit = true;
        this.setVelocity(-dir.x,-dir.y);

        this._hitEvent=this.scene.time.addEvent({
            delay:200,
            callback: ()=>{
                this.continueChase();
            },
            loop: false,
            repeatCount: 5
        })

    }
}