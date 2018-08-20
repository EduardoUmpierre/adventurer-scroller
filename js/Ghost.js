/**
 * Ghost class
 * 
 * @param {object} _this 
 */
var Ghost = function(_this) {
    this.isDead = false;

    this.sprite = _this.physics.add.sprite(250, 510, 'adventurer', 'ghost-idle-00.png');
    this.resetSize();
    this.sprite.setScale(1.5);
    this.sprite.setCollideWorldBounds(true);
    this.sprite.body.setGravityY(300);

    this.setUpAnimations(_this);

    this.sprite.anims.play('ghost-idle', true);

    this.sprite.on('animationcomplete', this.onAnimationComplete, this);
}

/**
 * Animations
 * 
 * @param {object} _this 
 */
Ghost.prototype.setUpAnimations = function(_this) {
    var idleAnimationFrames = _this.anims.generateFrameNames('adventurer', {
        start: 0, end: 6, zeroPad: 2, prefix: 'ghost-idle-', suffix: '.png'
    });

    var dieAnimationFrames = _this.anims.generateFrameNames('adventurer', {
        start: 0, end: 6, zeroPad: 2, prefix: 'ghost-die-', suffix: '.png'
    });

    _this.anims.create({ key: 'ghost-idle', frames: idleAnimationFrames, frameRate: 7, repeat: -1 });
    _this.anims.create({ key: 'ghost-die', frames: dieAnimationFrames, frameRate: 7, repeat: 0 });
}

/**
 * Resets the sprite to the optimized bound size
 */
Ghost.prototype.resetSize = function () {
    this.sprite.setSize(30, 60);
}

/**
 * Kills the ghost
 */
Ghost.prototype.die = function() {
    // Only run if he is alive
    if (!this.isDead) {
        this.isDead = true;
        this.sprite.anims.play('ghost-die', true);
    }
}

/**
 * Animation complete callback
 * 
 * @param {object} animation 
 * @param {object} frame
 */
Ghost.prototype.onAnimationComplete = function(animation, frame) {
    if (animation.key === 'ghost-die') {
        this.sprite.visible = false;
    }
}