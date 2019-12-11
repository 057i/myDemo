$.fn.extend({
    slider: function (options) {
        options.wrap = this;
        new Slider(options)
    }

})

function Slider(options) {
    //imgNum表示要展示的图片，不展示的一张不算
    this.wrap = options.wrap;
    this.imgList = options.imgList;
    this.imgNum = this.imgList.length;
    this.width = options.width || $(this.wrap).width();
    this.height = options.height || $(this.wrap).height();
    this.animateType = options.animateType;
    this.isAuto = options.isAuto;
    this.direction = options.direction || 'right';
    this.nowIndex = 0,
        this.flag = false;
    this.createDom();
    this.initStyle();
    this.bindEvent();
    // this.autoMove();
}

//创建轮播的元素
Slider.prototype.createDom = function () {
    var oUl = $('<ul></ul>');
    var circleBox = $('<div class="circleBox"></div>')
    $(this.imgList).each(function (index, ele) {
        var str = '<li><img src="' + ele + '"></li>',
            circle = '<span class="circle"></span>';
        $(str).appendTo(oUl)
        $(circle).appendTo(circleBox);
    })
    //判断是否是无缝轮播还是幻灯片，无缝轮播的话多插入一张
    if (this.animateType == 'animate') {
        $transitionLi = $('<li><img src="' + this.imgList[0] + '"></li>')
        $transitionLi.appendTo(oUl)
        // this.imgNum++;
    }

    var leftBtn = $('<span class="leftBtn btn">&lt;</span>');
    var rightBtn = $('<span class="rightBtn btn">&gt;</span>');

    oUl.appendTo($(this.wrap))
    $(this.wrap).append(leftBtn).append(rightBtn).append(circleBox)

}

//函数原型链上初始化样式
Slider.prototype.initStyle = function () {
    var self = this;
    var width;
    if (this.animateType == 'animate') {
        width = (this.imgNum + 1) * this.width;
    } else {
        width = this.imgNum * this.width
    }

    $(this.wrap).css({
        overflow: 'hidden',
        position: 'relative'
    })
    $('ul', this.wrap).css({
        width: width,
        height: 300,
        position: 'absolute',
        left: 0,
    })
    $('ul li', this.wrap).css({
        width: self.width,
        height: self.height,
        float: 'left'
    })
    $('img', 'li').css({
        width: '100%',
        height: '100%',
        backgroundSize: '100% 100%'
    })
    $('.btn', this.wrap).css({
        display: 'inline-block',
        width: 40,
        height: 40,
        'line-height': '40px',
        vertialAlign: 'center',
        opacity: 0.5,
        textAlign: 'center',
        background: 'black',
        color: 'white',
        position: 'absolute',
        top: '50%',
        marginTop: -20,
        cursor: 'pointer'
    })
    $('.rightBtn', this.wrap)
        .css({right: 0})

    $('.circle', '.circleBox')
        .css({
            width: 10,
            height: 10,
            marginLeft: 5,
            display: 'inline-block',
            float: 'left',
            background:'black'
        })
        .eq(0)
        .addClass('active')

    $('.circleBox', this.wrap).css({
        width: 60,
        height: 10,
        position: 'absolute',
        background: 'white',
        opacity: 0.5,
        bottom: 10,
        left: '50%',
        borderRadius: '10%',
        marginLeft: -30
    })
}
Slider.prototype.bindEvent = function () {
    var self = this;
    var width = self.wrap.width;
    $('.leftBtn', self.wrap).on('click', function () {
        self.move('prev')
    })

    $('.rightBtn', this.wrap).on('click', function () {
        self.move('next')
    })
    $('.leftBtn', self.wrap).on('click', function () {
        self.move('prev')
    })
    $(self.wrap).mouseenter(function () {
        clearInterval(self.timer)
    }).mouseleave(function () {
        if(self.isAuto){
            self.autoMove()
        }
    })
}
Slider.prototype.move = function (dir) {
    var self = this;
    if (this.flag) {
        return false;
    }
    this.flag = true;
    switch (dir) {
        case 'prev':
            if (self.animateType == 'animate') {
                /*往前移动，当是第一张的时候变成最后一张*/
                if (self.nowIndex == 0) {
                    self.nowIndex = self.imgNum;
                    $('ul', self.wrap).css({
                        left: self.nowIndex*self.width
                    });
                } else {
                    this.nowIndex--;
                }
            } else if (this.animateType == 'fade') {
                if (this.nowIndex == 0) {
                    this.nowIndex = this.imgNum - 1;
                } else {
                    this.nowIndex--;
                }
            }
            console.log(self.imgNum, self.nowIndex)
            break;
        case "next":
            if (this.animateType == 'animate' && this.nowIndex == this.imgNum) {
                if (this.nowIndex == this.imgNum) {
                    //在是最后一个的时候，瞬间变成1
                    $('ul', this.wrap).css({
                        left: "0"
                    })
                    this.nowIndex = 0;
                } else {
                    this.nowIndex++
                }
            } else if (this.animateType == 'fade' && this.nowIndex == this.imgNum - 1) {
                this.nowIndex = 0;
            } else {
                this.nowIndex++;
            }
            console.log(self.imgNum, self.nowIndex)

            break;
        default:
            // this.nowIndex = dir;
            break;
    }
    var self = this;
    if (this.animateType == 'animate') {
        $('ul', this.wrap).animate({
            left: -this.nowIndex * this.width,
        }, function () {
            self.flag = false;
        });
    } else if (this.animateType == 'fade') {
        $('ul li', this.wrap).fadeOut().eq(this.nowIndex).fadeIn(function () {
            self.flag = false;
        });
    }
    $('.circle', self.wrap)
        .removeClass('active')
        .eq(self.nowIndex)
        .addClass('active')

}
Slider.prototype.autoMove = function () {
    var self = this;
    this.timer = setInterval(function () {
        if (self.direction == 'left') {
            $('.leftBtn', self.wrap).trigger('click');
        } else {
            $('.rightBtn', self.wrap).trigger('click');
        }
    }, 2000)
}
