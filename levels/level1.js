let level1;

function initLevel1() {

level1 = new Level(
    [
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new SmallChicken(),
        new SmallChicken(),
        new SmallChicken(),
    ],
    new Endboss(),
    new Statusbar(),
    [
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
    ],
    [
        new BackgroundObject('img_pollo_locco/img/5_background/layers/air.png', -719, 0),
        new BackgroundObject('img_pollo_locco/img/5_background/layers/3_third_layer/2.png', -719, 0),
        new BackgroundObject('img_pollo_locco/img/5_background/layers/2_second_layer/2.png', -719, 0),
        new BackgroundObject('img_pollo_locco/img/5_background/layers/1_first_layer/2.png', -719, 0),

        new BackgroundObject('img_pollo_locco/img/5_background/layers/air.png', 0, 0),
        new BackgroundObject('img_pollo_locco/img/5_background/layers/3_third_layer/1.png', 0, 0),
        new BackgroundObject('img_pollo_locco/img/5_background/layers/2_second_layer/1.png', 0, 0),
        new BackgroundObject('img_pollo_locco/img/5_background/layers/1_first_layer/1.png', 0, 0),
        new BackgroundObject('img_pollo_locco/img/5_background/layers/air.png', 719, 0),
        new BackgroundObject('img_pollo_locco/img/5_background/layers/3_third_layer/2.png', 719, 0),
        new BackgroundObject('img_pollo_locco/img/5_background/layers/2_second_layer/2.png', 719, 0),
        new BackgroundObject('img_pollo_locco/img/5_background/layers/1_first_layer/2.png', 719, 0),

        new BackgroundObject('img_pollo_locco/img/5_background/layers/air.png', 2 * 719, 0),
        new BackgroundObject('img_pollo_locco/img/5_background/layers/3_third_layer/1.png', 2 * 719, 0),
        new BackgroundObject('img_pollo_locco/img/5_background/layers/2_second_layer/1.png', 2 * 719, 0),
        new BackgroundObject('img_pollo_locco/img/5_background/layers/1_first_layer/1.png', 2 * 719, 0),
        new BackgroundObject('img_pollo_locco/img/5_background/layers/air.png', 3 * 719, 0),
        new BackgroundObject('img_pollo_locco/img/5_background/layers/3_third_layer/2.png', 3 * 719, 0),
        new BackgroundObject('img_pollo_locco/img/5_background/layers/2_second_layer/2.png', 3 * 719, 0),
        new BackgroundObject('img_pollo_locco/img/5_background/layers/1_first_layer/2.png', 3 * 719, 0),

        new BackgroundObject('img_pollo_locco/img/5_background/layers/air.png', 4 * 719, 0),
        new BackgroundObject('img_pollo_locco/img/5_background/layers/3_third_layer/1.png', 4 * 719, 0),
        new BackgroundObject('img_pollo_locco/img/5_background/layers/2_second_layer/1.png', 4 * 719, 0),
        new BackgroundObject('img_pollo_locco/img/5_background/layers/1_first_layer/1.png', 4 * 719, 0),
        new BackgroundObject('img_pollo_locco/img/5_background/layers/air.png', 5 * 719, 0),
        new BackgroundObject('img_pollo_locco/img/5_background/layers/3_third_layer/2.png', 5 * 719, 0),
        new BackgroundObject('img_pollo_locco/img/5_background/layers/2_second_layer/2.png', 5 * 719, 0),
        new BackgroundObject('img_pollo_locco/img/5_background/layers/1_first_layer/2.png', 5 * 719, 0),
    ],
    [
        new Coin('img_pollo_locco/img/8_coin/coin_1.png'),
        new Coin('img_pollo_locco/img/8_coin/coin_1.png'),
        new Coin('img_pollo_locco/img/8_coin/coin_1.png'),
        new Coin('img_pollo_locco/img/8_coin/coin_1.png'),
        new Coin('img_pollo_locco/img/8_coin/coin_1.png'),
        new Coin('img_pollo_locco/img/8_coin/coin_1.png'),
    ],
    [
        new Bottle('img_pollo_locco/img/6_salsa_bottle/1_salsa_bottle_on_ground.png'),
        new Bottle('img_pollo_locco/img/6_salsa_bottle/2_salsa_bottle_on_ground.png'),
        new Bottle('img_pollo_locco/img/6_salsa_bottle/1_salsa_bottle_on_ground.png'),
        new Bottle('img_pollo_locco/img/6_salsa_bottle/1_salsa_bottle_on_ground.png'),
        new Bottle('img_pollo_locco/img/6_salsa_bottle/2_salsa_bottle_on_ground.png'),
        new Bottle('img_pollo_locco/img/6_salsa_bottle/2_salsa_bottle_on_ground.png'),
        new Bottle('img_pollo_locco/img/6_salsa_bottle/1_salsa_bottle_on_ground.png'),
        new Bottle('img_pollo_locco/img/6_salsa_bottle/2_salsa_bottle_on_ground.png')
    ]

)
}