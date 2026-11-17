let lastDailyReward = 0;

function claimDailyReward(){

    const now =
        Date.now();

    const hoursPassed =
        (
            now -
            lastDailyReward
        ) /
        1000 /
        60 /
        60;

    if(
        lastDailyReward !== 0 &&
        hoursPassed < 24
    ){

        alert(
            "Reward available in "
            +
            Math.ceil(
                24 -
                hoursPassed
            )
            +
            " hours."
        );

        return;

    }

    player.diamonds +=
        ECONOMY.DAILY_DIAMONDS;

    lastDailyReward =
        now;

    saveGame();

    renderUI();

}