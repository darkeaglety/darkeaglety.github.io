// ZomZoms Game - Main Game File

// Game Configuration
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game-container',
    backgroundColor: '#2d5016',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    pixelArt: true
};

const game = new Phaser.Game(config);

// Game Variables
let player;
let cursors;
let wasd;
let zombies;
let projectiles;
let playerHealth = 100;
let level = 1;
let zombiesKilled = 0;
let zombiesKilledThisLevel = 0;
let zombiesRequiredThisLevel = 0;
let gameTime = 0;
let levelStartTime = 0;
let gameState = 'playing'; // 'playing', 'levelComplete', 'gameComplete', 'gameOver'
let timerText;
let healthText;
let levelText;
let killCountText;
let weaponText;
let abilityText;

// Weapon System
let currentWeapon = 0;
let weapons = [
    { name: 'Sword', damage: 25, range: 40, cooldown: 1000, type: 'melee' },
    { name: 'Throwing Knives', damage: 20, range: 200, cooldown: 800, type: 'ranged' },
    { name: 'Ninja Stars', damage: 15, range: 150, cooldown: 500, type: 'bounce' },
    { name: 'Fireball', damage: 35, range: 250, cooldown: 1500, type: 'area' },
    { name: 'Lightning', damage: 40, range: 999, cooldown: 2000, type: 'global' }
];

// Ability System
let abilities = [
    { name: 'Dash', cooldown: 3000, uses: 0, maxUses: 999 },
    { name: 'Heal', cooldown: 10000, uses: 0, maxUses: 3 },
    { name: 'Time Slow', cooldown: 15000, uses: 0, maxUses: 2 }
];
let currentAbility = 0;
let lastAttackTime = 0;
let lastAbilityTime = 0;
let timeSlowActive = false;
let lastPlayerDirection = { x: 1, y: 0 }; // Default to right
let cooldownBar;
let levelProgressText;
let boss = null;
let bossPhase = 1;
let bossHealth = 0;
let bossMaxHealth = 0;
let levelCompleteKeyHandler = null;

function preload() {
    // Generate simple 8-bit sprites using graphics
    generateSprites(this);
}

function create() {
    // Create player
    player = this.physics.add.sprite(400, 300, 'player');
    player.setCollideWorldBounds(true);
    
    // Create groups
    zombies = this.physics.add.group();
    projectiles = this.physics.add.group();
    
    // Setup controls
    cursors = this.input.keyboard.createCursorKeys();
    wasd = this.input.keyboard.addKeys({
        up: Phaser.Input.Keyboard.KeyCodes.W,
        down: Phaser.Input.Keyboard.KeyCodes.S,
        left: Phaser.Input.Keyboard.KeyCodes.A,
        right: Phaser.Input.Keyboard.KeyCodes.D,
        space: Phaser.Input.Keyboard.KeyCodes.SPACE,
        shift: Phaser.Input.Keyboard.KeyCodes.SHIFT,
        one: Phaser.Input.Keyboard.KeyCodes.ONE,
        two: Phaser.Input.Keyboard.KeyCodes.TWO,
        three: Phaser.Input.Keyboard.KeyCodes.THREE,
        four: Phaser.Input.Keyboard.KeyCodes.FOUR,
        five: Phaser.Input.Keyboard.KeyCodes.FIVE
    });
    
    // Setup collisions
    this.physics.add.overlap(player, zombies, hitPlayer, null, this);
    this.physics.add.overlap(projectiles, zombies, hitZombieWithProjectile, null, this);
    
    // Create HUD
    createHUD(this);
    
    // Initialize level
    initializeLevel(this);
}

