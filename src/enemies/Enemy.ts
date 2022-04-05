import Phaser from "phaser";

export default abstract class extends Phaser.Physics.Arcade.Sprite {

    protected _target?: Phaser.GameObjects.Components.Transform;
    protected _aggro: boolean = false;
    protected _hp?: number;

}