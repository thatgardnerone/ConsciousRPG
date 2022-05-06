class Universe {
    constructor(config) {
        this.element = config.element;
        this.canvas = this.element.querySelector(".game-canvas");
        this.ctx = this.canvas.getContext("2d");
    }

    init() {
        // Draw the background
        const image = new Image();
        image.onload = () => {
            this.ctx.drawImage(image, 0, 0);
        }
        image.src = "./images/maps/DemoLower.png";

        // Draw the player
        const x = 1;
        const y = 2;

        const shadow = new Image();
        shadow.onload = () => {
            this.ctx.drawImage(
                shadow,
                0, 0,
                32, 32,
                x * 16 - 7, y * 16 - 17,
                32, 32
            );
        }
        shadow.src = "./images/characters/shadow.png";

        const hero = new Image();
        hero.onload = () => {
            this.ctx.drawImage(
                hero,
                0, 0,
                32, 32,
                x * 16 - 7, y * 16 - 18,
                32, 32
            );
        }
        hero.src = "./images/characters/people/hero.png";
    }
}