function update(time, delta) {
    // Update timer
    gameTime += delta;
    updateTimer();
    
    // Only update game logic if playing
    if (gameState === 'playing') {
        // Player movement
        handlePlayerMovement();
        
        // Update zombies
        updateZombies();
        
        // Update boss if exists
        if (boss && boss.active) {
            updateBoss();
        }
        
        // Update projectiles
        updateProjectiles();
        
        // Handle weapon switching
        handleWeaponSwitching();
        
        // Update cooldown bar
        updateCooldownBar();
        
        // Handle attack
        if (Phaser.Input.Keyboard.JustDown(wasd.space)) {
            attackWithCurrentWeapon(this);
        }
        
        // Handle special ability
        if (Phaser.Input.Keyboard.JustDown(wasd.shift)) {
            useSpecialAbility(this);
        }
        
        // Check level completion
        checkLevelCompletion(this);
    }
}

function handlePlayerMovement() {
    const speed = 200;
    let velocityX = 0;
    let velocityY = 0;
    
    // Check WASD keys
    if (wasd.left.isDown || cursors.left.isDown) {
        velocityX = -speed;
    } else if (wasd.right.isDown || cursors.right.isDown) {
        velocityX = speed;
    }
    
    if (wasd.up.isDown || cursors.up.isDown) {
        velocityY = -speed;
    } else if (wasd.down.isDown || cursors.down.isDown) {
        velocityY = speed;
    }
    
    // Normalize diagonal movement
    if (velocityX !== 0 && velocityY !== 0) {
        velocityX *= 0.707;
        velocityY *= 0.707;
    }
    
    // Update last direction if player is moving
    if (velocityX !== 0 || velocityY !== 0) {
        lastPlayerDirection.x = velocityX / speed;
        lastPlayerDirection.y = velocityY / speed;
    }
    
    player.setVelocity(velocityX, velocityY);
}

function updateZombies() {
    const baseSpeed = timeSlowActive ? 25 : 50;
    
    zombies.children.entries.forEach(zombie => {
        if (zombie.active) {
            // Simple AI: move towards player
            const angle = Phaser.Math.Angle.Between(
                zombie.x, zombie.y,
                player.x, player.y
            );
            
            zombie.setVelocity(
                Math.cos(angle) * baseSpeed,
                Math.sin(angle) * baseSpeed
            );
        }
    });
}

function updateProjectiles() {
    projectiles.children.entries.forEach(projectile => {
        if (projectile.active) {
            // Remove projectiles that are off screen
            if (projectile.x < -50 || projectile.x > 850 || 
                projectile.y < -50 || projectile.y > 650) {
                projectile.destroy();
            }
            
            // Handle ninja star bouncing
            if (projectile.weaponType === 'bounce' && projectile.bounces > 0) {
                // Check for wall bounces
                if (projectile.x <= 0 || projectile.x >= 800) {
                    projectile.setVelocityX(-projectile.body.velocity.x);
                    projectile.bounces--;
                }
                if (projectile.y <= 0 || projectile.y >= 600) {
                    projectile.setVelocityY(-projectile.body.velocity.y);
                    projectile.bounces--;
                }
            }
        }
    });
}

function handleWeaponSwitching() {
    if (Phaser.Input.Keyboard.JustDown(wasd.one) && zombiesKilled >= 0) {
        currentWeapon = 0;
        updateWeaponDisplay();
    } else if (Phaser.Input.Keyboard.JustDown(wasd.two) && zombiesKilled >= 10) {
        currentWeapon = 1;
        updateWeaponDisplay();
    } else if (Phaser.Input.Keyboard.JustDown(wasd.three) && zombiesKilled >= 20) {
        currentWeapon = 2;
        updateWeaponDisplay();
    } else if (Phaser.Input.Keyboard.JustDown(wasd.four) && zombiesKilled >= 30) {
        currentWeapon = 3;
        updateWeaponDisplay();
    } else if (Phaser.Input.Keyboard.JustDown(wasd.five) && zombiesKilled >= 40) {
        currentWeapon = 4;
        updateWeaponDisplay();
    }
}

