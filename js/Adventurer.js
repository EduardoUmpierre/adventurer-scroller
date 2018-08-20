/**
 * Adventurer class
 * 
 * @param {object} _this 
 */
var Adventurer = function (_this) {
    this.walk = {
        right: true,
        left: false
    }

    this.isAttacking = false;
    this.isJumping = false;
    this.isFalling = true;

    this.sprite = _this.physics.add.sprite(50, 0, 'adventurer', 'adventurer-run-00.png');
    this.resetSize();
    this.sprite.setScale(1.5);
    this.sprite.setCollideWorldBounds(true);
    this.sprite.body.setGravityY(300);

    this.setUpAnimations(_this);

    this.sprite.on('animationcomplete', this.onAnimationComplete, this);
    this.sprite.on('animationstart', this.onAnimationStart, this);

    console.log(this.sprite);

    this.sprite.anims.play('adventurer-fall', true);
}

/**
 * Stops the adventurer movement
 */
Adventurer.prototype.stop = function () {
    this.sprite.setVelocityX(0);
    this.sprite.anims.play('adventurer-idle', true);
}

/**
 * Moves the adventurer to left
 * 
 * @todo Refactor this
 */
Adventurer.prototype.moveLeft = function () {
    this.sprite.setVelocityX(-160);

    if (!this.isJumping && !this.isFalling) {
        this.sprite.anims.play('adventurer-run', true);
    }

    if (this.walk.right) {
        this.sprite.setFlip(true, false);
    }

    this.walk.right = false;
    this.walk.left = true;
}

/**
 * Moves the adventurer to right
 * 
 * @todo Refactor this
 */
Adventurer.prototype.moveRight = function () {
    this.sprite.setVelocityX(160);

    if (!this.isJumping && !this.isFalling) {
        this.sprite.anims.play('adventurer-run', true);
    }

    if (this.walk.left) {
        this.sprite.setFlip(false, false);
    }

    this.walk.right = true;
    this.walk.left = false;
}

/**
 * Primary attack
 */
Adventurer.prototype.attack = function () {
    this.isAttacking = true;

    this.sprite.setSize(50, 37);

    if (!this.isJumping && !this.isFalling) {
        this.sprite.setVelocityX(0);
        this.sprite.anims.play('adventurer-attack', true);
    } else {
        this.sprite.anims.play('adventurer-jumpAttack', true);
    }
}

/**
 * Jump
 */
Adventurer.prototype.jump = function () {
    this.isJumping = true;
    this.sprite.setVelocityY(-160);
    this.sprite.anims.play('adventurer-jump', true);
}

/**
 * Animations
 * 
 * @param {object} _this 
 */
Ghost.prototype.setUpAnimations = function (_this) {
    var runAnimationFrames = _this.anims.generateFrameNames('adventurer', {
        start: 0, end: 5, zeroPad: 2, prefix: 'adventurer-run-', suffix: '.png'
    });

    var idleAnimationFrames = _this.anims.generateFrameNames('adventurer', {
        start: 0, end: 3, zeroPad: 2, prefix: 'adventurer-idle-', suffix: '.png'
    });

    var attackAnimationFrames = _this.anims.generateFrameNames('adventurer', {
        start: 0, end: 4, zeroPad: 2, prefix: 'adventurer-attack1-', suffix: '.png'
    });

    var jumpAnimationFrames = _this.anims.generateFrameNames('adventurer', {
        start: 0, end: 3, zeroPad: 2, prefix: 'adventurer-jump-', suffix: '.png'
    });

    var fallAnimationFrames = _this.anims.generateFrameNames('adventurer', {
        start: 0, end: 1, zeroPad: 2, prefix: 'adventurer-fall-', suffix: '.png'
    });

    var jumpAttackAnimationFrames = _this.anims.generateFrameNames('adventurer', {
        start: 0, end: 3, zeroPad: 2, prefix: 'adventurer-air-attack1-', suffix: '.png'
    });

    _this.anims.create({ key: 'adventurer-run', frames: runAnimationFrames, frameRate: 6, repeat: -1 });
    _this.anims.create({ key: 'adventurer-idle', frames: idleAnimationFrames, frameRate: 4, repeat: -1 });
    _this.anims.create({ key: 'adventurer-attack', frames: attackAnimationFrames, frameRate: 10, repeat: 0 });
    _this.anims.create({ key: 'adventurer-jumpAttack', frames: jumpAttackAnimationFrames, frameRate: 8, repeat: 0 });
    _this.anims.create({ key: 'adventurer-jump', frames: jumpAnimationFrames, frameRate: 20, repeat: 0 });
    _this.anims.create({ key: 'adventurer-fall', frames: fallAnimationFrames, frameRate: 4, repeat: -1 });
}

/**
 * Animation complete callback
 * 
 * @param {object} animation 
 * @param {object} frame
 */
Adventurer.prototype.onAnimationComplete = function (animation, frame) {
    if (animation.key === 'adventurer-attack' || animation.key === 'adventurer-jumpAttack') {
        this.isAttacking = false;
        this.resetSize();
    }

    if (animation.key === 'adventurer-jump') {
        this.isJumping = false;
        this.isFalling = true;
        this.sprite.anims.play('adventurer-fall', true);
    }
}

/**
 * Animation complete callback
 * 
 * @param {object} animation 
 * @param {object} frame
 */
Adventurer.prototype.onAnimationStart = function (animation, frame) {
    if (animation.key === 'adventurer-jump') {
        //
    }
}

/**
 * Sets the isFalling property value
 * 
 * @param {bool} status 
 */
Adventurer.prototype.setIsFalling = function (status) {
    this.isFalling = status;
}

/**
 * Gets the isAttacking property value
 */
Adventurer.prototype.getIsAttacking = function () {
    return this.isAttacking;
}

/**
 * Resets the sprite to the optimized bound size
 * @todo Review this
 */
Adventurer.prototype.resetSize = function () {
    this.sprite.setSize(25, 37);
}