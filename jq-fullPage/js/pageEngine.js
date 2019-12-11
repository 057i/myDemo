//定制化组件,fullPage.js,单对象编程
var pageEngine={
    //起始点
    init:function(selector,colorsArr){
        this.$W=$(selector);
        this.$W.css({position:'absolute',top:0,left:0,width:'100%',height:'100%'})
        this.colorsArr=colorsArr;
        return this
    },
    //添加竖向滚动模块
    addSection:function(sectionName){
        var $S=$('<div class="section"></div>').addClass(sectionName)
        $S.css({width:'100%',height:'100%',position:'relative'})
        this.$S=$S;
        $S.appendTo(this.$W);
        return this
    },
    //添加模块中的小广告图
    addContent:function(config){
        console.log(config)
        var $Con=comment(config);
        this.$Con=$Con;
        console.log($Con,this.$S)
        $Con.appendTo(this.$S);
        return this
    },
    //横向滚动的模块
    addSlide:function(slideName){
        var $slide=$('<div>横向滚动切换屏幕</div>').addClass(slideName);
        this.$slide=$slide
        $slide.appendTo(this.$S)
        return this
    },
    //定制一个盒子包裹横向滚动的模块
    wrapperAll:function(wrapperName){
        var width=$(document).outerWidth()*3
        var $box=$('<div></div>').addClass(wrapperName).css({position:'absolute',width:width,height:'100%',left:0,top:0});
        this.$S.wrapInner($box);
        return this
    },
    //样式
    style:function(config){
        this.$slide.css(config)
        return this
    },
    //最后执行的
    load:function(){
        var self=this;
        this.$W.children().each(function(index,ele){
            $(ele).css({backgroundColor:self.colorsArr[index]})
        })
    },




}