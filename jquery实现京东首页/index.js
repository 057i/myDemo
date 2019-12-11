//封装自动轮播引擎,单一职责，开闭原则

(function(){
    //封装轮播图插件
    function Slider(options){
        //imgNum表示要展示的图片，不展示的一张不算
        this.wrap=options.wrap;
        this.imgList=options.imgList;
        this.imgNum=this.imgList.length;
        this.width=options.width ||$(this.wrap).width();
        this.height=options.height || $(this.wrap).height();
        this.animateType=options.animateType;
        this.isAuto=options.isAuto;
        this.direction=options.direction || 'right';
        this.nowIndex=0,
        this.flag=false;
        this.createDom();
        this.initStyle();
        this.bindEvent();
        this.autoMove();
    }
    //创建轮播的元素
    Slider.prototype.createDom=function(){
        var oUl=$('<ul></ul>');
        var circleBox=$('<div class="circleBox"></div>')
        $(this.imgList).each(function(index,ele){
            var str='<li><img src="'+ele+'"></li>',
                circle='<span class="circle"></span>';
            $(str).appendTo(oUl)
            $(circle).appendTo(circleBox);
        })
        //判断是否是无缝轮播还是幻灯片，无缝轮播的话多插入一张
        if(this.animateType=='animate'){
            $transitionLi=$('<li><img src="'+this.imgList[0]+'"></li>')
            $transitionLi.appendTo(oUl)
            // this.imgNum++;
        }

        var leftBtn=$('<span class="leftBtn btn">&lt;</span>');
        var rightBtn=$('<span class="rightBtn btn">&gt;</span>');
        
        oUl.appendTo($(this.wrap))
        $(this.wrap).append(leftBtn).append(rightBtn).append(circleBox)

    }
    
    //函数原型链上初始化样式
    Slider.prototype.initStyle=function(){
        var self=this;
        var width;
        if(this.animateType=='animate'){
            width=(this.imgNum+1)*this.width;
        }else{
            width=this.imgNum*this.width
        }

        $(this.wrap).css({
            overflow:'hidden',
            position:'relative'
        })
        $('ul',this.wrap).css({
            width:width,
            height:300,
            position:'absolute',
            left:0
        })
        $('ul li',this.wrap).css({
            width:self.width,
            height:self.height,
            float:'left'
        })
        $('img','li').css({
            width:'100%',
            height:'100%',
            backgroundSize:'100% 100%'
        })
        $('.btn',this.wrap).css({
            display:'inline-block',
            width:40,
            height:40,
            'line-height':'40px',
            vertialAlign:'center',
            opacity:0.5,
            textAlign:'center',
            background:'black',
            color:'white',
            position:'absolute',
            top:'50%',
            marginTop:-20,
            cursor:'pointer'
        })
        $('.rightBtn',this.wrap)
            .css({right:0 })

        $('.circle','.circleBox')
            .css({
            width:10,
            height:10,
            marginLeft:5,
            display:'inline-block',
            float:'left'})
                .eq(0)
                    .addClass('active')
                    
        $('.circleBox',this.wrap).css({
            width:60,
            height:10,
            position:'absolute',
            background:'white',
            opacity:0.5,
            bottom:10,
            left:'50%',
            borderRadius:'10%',
            marginLeft:-30
        })    
    }
    Slider.prototype.bindEvent=function(){
        var self=this;
        var width=self.wrap.width;
        $('.leftBtn',self.wrap).on('click',function(){
           self.move('prev')
        })

        $('.rightBtn',this.wrap).on('click',function(){
           self.move('next')
        })
        $('.leftBtn',self.wrap).on('click',function(){
            self.move('prev')
         })
         $(self.wrap).mouseenter(function(){
             clearInterval(self.timer)
         }).mouseleave(function(){
             if(self.isAuto){
                 self.autoMove()
             }
         })
    }
    Slider.prototype.move = function (dir) {
        var self=this;
        if (this.flag) {
            return false;
        }
        this.flag = true;
        switch(dir) {
            case 'prev': 
                if (this.animateType == 'animate') {
                    if (this.nowIndex == 0) {
                    self.nowIndex = self.imgNum-1;
                        console.log(1111)
                        $('ul', self.wrap).css({
                            left: (self.nowIndex) * self.width,
                        });
                    } else {
                        this.nowIndex --;
                    }
                } else if(this.animateType == 'fade'){
                    if (this.nowIndex == 0) {
                        this.nowIndex = this.imgNum - 1;
                    } else {
                        this.nowIndex --;
                    }
                }
                break;
            case "next": 
                if(this.animateType == 'animate'  && this.nowIndex == this.imgNum) {
                    if(this.nowIndex == this.imgNum){
                        //在是最后一个的时候，瞬间变成1
                        $('ul', this.wrap).css({
                            left: 0
                        })
                        this.nowIndex = 0;
                    }else{
                        this.nowIndex++
                    }
                   
                } else if (this.animateType == 'fade' && this.nowIndex == this.imgNum - 1) {
                    this.nowIndex = 0;
                } else {
                    this.nowIndex ++;
                }
        console.log(this.imgNum,this.nowIndex)

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
        $('.circle',self.wrap)
            .removeClass('active')
                .eq(self.nowIndex)
                    .addClass('active')
    
    }
    Slider.prototype.autoMove=function(){
        var self=this;
        this.timer=setInterval(function(){
            if(self.direction=='left'){
                $('.leftBtn',self.wrap).trigger('click');
            }else{
                $('.rightBtn',self.wrap).trigger('click');
            }
        },2000)
    }


    function showList(options){
        this.father=options.father;
        this.List=options;
        this.createDom();
        this.bindEvent();
    }
    showList.prototype.createDom=function(){
        var self=this;
        this.menuList=this.father.next()
        // console.log(this.menuList)
        // 遍历列表数据
        $(this.List).each(function(index,ele){
            var $title=$('<li></li>');//创建滑动到的目标点数据
            // 左侧导航条数据
            //判断title值是否不是第一位或者不是最后一位，不是的话title后面要加上/号
            for(var i=0;i<ele.title.length;i++){
                if(ele.title.length>1 && i<ele.title.length-1){ //不是第一位或者不是最后一位的情况
                    var $link=$('<a>'+ele.title[i]+'/</a>')
                }else{  //剩下的情况
                  var $link=$('<a>'+ele.title[i]+'</a>');

                }
                $link.appendTo($title);
            }
            //将title值插入到左边
            $title.appendTo(self.father);
            })
        }

/*渲染值的套路，就是遍历后一个个插入到该插入的地方，最后插入到大的父级就好了*/
        function renderListDate(sourceDate,index){
            var $menuContent=$('#menu_content');
            $menuContent.empty()
            var $tabs=$('<ul class="tabs"></ul>')
            console.log(sourceDate)

            var date=sourceDate[index].content;
            date.tabs.forEach(function(tab,index){
                var $oLi=$('<li>'+tab+'</li>');
                $oLi.appendTo($tabs);
            })
            $tabs.appendTo($menuContent)
            $(date.subs).each(function(index,sub){
                var $oDl=$('<dl class="list_items"></dl>');
                var $oDt=$('<dt>'+sub.title+'</dt>');
                $oDt.appendTo($oDl)
                $.each(sub.items,function(index,item){
                            var $oDD=$('<dd>'+item+'</dd>');
                            $oDD.appendTo($oDl);
                    })
                $oDl.appendTo( $('#menu_content'))
            })
            
        }


    
        showList.prototype.bindEvent=function(){
            var self=this;
            $(this.father).on('mouseenter','li',function(e){
                $('#menu_content')
                    .show()
               
                renderListDate(self.List,$(e.target).index());
            })
            $(this.father).on('mouseleave','li',function(e){
                clearTimeout(timer);

                var timer=setTimeout(function(){
                    $('#menu_content')
                        .hide()
                },3000)
            })
            $('#menu_content').on('mouseenter',function(){
                $(this).show();
            })
            $('#menu_content').on('mouseleave',function(){
                $(this).hide();
            })
     
        }
        function serviceBindEvent(){
            $('.item-frame').on('mouseenter',function(){
                $('.item-frame i').slideUp()
                $('.service-entry')
                    .css({padding:'1px 0px 0px'})
                $('.service-entry li')
                    .on('mouseenter',function(){
                        $(this).css({borderBottom:'2px solid red'})
                    })
                        .on('mouseleave',function(){
                            $(this).css({borderBottom:'none'})
                    })        
                $('.itemslideup')
                    .hide();
            })
            $('.close').on('click',function(){
                $('.item-frame i').slideDown()
                $('.service-entry')
                    .css({padding:'1px 0px 22px'})
                $('.service-entry li')
                    .on('mouseenter',function(){
                        $(this).css({borderBottom:'one'})
                    })
                $('.itemslideup')
                    .show();
            })
        }
        serviceBindEvent();

    //随机生成搜索框搜索关键字，设置每隔2秒切换
    function searchRandomKey(keys){
        var $searchBox=$('#searchBox');
        //设置默认的搜索框关键字，不然第一次进去就是定时器的话会有两秒的延迟
        var randerkey=Math.floor(keys.length*Math.random());
        $searchBox.attr('placeholder',keys[randerkey])
        //开启定时器，随机生成搜索款提示关键字
        setInterval(function(){
            var randerkey=Math.floor(keys.length*Math.random());
            $searchBox.attr('placeholder',keys[randerkey]);
        },2000)
    }
    searchRandomKey(['衣服','裤子','匡威','DR','创意小礼物']);
    

    //搜索框提示选项卡
    //设置了搜索立即显示搜索内容，并且在显示内容区设置延时器，4秒内鼠标没有在内容区移动，自动关闭，替代了setInterval不断检测内容区的操作
    //4秒内鼠标有进行操作的话，延时器取消；
        $('#searchBox').on('input',function(){
            var $val=$('#searchBox').val();
            if($val){
                $('.answer').css({display:'block'});
                var oscript=document.createElement('script');
                oscript.src = 'https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=' + $val +'&cb=show';//这里的cb是接口提供用户用的回调函数的接口
                document.body.appendChild(oscript);
                document.body.removeChild(oscript)
                //设置延时器到时间关闭搜索内容区
                var timerr=setTimeout(function () {
                    $('.answer').css({display:'none'})
                },4000);
                $('.answer').on('mousemove',function () {
                    clearInterval(timerr);
                })
            }else{
                //默认情况，内容区没有值的时候自动隐藏
                $('.answer').css({display:'none'});//设置搜索内容区不可见
            }
        })




//拓展插件
    $.fn.extend({
        // 轮播功能
        slider:function(options){
            options.wrap=this;//谁调用谁就是wrap
            new Slider(options);
        },
        // 展示京东左侧导航条功能
        showItemList:function(options){
            options.father=this;
            new showList(options);
        },
        //生成搜索框随机搜索词功能

    })
})()

//搜索框的内容拼接到显示区域
    function show(res){
        var result=res.s;
        $('.answer').empty();
            result.forEach(function (ele,index) {
                if(index<10){  //数据过滤，每次只显示前10条搜索结果
                    var oLi='<li>'+ele+'</li>'
                    $(oLi).appendTo('.answer');
                }
            })
    }



    //底部瀑布流:未实现
    // var miniHeight=$('.footer').find('ul').children('li')[0].offsetHeight;
    // var minLi=0;
    // function getMini() {
    //         var wrap=$('.footer').find('ul').children('li');
    //     for(var i=0;i<wrap.length;i++){
    //         console.log($('.footer').find('ul').children('li')[2].offsetHeight)
    //         if(wrap[i].offsetHeight<miniHeight){
    //             console.log(1111)
    //             miniHeight=wrap[i].offsetHeight;
    //             minLi=i;
    //         }
    //     }
    //     return {
    //         miniHeight,
    //         minLi
    //     }
    // }

