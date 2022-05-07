class UniverseMap {
    constructor(config) {
        this.gameObjects = config.gameObjects;

        this.lowerImage     = new Image();
        this.lowerImage.src = config.lowerSrc;

        this.upperImage     = new Image();
        this.upperImage.src = config.upperSrc;

    }

    drawLower(ctx) {
        ctx.drawImage(this.lowerImage, 0, 0);
    }

    drawUpper(ctx) {
        ctx.drawImage(this.upperImage, 0, 0);
    }
}

window.UniverseMaps = {
    DemoRoom: {
        lowerSrc:    "/images/maps/DemoLower.png",
        upperSrc:    "/images/maps/DemoUpper.png",
        gameObjects: {
            hero: new Agent({
                x:                  utils.withGrid(5),
                y:                  utils.withGrid(6),
                src:                "./images/characters/people/hero.png",
                isPlayerControlled: true,
            }),
            npc1: new Agent({
                x:   utils.withGrid(7),
                y:   utils.withGrid(9),
                src: "./images/characters/people/npc1.png",
            }),
        },
    },
    Kitchen:  {
        lowerSrc:    "/images/maps/KitchenLower.png",
        upperSrc:    "/images/maps/KitchenUpper.png",
        gameObjects: {
            hero: new GameObject({
                x:   utils.withGrid(3),
                y:   utils.withGrid(6),
                src: "./images/characters/people/hero.png",
            }),
            npcA: new GameObject({
                x:   utils.withGrid(9),
                y:   utils.withGrid(5),
                src: "./images/characters/people/npc2.png",
            }),
            npcB: new GameObject({
                x:   utils.withGrid(11),
                y:   utils.withGrid(7),
                src: "./images/characters/people/npc3.png",
            }),
        },
    },
};