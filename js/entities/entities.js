game.PlayerEntity = me.Entity.extend({
    init: function(x, y, settings) {
        this._super(me.Entity, 'init', [x, y, {
                //sets player hitbox and size
                image: "player",
                width: 64,
                height: 64,
                spritewidth: "64",
                spriteheight: "64",
                getShape: function() {
                    return(new me.Rect(0, 0, 64, 64)).toPolygon();
                }
               

            }]);
        this.body.setVelocity(5, 20);
        this.health = 20;

        this.type = "player1";
        this.renderable.addAnimation("idle", [13]);
        this.renderable.addAnimation("walk", [ 121, 122, 123, 124], 100);
        this.renderable.addAnimation("attack", [ 169, 170, 171,172,173], 80);

        this.renderable.setCurrentAnimation("idle");
        this.flipX(true);
        this.facing = "right";
        this.dead = false;
        this.attacking = false;

        this.now = new Date().getTime();
        this.lastHit = this.now;
        this.lastAttack = new Date().getTime();
    },
    
    loseHealth: function(damage) {
        console.log (this.health);
        this.health = this.health - damage;
        
    },
    
    update: function(delta) {
        if (me.input.isKeyPressed("right")) {
            //flip on x axis
            this.flipX(true);
            this.body.vel.x += this.body.accel.x * me.timer.tick;
            this.facing = "right";
            //move left
        } else if (me.input.isKeyPressed("left")) {
            this.flipX(false);
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
        if (me.input.isKeyPressed("attack")) {

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
        if (this.health <= 0) {
            me.state.change(me.state.P2);
        }
        this.now = new Date().getTime();

        me.collision.check(this, true, this.collideHandler.bind(this), true);
        
        this.body.update(delta);

        this._super(me.Entity, "update", [delta]);
        return true;
    },
    
    collideHandler: function(response) {
        if (response.b.type === 'player2') {
            this.collideWithPlayer2(response);
        }
    },
    
    collideWithPlayer2: function(response) {
        var xdif = this.pos.x - response.b.pos.x;
        var ydif = this.pos.y - response.b.pos.y;
        if (xdif < 90 && this.facing === 'right' && (xdif < 0)) {
            this.body.vel.x = 0;
            this.pos.x = this.pos.x - 1;
            }
        if (xdif > -90 && this.facing === 'left' && (xdif > 0)) {
            this.body.vel.x = 0;
            this.pos.x = this.pos.x + 1;
        }
        if (this.renderable.isCurrentAnimation("attack") && this.now - this.lastHit >= 1000
                && (Math.abs(ydif) <= 40 &&
                        ((xdif) && this.facing === "left") || ((xdif < 0) && this.facing === "right")
                        )) {
            this.lastHit = this.now;
            response.b.loseHealth(1);
        }
    }

});

game.PlayerEntity2 = me.Entity.extend({
    init: function(x, y, settings) {
        this._super(me.Entity, 'init', [x, y, {
                image: "player2",
                width: 64,
                height: 64,
                spritewidth: "64",
                spriteheight: "64",
                getShape: function() {
                    return(new me.Rect(0, 0, 64, 64)).toPolygon();
                }

            }]);
        this.body.setVelocity(5, 20);

        this.renderable.addAnimation("idle", [13]);
        this.renderable.addAnimation("walk", [ 121, 122, 123, 124], 100);
        this.renderable.addAnimation("attack", [ 169, 170, 171,172,173], 80);

        this.renderable.setCurrentAnimation("idle");

        this.facing = "left";
        this.dead = false;
        this.attacking = false;

        this.health = 20;

        this.now = new Date().getTime();
        this.lastHit = this.now;
        this.lastAttack = new Date().getTime();
        this.type = "player2"
    },
    
    loseHealth: function(damage) {
        this.health = this.health - damage;
    },
    
    update: function(delta) {
        if (me.input.isKeyPressed("right2")) {
            //flip on x axis
            this.flipX(true);
            this.body.vel.x += this.body.accel.x * me.timer.tick;
            this.facing = "right";
            //move left
        } else if (me.input.isKeyPressed("left2")) {
            this.flipX(false);
            this.body.vel.x -= this.body.accel.x * me.timer.tick;
            this.facing = "left";
        } else {
            this.body.vel.x = 0;
        }
        //jump
        if (me.input.isKeyPressed('up2')) {
            if (!this.body.jumping && !this.body.falling) {
                this.body.vel.y = -this.body.maxVel.y * me.timer.tick;
                this.body.jumping = true;
            }
        }
        //run...OR YOU DIE
        if (me.input.isKeyPressed("space2")) {
            this.body.setVelocity(10, 20);
        } else {
            this.body.setVelocity(5, 20);
        }
        if (me.input.isKeyPressed("attack2")) {

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
        if (this.health <= 0) {
            me.state.change(me.state.P1);
        }
        this.now = new Date().getTime();

        me.collision.check(this, true, this.collideHandler.bind(this), true);
        
        this.body.update(delta);

        this._super(me.Entity, "update", [delta]);
        return true;
        
    },
    
    collideHandler: function(response) {
        if (response.b.type === 'player1') {
            this.collideWithPlayer1(response);
        }
    },
    
    collideWithPlayer1: function(response) {
        var xdif = this.pos.x - response.b.pos.x;
        var ydif = this.pos.y - response.b.pos.y;

        if (xdif < 90 && this.facing === 'right' && (xdif < 0)) {
            this.body.vel.x = 0;
            this.pos.x = this.pos.x - 1;
            }
        if (xdif > -90 && this.facing === 'left' && (xdif > 0)) {
            this.body.vel.x = 0;
            this.pos.x = this.pos.x + 1;
        }
        if (this.renderable.isCurrentAnimation("attack") && this.now - this.lastHit >= 1000
                && (Math.abs(ydif) <= 40 &&
                        ((xdif) && this.facing === "left") || ((xdif < 0) && this.facing === "right")
                        )) {
            this.lastHit = this.now;
            response.b.loseHealth(1);
        }
    }

});