function attackWithCurrentWeapon(scene) {
    const currentTime = Date.now();
    const weapon = weapons[currentWeapon];
    
    // Check cooldown
    if (currentTime - lastAttackTime < weapon.cooldown) {
        return;
    }
    
    lastAttackTime = currentTime;
    
    switch(weapon.type) {
        case 'melee':
            attackWithSword(scene, weapon);
            break;
        case 'ranged':
            shootProjectile(scene, weapon, 'knife');
            break;
        case 'bounce':
            shootProjectile(scene, weapon, 'star');
            break;
        case 'area':
            shootProjectile(scene, weapon, 'fireball');
            break;
        case 'global':
            lightningStrike(scene, weapon);
            break;
    }
}

function attackWithSword(scene, weapon) {
    // Create sword swing visual effect
    const swordSwing = scene.add.graphics();
    swordSwing.lineStyle(3, 0xffff00, 1);
    
    // Use last movement direction
    const swingAngle = Math.atan2(lastPlayerDirection.y, lastPlayerDirection.x);
    
    // Draw sword arc
    const startAngle = swingAngle - Math.PI / 4;
    const endAngle = swingAngle + Math.PI / 4;
    const radius = weapon.range;
    
    swordSwing.arc(player.x, player.y, radius, startAngle, endAngle);
    swordSwing.strokePath();
    
    // Remove sword effect after 200ms
    scene.time.delayedCall(200, () => {
        swordSwing.destroy();
    });
    
    // Check for zombies in melee range
    zombies.children.entries.forEach(zombie => {
        if (zombie.active) {
            const distance = Phaser.Math.Distance.Between(
                player.x, player.y,
                zombie.x, zombie.y
            );
            
            if (distance < weapon.range) {
                damageZombie(scene, zombie, weapon.damage);
            }
        }
    });
}

function shootProjectile(scene, weapon, type) {
    // Create projectile
    const projectile = projectiles.create(player.x, player.y, type);
    projectile.weaponType = weapon.type;
    projectile.damage = weapon.damage;
    
    // Use last movement direction
    const angle = Math.atan2(lastPlayerDirection.y, lastPlayerDirection.x);
    
    const speed = 300;
    projectile.setVelocity(
        Math.cos(angle) * speed,
        Math.sin(angle) * speed
    );
    
    // Special properties
    if (type === 'star') {
        projectile.bounces = 2;
    }
}

function lightningStrike(scene, weapon) {
    // Compute beam line from player in last facing direction
    const angle = Math.atan2(lastPlayerDirection.y, lastPlayerDirection.x);
    const x1 = player.x;
    const y1 = player.y;
    const length = 900; // extend off-screen
    const x2 = x1 + Math.cos(angle) * length;
    const y2 = y1 + Math.sin(angle) * length;

    // Damage zombies intersecting the beam (within thickness)
    const thickness = 12;
    zombies.children.entries.forEach(zombie => {
        if (!zombie.active) return;
        const d = distancePointToSegment(zombie.x, zombie.y, x1, y1, x2, y2);
        if (d <= thickness) {
            damageZombie(scene, zombie, weapon.damage);
        }
    });

    // Visual beam effect
    const lightning = scene.add.graphics();
    lightning.lineStyle(4, 0xffff00, 1);
    lightning.beginPath();
    lightning.moveTo(x1, y1);
    lightning.lineTo(x2, y2);
    lightning.strokePath();

    scene.time.delayedCall(120, () => {
        lightning.destroy();
    });
}

// Distance from point (px,py) to line segment (x1,y1)-(x2,y2)
function distancePointToSegment(px, py, x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    if (dx === 0 && dy === 0) {
        // Segment is a point
        return Math.hypot(px - x1, py - y1);
    }
    // Project point onto the segment, clamp t to [0,1]
    const t = ((px - x1) * dx + (py - y1) * dy) / (dx * dx + dy * dy);
    const tt = Math.max(0, Math.min(1, t));
    const cx = x1 + tt * dx;
    const cy = y1 + tt * dy;
    return Math.hypot(px - cx, py - cy);
}

function hitZombieWithProjectile(projectile, zombie) {
    damageZombie(this, zombie, projectile.damage);
    
    // Destroy projectile unless it's a bouncing star
    if (projectile.weaponType !== 'bounce') {
        projectile.destroy();
    } else if (projectile.bounces <= 0) {
        projectile.destroy();
    }
}

