myBackgroundObjects = [];

function addBackgroundObjects(length) {
    for (let i = 0; i < length; i++) {
        let temp = [
            new BackgroundObject('img/3. Background/Layers/5. Water/D1.png', 0 + i * 1440),
            new BackgroundObject('img/3. Background/Layers/4.Fondo 2/D1.png', 0 + i * 1440),
            new BackgroundObject('img/3. Background/Layers/3.Fondo 1/D1.png', 0 + i * 1440),
            new BackgroundObject('img/3. Background/Layers/2. Floor/D1.png', 0 + i * 1440),
            new BackgroundObject('img/3. Background/Layers/1. Light/1.png', 0 + i * 1440),
            new BackgroundObject('img/3. Background/Layers/5. Water/D2.png', 720 + i * 1440),
            new BackgroundObject('img/3. Background/Layers/4.Fondo 2/D2.png', 720 + i * 1440),
            new BackgroundObject('img/3. Background/Layers/3.Fondo 1/D2.png', 720 + i * 1440),
            new BackgroundObject('img/3. Background/Layers/2. Floor/D2.png', 720 + i * 1440),
            new BackgroundObject('img/3. Background/Layers/1. Light/2.png', 720 + i * 1440)
        ];
        myBackgroundObjects = myBackgroundObjects.concat(temp);
    }

}
addBackgroundObjects(4);

const level1 = new Level(
    [
        new PufferFish(),
        new PufferFish(),
        new PufferFish(),
        new JellyFish(),
        new JellyFish(),
        new JellyFish(),
        new Endboss()
    ],
    /*[
           new BackgroundObject('img/3. Background/Layers/5. Water/D1.png', 0),
           new BackgroundObject('img/3. Background/Layers/4.Fondo 2/D1.png', 0),
           new BackgroundObject('img/3. Background/Layers/3.Fondo 1/D1.png', 0),
           new BackgroundObject('img/3. Background/Layers/2. Floor/D1.png', 0),
           new BackgroundObject('img/3. Background/Layers/1. Light/1.png', 0),
           new BackgroundObject('img/3. Background/Layers/5. Water/D2.png', 720),
           new BackgroundObject('img/3. Background/Layers/4.Fondo 2/D2.png', 720),
           new BackgroundObject('img/3. Background/Layers/3.Fondo 1/D2.png', 720),
           new BackgroundObject('img/3. Background/Layers/2. Floor/D2.png', 720),
           new BackgroundObject('img/3. Background/Layers/1. Light/2.png', 720)
       ]*/
    myBackgroundObjects
);