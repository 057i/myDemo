//需要生成的构造dom对象
function commentFactory(){
    var $Div=$('<div class="comment" style="text-align:center;display:block;"><h3>Duyi</h3></div>');
    $Div.on('_commLoad',function(){
        $(this).find('h3').fadeIn();
        console.log(this)
    });
    $Div.on('_commLeave',function(){
        $(this).find('h3').fadeOut();
    })
    return $Div
}
function comment(config){
        var $Con=$('<div></div>')
        config.className && $Con.addClass(config.className);
        config.text && $Con.text(config.text);
        config.width && $Con.css('width',config.width);
        config.height && $Con.css('height',config.height);
        config.center && $Con.css({
                                position:'absolute',
                                left:'50%',
                                top:'50%',
                                marginLeft:-(config.width)/2,
                                marginTop:-config.height/2,
                                border:'1px solid black'
                            });
        config.css && $Con.css(config.css);                                   
        //绑定自定义事件，然后触发出现或者消失
        $Con.on('onLeave',function(){
            var self=this;
            console.log('leave')
            setTimeout(function(){
                // console.log(self)
                $(self).fadeOut(config.animateOut);
            },config.delay)
        })
        $Con.on('afterLoad',function(){
            var self=this;
            console.log('load')
            setTimeout(function(){
                $(self).fadeIn(config.animateOut);
            },config.delay);
        })

        //循环绑定系统事件，有就绑定，没有就算了
        for(var prop in config.event){
            $Con.on(prop,config.event[prop]);
        }
        return $Con
}