function damageZombie(scene, zombie, damage) {
    zombie.health = (zombie.health || 20) - damage;
    
    // Flash red
    zombie.setTint(0xff0000);
    scene.time.delayedCall(100, () => {
        zombie.clearTint();
    });
    
    if (zombie.health <= 0) {
        zombie.destroy();
        zombiesKilled++;
        zombiesKilledThisLevel++;
        killCountText.setText(`Kills: ${zombiesKilled}`);
        updateLevelProgress();
        
        // Check for weapon unlocks
        checkWeaponUnlocks();
        
        // Spawn new zombie if not boss level
        if (level < 10) {
            spawnZombies(scene, 1);
        }
    }
}

function checkWeaponUnlocks() {
    // Unlock weapons based on kill count
    if (zombiesKilled === 10) {
        // Throwing Knives unlocked
        updateWeaponDisplay();
    } else if (zombiesKilled === 20) {
        // Ninja Stars unlocked
        updateWeaponDisplay();
    } else if (zombiesKilled === 30) {
        // Fireball unlocked
        updateWeaponDisplay();
    } else if (zombiesKilled === 40) {
        // Lightning unlocked
        updateWeaponDisplay();
    }
}

function useSpecialAbility(scene) {
    const currentTime = Date.now();
    const ability = abilities[currentAbility];
    
    // Check cooldown and uses
    if (currentTime - lastAbilityTime < ability.cooldown || 
        ability.uses >= ability.maxUses) {
        return;
    }
    
    lastAbilityTime = currentTime;
    ability.uses++;
    
    switch(ability.name) {
        case 'Dash':
            dashAbility(scene);
            break;
        case 'Heal':
            healAbility(scene);
            break;
        case 'Time Slow':
            timeSlowAbility(scene);
            break;
    }
    
    updateAbilityDisplay();
}

function dashAbility(scene) {
    // Get movement direction
    let dashX = 0, dashY = 0;
    if (wasd.left.isDown || cursors.left.isDown) dashX = -1;
    if (wasd.right.isDown || cursors.right.isDown) dashX = 1;
    if (wasd.up.isDown || cursors.up.isDown) dashY = -1;
    if (wasd.down.isDown || cursors.down.isDown) dashY = 1;
    
    // Default dash direction if no movement
    if (dashX === 0 && dashY === 0) {
        dashX = 1; // Default to right
    }
    
    // Normalize diagonal
    if (dashX !== 0 && dashY !== 0) {
        dashX *= 0.707;
        dashY *= 0.707;
    }
    
    // Perform dash
    const dashDistance = 100;
    const newX = Math.max(16, Math.min(784, player.x + dashX * dashDistance));
    const newY = Math.max(16, Math.min(584, player.y + dashY * dashDistance));
    
    player.setPosition(newX, newY);
    
    // Visual effect
    player.setTint(0x00ffff);
    scene.time.delayedCall(200, () => {
        player.clearTint();
    });
}

function healAbility(scene) {
    playerHealth = Math.min(100, playerHealth + 50);
    healthText.setText(`HP: ${playerHealth}`);
    
    // Visual effect
    player.setTint(0x00ff00);
    scene.time.delayedCall(500, () => {
        player.clearTint();
    });
}

function timeSlowAbility(scene) {
    timeSlowActive = true;
    
    // Visual effect
    const overlay = scene.add.rectangle(400, 300, 800, 600, 0x0000ff, 0.3);
    
    scene.time.delayedCall(5000, () => {
        timeSlowActive = false;
        overlay.destroy();
    });
}

function hitPlayer(player, zombie) {
    // Damage player
    playerHealth -= 25;
    healthText.setText(`HP: ${playerHealth}`);
    
    // Flash player
    player.setTint(0xff0000);
    this.time.delayedCall(200, () => {
        player.clearTint();
    });
    
    // Push zombie back
    const angle = Phaser.Math.Angle.Between(
        player.x, player.y,
        zombie.x, zombie.y
    );
    zombie.x += Math.cos(angle) * 50;
    zombie.y += Math.sin(angle) * 50;
    
    if (playerHealth <= 0) {
        gameOver(this);
    }
}

