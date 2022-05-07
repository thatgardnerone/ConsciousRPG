class Sprite {
    constructor(config) {
        // Image setup
        this.image        = new Image();
        this.image.src    = config.src;
        this.image.onload = () => {
            this.isLoaded = true;
        };

        // Add shadow
        this.useShadow = config.useShadow || true; // TODO: Default to false
        if (this.useShadow) {
            this.shadow        = new Image();
            this.shadow.src    = "./images/characters/shadow.png";
            this.shadow.onload = () => {
                this.isShadowLoaded = true;
            };
        }

        // Configure animation
        this.animations = config.animations || {
            "idle-down":  [[0, 0]],
            "idle-up":    [[0, 1]],
            "idle-left":  [[0, 2]],
            "idle-right": [[0, 3]],
            "walk-down":  [[1, 0], [0, 0], [2, 0], [0, 0]],
            "walk-up":    [[1, 1], [0, 1], [2, 1], [0, 1]],
            "walk-left":  [[1, 2], [0, 2], [2, 2], [0, 2]],
            "walk-right": [[1, 3], [0, 3], [2, 3], [0, 3]],
        };

        this.currentAnimation     = config.currentAnimation || "idle-down";
        this.currentAnimationStep = 0;

        this.animationStepDuration = config.animationStepDuration || 16;
        this.animationProgress     = this.animationStepDuration;

        // Reference GameObject
        this.gameObject = config.gameObject;
    }

    get frame() {
        return this.animations[this.currentAnimation][this.currentAnimationStep];
    }

    // Draw the sprite
    draw(ctx) {
        const x = this.gameObject.x - 8;
        const y = this.gameObject.y - 18;

        // Draw shadow
        if (this.useShadow && this.isShadowLoaded) {
            ctx.drawImage(this.shadow, x, y);
        }

        if (this.isLoaded) {
            ctx.drawImage(
                this.image,
                0, 0,
                32, 32,
                x, y,
                32, 32,
            );
        }
    }
}