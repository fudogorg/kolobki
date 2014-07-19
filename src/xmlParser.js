var xmlNode = cc.Class.extend({
   ctor :function (node) {
      this._node = node;
      if (this.valid() && this._node.nodeType != 1) this.next();
   },
   valid : function () { return this._node != null; },
   firstChild : function() { return this._node.firstChild(); },
   next : function () {
      this._node = this._node.nextSibling;
      while (this.valid() && this._node.nodeType != 1) this.next();
   },
   findKey : function (name) {
      for(var i = 0; this._node.attributes.length; ++i) {
         if (this._node.attributes[i].name == name)
            return this._node.attributes[i].value;
      }
      return null;
   },
   getKey : function (name, def) {
      var val = this.findKey(name);
      if (val == null) return def;
      return val;
   },
   getInt : function (name, def) {
      var val = this.findKey(name);
      if (val == null) return def;
      return parseInt(val);
   },
   getFloat : function (name, def) {
      var val = this.findKey(name);
      if (val == null) return def;
      return parseFloat(val);
   }
});

var xmlParser = cc.Class.extend({
   ctor : function (res) {
      this._root = new DOMParser().parseFromString(cc.loader.getRes(res), "text/xml").documentElement;
   },
   firstChild : function() {
      if (this._root) return new xmlNode(this._root.firstChild);
      return new xmlNode(null);
   }
});


