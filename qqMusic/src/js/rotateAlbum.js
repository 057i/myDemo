(function ($, root) {
    function rotateAlbum(dom) {
        this.dom = dom;
        this.timer = null;
        this.num = 0;
    }

    rotateAlbum.prototype.stop = function () {
        clearInterval(this.timer);

    }

    rotateAlbum.prototype.con = function () {
        var self = this;
        this.timer = setInterval(function () {
            self.num += 2;
            $(self.dom).find('img')
                .css({'transform': 'rotateZ(' + self.num + 'deg)',
                    'transition':'1s ease-out'
                });
        }, 1000)
    }

    rotateAlbum.prototype.change = function () {
        $(this.dom).find('img').css({
            'transition': 'none',
            'transform': 'rotateZ(0deg)'
        })
    }


    root.rotateAlbum = rotateAlbum;


})(window.Zepto, window.player || (window.player = {}))
