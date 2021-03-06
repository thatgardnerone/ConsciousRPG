class Agent extends GameObject {
    constructor(config) {
        super(config);
        this.isPlayerControlled      = config.isPlayerControlled || false;
        this.movingProgressRemaining = 0;
        this.directionUpdate         = {
            up:    ["y", -1],
            down:  ["y", 1],
            left:  ["x", -1],
            right: ["x", 1],
        };
    }

    updatePosition() {
        if (this.movingProgressRemaining > 0) {
            const [axis, direction] = this.directionUpdate[this.direction];
            this[axis] += direction;
            this.movingProgressRemaining--;
        }
    }

    updateDirection(state) {
        if (this.movingProgressRemaining === 0 && !state.arrow) {
            this.sprite.setAnimation("idle-" + this.direction);
        } else {
            this.sprite.setAnimation("walk-" + this.direction);
        }
    }

    update(state) {
        // TODO: for now, only the player can move
        if (!this.isPlayerControlled) return;

        this.updatePosition();
        this.updateDirection(state);

        // Only update the direction if the agent is not moving
        if (this.movingProgressRemaining === 0 && state.arrow) {
            this.direction               = state.arrow;
            this.movingProgressRemaining = 16;
        }
    }

}