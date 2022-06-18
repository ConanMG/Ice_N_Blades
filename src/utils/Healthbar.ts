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
        this.draw(this.x, this.y, fullHealth);

        scene.add.existing(this._bar);
    }

    destroy() {
        this._bar.destroy();
    }

    hide() {
        this._bar.setVisible(false);
    }

    show() {
        this._bar.setVisible(true);
    }

    /**
     * Recalculates the hp in the healthbar
     * @param newHp New amount of HP
     */
    expandHealth(newHp: number){
        this.fullHealth = newHp;
    }

    /**
     * Spawns the healthbar in the determined position and changes the color if HP is low
     * @param x 
     * @param y 
     * @param hpLeft Remaining HP
     */
    draw (x:number, y:number, hpLeft: number)
    {
        this._bar.clear();

        //  BG
        this._bar.fillStyle(0x000000);
        this._bar.fillRect(x, y, this.barLength + 4, 7);

        //  Health

        this._bar.fillStyle(0xffffff);
        this._bar.fillRect(x + 2, y + 2, this.barLength, 3);

        if (hpLeft < (this.fullHealth/4))
        {
            this._bar.fillStyle(0xff0000);
        }
        else
        {
            this._bar.fillStyle(0x00ff00);
        }

        this.currentValue = (hpLeft * this.barLength) / this.fullHealth

        this._bar.fillRect(x + 2, y + 2, this.currentValue, 3);
    }

}