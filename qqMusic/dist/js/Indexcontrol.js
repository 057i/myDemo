!function(n,t){function e(n){this.nowIndex=0,this.len=n}e.prototype.pre=function(){return this.getIndex(-1)},e.prototype.next=function(){return this.getIndex(1)},e.prototype.getIndex=function(n){var t=this.len,e=this.nowIndex;return this.nowIndex=(t+e+n)%t,this.nowIndex},t.IndexControl=e}(window.Zepto,window.player||(window.player={}));