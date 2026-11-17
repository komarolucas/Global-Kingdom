const WORLD_SIZE = 2000;

const TILE_TYPES = {

    GRASS: "grass",

    FOREST: "forest",

    MOUNTAIN: "mountain",

    WATER: "water"

};

let worldView = true;

const playerCastle = {

    id: 1,

    name: "My Castle",

    x: 1000,

    y: 1000

};

let camera = {

    x: 1000,

    y: 1000

};
let zoomLevel = 20;

const banditCamps = [];

const battleReports = [];

/*
=================================
GENERATE BANDIT CAMPS
=================================
*/

for (let i = 0; i < 500; i++) {

    banditCamps.push({

        id: i + 1,

        type: "bandit",

        x: Math.floor(
            Math.random() *
            WORLD_SIZE
        ),

        y: Math.floor(
            Math.random() *
            WORLD_SIZE
        ),

        level:
            1 +
            Math.floor(
                Math.random() * 10
            ),

        rewardGold:
            100 +
            (
                Math.floor(
                    Math.random() * 10
                ) * 100
            )

    });

}

/*
=================================
WORLD GENERATION
=================================
*/

function generateTile(x, y) {

    const seed = Math.abs(
        (
            (x * 92821) +
            (y * 47317)
        ) % 100
    );

    if (seed < 8) {

        return TILE_TYPES.WATER;

    }

    if (seed < 22) {

        return TILE_TYPES.MOUNTAIN;

    }

    if (seed < 45) {

        return TILE_TYPES.FOREST;

    }

    return TILE_TYPES.GRASS;

}

/*
=================================
WORLD VIEW
=================================
*/

function enterCastle() {

    worldView = false;

    renderUI();

}

function openWorldMap() {

    worldView = true;

    renderUI();

}

/*
=================================
CAMERA
=================================
*/

function moveNorth() {

    if (camera.y > 0) {

        camera.y--;

        renderUI();

    }

}

function moveSouth() {

    if (
        camera.y <
        WORLD_SIZE - 1
    ) {

        camera.y++;

        renderUI();

    }

}

function moveWest() {

    if (camera.x > 0) {

        camera.x--;

        renderUI();

    }

}

function moveEast() {

    if (
        camera.x <
        WORLD_SIZE - 1
    ) {

        camera.x++;

        renderUI();

    }

}

/*
=================================
COMBAT
=================================
*/

function attackCamp(id) {

    const camp =
        banditCamps.find(
            c => c.id === id
        );

    if (!camp) {
        return;
    }

    const armyPower =

        (army.spearman * 10) +

        (army.archer * 18) +

        (army.swordsman * 25) +

        (army.knight * 65);

    const campPower =
        camp.level * 100;

    if (armyPower <= 0) {

        alert(
            "Train troops first."
        );

        return;

    }

    const report = {

        date:
            new Date()
                .toLocaleString(),

        result: "",

        enemyLevel:
            camp.level,

        reward: 0,

        losses: {

            spearman: 0,

            archer: 0,

            swordsman: 0,

            knight: 0

        }

    };

    if (
        armyPower >=
        campPower
    ) {

        report.result =
            "Victory";

        report.reward =
            camp.rewardGold;

        resources.gold +=
            camp.rewardGold;

        addXP(
            camp.level * 100
        );

        report.losses.spearman =
            Math.min(
                army.spearman,
                camp.level
            );

        army.spearman -=
            report.losses.spearman;

        const campIndex =
            banditCamps.findIndex(
                c => c.id === id
            );

        if (
            campIndex !== -1
        ) {

            banditCamps.splice(
                campIndex,
                1
            );

        }

    }
    else {

        report.result =
            "Defeat";

        report.losses.spearman =
            Math.min(
                army.spearman,
                camp.level * 2
            );

        report.losses.archer =
            Math.min(
                army.archer,
                camp.level
            );

        army.spearman -=
            report.losses.spearman;

        army.archer -=
            report.losses.archer;

    }

    battleReports.unshift(
        report
    );

    saveGame();

    renderUI();

}

let isDragging = false;

let lastMouseX = 0;

let lastMouseY = 0;

function setupMapDrag() {

    const map =
        document.querySelector(
            ".world-view"
        );

    if (!map) {

        return;
    }

 
    map.onmousedown = e => {

        isDragging = true;

        lastMouseX = e.clientX;

        lastMouseY = e.clientY;

    };

    document.onmouseup = () => {

        isDragging = false;

    };

    document.onmousemove = e => {

        if (!isDragging) {
            return;
        }

        const deltaX =
            e.clientX -
            lastMouseX;

        const deltaY =
            e.clientY -
            lastMouseY;

        if (
            Math.abs(deltaX) > 15
        ) {

            if (
                deltaX > 0 &&
                camera.x > 0
            ) {

                camera.x--;

            }
            else if (
                deltaX < 0 &&
                camera.x <
                WORLD_SIZE - 1
            ) {

                camera.x++;

            }

            lastMouseX =
                e.clientX;

        }

        if (
            Math.abs(deltaY) > 15
        ) {

            if (
                deltaY > 0 &&
                camera.y > 0
            ) {

                camera.y--;

            }
            else if (
                deltaY < 0 &&
                camera.y <
                WORLD_SIZE - 1
            ) {

                camera.y++;

            }

            lastMouseY =
                e.clientY;

        }

        renderUI();

    };

}
function zoomIn() {

    if (
        zoomLevel > 8
    ) {

        zoomLevel -= 2;

        renderUI();

    }

}

function zoomOut() {

    if (
        zoomLevel < 50
    ) {

        zoomLevel += 2;

        renderUI();

    }

}