function spawnZombies(scene, count) {
    for (let i = 0; i < count; i++) {
        // Random spawn at edges
        const side = Phaser.Math.Between(0, 3);
        let x, y;
        
        switch(side) {
            case 0: // top
                x = Phaser.Math.Between(50, 750);
                y = 50;
                break;
            case 1: // right
                x = 750;
                y = Phaser.Math.Between(50, 550);
                break;
            case 2: // bottom
                x = Phaser.Math.Between(50, 750);
                y = 550;
                break;
            case 3: // left
                x = 50;
                y = Phaser.Math.Between(50, 550);
                break;
        }
        
        const zombie = zombies.create(x, y, 'zombie');
        zombie.health = 20;
        zombie.type = 'basic';
    }
}

function initializeLevel(scene) {
    zombiesKilledThisLevel = 0;
    levelStartTime = gameTime;
    
    if (level === 10) {
        // Boss level
        spawnBoss(scene);
        zombiesRequiredThisLevel = 1;
    } else {
        // Regular level
        const levelData = getLevelData(level);
        zombiesRequiredThisLevel = levelData.zombiesRequired;
        spawnZombies(scene, levelData.initialSpawn);
    }
    
    updateLevelProgress();
}

function getLevelData(levelNum) {
    const levels = [
        { zombiesRequired: 3, initialSpawn: 3, zombieType: 'basic' },
        { zombiesRequired: 5, initialSpawn: 3, zombieType: 'basic' },
        { zombiesRequired: 7, initialSpawn: 4, zombieType: 'basic' },
        { zombiesRequired: 6, initialSpawn: 3, zombieType: 'fast' },
        { zombiesRequired: 8, initialSpawn: 4, zombieType: 'fast' },
        { zombiesRequired: 10, initialSpawn: 5, zombieType: 'fast' },
        { zombiesRequired: 4, initialSpawn: 2, zombieType: 'tank' },
        { zombiesRequired: 6, initialSpawn: 3, zombieType: 'tank' },
        { zombiesRequired: 8, initialSpawn: 4, zombieType: 'tank' },
        { zombiesRequired: 1, initialSpawn: 0, zombieType: 'boss' }
    ];
    
    return levels[levelNum - 1] || levels[0];
}

function spawnBoss(scene) {
    // Spawn boss far from the player's current position to avoid unfair overlap
    const playerX = player.x;
    const playerY = player.y;
    const bossX = playerX < 400 ? 700 : 100;
    const bossY = playerY < 300 ? 500 : 100;
    boss = scene.physics.add.sprite(bossX, bossY, 'boss');
    boss.setCollideWorldBounds(true);
    boss.health = 200;
    bossMaxHealth = 200;
    boss.phase = 1;
    boss.attackTimer = 0;
    boss.minionSpawnTimer = 0;
    
    // Add boss collision
    scene.physics.add.overlap(player, boss, hitPlayer, null, scene);
    scene.physics.add.overlap(projectiles, boss, hitBossWithProjectile, null, scene);
}

function updateBoss() {
    if (!boss || !boss.active) return;
    
    boss.attackTimer += 16; // Assuming 60 FPS
    boss.minionSpawnTimer += 16;
    
    // Boss AI - move towards player
    const angle = Phaser.Math.Angle.Between(
        boss.x, boss.y,
        player.x, player.y
    );
    
    const speed = boss.phase === 1 ? 30 : boss.phase === 2 ? 50 : 70;
    boss.setVelocity(
        Math.cos(angle) * speed,
        Math.sin(angle) * speed
    );
    
    // Spawn minions every 3 seconds
    if (boss.minionSpawnTimer >= 3000) {
        spawnZombies(game.scene.scenes[0], 1);
        boss.minionSpawnTimer = 0;
    }
    
    // Phase transitions
    if (boss.health <= bossMaxHealth * 0.66 && boss.phase === 1) {
        boss.phase = 2;
        boss.setTint(0xff8800);
    } else if (boss.health <= bossMaxHealth * 0.33 && boss.phase === 2) {
        boss.phase = 3;
        boss.setTint(0xff0000);
    }
}

