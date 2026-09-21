const foods = [
    {
        name: "McDonald's",
        emoji: "🍔",

        // Hidden reward probabilities
        rewards: [1, 2, 3, 4, 5]
    },

    {
        name: "Burger King",
        emoji: "👑",

        // Hidden reward probabilities
        rewards: [1, 2, 2, 3, 4]
    },

    {
        name: "Leon Grill",
        emoji: "🥙",

        // Hidden reward probabilities
        rewards: [2, 3, 4, 4, 5]
    },

    {
        name: "Taco Bell",
        emoji: "🌮",

        // Hidden reward probabilities
        rewards: [1, 2, 3, 3, 4]
    }
];

let round = 1;
let totalReward = 0;

let statistics = [
    { visits: 0, total: 0 },
    { visits: 0, total: 0 },
    { visits: 0, total: 0 },
    { visits: 0, total: 0 }
];

let history = [];


function chooseFood(index) {

    if (round > 30) {
        return;
    }

    const food = foods[index];

    // Randomly generate the hidden reward
    const rewards = food.rewards;

    const reward =
        rewards[Math.floor(Math.random() * rewards.length)];

    // Update total reward
    totalReward += reward;

    // Update statistics
    statistics[index].visits++;
    statistics[index].total += reward;

    // Add to history
    history.unshift({
        name: food.name,
        emoji: food.emoji,
        reward: reward
    });

    if (history.length > 5) {
        history.pop();
    }

    // Show result
    document.getElementById("result-title").textContent =
        "You chose " + food.name + "!";

    document.getElementById("reward").textContent =
        "+" + reward + " points";

    document.getElementById("result-message").textContent =
        "Your total reward is now " + totalReward + " points.";

    document.getElementById("score").textContent =
        totalReward;

    updateStats();
    updateHistory();

    document.querySelector(".food-grid").style.display = "none";

    document.getElementById("result").classList.remove("hidden");
}


function continueGame() {

    round++;

    if (round > 30) {
        endGame();
        return;
    }

    document.getElementById("round").textContent =
        round + " / 30";

    document.getElementById("result").classList.add("hidden");

    document.querySelector(".food-grid").style.display =
        "grid";
}


function updateStats() {

    for (let i = 0; i < foods.length; i++) {

        const element =
            document.getElementById("stats-" + i);

        const stats = statistics[i];

        if (stats.visits === 0) {

            element.textContent = "Unknown";

        } else {

            const average =
                (stats.total / stats.visits).toFixed(1);

            element.textContent =
                stats.visits +
                " visits • Avg reward: " +
                average;
        }
    }
}


function updateHistory() {

    const list =
        document.getElementById("history-list");

    list.innerHTML = "";

    history.forEach(function(item) {

        const div =
            document.createElement("div");

        div.className = "history-item";

        div.textContent =
            item.emoji +
            " " +
            item.name +
            " — +" +
            item.reward +
            " points";

        list.appendChild(div);
    });
}


function endGame() {

    document.querySelector(".food-grid").style.display =
        "none";

    document.getElementById("result").classList.remove("hidden");

    document.getElementById("result-title").textContent =
        "🎉 Game Complete!";

    document.getElementById("reward").textContent =
        totalReward + " points";

    document.getElementById("result-message").textContent =
        "You completed all 30 visits and earned " +
        totalReward +
        " total reward points.";

    const button =
        document.getElementById("continue-button");

    button.textContent = "Play Again 🔄";

    button.onclick = restartGame;
}


function restartGame() {

    round = 1;
    totalReward = 0;

    statistics = [
        { visits: 0, total: 0 },
        { visits: 0, total: 0 },
        { visits: 0, total: 0 },
        { visits: 0, total: 0 }
    ];

    history = [];

    document.getElementById("round").textContent =
        "1 / 30";

    document.getElementById("score").textContent =
        "0";

    document.querySelector(".food-grid").style.display =
        "grid";

    document.getElementById("result").classList.add("hidden");

    const button =
        document.getElementById("continue-button");

    button.textContent = "Continue →";
    button.onclick = continueGame;

    updateStats();
    updateHistory();
}
