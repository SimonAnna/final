game.PlayerEntity = me.Entity.extend({
    init: function(x, y, settings) {
        this.setSuper();
        this.setPlayerTimers();
        this.setAtributes();
        this.setFlags();
        this.type = "playerEntity";

        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);

        this.addAnimation();

        this.renderable.setCurrentAnimation("idle");
    },
    addAnimation: function() {
        this.renderable.addAnimation("idle", [0]);
        this.renderable.addAnimation("walk", [0, 1, 2, 3, 4, 5, 6, 7, 8], 80);
        this.renderable.addAnimation("attack", [9, 10, 11, 12], 100);
    },
    setFlags: function() {
        this.facing = "right";
        this.dead = false;
        this.attacking = false;
    },
    setAtributes: function() {
        this.health = game.data.playerHealth;
        this.body.setVelocity(game.data.playerMoveSpeed);
    },
    setPlayerTimers: function() {
        this.now = new Date().getTime();
        this.lastHit = this.now;
        this.lastAttack = new Date().getTime();
    },
    setSuper: function(x, y, settings) {
        this._super(me.Entity, 'init', [x, y, {
                image: "sprieattack",
                width: 64,
                height: 64,
                spritewidth: "120",
                spriteheight: "120",
                getShape: function() {
                    return(new me.Rect(0, 0, 120, 120)).toPolygon();
                }

            }]);
    },
    update: function(delta) {
        this.now = new Date().getTime();

        this.dead = this.checkIfDead();

        this.checkKeyPressesAndMove();

        this.setAnimation();

        me.collision.check(this, true, this.collideHandler.bind(this), true);
        this.body.update(delta);

        this._super(me.Entity, "update", [delta]);
        return true;
    },
    checkIfDead: function() {
        if (this.health <= 0) {
            return true;
            //me.state.change(me.state.MENU);
        }

        return false;
    },
    checkKeyPressesAndMove: function() {
        if (me.input.isKeyPressed("right")) {
            //flip on x axis
            this.flipX(false);
            this.body.vel.x += this.body.accel.x * me.timer.tick;
            this.facing = "right";
            //move left
        } else if (me.input.isKeyPressed("left")) {
            this.flipX(true);
            this.body.vel.x -= this.body.accel.x * me.timer.tick;
            this.facing = "left";
        } else {
            this.body.vel.x = 0;
        }
        //jump
        if (me.input.isKeyPressed('up')) {
            if (!this.body.jumping && !this.body.falling) {
                this.body.vel.y = -this.body.maxVel.y * me.timer.tick;
                this.body.jumping = true;
            }
        }
        //run...OR YOU DIE
        if (me.input.isKeyPressed("space")) {
            this.body.setVelocity(10, 20);
        } else {
            this.body.setVelocity(5, 20);
        }

        this.attacking = me.input.isKeyPressed("attack");
    },
    setAnimation: function() {
        if (this.attacking) {

            if (!this.renderable.isCurrentAnimation("attack")) {

                this.renderable.setCurrentAnimation("attack", "idle");
                this.renderable.setAnimationFrame();
            }
        }

        else if (this.body.vel.x !== 0) {
            if (!this.renderable.isCurrentAnimation("walk")) {
                this.renderable.setCurrentAnimation("walk");

            }
        } else {
            this.renderable.setCurrentAnimation("idle");
        }
    },
    loseHealth: function(damage) {
        this.health = this.health - damage;
    },
    collideHandler: function(response) {
        
        if (response.b.type === 'EnemyCreep') {
            this.collideWithCreep(response);
        }
    },
    
    collideWithCreep: function(response) {
        var xdif = this.pos.x - response.b.pos.x;
        var ydif = this.pos.y - response.b.pos.y;
        if (xdif > 0) {
            this.pos.x = this.pos.x + 1;
            if (this.facing === "left") {
                this.body.vel.x = 0;
            }
        } else {
            this.pos.x = this.pos.x - 1;
            if (this.facing === "right") {
                this.body.vel.x = 0;
            }
        }
        if (this.renderable.isCurrentAnimation("attack") && this.now - this.lastHit >= 1000
                && (Math.abs(ydif) <= 40 &&
                        ((xdif) && this.facing === "left") || ((xdif < 0) && this.facing === "right")
                        )) {
            this.lastHit = this.now;
            if (response.b.health <= game.data.playerAttack) {
               
            }
            response.b.loseHealth(1);
        }
    }
});

game.EnemyCreep = me.Entity.extend({
    init: function(x, y, settings) {
        this._super(me.Entity, 'init', [x, y, {
                image: "creep1",
                width: 32,
                height: 64,
                spritewidth: "32",
                spriteheight: "64",
                getShape: function() {
                    return (new me.Rect(0, 0, 32, 64)).toPolygon();
                }
            }]);
        this.health = 3;
        this.alwaysUpdate = true;
        this.attacking = false;
        this.lastAttacking = new Date().getTime();
        this.lastHit = new Date().getTime();
        this.now = new Date().getTime();
        this.body.setVelocity(3, 20);

        this.type = "EnemyCreep";

        this.renderable.addAnimation("walk", [3, 4, 5], 80);
        this.renderable.setCurrentAnimation("walk");


    },
    update: function(delta) {
        if (this.health <= 0) {
            me.game.world.removeChild(this);
        }

        this.now = new Date().getTime();
        this.body.vel.x -= this.body.accel.x * me.timer.tick;

        me.collision.check(this, true, this.collideHandler.bind(this), true);

        this.body.update(delta);

        this._super(me.Entity, "update", [delta]);

        return true;
    },
    loseHealth: function(damage) {
        this.health = this.health - damage;
    },
    collideHandler: function(response) {
        if (response.b.type === 'playerEntity') {
            this.attacking = true;
            this.lastAttacking = this.now;
            this.body.vel.x = 0;
            this.pos.x = this.pos.x + 1;
            if ((this.now - this.lastHit >= 1000)) {
                this.lastHit = this.now;
                response.b.loseHealth(1);
            }

        } 
    }
});

