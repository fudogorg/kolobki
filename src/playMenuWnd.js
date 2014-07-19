var PlayMenuWnd = xScreen.extend({
   ctor : function(uiRes)
   {
      this._super(uiRes);

      //var action = ccs.actionManager.getActionByName("play_menu.ExportJson", "idle_play");
      //var ray = this._ui.getChildByName("p_ray");
      //action.startWithTarget(ray);
   },

   onBtnClick : function(btnName)
   {
      if (btnName == "b_play") {
         MAIN.switchScreen("game", "", 0);
      } else {
         ccs.actionManager.playActionByName("play_menu.ExportJson", "idle_play");
      }
   }
});
