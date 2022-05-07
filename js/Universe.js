class Universe {
    constructor(config) {
        this.element = config.element;
        this.canvas  = this.element.querySelector(".game-canvas");
        this.ctx     = this.canvas.getContext("2d");
        this.map     = null;
    }

    startGameLoop() {
        const step = () => {
            this.update();
            this.draw();
            requestAnimationFrame(() => {
                step();
            });
        };

        step();
    }

    init() {
        this.map = new UniverseMap(window.UniverseMaps.DemoRoom);

        this.directionInput = new DirectionInput();
        this.directionInput.init();

        this.startGameLoop();
    }

    update() {
        Object.values(this.map.gameObjects).forEach(gameObject => {
            gameObject.update({
                arrow: this.directionInput.direction,
            });
        });
    }

    draw() {
        // Clear the canvas before each new draw
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Set the camera target
        // TODO: remove hardcoded hero value
        const cameraTarget = this.map.gameObjects.hero;

        // Draw the lower map
        this.map.drawLower(this.ctx, cameraTarget);

        // Between the lower and upper layers, draw the game objects
        Object.values(this.map.gameObjects).forEach(gameObject => {
            gameObject.sprite.draw(this.ctx, cameraTarget);
        });

        // Draw the upper map
        this.map.drawUpper(this.ctx, cameraTarget);
    }
}