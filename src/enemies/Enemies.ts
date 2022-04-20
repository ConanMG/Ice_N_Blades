import Phaser from "phaser";
import { Direction, Status } from "~/utils/Predet";

export abstract class Enemy extends Phaser.Physics.Arcade.Sprite {

    protected _hp!: number;
    protected _healthState!: Status;
    protected _speed!: number
    protected _direction!: Direction
    protected _stats!: Map<string, number>

    protected _target!: Phaser.GameObjects.Components.Transform;
    protected _aggro: boolean = false;
    protected _moveEvent!: Phaser.Time.TimerEvent
    protected _detectionRange!: number;

    protected _damageTime!: number;
    protected _gameOver!: boolean;

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string | number){
        super(scene, x, y, texture, frame);

    }

    setupStats(maxStr: number, maxDex: number, maxCon: number, maxInt: number, maxWis: number, maxCha: number){
        var minStat = 6;
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
            if(stat <= minStat)
                stat = minStat;
        })

        this._hp = 0.5 * (this._stats['con'] / 2);
        this._detectionRange = 15 + (this._stats['wis'] / 2);
        this._speed = 100 + (this._stats['dex'] * 2);
    }

    setTarget(target: Phaser.GameObjects.Components.Transform){
        this._target = target;
    }

    onHit() {

        if(this._healthState === Status.DAMAGED){
            return;
        }

        this._healthState = Status.DAMAGED;
        this._hp = this._hp-1

        if(this._hp <= 0){
            this._healthState = Status.DEAD;
        }
    }

    setAggro(){
        var xDistance = this.x - this._target!.x
        var yDistance = this.y - this._target!.y
        if(xDistance < this._detectionRange && xDistance > -this._detectionRange || yDistance < this._detectionRange && yDistance > -this._detectionRange) {
            this._aggro = true;
        }
        else {
            this._aggro = false;
        }
    }
}