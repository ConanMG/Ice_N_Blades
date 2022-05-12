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
    protected _gameOver: boolean = false;

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string | number) {
        super(scene, x, y, texture, frame);


    }

    damage() {
        return this._damage;
    }

    setTarget(target: Phaser.GameObjects.Components.Transform) {
        this._target = target;
    }

    setAggro() {
        var xDistance = this.x - this._target!.x
        var yDistance = this.y - this._target!.y
        if (Math.abs(xDistance) < this._detectionRange || Math.abs(yDistance) < this._detectionRange) {
            this._aggro = true;
        }
        else {
            this._aggro = false;
        }
    }

    continueChase() {
        this._justHit = false;
    }

    setupStats(maxStr: number, maxDex: number, maxCon: number, maxInt: number, maxWis: number, maxCha: number) {
        this._stats = new Map<string, number>([
            ['str', 0],
            ['dex', 0],
            ['con', 0],
            ['int', 0],
            ['wis', 0],
            ['cha', 0]
        ])

        this._stats.set('str', Math.round(Math.random() * maxStr));
        this._stats.set('dex', Math.round(Math.random() * maxDex));
        this._stats.set('con', Math.round(Math.random() * maxCon));
        this._stats.set('int', Math.round(Math.random() * maxInt));
        this._stats.set('wis', Math.round(Math.random() * maxWis));
        this._stats.set('cha', Math.round(Math.random() * maxCha));

        this._stats.forEach((value: number, key: string) => {
            this._xpDrop += 2 * value;
        })

        if (this._stats.get('str')! > this._stats.get('dex')!)
            this._damage = this._stats.get('str')!;
        else
            this._damage = this._stats.get('dex')!;

        this.FULL_HP = 10 * this._stats.get('con')!;
        this._hp = this.FULL_HP;
        this._detectionRange = 100 + (this._stats.get('wis')! / 2);
        this._speed = 100 + (this._stats.get('dex')! * 2);
    }

    onHit(damage: number) {

        if (this._healthState === Status.DAMAGED) {
            return;
        }

        if (this._hp <= 0) {
            if (this._healthState != Status.DEAD) {
                sceneEvents.emit('enemy-killed', this._xpDrop);
                this._healthState = Status.DEAD;
            }
        }
        else{
            this._healthState = Status.DAMAGED;
            this._hp = this._hp - (damage - this._ac / 5);
        }
    }

    onPlayerCollision(dir: Phaser.Math.Vector2) {

        this._aggro = false;
        this._justHit = true;
        this.setVelocity(-dir.x, -dir.y);

        this._hitEvent = this.scene.time.addEvent({
            delay: 200,
            callback: () => {
                this.continueChase();
            },
            loop: false,
            repeatCount: 5
        })

    }
}