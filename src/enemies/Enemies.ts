import Phaser from "phaser";
import { Character } from "~/characters/Character";
import { sceneEvents } from "~/events/EventManager";
import { Direction, Skills, Status } from "~/utils/Enums";

export abstract class Enemy extends Phaser.Physics.Arcade.Sprite {

    protected FULL_HP!: number;
    protected _hp!: number;
    protected _healthState!: Status;
    protected _speed!: number;
    protected _damage!: number;
    protected _ac!: number;
    protected _stats!: Map<Skills, number>;

    protected _xpDrop: number = 0;
    protected _target!: Phaser.GameObjects.Components.Transform;
    protected _aggro: boolean = false;
    protected _hitEvent!: Phaser.Time.TimerEvent;

    protected _justHit!: boolean;
    protected _damageTime!: number;
    protected _gameOver: boolean = false;

    healthState() {
        return this._healthState;
    }

    damage() {
        return this._damage;
    }

    setTarget(target: Phaser.GameObjects.Components.Transform) {
        this._target = target;
    }

    setAggro() {
        var character: Character = this._target as Character
            if(character.healthState() != Status.DEAD)
                this._aggro = true
            else
                this._aggro = false;
    }

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string | number) {
        super(scene, x, y, texture, frame);
    }

    /**
     * Makes the enemy start chasing it's target again
     */
    continueChase() {
        this._justHit = false;
    }

    /**
     * Sets the statistics of an enemy randomly between zero and the maximum number for each skill 
     */
    setupStats(maxStr: number, maxDex: number, maxCon: number, maxInt: number, maxWis: number, maxCha: number) {
        this._stats = new Map<Skills, number>([
            [Skills.STRENGTH, 0],
            [Skills.DEXTERITY, 0],
            [Skills.CONSTITUTION, 0],
            [Skills.INTELLIGENCE, 0],
            [Skills.WISDOM, 0],
            [Skills.CHARISMA, 0]
        ])

        this._stats.set(Skills.STRENGTH, Math.round(Math.random() * maxStr));
        this._stats.set(Skills.DEXTERITY, Math.round(Math.random() * maxDex));
        this._stats.set(Skills.CONSTITUTION, Math.round(Math.random() * maxCon));
        this._stats.set(Skills.INTELLIGENCE, Math.round(Math.random() * maxInt));
        this._stats.set(Skills.WISDOM, Math.round(Math.random() * maxWis));
        this._stats.set(Skills.CHARISMA, Math.round(Math.random() * maxCha));

        this._stats.forEach((value: number, key: Skills) => {
            this._xpDrop += 2 * value;
        })

        if (this._stats.get(Skills.STRENGTH)! > this._stats.get(Skills.DEXTERITY)!)
            this._damage = this._stats.get(Skills.STRENGTH)!;
        else
            this._damage = this._stats.get(Skills.DEXTERITY)!;

        this.FULL_HP = 1 * this._stats.get(Skills.CONSTITUTION)!;
        this._hp = this.FULL_HP;
        this._speed = 100 + (this._stats.get(Skills.DEXTERITY)! * 2);
    }

    /**
     * Manages the hit damage and changes the current status
     * @param damage Damage received
     */
    onHit(damage: number) {

        if (this._healthState === Status.DAMAGED) {
            return;
        }

        if (this._hp <= 0) {
            if (this._healthState != Status.DEAD && !this._gameOver) {
                sceneEvents.emit('enemy-killed', this._xpDrop);
                this._healthState = Status.DEAD;
            }
        }
        else{
            this._healthState = Status.DAMAGED;
            this._hp = this._hp - (damage - this._ac / 5);
        }
    }

    /**
     * Manages the collision with a character object
     */
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