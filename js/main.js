var game = new Phaser.Game({
    type: Phaser.AUTO,
    antialias: false,
    width: 800,
    height: 620,
    physics: {
        default: 'arcade',
        arcade: { debug: false }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
});

/**
 * Preload function - runs before the create()
 */
function preload() {
    this.load.image('background', 'img/background.png');
    this.load.multiatlas('adventurer', 'img/adventurer.json', 'img');
}

/**
 * Create function - runs one time
 */
function create() {
    // Background
    background = this.add.tileSprite(0, 0, 2000, 620, 'background');
    background.originX = 0;
    background.originY = 0;

    // Ground
    ground = this.physics.add.image(0, 870, 'background').setVisible(false).setImmovable();

    // Adventurer
    adventurer = new Adventurer(this);

    // Enemies
    ghost = new Ghost(this);

    // Collisions
    this.physics.add.collider(adventurer.sprite, ground);
    this.physics.add.collider(ghost.sprite, ground);
    this.physics.add.overlap(adventurer.sprite, ghost.sprite, enemiesOverlap);

    // Camera
    this.cameras.main.setBounds(0, 0, 2000, 620);
    this.cameras.main.startFollow(adventurer.sprite, true);
    this.cameras.main.setZoom(2);
    this.cameras.main.fadeIn(1000);

    // Keys
    cursors = this.input.keyboard.createCursorKeys();
}

/**
 * Update function - runs at every frame
 */
function update() {
    // Jump
    if (cursors.up.isDown && !adventurer.isJumping && !adventurer.isFalling) {
        adventurer.jump();
    }

    // Attack
    if (cursors.space.isDown || adventurer.isAttacking) {
        adventurer.attack();
    } else {
        // Movement
        if (cursors.left.isDown) {
            adventurer.moveLeft();
        } else if (cursors.right.isDown) {
            adventurer.moveRight();
        } else if (!adventurer.isJumping && !adventurer.isFalling) {
            adventurer.stop();
        }
    }

    // Resets "isFalling" adventurer status
    if (adventurer.sprite.body.touching.down) {
        adventurer.setIsFalling(false);
    }
}

/**
 * Callback for sprites overlap
 * 
 * @param {object} player 
 * @param {object} enemy 
 */
function enemiesOverlap(player, enemy) {
    if (adventurer.getIsAttacking()) {
        ghost.die();
    } else {
        // Kills the hero
    }
}