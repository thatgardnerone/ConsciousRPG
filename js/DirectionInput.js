class DirectionInput {
    constructor() {
        this.heldDirections = [];

        this.map = {
            "ArrowUp":    "up",
            "ArrowDown":  "down",
            "ArrowLeft":  "left",
            "ArrowRight": "right",
            "KeyW":       "up",
            "KeyS":       "down",
            "KeyA":       "left",
            "KeyD":       "right",
        };
    }

    get direction() {
        return this.heldDirections[0];
    }


    init() {
        document.addEventListener("keydown", ev => {
            const dir = this.map[ev.code];
            if (dir && !this.heldDirections.includes(dir)) {
                this.heldDirections.unshift(dir);
            }
        });

        document.addEventListener("keyup", ev => {
            const dir   = this.map[ev.code];
            const index = this.heldDirections.indexOf(dir);
            if (index > -1) {
                this.heldDirections.splice(index, 1);
            }
        });
    }
}