# ZomZoms Game Specification

## Game Overview

**Title:** ZomZoms  
**Genre:** Top-down survival action game  
**Platform:** Web browser (JavaScript)  
**Graphics Style:** 8-bit pixel art  
**Target Audience:** Casual to hardcore gamers, speedrunners  

## Core Gameplay

### Objective
Play as a ninja warrior fighting off waves of zombies in a top-down arena. Defeat enemies to unlock new weapons and abilities, progressing through increasingly difficult levels until reaching the final boss. Complete the game as quickly as possible to achieve the best time.

### Game Flow
1. **Start Screen** - Title, instructions, and "Start Game" button
2. **Level Progression** - 10 levels total (9 regular levels + 1 boss level)
3. **Victory Screen** - Completion time display and speedrun leaderboard
4. **Game Over Screen** - Restart option and best time display

## Player Character

### Ninja Warrior
- **Movement:** 8-directional movement (WASD or arrow keys)
- **Health:** 100 HP (3 hits to defeat)
- **Speed:** Moderate movement speed
- **Size:** 16x16 pixels
- **Starting Weapon:** Basic sword (melee range)

### Controls
- **Movement:** WASD or Arrow Keys
- **Attack:** Spacebar or Left Mouse Button
- **Special Ability:** Right Mouse Button or Shift
- **Pause:** Escape key

## Enemies

### Zombie Types
1. **Basic Zombie** (Levels 1-3)
   - Health: 20 HP
   - Speed: Slow
   - Damage: 25 HP per hit
   - Behavior: Moves directly toward player
   - Spawn Rate: 3-5 per wave

2. **Fast Zombie** (Levels 4-6)
   - Health: 15 HP
   - Speed: Fast
   - Damage: 20 HP per hit
   - Behavior: Moves toward player with slight pathfinding
   - Spawn Rate: 4-6 per wave

3. **Tank Zombie** (Levels 7-9)
   - Health: 60 HP
   - Speed: Very slow
   - Damage: 40 HP per hit
   - Behavior: Moves slowly but relentlessly toward player
   - Spawn Rate: 2-3 per wave

4. **Zombie Boss** (Level 10)
   - Health: 200 HP
   - Speed: Variable (slow to fast phases)
   - Damage: 50 HP per hit
   - Behavior: Multiple attack patterns, spawns minions
   - Special: 3 phases with different abilities

## Weapons & Abilities

### Unlock System
- Defeat 10 zombies to unlock the next weapon/ability
- Weapons unlock in sequence
- Each level introduces 1-2 new items

### Weapon Progression
1. **Basic Sword** (Starting)
   - Damage: 25 HP
   - Range: Melee (32px)
   - Attack Speed: 1.0s cooldown

2. **Throwing Knives** (Level 2)
   - Damage: 20 HP
   - Range: Ranged (200px)
   - Attack Speed: 0.8s cooldown
   - Special: Pierces through enemies

3. **Ninja Stars** (Level 3)
   - Damage: 15 HP
   - Range: Ranged (150px)
   - Attack Speed: 0.5s cooldown
   - Special: Bounces between enemies

4. **Fireball** (Level 4)
   - Damage: 35 HP
   - Range: Ranged (250px)
   - Attack Speed: 1.5s cooldown
   - Special: Area damage (50px radius)

5. **Lightning Strike** (Level 5)
   - Damage: 40 HP
   - Range: Global
   - Attack Speed: 2.0s cooldown
   - Special: Hits all enemies on screen

### Special Abilities
1. **Dash** (Level 3)
   - Effect: Quick movement in any direction
   - Cooldown: 3 seconds
   - Range: 100px
   - Special: Invulnerable during dash

2. **Heal** (Level 6)
   - Effect: Restore 50 HP
   - Cooldown: 10 seconds
   - Uses: 3 per level

3. **Time Slow** (Level 8)
   - Effect: Slow all enemies by 50% for 5 seconds
   - Cooldown: 15 seconds
   - Uses: 2 per level

## Level Design

### Arena Layout
- **Size:** 800x600 pixels
- **Style:** Simple grass/dirt background with stone borders
- **Obstacles:** Randomly placed rocks/trees (20% of arena)
- **Spawn Points:** 8 fixed positions around the arena perimeter

