
/* Game namespace */
var game = {

	// an object where to store game information
	data : {
		// score
			score : 0,
                enemyBaseHealth: 10,
                playerBaseHealth: 10,
                enemyCreepHealth: 10,
                playerHealth: 20,
                player2Health: 20,
                enemyCreepAttack: 1,
                playerAttack: 1,
                playerAttackTimer: 1000,
                enemyCreepAttackTimer: 1000,
                playerMoveSpeed: 5,
                creepMoveSpeed: 5,
                gameManager: "",
                player: "",
                exp: 0,
                gold:1000000000000000000000,
                s1:0,
                s2:0,
                s3:0,
                s4:0,
                s5:0,
                s6:0,
                exp1:0,
                exp2:0,
                exp3:0,
                win:"",
                pausePos: "",
                buyscreen: "",
                buytext: "",
               
                
	},
	
	
	// Run on page load.
	"onload" : function () {
	// Initialize the video.
	if (!me.video.init("screen",  me.video.CANVAS, 1067, 600, true, '1.0')) {
		alert("Your browser does not support HTML5 canvas.");
		return;
	}

	// add "#debug" to the URL to enable the debug Panel
	if (document.location.hash === "#debug") {
		window.onReady(function () {
			me.plugin.register.defer(this, debugPanel, "debug");
		});
	}
        me.state.LOAD = 113;
        me.state.NEW = 114;
        me.state.P1 = 115;
        me.state.P2 = 116;
	// Initialize the audio.
	me.audio.init("mp3,ogg");

	// Set a callback to run when loading is complete.
	me.loader.onload = this.loaded.bind(this);

	// Load the resources.
	me.loader.preload(game.resources);

	// Initialize melonJS and display a loading screen.
	me.state.change(me.state.LOADING);
},

	// Run on game resources loaded.
	"loaded" : function () {
            me.pool.register("player", game.PlayerEntity, true);
            
            me.pool.register("player2", game.PlayerEntity2, true);
            me.pool.register("player", game.PlayerEntity, true);
            me.pool.register("HeroDeathManager", game.HeroDeathManager);
            me.pool.register("GameManager", game.GameManager);
            
		me.state.set(me.state.MENU, new game.TitleScreen());
		me.state.set(me.state.PLAY, new game.PlayScreen());
                me.state.set(me.state.LOAD, new game.LoadProfile());
                me.state.set(me.state.NEW, new game.NewProfile());
                me.state.set(me.state.P2, new game.p2win());
                me.state.set(me.state.P1, new game.p1win());
		// Start the game.
		me.state.change(me.state.MENU);
	}
};
