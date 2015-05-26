game.PlayScreen = me.ScreenObject.extend({
	/**
	 *  action to perform on state change
	 */
        
	onResetEvent: function() {
		// reset the score
		game.data.score = 0;
                me.levelDirector.loadLevel("map1");
                
               var player = me.pool.pull("player", 0, 420, {});
                me.game.world.addChild(player, 5);
                
                var player2 = me.pool.pull("player2", 1000, 420, {});
                me.game.world.addChild(player2, 5);
		// add our HUD to the game world
		this.HUD = new game.HUD.Container();
		me.game.world.addChild(this.HUD);
                
                  me.input.bindKey(me.input.KEY.ENTER, "buy");
                me.input.bindKey(me.input.KEY.Q, "skill1");
                me.input.bindKey(me.input.KEY.W, "skill2");
                me.input.bindKey(me.input.KEY.E, "skill3");
                me.input.bindKey(me.input.KEY.RIGHT, "right");
                me.input.bindKey(me.input.KEY.LEFT, "left");
                me.input.bindKey(me.input.KEY.UP, "up");
                me.input.bindKey(me.input.KEY.SPACE, "space");
                me.input.bindKey(me.input.KEY.SHIFT, "attack");
                me.input.bindKey(me.input.KEY.D, "right2");
                me.input.bindKey(me.input.KEY.A, "left2");
                me.input.bindKey(me.input.KEY.W, "up2");
                me.input.bindKey(me.input.KEY.E, "space2");
                me.input.bindKey(me.input.KEY.G, "attack2");
           
	},


	/**
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
		// remove the HUD from the game world
		me.game.world.removeChild(this.HUD);
	}
});


