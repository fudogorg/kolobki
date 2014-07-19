var MAIN = null;

var xScreen = cc.Node.extend({

   ctor : function(uiRes)
   {
      this._super();
      this._ui = ccs.uiReader.widgetFromJsonFile(uiRes);

      this.subscribeButtons(this._ui);
      this.addChild(this._ui);
   },

   subscribeButtons : function(ui)
   {
      var children = ui.getChildren();
      for (var i = 0; i < children.length; ++i) {
         var w = children[i];
         if (w.__proto__._className == "Button") {
            w.addTouchEventListener(this.onTouch, this);
         }
      }
   },

   onTouch : function(sender, type)
   {
      //this._super();
      if (ccui.Widget.TOUCH_BEGAN == type || ccui.Widget.TOUCH_MOVED == type) {
         sender.scale = 1.1;
      } else {
         sender.scale = 1.0;
      }
      if (ccui.Widget.TOUCH_ENDED == type) {
         this.onBtnClick(sender.getName());
      }
   },

   onBtnClick : function(btnName) {}
});

var ScreenManager = cc.Scene.extend({
   ctor:function () {
      this._super();
      this.screens = {};
      MAIN = this;
   },

   pushScreen : function(name, screen)
   {
      this.screens[name] = screen;
      screen.setVisible(false);
      this.addChild(screen);
      return screen;
   },

   hideAll : function()
   {
      for (var n in this.screens) {
         this.screens[n].setVisible(false);
      }
   },

   switchScreen : function (name, tag, param0)
   {
      this.hideAll();
      var s = this.screens[name];
      s.setVisible(true);
   }
});

var HelloWorldLayer = ScreenManager.extend({
   ctor:function () {
      this._super();

      this.scheduleUpdate();

      //var node = new xmlParser(res.kolobki_xml).firstChild();
      //while (node.valid()) {
      //   var color = node.getKey("color", "1");
      //   node.next();
      //}
   },

   update : function (dt)
   {
      if (!("play_menu" in this.screens)) {
         this.pushScreen("play_menu", new PlayMenuWnd(res.play_menu_json));
      } else if (!("game" in this.screens)) {
         this.pushScreen("game", new GameWnd(res.game_json));
      } else {
         MAIN.switchScreen("play_menu", "", 0);
         this.unscheduleUpdate();
      }
   }

});

var HelloWorldScene = cc.Scene.extend({
   onEnter:function () {
      this._super();
      var layer = new HelloWorldLayer();
      this.addChild(layer);
   }
});

