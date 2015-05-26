game.NewProfile = me.ScreenObject.extend({
    /**	
     *  action to perform on state change
     */
    onResetEvent: function() {
        me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage("new")), -10);
        document.getElementById("input").style.visibility = "visible";
        document.getElementById("register").style.visibility = "visible";
  


        me.game.world.addChild(new (me.Renderable.extend({
            init: function() {
                this._super(me.Renderable, 'init', [270, 240, 300, 50]);
                this.font = new me.Font("FairydustB", 30, "black");

            },
            draw: function(renderer) {
                this.font.draw(renderer.getContext(), "CREATE PROFILE", this.pos.x, this.pos.y);

            }

        })));



    },
    /**	
     *  action to perform when leaving this screen (state change)
     */
    onDestroyEvent: function() {
        document.getElementById("input").style.visibility = "hidden";
        document.getElementById("register").style.visibility = "hidden";
    }
});
