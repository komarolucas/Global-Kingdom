const research = {

    woodBonus:false,

    stoneBonus:false,

    goldBonus:false

};

function unlockWoodBonus(){

    if(
        research.woodBonus
    ){
        return;
    }

    if(
        resources.gold < 1000
    ){
        return;
    }

    resources.gold -= 1000;

    research.woodBonus =
        true;

    saveGame();

    renderUI();

}

function unlockStoneBonus(){

    if(
        research.stoneBonus
    ){
        return;
    }

    if(
        resources.gold < 1000
    ){
        return;
    }

    resources.gold -= 1000;

    research.stoneBonus =
        true;

    saveGame();

    renderUI();

}

function unlockGoldBonus(){

    if(
        research.goldBonus
    ){
        return;
    }

    if(
        resources.gold < 1000
    ){
        return;
    }

    resources.gold -= 1000;

    research.goldBonus =
        true;

    saveGame();

    renderUI();

}