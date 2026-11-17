const completedQuests = [];

function isQuestComplete(quest){

    if(quest.type === "building"){

        return (
            buildingLevels[
                quest.building
            ] >= quest.level
        );

    }

    if(quest.type === "keep"){

        return (
            player.keepLevel >=
            quest.level
        );

    }

    if(quest.type === "player"){

        return (
            player.level >=
            quest.level
        );

    }

    return false;

}

function claimQuest(id){

    const quest =
        QUESTS.find(
            q => q.id === id
        );

    if(!quest) return;

    if(
        completedQuests.includes(id)
    ){
        return;
    }

    if(
        !isQuestComplete(
            quest
        )
    ){
        return;
    }

    addXP(
        quest.rewardXP
    );

    player.diamonds +=
        quest.rewardDiamonds;

    completedQuests.push(id);

    saveGame();

    renderUI();

}