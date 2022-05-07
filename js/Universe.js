class Universe {
    constructor(config) {
        this.element = config.element;
        this.canvas = this.element.querySelector(".game-canvas");
        this.ctx = this.canvas.getContext("2d");
        this.map = null;
    }

    startGameLoop() {
        const step = () => {
            this.draw();
            requestAnimationFrame(() => {
                step();
            });
        }

        step();
    }

    init() {
        this.map = new UniverseMap(window.UniverseMaps.DemoRoom);

        this.directionInput = new DirectionInput();
        this.directionInput.init();

        this.startGameLoop();
    }

    draw() {
        // Clear the canvas before each new draw
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.map.drawLower(this.ctx);

        // Between the lower and upper layers, draw the game objects
        Object.values(this.map.gameObjects).forEach(object => {
            object.update({
                arrow: this.directionInput.direction,
            });
            object.sprite.draw(this.ctx);
        });

        this.map.drawUpper(this.ctx);
    }
}