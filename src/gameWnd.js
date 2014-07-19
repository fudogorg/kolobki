var GameWnd = xScreen.extend({

   ctor:function(uiRes)
   {
      this._super(uiRes);
      var d = sp.SkeletonAnimation.createWithFile(res.spine_detective_json, res.spine_detective_atlas, 1.0);
      d.setScale(0.5);
      d.setPosition({x : 360, y : 640});
      this.addChild(d);
      d.setAnimation(0, "happy", true);
   },

   onBtnClick : function(btnName)
   {
      if (btnName == "b_pause") {
         ccs.actionManager.playActionByName("game.ExportJson", "pause_show");
      }
   }

});
