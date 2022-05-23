import Phaser from "phaser";

export default interface ICaster {

    cooldown: number;
    spells: Array<String>;

    cooldownTimer: Phaser.Time.TimerEvent;

    castSpell(spellKey: string);

}