function saveGame() {

    const saveData = {

        player,

        resources,

        buildingLevels,

        completedQuests,

        research,

        lastDailyReward,

        army,

        banditCamps,

        battleReports

    };

    localStorage.setItem(
        "gk_alpha2",
        JSON.stringify(
            saveData
        )
    );

}

function loadGame() {

    const save =
        localStorage.getItem(
            "gk_alpha2"
        );

    if (!save) {
        return;
    }

    const data =
        JSON.parse(save);

    if (data.player) {

        Object.assign(
            player,
            data.player
        );

    }

    if (data.resources) {

        Object.assign(
            resources,
            data.resources
        );

    }

    if (data.buildingLevels) {

        Object.assign(
            buildingLevels,
            data.buildingLevels
        );

    }

    if (
        data.completedQuests
    ) {

        completedQuests.length = 0;

        completedQuests.push(
            ...data.completedQuests
        );

    }

    if (
        data.research
    ) {

        Object.assign(
            research,
            data.research
        );

    }

    if (
        typeof
        data.lastDailyReward
        !==
        "undefined"
    ) {

        lastDailyReward =
            data.lastDailyReward;

    }

    if (
        data.army
    ) {

        Object.assign(
            army,
            data.army
        );

    }

    if (
        data.banditCamps
    ) {

        banditCamps.length = 0;

        banditCamps.push(
            ...data.banditCamps
        );

    }

    if (
        data.battleReports
    ) {

        battleReports.length = 0;

        battleReports.push(
            ...data.battleReports
        );

    }

}

function deleteSave() {

    localStorage.removeItem(
        "gk_alpha2"
    );

    location.reload();

}