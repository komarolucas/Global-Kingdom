function renderUI() {

    const game =
        document.getElementById("game");

    if (worldView) {

        game.innerHTML =
            renderMap();

        return;

    }

    const capacity =
        getStorageCapacity();

    game.innerHTML = `

    <div class="top-bar">

        <div class="resource">
            🌲 Wood
            <br>
            ${Math.floor(resources.wood)}
            / ${capacity}
        </div>

        <div class="resource">
            ⛰️ Stone
            <br>
            ${Math.floor(resources.stone)}
            / ${capacity}
        </div>

        <div class="resource">
            💰 Gold
            <br>
            ${Math.floor(resources.gold)}
            / ${capacity}
        </div>

        <div class="resource">
            💎 Diamonds
            <br>
            ${player.diamonds}
        </div>

    </div>

    <div class="card">

        <h2>🏰 Kingdom</h2>

        <p>
            Player:
            ${player.username}
        </p>

        <p>
            Level:
            ${player.level}
        </p>

        <p>
            XP:
            ${Math.floor(player.xp)}
            /
            ${getXPRequired(player.level)}
        </p>

        <p>
            Keep Level:
            ${player.keepLevel}
        </p>

        <button onclick="upgradeKeep()">
            Upgrade Keep
        </button>

        <br><br>

        <button onclick="openWorldMap()">
            Back To Map
        </button>

    </div>

    <div class="card">

        <h2>📜 Quests</h2>

        ${renderQuests()}

    </div>

    <div class="card">

        <h2>🎁 Daily Reward</h2>

        <button onclick="claimDailyReward()">
            Claim Reward
        </button>

    </div>

    ${renderMarketplace()}

    ${renderAcademy()}

    ${renderBarracks()}

    ${renderBattleReports()}

    <div class="card">

        <h2>📊 Statistics</h2>

        <p>
            Buildings Built:
            ${player.buildingsBuilt}
        </p>

        <p>
            Resources Produced:
            ${Math.floor(
                player.totalResourcesProduced
            )}
        </p>

        <p>
            Play Time:
            ${player.playTime}
            sec
        </p>

        <button onclick="deleteSave()">
            Reset Save
        </button>

    </div>

    <div class="grid">

        ${renderBuildings()}

    </div>

    `;

}

function renderQuests() {

    let html = "";

    QUESTS.forEach(quest => {

        let status = `
            <span>
                ⏳ In Progress
            </span>
        `;

        const completed =
            isQuestComplete(
                quest
            );

        const claimed =
            completedQuests.includes(
                quest.id
            );

        if (claimed) {

            status = `
                <span>
                    ✅ Claimed
                </span>
            `;

        } else if (completed) {

            status = `
                <button
                onclick="
                claimQuest(
                    ${quest.id}
                )
                ">
                    Claim Reward
                </button>
            `;

        }

        html += `

        <div class="quest">

            <strong>
                ${quest.title}
            </strong>

            <br><br>

            XP:
            ${quest.rewardXP}

            |

            💎
            ${quest.rewardDiamonds}

            <br><br>

            ${status}

        </div>

        `;

    });

    return html;

}

function renderMarketplace() {

    if (
        player.keepLevel < 2
    ) {
        return "";
    }

    return `

    <div class="card">

        <h2>🏪 Marketplace</h2>

        <button onclick="tradeWoodForStone()">
            100 Wood → 80 Stone
        </button>

        <br><br>

        <button onclick="tradeStoneForGold()">
            100 Stone → 80 Gold
        </button>

        <br><br>

        <button onclick="tradeGoldForWood()">
            100 Gold → 80 Wood
        </button>

    </div>

    `;

}

function renderAcademy() {

    if (
        player.keepLevel < 3
    ) {
        return "";
    }

    return `

    <div class="card">

        <h2>🔬 Academy</h2>

        <p>
            Cost: 1000 Gold
        </p>

        <button onclick="unlockWoodBonus()">

            ${
                research.woodBonus
                ? "✅ Wood Complete"
                : "Wood +10%"
            }

        </button>

        <br><br>

        <button onclick="unlockStoneBonus()">

            ${
                research.stoneBonus
                ? "✅ Stone Complete"
                : "Stone +10%"
            }

        </button>

        <br><br>

        <button onclick="unlockGoldBonus()">

            ${
                research.goldBonus
                ? "✅ Gold Complete"
                : "Gold +10%"
            }

        </button>

    </div>

    `;

}

