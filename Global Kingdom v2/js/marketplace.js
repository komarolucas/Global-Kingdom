function tradeWoodForStone(){

    if(
        resources.wood < 100
    ){
        return;
    }

    resources.wood -= 100;

    resources.stone += 80;

    saveGame();

    renderUI();

}

function tradeStoneForGold(){

    if(
        resources.stone < 100
    ){
        return;
    }

    resources.stone -= 100;

    resources.gold += 80;

    saveGame();

    renderUI();

}

function tradeGoldForWood(){

    if(
        resources.gold < 100
    ){
        return;
    }

    resources.gold -= 100;

    resources.wood += 80;

    saveGame();

    renderUI();

}