### Level Progression
- **Level 1:** 3 Basic Zombies, 1 wave
- **Level 2:** 5 Basic Zombies, 2 waves
- **Level 3:** 7 Basic Zombies, 2 waves
- **Level 4:** 4 Fast Zombies, 2 waves
- **Level 5:** 6 Fast Zombies, 3 waves
- **Level 6:** 8 Fast Zombies, 3 waves
- **Level 7:** 2 Tank Zombies, 2 waves
- **Level 8:** 3 Tank Zombies, 2 waves
- **Level 9:** 4 Tank Zombies, 3 waves
- **Level 10:** 1 Zombie Boss, continuous minion spawns

## Technical Specifications

### Game Engine
- **Framework:** Phaser 3 (recommended) or PixiJS
- **Canvas:** HTML5 Canvas
- **Resolution:** 800x600 pixels
- **Target FPS:** 60 FPS
- **Browser Support:** Chrome, Firefox, Safari, Edge (latest versions)

### Graphics
- **Style:** 8-bit pixel art
- **Color Palette:** 16-color palette
- **Sprite Size:** 16x16 pixels (characters), 32x32 pixels (boss)
- **Animation:** 2-4 frames per animation
- **Background:** Simple tiled pattern

### Audio
- **Music:** Chiptune background music (optional)
- **Sound Effects:** 8-bit style SFX for:
  - Player movement
  - Weapon attacks
  - Enemy hits/deaths
  - Level completion
  - Game over

### Data Storage
- **Local Storage:** Browser localStorage
- **Saved Data:**
  - Best completion time
  - Speedrun leaderboard (top 10)
  - Unlocked achievements
  - Game settings (sound, controls)

## Performance Requirements

### Minimum Specifications
- **CPU:** Modern dual-core processor
- **RAM:** 2GB
- **Browser:** HTML5 Canvas support
- **Network:** Offline play supported

### Optimization
- Object pooling for enemies and projectiles
- Sprite batching for efficient rendering
- Efficient collision detection
- Memory management for long play sessions

## User Interface

### HUD Elements
- **Health Bar:** Top-left corner
- **Weapon Display:** Top-center
- **Enemy Counter:** Top-right corner
- **Timer:** Bottom-center
- **Special Ability Cooldowns:** Bottom-left

### Menus
- **Main Menu:** Start Game, Settings, Leaderboard
- **Pause Menu:** Resume, Restart, Main Menu
- **Game Over:** Restart, Main Menu, Time Display
- **Victory:** New Best Time, Main Menu, Leaderboard

## Speedrunning Features

### Timing System
- **Start:** When player moves for the first time
- **End:** When boss is defeated
- **Display:** MM:SS.mmm format
- **Pause:** Timer pauses during pause menu

### Leaderboard
- **Storage:** Top 10 times in localStorage
- **Display:** Name, Time, Date
- **Validation:** Basic anti-cheat (reasonable time limits)

## Development Phases

### Phase 1: Core Gameplay (Week 1-2)
- Basic player movement and controls
- Simple zombie AI and spawning
- Basic sword combat
- Collision detection
- Health system

### Phase 2: Weapons & Abilities (Week 3)
- Weapon unlock system
- Throwing knives and ninja stars
- Special abilities (dash, heal)
- UI for weapon selection

### Phase 3: Level Progression (Week 4)
- Level system implementation
- Different zombie types
- Boss battle mechanics
- Victory/defeat screens

### Phase 4: Polish & Features (Week 5)
- 8-bit graphics and animations
- Sound effects and music
- Speedrun timing system
- Local storage integration
- Performance optimization

## Future Enhancements

### Potential Additions
- **New Game Modes:** Endless mode, Time attack
- **More Weapons:** Boomerang, Ice shards, Poison darts
- **Power-ups:** Temporary speed boost, damage multiplier
- **Achievements:** Kill streaks, no-hit runs, speed milestones
- **Multiplayer:** Co-op mode for 2 players
- **Level Editor:** Custom level creation tool

### Technical Improvements
- **WebGL Rendering:** For better performance
- **Progressive Web App:** Installable game
- **Mobile Support:** Touch controls for mobile devices
- **Cloud Saves:** Cross-device progress sync

## Success Metrics

### Completion Criteria
- [ ] All 10 levels playable
- [ ] All weapons and abilities functional
- [ ] Boss battle working correctly
- [ ] Speedrun timing accurate
- [ ] Local storage working
- [ ] 60 FPS performance on target devices
- [ ] Cross-browser compatibility

### Quality Standards
- Smooth gameplay experience
- Intuitive controls
- Clear visual feedback
- Balanced difficulty curve
- Engaging progression system
- Replayability through speedrunning

---

**Document Version:** 1.0  
**Last Updated:** [Current Date]  
**Next Review:** After Phase 1 completion
