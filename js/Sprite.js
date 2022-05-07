class Sprite {
    get frame() {
        return this.animations[this.currentAnimation][this.currentAnimationStep];
    }

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
            "idle-right": [[0, 1]],
            "idle-up":    [[0, 2]],
            "idle-left":  [[0, 3]],
            "walk-down":  [[1, 0], [0, 0], [3, 0], [0, 0]],
            "walk-right": [[1, 1], [0, 1], [3, 1], [0, 1]],
            "walk-up":    [[1, 2], [0, 2], [3, 2], [0, 2]],
            "walk-left":  [[1, 3], [0, 3], [3, 3], [0, 3]],
        };

        this.currentAnimation     = config.currentAnimation || "idle-right";
        this.currentAnimationStep = 0;

        this.animationStepDuration = config.animationStepDuration || 5;
        this.animationProgress     = this.animationStepDuration;

        // Reference GameObject
        this.gameObject = config.gameObject;
    }

    setAnimation(animation) {
        if (this.currentAnimation !== animation) {
            this.currentAnimation = animation;
            this.currentAnimationStep = 0;
            this.animationProgress = this.animationStepDuration;
        }
    }

    updateAnimationProgress() {
        // Check if current animation is still running
        if (this.animationProgress > 0) {
            this.animationProgress--;
            return;
        }

        this.animationProgress    = this.animationStepDuration;
        this.currentAnimationStep = (this.currentAnimationStep + 1) % this.animations[this.currentAnimation].length;
    }

    draw(ctx) {
        const x = this.gameObject.x - 8;
        const y = this.gameObject.y - 18;

        // Draw shadow
        if (this.useShadow && this.isShadowLoaded) {
            ctx.drawImage(this.shadow, x, y);
        }

        // Get animation frame coordinates
        const [frameX, frameY] = this.frame;

        // Draw the sprite
        if (this.isLoaded) {
            ctx.drawImage(
                this.image,
                frameX * 32, frameY * 32,
                32, 32,
                x, y,
                32, 32,
            );
        }

        this.updateAnimationProgress();
    }
}