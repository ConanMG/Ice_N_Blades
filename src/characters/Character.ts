import Phaser from "phaser";
import { Status } from "~/utils/Predet";

export default abstract class extends Phaser.Physics.Arcade.Sprite{

    protected MAX_HP!: number;
    protected _hp!: number;
    protected _skills: Map<string, number> = new Map<string,number>([
        ['str', 0],
        ['dex', 0],
        ['con', 0],
        ['int', 0],
        ['wis', 0],
        ['cha', 0]
    ])
    protected _ac!: number;

    protected _weapon!: Phaser.Physics.Arcade.Group;
    
    protected _damageTime!: number;
    protected _xp!: number;
    protected _lvl!: number;
    protected _skillPoints!:number;

    public hp(){
        return this._hp;
    }
    public setHp(hp: number) {
        this._hp = hp;
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
    public setWeapon(weapon: Phaser.Physics.Arcade.Group) {
        this._weapon = weapon;
    }
    public damageTime(){
        return this._damageTime;
    }
    public setDamageTime(damageTime: number) {
        this._damageTime = damageTime;
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

    public lowerSkill(skill: string){
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

    public raiseSkill(skill: string){
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

    public levelUp(){
        this.MAX_HP+= 1 * this._skills['con'];
        this._hp = this.MAX_HP;

        this._lvl += 1;
        this._skillPoints += 2;
    }

    protected setupSkills(str: number, dex: number, con: number, int: number, wis: number, cha: number){
        this._skills['str'] = str
        this._skills['dex'] = dex
        this._skills['con'] = con
        this._skills['int'] = int
        this._skills['wis'] = wis
        this._skills['cha'] = cha
    }

    public takeDamage(){

    }
}