import Phaser from "phaser";
import { Status } from "~/utils/Predet";

export abstract class Character extends Phaser.Physics.Arcade.Sprite {

    protected NEXT_LEVEL_XP = 1000
    protected MAX_HP : number = 3;
    protected _hp : number = 3;
    protected _healthState! : Status;
    protected _skills!: Map<string, number>
    protected _ac!: number;

    protected _weapon! : Phaser.Physics.Arcade.Group

    protected _xp!: number;
    protected _lvl!: number;
    protected _skillPoints!:number;

    protected _damageTime : number = 0;

    public hp(){
        return this._hp;
    }
    public setHp(hp: number) {
        this._hp = hp;
    }
    public healthState(){
        return this._healthState;
    }
    public setHealthState(healthState: Status) {
        this._healthState = healthState;
    }
    public getSkill(skill: string) {
        return this._skills[skill];
    }
    public ac(){
        return this._ac;
    }
    public setAc(ac: number) {
        this._ac = ac;
    }
    public weapon(){
        return this._weapon;
    }
    public setWeapon(knives: Phaser.Physics.Arcade.Group){
        this._weapon = knives
    }
    public lvl(){
        return this._lvl;
    }
    public setLvl(lvl: number) {
        this._lvl = lvl;
    }
    public xp(){
        return this._xp;
    }
    public setXp(xp: number) {
        this._xp = xp;
    }
    public skillPoints(){
        return this._skillPoints;
    }
    public setSkillPoints(skillPoints: number) {
        this._skillPoints = skillPoints;
    } 

    checkXp(){
        if(this._xp == this.NEXT_LEVEL_XP)
            this.lvlUp()
    }

    lvlUp() {
    }

    lowerSkill(skill: string){
        switch (skill){
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

    raiseSkill(skill: string){
        switch (skill){
            case 'str':
                this._skills['str']++
                this._skillPoints--
            break;
            case 'dex':
                this._skills['dex']++
                this._skillPoints--
            break;
            case 'con':
                this._skills['con']++
                this._skillPoints--
            break;
            case 'int':
                this._skills['int']++
                this._skillPoints--
            break;
            case 'wis':
                this._skills['wis']++
                this._skillPoints--
            break;
            case 'cha':
                this._skills['cha']++
                this._skillPoints--
            break;
            default:
            break;
        }
    }

    levelUp() {
        this.MAX_HP+= 1 * this._skills['con'];
        this._hp = this.MAX_HP;

        this._lvl += 1;
        this._skillPoints += 2;
    }

    onHit(dir:Phaser.Math.Vector2) {

        if(this._healthState === Status.DAMAGED || this._healthState === Status.DEAD){
            return;
        }

        this.setVelocity(dir.x,dir.y);
        this.setTint(0xff0000);
        this._healthState=Status.DAMAGED;
        this._damageTime = 0;
        this._hp = this._hp-1

        if(this._hp <= 0){
            this._healthState = Status.DEAD
            this.setFrame("idle0000")
            this.anims.stop()
        }
    }
    
    setupSkills(str: number, dex: number, con: number, int: number, wis: number, cha: number) {
        this._skills = new Map<string,number>([
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
    }
}