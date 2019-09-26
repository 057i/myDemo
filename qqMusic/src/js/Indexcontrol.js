(function ($, root) {


    function IndexControl(len) {
        this.nowIndex = 0;
        this.len = len;

    }

    IndexControl.prototype.pre = function () {
        return this.getIndex(-1);
    }
    IndexControl.prototype.next = function () {
        return this.getIndex(1);
    }
    IndexControl.prototype.getIndex = function (val) {
        var len = this.len;
        var nowIndex = this.nowIndex;
        this.nowIndex = (len + nowIndex + val) % len;
        return this.nowIndex

    }
    root.IndexControl = IndexControl;


})(window.Zepto, window.player || (window.player = {}))