function hitBossWithProjectile(projectile, boss) {
    boss.health -= projectile.damage;
    
    // Flash boss
    boss.setTint(0xff0000);
    game.scene.scenes[0].time.delayedCall(100, () => {
        boss.clearTint();
    });
    
    if (boss.health <= 0) {
        boss.destroy();
        zombiesKilledThisLevel++;
        updateLevelProgress();
    }
    
    // Destroy projectile
    projectile.destroy();
}

function checkLevelCompletion(scene) {
    if (zombiesKilledThisLevel >= zombiesRequiredThisLevel) {
        if (level === 10) {
            // Game complete!
            gameState = 'gameComplete';
            showVictoryScreen(scene);
        } else {
            // Level complete
            gameState = 'levelComplete';
            showLevelCompleteScreen(scene);
        }
    }
}

function showLevelCompleteScreen(scene) {
    
    // Pause game
    scene.physics.pause();
    
    // Show level complete message
    const levelCompleteText = scene.add.text(400, 250, `Level ${level} Complete!`, {
        fontSize: '36px',
        fill: '#00ff00',
        fontFamily: 'Courier New'
    }).setOrigin(0.5);
    
    const nextLevelText = scene.add.text(400, 300, 'Press SPACE to continue', {
        fontSize: '24px',
        fill: '#ffffff',
        fontFamily: 'Courier New'
    }).setOrigin(0.5);
    
    // Remove any existing handler
    if (levelCompleteKeyHandler) {
        scene.input.keyboard.off('keydown-SPACE', levelCompleteKeyHandler);
    }
    
    // Create new handler
    levelCompleteKeyHandler = () => {
        levelCompleteText.destroy();
        nextLevelText.destroy();
        scene.input.keyboard.off('keydown-SPACE', levelCompleteKeyHandler);
        levelCompleteKeyHandler = null;
        nextLevel(scene);
    };
    
    // Wait for space to continue
    scene.input.keyboard.on('keydown-SPACE', levelCompleteKeyHandler);
}

function nextLevel(scene) {
    level++;
    gameState = 'playing';
    
    // Clear all zombies
    zombies.clear(true, true);
    
    // Reset player position
    const spawnX = level === 10 ? 100 : 400;
    const spawnY = level === 10 ? 300 : 300;
    player.setPosition(spawnX, spawnY);
    
    // Reset level-specific counters
    zombiesKilledThisLevel = 0;
    
    // Update level display
    levelText.setText(`Level: ${level}`);
    
    // Initialize new level
    initializeLevel(scene);
    
    // Resume physics
    scene.physics.resume();
}

function showVictoryScreen(scene) {
    
    // Pause game
    scene.physics.pause();
    
    // Calculate final time
    const finalTime = formatTime(gameTime);
    
    // Show victory message
    const victoryText = scene.add.text(400, 200, 'VICTORY!', {
        fontSize: '48px',
        fill: '#ffd700',
        fontFamily: 'Courier New'
    }).setOrigin(0.5);
    
    const timeText = scene.add.text(400, 280, `Final Time: ${finalTime}`, {
        fontSize: '24px',
        fill: '#ffffff',
        fontFamily: 'Courier New'
    }).setOrigin(0.5);
    
    const restartText = scene.add.text(400, 350, 'Press R to Restart', {
        fontSize: '20px',
        fill: '#888888',
        fontFamily: 'Courier New'
    }).setOrigin(0.5);
    
    // Save best time
    saveBestTime(gameTime);
    
    // Wait for restart
    scene.input.keyboard.on('keydown-R', () => {
        location.reload();
    });
}

function saveBestTime(time) {
    const bestTime = localStorage.getItem('zomzoms_best_time');
    if (!bestTime || time < parseInt(bestTime)) {
        localStorage.setItem('zomzoms_best_time', time.toString());
    }
}

