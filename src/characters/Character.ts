import Phaser, { Time } from "phaser";
import { sceneEvents } from "~/events/EventManager";
import { HealthBar } from "~/utils/Healthbar";
import { Direction, Status, Ailments } from "~/utils/Enums";

export abstract class Character extends Phaser.Physics.Arcade.Sprite {

    protected NEXT_LEVEL_XP = 1000
    protected _MAX_HP!: number;
    protected _hp!: number;
    protected _speed: any;
    protected _healthState!: Status;
    protected _statusAilments!: Ailments;
    private _inmune: boolean = false;
    protected _skills!: Map<string, number>
    protected _cooldowns!: Map<string, number>
    protected _ac!: number;
    protected _gameOver!: boolean;
    protected _damage!: number;

    protected _weapon!: Phaser.Physics.Arcade.Group

    protected _xp: number = 0;
    protected _lvl: number = 1;
    protected _skillPoints!: number;

    protected _damageTime: number = 0;
    protected _lastDirection!: Direction;
    protected _healthBar!: HealthBar;
    protected _poisonEvent!: Phaser.Time.TimerEvent;

    public hp() {
        return this._hp;
    }
    public setHp(hp: number) {
        this._hp = hp;
    }
    public MAX_HP() {
        return this._MAX_HP;
    }
    public damage() {
        return this._damage;
    }
    public healthState() {
        return this._healthState;
    }
    public setHealthState(healthState: Status) {
        this._healthState = healthState;
    }
    public getSkill(skill: string) {
        return this._skills[skill];
    }
    public ac() {
        return this._ac;
    }
    public setAc(ac: number) {
        this._ac = ac;
    }
    public weapon() {
        return this._weapon;
    }
    public setWeapon(knives: Phaser.Physics.Arcade.Group) {
        this._weapon = knives
    }
    public lvl() {
        return this._lvl;
    }
    public setLvl(lvl: number) {
        this._lvl = lvl;
    }
    public xp() {
        return this._xp;
    }
    public setXp(xp: number) {
        this._xp = this._xp + xp;
    }
    public skillPoints() {
        return this._skillPoints;
    }
    public setSkillPoints(skillPoints: number) {
        this._skillPoints = skillPoints;
    }
    public lastDirection(){
        return this._lastDirection;
    }
    public statusAilment(){
        return this._statusAilments;
    }
    public setStatusAilment(ailment: Ailments){
        this._statusAilments = ailment
    }
    public poisonEvent(){
        return this._poisonEvent;
    }

    checkXp() {
        if (this._xp >= this.NEXT_LEVEL_XP)
            this.levelUp()
    }

    lowerSkill(skill: string) {
        switch (skill) {
            case 'str':
                this._skills['str']--
                this._skillPoints++
                break;
            case 'dex':
                this._skills['dex']--
                this._skillPoints++
                break;
            case 'con':
                this._skills['con']--
                this._hp -= 100 * this._lvl
                this._skillPoints++
                break;
            case 'int':
                this._skills['int']--
                this._skillPoints++
                break;
            case 'wis':
                this._skills['wis']--
                this._skillPoints++
                break;
            case 'cha':
                this._skills['cha']--
                this._skillPoints++
                break;
            default:
                break;
        }
    }

    raiseSkill(skill: string) {
        switch (skill) {
            case 'str':
                this._skills['str']++;
                this._skillPoints--;
                this.calculateDamageSpeed();
                break;
            case 'dex':
                this._skills['dex']++;
                this._skillPoints--;
                this._speed = this._skills['dex'] + 100;
                this.calculateDamageSpeed();
                break;
            case 'con':
                this._skills['con']++;
                this._skillPoints--;
                this._MAX_HP = this._skills['con'] * 10;
                this._healthBar.expandHealth(this._MAX_HP);
                break;
            case 'int':
                this._skills['int']++;
                this._skillPoints--;
                break;
            case 'wis':
                this._skills['wis']++;
                this._skillPoints--;
                break;
            case 'cha':
                this._skills['cha']++;
                this._skillPoints--;
                break;
            default:
                break;
        }
    }

    levelUp() {
        console.log("LEVEL UP!!!")

        sceneEvents.emit('player-leveled-up')
        console.log(this._lvl)

        this.NEXT_LEVEL_XP += 10 * this._lvl;
        this._xp = 0;
        this._MAX_HP += 1 * this._skills['con'];
        this._hp = this._MAX_HP;

        this._healthBar.expandHealth(this._MAX_HP);
        this._lvl += 1;
        this._skillPoints += 2;
    }

