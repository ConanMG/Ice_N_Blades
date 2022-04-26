import Phaser from "phaser";

export default interface ICaster {

    Cooldown: number;
    spells: Array<String>

    checkCooldown();

    castSpell(spellKey: string);

    recoverSpells();

}