function formatTime(time) {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000));
    
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(milliseconds).padStart(3, '0')}`;
}

function updateLevelProgress() {
    if (level === 10) {
        levelProgressText.setText(`Boss: ${boss ? boss.health : 0}/${bossMaxHealth} HP`);
    } else {
        levelProgressText.setText(`Progress: ${zombiesKilledThisLevel}/${zombiesRequiredThisLevel}`);
    }
}

function createHUD(scene) {
    healthText = scene.add.text(16, 16, `HP: ${playerHealth}`, {
        fontSize: '18px',
        fill: '#00ff00',
        fontFamily: 'Courier New'
    });
    
    levelText = scene.add.text(400, 16, `Level: ${level}`, {
        fontSize: '18px',
        fill: '#00ff00',
        fontFamily: 'Courier New'
    }).setOrigin(0.5, 0);
    
    killCountText = scene.add.text(784, 16, `Kills: ${zombiesKilled}`, {
        fontSize: '18px',
        fill: '#00ff00',
        fontFamily: 'Courier New'
    }).setOrigin(1, 0);
    
    weaponText = scene.add.text(16, 50, `Weapon: ${weapons[currentWeapon].name}`, {
        fontSize: '16px',
        fill: '#ffff00',
        fontFamily: 'Courier New'
    });
    
    abilityText = scene.add.text(16, 70, `Ability: ${abilities[currentAbility].name} (${abilities[currentAbility].uses}/${abilities[currentAbility].maxUses})`, {
        fontSize: '16px',
        fill: '#ff8800',
        fontFamily: 'Courier New'
    });
    
    // Cooldown bar
    cooldownBar = scene.add.graphics();
    
    // Level progress
    levelProgressText = scene.add.text(16, 110, 'Progress: 0/0', {
        fontSize: '16px',
        fill: '#00ffff',
        fontFamily: 'Courier New'
    });
    
    timerText = scene.add.text(400, 584, '00:00.000', {
        fontSize: '18px',
        fill: '#ffff00',
        fontFamily: 'Courier New'
    }).setOrigin(0.5, 1);
    
    // Instructions
    scene.add.text(16, 550, '1-5: Switch Weapons | Shift: Special Ability', {
        fontSize: '14px',
        fill: '#888888',
        fontFamily: 'Courier New'
    });
}

function updateWeaponDisplay() {
    weaponText.setText(`Weapon: ${weapons[currentWeapon].name}`);
}

function updateAbilityDisplay() {
    abilityText.setText(`Ability: ${abilities[currentAbility].name} (${abilities[currentAbility].uses}/${abilities[currentAbility].maxUses})`);
}

function updateCooldownBar() {
    const currentTime = Date.now();
    const weapon = weapons[currentWeapon];
    const timeSinceLastAttack = currentTime - lastAttackTime;
    const cooldownProgress = Math.min(1, timeSinceLastAttack / weapon.cooldown);
    
    // Clear previous bar
    cooldownBar.clear();
    
    // Draw cooldown bar background
    cooldownBar.fillStyle(0x333333, 1);
    cooldownBar.fillRect(16, 90, 200, 8);
    
    // Draw cooldown progress
    if (cooldownProgress < 1) {
        cooldownBar.fillStyle(0xff0000, 1);
        cooldownBar.fillRect(16, 90, 200 * cooldownProgress, 8);
    } else {
        cooldownBar.fillStyle(0x00ff00, 1);
        cooldownBar.fillRect(16, 90, 200, 8);
    }
    
    // Draw border
    cooldownBar.lineStyle(1, 0xffffff, 1);
    cooldownBar.strokeRect(16, 90, 200, 8);
}

function updateTimer() {
    const minutes = Math.floor(gameTime / 60000);
    const seconds = Math.floor((gameTime % 60000) / 1000);
    const milliseconds = Math.floor((gameTime % 1000));
    
    const timeString = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(milliseconds).padStart(3, '0')}`;
    timerText.setText(timeString);
}

