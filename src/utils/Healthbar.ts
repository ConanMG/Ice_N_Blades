import Phaser from "phaser";

export class HealthBar {

    private _bar: Phaser.GameObjects.Graphics;
    private x: number;
    private y: number;
    private fullHealth: number;
    private barLength: number;
    private currentValue: number;

    bar() {
        return this._bar;
    }

    constructor (scene: Phaser.Scene, x: number, y: number, fullHealth: number, barLength: number)
    {
        this._bar = new Phaser.GameObjects.Graphics(scene);

        this.barLength = barLength;
        this.fullHealth = fullHealth;
        this.x = x;
        this.y = y;
        this.currentValue = this.fullHealth;
        this.draw(fullHealth);

        scene.add.existing(this._bar);
    }

    updatePosition(x: number, y: number){
        this.x = x
        this.y = y

        this.draw(this.currentValue)
    }

    draw (hpLeft: number)
    {
        this._bar.clear();

        //  BG
        this._bar.fillStyle(0x000000);
        this._bar.fillRect(this.x, this.y, this.barLength + 4, 7);

        //  Health

        this._bar.fillStyle(0xffffff);
        this._bar.fillRect(this.x + 2, this.y + 2, this.barLength, 3);

        if (hpLeft < (this.fullHealth/4))
        {
            this._bar.fillStyle(0xff0000);
        }
        else
        {
            this._bar.fillStyle(0x00ff00);
        }

        this.currentValue = (hpLeft * this.barLength) / this.fullHealth

        this._bar.fillRect(this.x + 2, this.y + 2, this.currentValue, 3);
    }

}