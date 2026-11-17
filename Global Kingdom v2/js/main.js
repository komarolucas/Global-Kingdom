function getXPRequired(level){

    return 1000 + (
        250 * (level - 1)
    );

}

function getProduction(building){

    const level =
        buildingLevels[building];

    return ECONOMY.PRODUCTION[
        level - 1
    ];

}

function getStorageCapacity(){

    return ECONOMY
        .STORAGE_CAPACITY[
            buildingLevels.storage - 1
        ];

}

function addXP(amount){

    player.xp += amount;

    while(
        player.level <
        ECONOMY.MAX_PLAYER_LEVEL &&
        player.xp >=
        getXPRequired(
            player.level
        )
    ){

        player.xp -=
        getXPRequired(
            player.level
        );

        player.level++;

    }

}

function upgradeBuilding(building){

    const currentLevel =
        buildingLevels[building];

    if(currentLevel >= 15){

        alert(
            "Maximum level reached."
        );

        return;

    }

    const cost =
        ECONOMY
        .BUILDING_UPGRADE_COSTS[
            currentLevel
        ];

    if(
        !cost
    ){
        return;
    }

    if(
        resources.wood < cost.wood ||
        resources.stone < cost.stone ||
        resources.gold < cost.gold
    ){

        alert(
            "Not enough resources."
        );

        return;

    }

    resources.wood -= cost.wood;
    resources.stone -= cost.stone;
    resources.gold -= cost.gold;

    buildingLevels[
        building
    ]++;

    player.buildingsBuilt++;

    addXP(
        ECONOMY
        .XP_PER_BUILDING_LEVEL
        *
        buildingLevels[
            building
        ]
    );

    saveGame();

    renderUI();

}

function upgradeKeep(){

    if(
        player.keepLevel >=
        ECONOMY.MAX_KEEP_LEVEL
    ){
        return;
    }

    const cost = {

        wood:
        500 *
        player.keepLevel,

        stone:
        500 *
        player.keepLevel,

        gold:
        250 *
        player.keepLevel

    };

    if(

        resources.wood < cost.wood ||

        resources.stone < cost.stone ||

        resources.gold < cost.gold

    ){

        alert(
            "Not enough resources."
        );

        return;

    }

    resources.wood -= cost.wood;
    resources.stone -= cost.stone;
    resources.gold -= cost.gold;

    player.keepLevel++;

    addXP(
        player.keepLevel *
        500
    );

    saveGame();

    renderUI();

}

loadGame();

setInterval(()=>{

    const cap =
        getStorageCapacity();

    const woodBonus =
        (
            typeof research !==
            "undefined" &&
            research.woodBonus
        )
        ? 1.1
        : 1;

    const stoneBonus =
        (
            typeof research !==
            "undefined" &&
            research.stoneBonus
        )
        ? 1.1
        : 1;

    const goldBonus =
        (
            typeof research !==
            "undefined" &&
            research.goldBonus
        )
        ? 1.1
        : 1;

    const woodProduced =

        (
            getProduction(
                "lumberMill"
            )
            *
            woodBonus
        )
        /
        3600;

    const stoneProduced =

        (
            getProduction(
                "stoneQuarry"
            )
            *
            stoneBonus
        )
        /
        3600;

    const goldProduced =

        (
            getProduction(
                "goldMine"
            )
            *
            goldBonus
        )
        /
        3600;

    resources.wood = Math.min(
        cap,
        resources.wood +
        woodProduced
    );

    resources.stone = Math.min(
        cap,
        resources.stone +
        stoneProduced
    );

    resources.gold = Math.min(
        cap,
        resources.gold +
        goldProduced
    );

    player.totalResourcesProduced +=

        woodProduced +
        stoneProduced +
        goldProduced;

    player.playTime++;

    saveGame();

    renderUI();

},1000);

renderUI();