    onHit(damage: number, dir?: Phaser.Math.Vector2) {
        if (this._healthState != Status.HEALTHY) {
            return;
        }

        if(dir){
            this.setVelocity(dir.x, dir.y);
        }
        this.setTint(0xff0000);
        this._healthState = Status.DAMAGED;
        this._damageTime = 0;
        this._hp = this._hp - damage / (this._ac / 4);
        this.body.onCollide = false

        this._healthBar.draw(this.x - 12.5, this.y - 15, this._hp)
    }

    setupSkills(str: number, dex: number, con: number, int: number, wis: number, cha: number) {
        this._skills = new Map<string, number>([
            ['str', 0],
            ['dex', 0],
            ['con', 0],
            ['int', 0],
            ['wis', 0],
            ['cha', 0]
        ])

        this._skills['str'] = str;
        this._skills['dex'] = dex;
        this._skills['con'] = con;
        this._skills['int'] = int;
        this._skills['wis'] = wis;
        this._skills['cha'] = cha;

        this._cooldowns = new Map<string, number>([
            ['mistyStep', 6]
        ])

        this.calculateDamageSpeed()

        this._MAX_HP = this._skills['con'] * 5;

        this._healthBar = new HealthBar(this.scene, this.x - 10, (this.y - this.height - 2), this._MAX_HP, this.width);

    }

    calculateDamageSpeed() {

        if (this._skills['str'] > this._skills['dex'])
            this._damage = this._skills['str'];
        else
            this._damage = this._skills['dex'];

        this._speed = this._skills['dex'] + 100;

    }

    update(cursors: Phaser.Types.Input.Keyboard.CursorKeys) {

        super.update()

        if (this._gameOver) {
            return;
        }

        switch(this._statusAilments){
            case Ailments.NONE:
                break;
            case Ailments.PETRIFIED:
                if(this._inmune)
                    break;
                this.setVelocity(0, 0);
                this.setTintFill(Phaser.Display.Color.GetColor(102, 102, 102));
                this.anims.pause();
                setTimeout(()=>{
                    this.setTint(0xffffff);
                    this.anims.resume();
                    this._statusAilments = Ailments.NONE;
                    this._inmune = true;
                    setTimeout(() => {
                        this._inmune = false;
                    }, 1500)
                }, 2000)
                return;
            case Ailments.POISONED:
                if(this._poisonEvent && this._poisonEvent.getOverallRemaining() > 0)
                    break;
                this.setVelocity(this._speed);
                this._speed = (this._skills['dex'] + 100) / 1.2;
                this._poisonEvent = this.scene.time.addEvent({
                    delay: 1000,
                    callback: () => {
                        this._hp = this._hp - 1;
                        this.setTint(Phaser.Display.Color.GetColor(78, 165, 26))
                        setTimeout(() => {
                            this.setTint(0xffffff);
                        }, 300)
                        console.log(this._poisonEvent.getOverallRemaining())
                        if(this._poisonEvent.getOverallRemaining() <= 0){
                            this._statusAilments = Ailments.NONE;
                        }
                    },
                    repeat: 4
                })
                break;
        }

        this.checkXp();

        if (this._healthState === Status.DAMAGED) {
            this.anims.play('hurt', true);
            return;
        }

        if (this._healthState === Status.DEAD) {
            this.setVelocity(0, 0);
            this.anims.play('death', true);
            this.once("animationcomplete", () => {
                this._gameOver = true;
                this.destroy();
            })
            return
        }
        else{
            if (cursors.left.isDown) {
                    this.setFlipX(false);
                    this.setVelocityX(-this._speed);
                    this.setVelocityY(0);
                    this.anims.play('left', true);
                    this._lastDirection = Direction.LEFT;
            } else if (cursors.right.isDown) {
                    this.setFlipX(false);
                    this.setVelocityX(this._speed);
                    this.setVelocityY(0);
                    this.anims.play('right', true);
                    this._lastDirection = Direction.RIGHT;
            } else if (cursors.down.isDown) {
                    this.setFlipX(false);
                    this.setVelocityY(this._speed);
                    this.setVelocityX(0);
                    this.anims.play('down', true);
                    this._lastDirection = Direction.DOWN;
            } else if (cursors.up.isDown) {
                    this.setFlipX(false);
                    this.setVelocityY(-this._speed);
                    this.setVelocityX(0);
                    this.anims.play('up', true);
                    this._lastDirection = Direction.UP;
            } else {
                this.setVelocityX(0);
                this.setVelocityY(0);

                switch (this._lastDirection) {
                    case Direction.RIGHT || Direction.UP:
                        this.setFlipX(false)
                        break;
                    case Direction.LEFT || Direction.DOWN:
                        this.setFlipX(true)
                        break;
                    default:
                        this.setFlipX(false)
                        break;
                }

                this.play('idle', true)
            }
        }
        console.log(this._hp);
        this._healthBar.draw(this.x - 9, this.y - 18, this._hp)

    }
}