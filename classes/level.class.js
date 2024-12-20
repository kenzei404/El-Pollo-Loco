class Level {
    enemies;
    endboss;
    endbossStatusbar;
    clouds;
    backgroundObjects;
    coins;
    bottles;
    level_end_x = 3700;

    constructor(enemies, endboss, endbossStatusbar, clouds, backgroundObjects, coins, bottles) {
        this.enemies = enemies;
        this.endboss = endboss;
        this.endbossStatusbar = endbossStatusbar;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.bottles = bottles;
    }
}
