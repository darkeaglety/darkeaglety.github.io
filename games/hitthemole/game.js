// Initialize Kaboom
kaboom({
    global: true,
    width: 800,
    height: 600,
    background: [0, 128, 0], // Green background for a field
    debug: true, // Enable debug mode
});

// Load assets (Placeholder for mortar)
loadSprite("mortar", "assets/mortar.png"); // Assuming you'll add a mortar sprite later
loadSprite("good_mole", "assets/good_mole.png"); // Assuming you'll add a good mole sprite
loadSprite("evil_mole", "assets/evil_mole.png"); // Assuming you'll add an evil mole sprite

// Game variables
let score = 0;
let moles = [];
const MORTAR_SPEED = 400; // Pixels per second
const MOLE_SPEED = 60; // Pixels per second

// Function to spawn moles
function spawnMole(isEvil, position) {
    const mole = add([
        sprite(isEvil ? "evil_mole" : "good_mole"), // Use sprites
        pos(position),
        area(),
        isEvil ? "evil_mole" : "good_mole",
        "mole", // Tag for all moles
        {
            isEvil: isEvil,
            dir: 1, // 1 for moving right, -1 for moving left
         }, // Store mole type and direction
         // Add debug visualization (optional, but helpful)
        outline(1, rgb(255, 255, 0)), // Add a yellow outline to see mole area
    ]);
    moles.push(mole);
    return mole;
}

scene("main", () => {
    // Add score display
    const scoreText = add([
        text("Score: " + score, { size: 24 }),
        pos(10, 10),
        fixed(),
        { value: score },
    ]);

    // Spawn some initial moles
    spawnMole(false, vec2(100, 400)); // Good mole
    spawnMole(true, vec2(300, 400)); // Evil mole
    spawnMole(false, vec2(500, 400)); // Good mole
    spawnMole(true, vec2(700, 400)); // Evil mole

    // --- Debug: Add a simple test rectangle ---
    add([
        rect(100, 100), // 100x100 pixel rectangle
        color(255, 0, 0), // Red color
        pos(width() / 2, height() / 2), // Center of the screen
        anchor("center"), // Center the object on its position
    ]);
    // --- End Debug ---

    // Mortar shooting on mouse click
    onClick("main", (mousePos) => {
        // Starting position for the mortar (bottom center)
        const startPos = vec2(width() / 2, height());

        // Calculate direction vector
        const direction = mousePos.sub(startPos).unit();

        // Create mortar object
        add([
            sprite("mortar"), // Use the loaded sprite
            pos(startPos),
            area(),
            move(direction, MORTAR_SPEED),
            "mortar", // Tag for mortar
            // Remove mortar when it goes off-screen
            offscreen({ destroy: true }),
        ]);
    });

    // Collision detection between mortar and mole
    onCollide("mortar", "mole", (mortar, mole) => {
        // Update score based on mole type
        if (mole.isEvil) {
            score += 10; // Gain points for hitting evil mole
            scoreText.text = "Score: " + score; // Update score display
        } else {
            score -= 5; // Lose points for hitting good mole
            // Ensure score doesn't go below zero (optional)
            if (score < 0) score = 0;
            scoreText.text = "Score: " + score; // Update score display
        }

        // Destroy both the mortar and the mole on collision
        destroy(mortar);
        destroy(mole);

        // Check for win condition (all moles destroyed)
        if (get("mole").length === 0) {
             console.log("All moles destroyed, going to win scene."); // Debug log
            go("win"); // Go to win scene
        }
    });

    // Mole movement
    onUpdate("mole", (m) => {
        m.move(m.dir * MOLE_SPEED, 0);
        // Reverse direction if hitting screen edge (simplified check)
        if (m.pos.x < 0 || m.pos.x > width()) {
            m.dir = -m.dir;
        }
    });
});

// Win scene
scene("win", () => {
    add([
        text("You Win!", { size: 48 }),
        pos(width() / 2, height() / 2 - 50),
        anchor("center"),
    ]);

    add([
        text("Final Score: " + score, { size: 32 }),
        pos(width() / 2, height() / 2 + 10),
        anchor("center"),
    ]);

    add([
        text("Click to Play Again", { size: 24 }),
        pos(width() / 2, height() / 2 + 80),
        anchor("center"),
        area(),
        "restart", // Tag for click detection
    ]);

    onClick("restart", () => {
        score = 0; // Reset score for new game
        moles = []; // Clear moles array
        go("main"); // Go back to the main scene
    });
});

go("main"); 