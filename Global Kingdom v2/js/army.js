const army = {

    spearman: 0,

    archer: 0,

    swordsman: 0,

    knight: 0

};

function trainTroop(type){

    const troop =
        TROOPS[type];

    if(
        resources.wood <
        troop.cost.wood ||

        resources.stone <
        troop.cost.stone ||

        resources.gold <
        troop.cost.gold
    ){
        alert(
            "Not enough resources."
        );
        return;
    }

    resources.wood -=
        troop.cost.wood;

    resources.stone -=
        troop.cost.stone;

    resources.gold -=
        troop.cost.gold;

    army[type]++;

    saveGame();

    renderUI();

}