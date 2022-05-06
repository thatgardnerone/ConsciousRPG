class Sprite {
    constructor(config) {
        // Image setup
        this.image = new Image();
        this.image.src = config.src;
        this.image.onload = () => {
            this.isLoaded = true;
        };

        // Add shadow
        this.useShadow = config.useShadow || true; // TODO: Default to false
        if (this.useShadow) {
            this.shadow = new Image();
            this.shadow.src = './images/characters/shadow.png';
            this.shadow.onload = () => {
                this.isShadowLoaded = true;
            };
        }

        // Configure animation
        this.animations = config.animations || {
            idleDown: [
                [0, 0],
            ],
        };
        this.currentAnimation = config.currentAnimation || 'idleDown';
        this.currentFrame = 0;

        // Reference GameObject
        this.gameObject = config.gameObject;
    }

    // Draw the sprite
    draw(ctx) {
        const x = this.gameObject.x * 16 - 8;
        const y = this.gameObject.y * 16 - 18;

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
                32, 32
            );
        }
    }
}