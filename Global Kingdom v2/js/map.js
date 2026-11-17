const playerCastle = {

    x: 10,
    y: 10

};

const banditCamps = [

    {
        id: 1,
        x: 8,
        y: 9,
        level: 1,
        rewardGold: 100
    },

    {
        id: 2,
        x: 13,
        y: 11,
        level: 2,
        rewardGold: 250
    },

    {
        id: 3,
        x: 7,
        y: 14,
        level: 3,
        rewardGold: 500
    }

];

const battleReports = [];

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

    let report = {

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
        armyPower >= campPower
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
                Math.ceil(
                    camp.level
                )
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
                Math.ceil(
                    camp.level * 2
                )
            );

        report.losses.archer =
            Math.min(
                army.archer,
                Math.ceil(
                    camp.level
                )
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