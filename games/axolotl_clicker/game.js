// Initialize Kaboom
kaboom({
    global: true,
    width: 800,
    height: 600,
    scale: 1,
    debug: true,
    background: [173, 216, 230], // Light blue background
    // canvas: document.querySelector("canvas"), // Removed so Kaboom creates its own canvas
});

// Load assets
loadSprite("axolotl", "assets/AzarethStill.png");
loadSprite("party_hat", "assets/party_hat.png");
loadSprite("crown", "assets/crown.png");
loadSprite("wizard_hat", "assets/wizard_hat.png");

// Game variables
let points = 0;
let pointsPerClick = 1;
let pointsPerSecond = 0;
let hatSprite = null;

// Upgrade definitions
const upgrades = {
    strongerClicks: {
        id: "strongerClicksBtn",
        name: "Stronger Clicks",
        cost: 10,
        increase: 1,
        type: "ppc", // pointsPerClick
        description: "+1 Point per Click",
        purchased: 0,
        costIncreaseFactor: 1.5, // Cost will increase by 50% each time
    },
    autoClicker: {
        id: "autoClickerBtn",
        name: "Auto Clicker",
        cost: 25,
        increase: 1,
        type: "pps", // pointsPerSecond
        description: "+1 Point per Second",
        purchased: 0,
        costIncreaseFactor: 1.8,
    },
    megaClick: {
        id: "megaClickBtn",
        name: "Mega Click",
        cost: 100,
        increase: 5,
        type: "ppc", // pointsPerClick
        description: "+5 Points per Click",
        purchased: 0,
        costIncreaseFactor: 2.0,
    },
    megaAuto: {
        id: "megaAutoBtn",
        name: "Mega Auto Clicker",
        cost: 250,
        increase: 5,
        type: "pps", // pointsPerSecond
        description: "+5 Points per Second",
        purchased: 0,
        costIncreaseFactor: 2.2,
    },
    ultraClick: {
        id: "ultraClickBtn",
        name: "Ultra Click",
        cost: 2000,
        increase: 50,
        type: "ppc", // pointsPerClick
        description: "+50 Points per Click",
        purchased: 0,
        costIncreaseFactor: 2.5,
    },
    ultraAuto: {
        id: "ultraAutoBtn",
        name: "Ultra Auto Clicker",
        cost: 5000,
        increase: 50,
        type: "pps", // pointsPerSecond
        description: "+50 Points per Second",
        purchased: 0,
        costIncreaseFactor: 2.7,
    }
};

// --- Hat Shop Data ---
const hats = [
    {
        id: "none",
        name: "No Hat",
        price: 0,
        emoji: "",
        description: "Remove your hat.",
    },
    {
        id: "party",
        name: "Party Hat",
        price: 100,
        sprite: "party_hat",
        emoji: "🎉",
        description: "A festive party hat!",
    },
    {
        id: "crown",
        name: "Crown",
        price: 500,
        sprite: "crown",
        description: "Fit for royalty!",
    },
    {
        id: "cap",
        name: "Cool Cap",
        price: 250,
        emoji: "🧢",
        description: "Stay cool!",
    },
    {
        id: "wizard",
        name: "Wizard Hat",
        price: 1000,
        sprite: "wizard_hat",
        description: "Magical powers included.",
    },
];
let ownedHats = { none: true };
let currentHat = "none";

