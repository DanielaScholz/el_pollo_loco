const level1 = new Level(
    [
        new BackgroundObject('../img/5_background/layers/3_third_layer/2.png', -719, 0),
        new BackgroundObject('../img/5_background/layers/2_second_layer/2.png', -719, 0),
        new BackgroundObject('../img/5_background/layers/1_first_layer/2.png', -719, 0),

        new BackgroundObject('../img/5_background/layers/3_third_layer/1.png', 0, 0),
        new BackgroundObject('../img/5_background/layers/2_second_layer/1.png', 0, 0),
        new BackgroundObject('../img/5_background/layers/1_first_layer/1.png', 0, 0),

        new BackgroundObject('../img/5_background/layers/3_third_layer/2.png', 719, 0),
        new BackgroundObject('../img/5_background/layers/2_second_layer/2.png', 719, 0),
        new BackgroundObject('../img/5_background/layers/1_first_layer/2.png', 719, 0),

        new BackgroundObject('../img/5_background/layers/3_third_layer/1.png', (719 * 2), 0),
        new BackgroundObject('../img/5_background/layers/2_second_layer/1.png', (719 * 2), 0),
        new BackgroundObject('../img/5_background/layers/1_first_layer/1.png', (719 * 2), 0),

        new BackgroundObject('../img/5_background/layers/3_third_layer/2.png', (719 * 3), 0),
        new BackgroundObject('../img/5_background/layers/2_second_layer/2.png', (719 * 3), 0),
        new BackgroundObject('../img/5_background/layers/1_first_layer/2.png', (719 * 3), 0)
    ],
    [
        new Cloud('../img/5_background/layers/4_clouds/1.png'),
        new Cloud('../img/5_background/layers/4_clouds/2.png')
    ],
    [
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new BabyChicken(),
        new BabyChicken(),
        new Endboss()
    ],
    [
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin()
    ],
    [
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle()
    ]


);

