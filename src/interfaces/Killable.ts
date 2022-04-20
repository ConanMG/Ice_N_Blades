import Phaser from "phaser";
import { Status } from "~/utils/Predet";

export default interface Killable {

    damageTime: number;
    healthState: Status

    onHit(dir: Phaser.Math.Vector2);

}