scene("main", () => {
    // --- All function declarations at the top ---
    function updateUpgradeButtons() {
        for (const key in upgrades) {
            const upgrade = upgrades[key];
            const button = document.getElementById(upgrade.id);
            if (button) {
                button.innerHTML = `${upgrade.name}<br>(Cost: ${Math.ceil(upgrade.cost)})<br><small>${upgrade.description}</small>`;
                button.disabled = points < upgrade.cost;
            }
        }
    }
    function createUpgradeButtons() {
        const sidebar = document.getElementById("sidebar");
        while (sidebar.children.length > 1) {
            sidebar.removeChild(sidebar.lastChild);
        }
        for (const key in upgrades) {
            const upgrade = upgrades[key];
            const button = document.createElement("button");
            button.id = upgrade.id;
            button.className = "upgrade-button";
            button.innerHTML = `${upgrade.name}<br>(Cost: ${Math.ceil(upgrade.cost)})<br><small>${upgrade.description}</small>`;
            button.onclick = () => buyUpgrade(key);
            sidebar.appendChild(button);
        }
        updateUpgradeButtons(); // Initial state of buttons
    }
    function buyUpgrade(upgradeKey) {
        const upgrade = upgrades[upgradeKey];
        if (points >= upgrade.cost) {
            points -= upgrade.cost;
            upgrade.purchased++;
            if (upgrade.type === "ppc") {
                pointsPerClick += upgrade.increase;
            } else if (upgrade.type === "pps") {
                pointsPerSecond += upgrade.increase;
            }
            upgrade.cost *= upgrade.costIncreaseFactor;
            updateUpgradeButtons();
            createShopButtons(); // Update shop after upgrade
        } else {
            console.log("Not enough points!");
        }
    }
    function createShopButtons() {
        const shopSidebar = document.getElementById("shop-sidebar");
        while (shopSidebar.children.length > 1) {
            shopSidebar.removeChild(shopSidebar.lastChild);
        }
        for (const hat of hats) {
            const button = document.createElement("button");
            button.className = "shop-item-button";
            if (currentHat === hat.id) {
                button.classList.add("equipped");
            }
            button.innerHTML = `${hat.emoji ? hat.emoji + " " : ""}${hat.name}<br>(Cost: ${hat.price})<br><small>${hat.description}</small>`;
            button.disabled = (!ownedHats[hat.id] && points < hat.price) || currentHat === hat.id;
            button.onclick = () => buyHat(hat.id);
            shopSidebar.appendChild(button);
        }
    }
    function buyHat(hatId) {
        const hat = hats.find(h => h.id === hatId);
        if (!hat) return;
        if (!ownedHats[hatId] && points >= hat.price) {
            points -= hat.price;
            ownedHats[hatId] = true;
        }
        if (ownedHats[hatId]) {
            currentHat = hatId;
            updateHatSprite();
        }
        createShopButtons();
    }
    function updateHatSprite() {
        if (hatSprite) {
            destroy(hatSprite);
            hatSprite = null;
        }
        if (currentHat !== "none") {
            const hatObj = hats.find(h => h.id === currentHat);
            if (hatObj) {
                if (hatObj.sprite) {
                    let hatScale = 0.5; // Default scale for sprites
                    let hatYOffset = -200; // Default y-offset for sprites
                    let hatXOffset = 0; // Default x-offset for sprites

                    if (hatObj.id === "crown") {
                        hatScale = 0.3; // Adjusted scale for crown
                        hatYOffset = -180; // Adjusted y-offset for crown
                        hatXOffset = -40; // Adjusted x-offset for crown
                    } else if (hatObj.id === "wizard") {
                         hatScale = 0.5; // Match scale of party hat
                         hatYOffset = -200; // Match y-offset of party hat
                         hatXOffset = -40; // Move wizard hat further left
                    }
                    // Add more conditions here for other sprite hats if needed

                    hatSprite = add([
                        sprite(hatObj.sprite),
                        scale(hatScale), // Use the scale component correctly
                        pos(width() / 2 + hatXOffset, height() / 2 + hatYOffset),
                        anchor("center"),
                        z(101)
                    ]);
                } else if (hatObj.emoji) {
                    hatSprite = add([
                        text(hatObj.emoji, { size: 48 }),
                        pos(width() / 2, height() / 2 - 200), // Position for emoji hats
                        anchor("center"),
                        z(101)
                    ]);
                }
            }
        }
    }
    // --- End function declarations ---

    // Add the axolotl character
    const axolotl = add([
        sprite("axolotl"),
        pos(width() / 2, height() / 2),
        scale(5), // Adjust scale as needed for pixel art
        anchor("center"),
        area(), // Makes it clickable
        "axolotl"
    ]);

    const uiElementPadding = 10; // Padding for text inside its background
    const bgOpacity = 0.5;
    const bgRadius = 5;
    const textColor = rgb(255, 255, 255); // White text for dark backgrounds
    const itemSpacing = 10; // Space between UI items

    // --- Points Display ---
    const pointsBgWidth = 280;
    const pointsBgHeight = 42;
    const pointsTextSize = 32;
    const pointsVerticalPadding = (pointsBgHeight - pointsTextSize) / 2;

    const pointsDisplayGroup = add([
        pos(20, 20),
        z(100)
    ]);

    pointsDisplayGroup.add([
        rect(pointsBgWidth, pointsBgHeight, { radius: bgRadius }),
        color(0, 0, 0),
        opacity(bgOpacity),
    ]);

    const pointsText = pointsDisplayGroup.add([
        text("Points: " + Math.floor(points), { size: pointsTextSize, color: textColor }),
        pos(uiElementPadding, pointsVerticalPadding),
    ]);

    // --- PPC Display ---
    const commonBgWidth = 330;
    const commonBgHeight = 34;
    const commonTextSize = 24;
    const commonVerticalPadding = (commonBgHeight - commonTextSize) / 2;

    const ppcDisplayGroupY = 20 + pointsBgHeight + itemSpacing;
    const ppcDisplayGroup = add([
        pos(20, ppcDisplayGroupY),
        z(100)
    ]);

    ppcDisplayGroup.add([
        rect(commonBgWidth, commonBgHeight, { radius: bgRadius }),
        color(0, 0, 0),
        opacity(bgOpacity),
    ]);

    const ppcText = ppcDisplayGroup.add([
        text("Points per Click: " + pointsPerClick, { size: commonTextSize, color: textColor }),
        pos(uiElementPadding, commonVerticalPadding),
    ]);

    // --- PPS Display ---
    const ppsDisplayGroupY = ppcDisplayGroupY + commonBgHeight + itemSpacing;
    const ppsDisplayGroup = add([
        pos(20, ppsDisplayGroupY),
        z(100)
    ]);

    ppsDisplayGroup.add([
        rect(commonBgWidth, commonBgHeight, { radius: bgRadius }),
        color(0, 0, 0),
        opacity(bgOpacity),
    ]);

    const ppsText = ppsDisplayGroup.add([
        text("Points per Second: " + pointsPerSecond, { size: commonTextSize, color: textColor }),
        pos(uiElementPadding, commonVerticalPadding),
    ]);

    // --- Achievements Bar ---
    const achievementBarHeight = 28; // Smaller height
    const achievementBarWidth = 320; // Smaller width
    const achievementBarY = height() - achievementBarHeight - 8; // 8px from bottom
    const achievementIcon = "⭐"; // You can change to a trophy emoji if you prefer
    const achievementSpacing = 24; // Smaller spacing
    const achievementIconSize = 20; // Smaller icon
    // Center the bar horizontally
    const achievementBarX = (width() - achievementBarWidth) / 2;
    const achievementBarBg = add([
        pos(achievementBarX, achievementBarY),
        rect(achievementBarWidth, achievementBarHeight, { radius: 8 }),
        color(0, 0, 0),
        opacity(0.4),
        z(200)
    ]);
    // Group to hold achievement icons
    const achievementIcons = [];
    function updateAchievements() {
        // Remove old icons
        for (const icon of achievementIcons) destroy(icon);
        achievementIcons.length = 0;
        // Add one icon for every 1000 points
        const numAchievements = Math.floor(points / 1000);
        // Center icons within the bar
        const totalWidth = (numAchievements - 1) * achievementSpacing;
        const startX = achievementBarX + (achievementBarWidth - totalWidth) / 2;
        for (let i = 0; i < numAchievements; i++) {
            const icon = add([
                text(achievementIcon, { size: achievementIconSize }),
                pos(startX + i * achievementSpacing, achievementBarY + 4),
                z(201)
            ]);
            achievementIcons.push(icon);
        }
    }

    // Update UI text regularly and upgrade buttons
    onUpdate(() => {
        pointsText.text = "Points: " + Math.floor(points);
        ppcText.text = "Points per Click: " + pointsPerClick;
        ppsText.text = "Points per Second: " + pointsPerSecond;
        updateUpgradeButtons(); // Keep buttons state updated
        updateAchievements(); // Update achievements bar
        updateHatSprite(); // Keep hat in correct position
    });

    // Update createShopButtons after points change
    onClick("axolotl", () => {
        points += pointsPerClick;
        axolotl.scale = vec2(5.5);
        wait(0.1, () => {
            axolotl.scale = vec2(5);
        });
        createShopButtons(); // Update shop after clicking
    });

    // Add auto clicker loop
    loop(1, () => {
        points += pointsPerSecond;
        createShopButtons(); // Update shop after auto points
    });

    // Update createShopButtons after buying an upgrade
    function buyUpgrade(upgradeKey) {
        const upgrade = upgrades[upgradeKey];
        if (points >= upgrade.cost) {
            points -= upgrade.cost;
            upgrade.purchased++;
            if (upgrade.type === "ppc") {
                pointsPerClick += upgrade.increase;
            } else if (upgrade.type === "pps") {
                pointsPerSecond += upgrade.increase;
            }
            upgrade.cost *= upgrade.costIncreaseFactor;
            updateUpgradeButtons();
            createShopButtons(); // Update shop after upgrade
        } else {
            console.log("Not enough points!");
        }
    }

    // Corrected buyHat function
    function buyHat(hatId) {
        const hat = hats.find(h => h.id === hatId);
        if (!hat) return;
        if (!ownedHats[hatId] && points >= hat.price) {
            points -= hat.price;
            ownedHats[hatId] = true;
        }
        if (ownedHats[hatId]) {
            currentHat = hatId;
            updateHatSprite();
        }
        createShopButtons();
    }

    // Initial creation of upgrade buttons
    createUpgradeButtons();
    createShopButtons();
    updateHatSprite();
});

// Start the main scene
go("main"); 