function gameOver(scene) {
    scene.add.text(400, 300, 'GAME OVER', {
        fontSize: '48px',
        fill: '#ff0000',
        fontFamily: 'Courier New'
    }).setOrigin(0.5);
    
    scene.add.text(400, 360, 'Press R to Restart', {
        fontSize: '24px',
        fill: '#ffffff',
        fontFamily: 'Courier New'
    }).setOrigin(0.5);
    
    scene.physics.pause();
    
    scene.input.keyboard.on('keydown-R', () => {
        location.reload();
    });
}

function generateSprites(scene) {
    // Generate player sprite (ninja)
    const playerGraphics = scene.make.graphics({ x: 0, y: 0, add: false });
    playerGraphics.fillStyle(0x000000, 1);
    playerGraphics.fillRect(4, 0, 8, 16);
    playerGraphics.fillStyle(0xff0000, 1);
    playerGraphics.fillRect(0, 4, 16, 8);
    playerGraphics.fillStyle(0xffd700, 1);
    playerGraphics.fillRect(6, 2, 4, 4);
    playerGraphics.generateTexture('player', 16, 16);
    playerGraphics.destroy();
    
    // Generate zombie sprite
    const zombieGraphics = scene.make.graphics({ x: 0, y: 0, add: false });
    zombieGraphics.fillStyle(0x00ff00, 1);
    zombieGraphics.fillRect(4, 0, 8, 16);
    zombieGraphics.fillStyle(0x008800, 1);
    zombieGraphics.fillRect(0, 4, 16, 8);
    zombieGraphics.fillStyle(0xff0000, 1);
    zombieGraphics.fillRect(6, 6, 2, 2);
    zombieGraphics.fillRect(10, 6, 2, 2);
    zombieGraphics.generateTexture('zombie', 16, 16);
    zombieGraphics.destroy();
    
    // Generate throwing knife sprite
    const knifeGraphics = scene.make.graphics({ x: 0, y: 0, add: false });
    knifeGraphics.fillStyle(0x888888, 1);
    knifeGraphics.fillRect(6, 0, 4, 12);
    knifeGraphics.fillStyle(0x444444, 1);
    knifeGraphics.fillRect(4, 12, 8, 4);
    knifeGraphics.generateTexture('knife', 16, 16);
    knifeGraphics.destroy();
    
    // Generate ninja star sprite
    const starGraphics = scene.make.graphics({ x: 0, y: 0, add: false });
    starGraphics.fillStyle(0xcccccc, 1);
    starGraphics.fillRect(6, 0, 4, 16);
    starGraphics.fillRect(0, 6, 16, 4);
    starGraphics.fillRect(2, 2, 12, 12);
    starGraphics.generateTexture('star', 16, 16);
    starGraphics.destroy();
    
    // Generate fireball sprite
    const fireballGraphics = scene.make.graphics({ x: 0, y: 0, add: false });
    fireballGraphics.fillStyle(0xff4400, 1);
    fireballGraphics.fillCircle(8, 8, 8);
    fireballGraphics.fillStyle(0xff8800, 1);
    fireballGraphics.fillCircle(8, 8, 6);
    fireballGraphics.fillStyle(0xffff00, 1);
    fireballGraphics.fillCircle(8, 8, 4);
    fireballGraphics.generateTexture('fireball', 16, 16);
    fireballGraphics.destroy();
    
    // Generate boss sprite
    const bossGraphics = scene.make.graphics({ x: 0, y: 0, add: false });
    bossGraphics.fillStyle(0x800080, 1);
    bossGraphics.fillRect(2, 0, 12, 16);
    bossGraphics.fillStyle(0x400040, 1);
    bossGraphics.fillRect(0, 2, 16, 12);
    bossGraphics.fillStyle(0xff0000, 1);
    bossGraphics.fillRect(4, 4, 8, 8);
    bossGraphics.fillStyle(0xffff00, 1);
    bossGraphics.fillRect(6, 6, 4, 4);
    bossGraphics.generateTexture('boss', 16, 16);
    bossGraphics.destroy();
}