function renderBarracks() {

    if (
        typeof army === "undefined"
    ) {
        return "";
    }

    return `

    <div class="card">

        <h2>🛡️ Barracks</h2>

        <p>Spearmen: ${army.spearman}</p>

        <button onclick="trainTroop('spearman')">
            Train Spearman
        </button>

        <br><br>

        <p>Archers: ${army.archer}</p>

        <button onclick="trainTroop('archer')">
            Train Archer
        </button>

        <br><br>

        <p>Swordsmen: ${army.swordsman}</p>

        <button onclick="trainTroop('swordsman')">
            Train Swordsman
        </button>

        <br><br>

        <p>Knights: ${army.knight}</p>

        <button onclick="trainTroop('knight')">
            Train Knight
        </button>

    </div>

    `;

}

function renderBattleReports() {

    if (
        typeof battleReports ===
        "undefined"
    ) {
        return "";
    }

    let html = `

    <div class="card">

        <h2>
            ⚔️ Battle Reports
        </h2>

    `;

    battleReports
        .slice(0, 10)
        .forEach(report => {

            html += `

            <div class="quest">

                <strong>
                    ${report.result}
                </strong>

                <br>

                Bandit Camp Lv.
                ${report.enemyLevel}

                <br>

                Reward:
                ${report.reward}
                Gold

                <br>

                Losses:

                🛡️ ${report.losses.spearman}

                |

                🏹 ${report.losses.archer}

                |

                ⚔️ ${report.losses.swordsman}

                |

                🐎 ${report.losses.knight}

                <br>

                ${report.date}

            </div>

            `;

        });

    html += `
    </div>
    `;

    return html;

}

function renderBuildings() {

    let html = "";

    for (const key in BUILDINGS) {

        const building =
            BUILDINGS[key];

        if (
            building.unlockKeep &&
            player.keepLevel <
            building.unlockKeep
        ) {
            continue;
        }

        let info = "";

        if (
            building.resource
        ) {

            info = `
                <p>
                    Production:
                    ${getProduction(key)}
                    / hour
                </p>
            `;

        }

        if (
            key === "storage"
        ) {

            info = `
                <p>
                    Capacity:
                    ${getStorageCapacity()}
                </p>
            `;

        }

        html += `

        <div class="building">

            <h3>
                ${building.icon}
                ${building.name}
            </h3>

            <p>
                Level:
                ${buildingLevels[key]}
            </p>

            ${info}

            <button
            onclick="
            upgradeBuilding(
                '${key}'
            )
            ">

                Upgrade

            </button>

        </div>

        `;

    }

    return html;

}

function renderMap() {

    const range = zoomLevel;

    let mapHtml = "";

    for (
        let y = camera.y - range;
        y <= camera.y + range;
        y++
    ) {

        for (
            let x = camera.x - range;
            x <= camera.x + range;
            x++
        ) {

            const tileType =
                generateTile(x, y);

            let cssClass =
                tileType;

            let content = "";

            if (tileType === "forest") {
                content = "";
            }

            if (tileType === "mountain") {
                content = "";
            }

            if (tileType === "water") {
                content = "";
            }

            if (
                x === playerCastle.x &&
                y === playerCastle.y
            ) {

                cssClass =
                    "castle";

                content = `
                    <span onclick="enterCastle()">
                        🏰
                    </span>
                `;

            }

            const camp =
                banditCamps.find(
                    camp =>
                        camp.x === x &&
                        camp.y === y
                );

            if (camp) {

                cssClass =
                    "bandit";

                content = `
                    <span onclick="attackCamp(${camp.id})">
                        🏴
                    </span>
                `;

            }

            mapHtml += `

                <div
                class="tile ${cssClass}">

                    ${content}

                </div>

            `;

        }

    }
    setTimeout(
        setupMapDrag,
        0
    );

    return `

    <div class="world-layout">

        <div class="world-view">

            <div class="map-controls">

                <button onclick="moveNorth()">↑</button>

                <button onclick="moveSouth()">↓</button>

                <button onclick="moveWest()">←</button>

                <button onclick="moveEast()">→</button>

            </div>

            <div class="map-grid">

                ${mapHtml}

            </div>

        </div>

        <div class="world-sidebar">

            <h3>🗺️ World Map</h3>

            <hr>

            <p>X: ${camera.x}</p>

            <p>Y: ${camera.y}</p>

            <hr>

            <p>
                🏰
                ${playerCastle.name}
            </p>

            <button onclick="enterCastle()">

                Enter Castle

            </button>

            <hr>

            <p>
                🏴 Active Camps:
                ${banditCamps.length}
            </p>

            <p>
                🌍 World:
                ${WORLD_SIZE}
                ×
                ${WORLD_SIZE}
            </p>

        </div>

    </div>

    `;

}