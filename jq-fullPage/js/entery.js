//主要js入口
pageEngine
    .init($('.wrapper'),['orange','pink','yellow'])
        .addSection('section_one')
            .addContent({
                type: 'base',
                className: 'duyi',
                width: 522,
                height: 336,
                text: '渡一教育创立于2015年！ 在成哥 邓哥 彤哥的带领下已经向着高端编程教育公司大踏步的，渡一 Dream Factory',
                center: true,
                css: {
                    // opacity: 0,
                    backgroundImage: 'url(./img/dialog.jpg)',
                    backgroundSize: '100% 100%',                        
                    padding: '10px 15px 10px 15px',
                    textAlign: 'justify',
                    fontSize: '18px',
                    fontWeight: '900',
                    lineHeight: '25px'
                },
                animateIn: {
                    opacity: 1,
                    top: 240,
                },
                animateOut: {
                    opacity: 0,
                    top: 0
                },
                delay: 1000,
                event: {
                    click: function () {
                        alert($(this).text());
                    }
                }
            })
        .addSection('section_two')
        .addContent({
            type: 'base',
            className: 'duyi',
            width: 522,
            height: 336,
            text: '渡一教育创立于2015年！ 在成哥 邓哥 彤哥的带领下已经向着高端编程教育公司大踏步的，渡一 Dream Factory',
            center: true,
            css: {
                // opacity: 0,
                backgroundImage: 'url(./img/dialog.jpg)',
                backgroundSize: '100% 100%',                        
                padding: '10px 15px 10px 15px',
                textAlign: 'justify',
                fontSize: '18px',
                fontWeight: '900',
                lineHeight: '25px',
                position:'absolute'
            },
            animateIn: {
                opacity: 1,
                top: 240,
            },
            animateOut: {
                opacity: 0,
                top: 0
            },
            delay: 1000,
            event: {
                click: function () {
                    alert($(this).text());
                }
            }
        })
        //竖向滚动第三屏
            .addSection('section_three')
                .addSlide('slide_one')
                .style({width:$(document).outerWidth(),
                        height:'100%',
                        float:'left',
                        textAlign:'center'
                        })
                        // .addContent({
                        //     type: 'base',
                        //     className: 'duyi',
                        //     width: 522,
                        //     height: 336,
                        //     text: '渡一教育创立于2015年！ 在成哥 邓哥 彤哥的带领下已经向着高端编程教育公司大踏步的，渡一 Dream Factory',
                        //     center: true,
                        //     css: {
                        //         // opacity: 0,
                        //         backgroundImage: 'url(./img/dialog.jpg)',
                        //         backgroundSize: '100% 100%',                        
                        //         padding: '10px 15px 10px 15px',
                        //         textAlign: 'justify',
                        //         fontSize: '18px',
                        //         fontWeight: '900',
                        //         lineHeight: '25px',
                        //         position:'absolute'
                        //     },
                        //     animateIn: {
                        //         opacity: 1,
                        //         top: 240,
                        //     },
                        //     animateOut: {
                        //         opacity: 0,
                        //         top: 0
                        //     },
                        //     delay: 1000,
                        //     event: {
                        //         click: function () {
                        //             alert($(this).text());
                        //         }
                        //     }
                        // })
                    .addSlide('slide_two')
                        .style({
                            width: $(document).outerWidth(),
                            height: '100%',
                            float:'left',
                            textAlign:'center'
                        })
                            .addSlide('slide_three')
                                .style({
                                    width: $(document).outerWidth(),
                                    height: '100%',
                                    float:'left',
                                    textAlign:'center'
                                })
                                    .wrapperAll('box')
                                        .load()