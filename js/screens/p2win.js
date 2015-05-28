game.p2win = me.ScreenObject.extend({
	/**	
	 *  action to perform on state change
	 */
	onResetEvent: function() {	
		me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage("p2win")),-10);
                document.getElementById("mainmenu").style.visibility = "visible";
                
                me.game.world.addChild(new (me.Renderable.extend({
                    init: function() {
                this._super(me.Renderable, 'init', [270, 240, 300, 50]);
                this.font = new me.Font("FairydustB", 60, "purple");
                me.input.registerPointerEvent('pointerdown',this,this.newGame.bind(this),true);
            },
            draw: function(renderer) {
                this.font.draw(renderer.getContext(), "Player 2 wins", 20, 130);                   
            },
            update: function(dt){
                return true;
            },
            
            newGame: function(){
                me.input.releasePointerEvent('pointerdown', this);
                me.state.change(me.state.MENU);
                
            }
           
                })));
                
               
	},
	
             
	
	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
		document.getElementById("mainmenu").style.visibility = "hidden";
	}
});
