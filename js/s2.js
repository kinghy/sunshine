/**
 * Created by rjt on 2017/7/14.
 */

var loadingTime = $.getUrlParam("loading")?$.getUrlParam("loading"):5000;//loading最大时间
var startstage = $.getUrlParam("stage");
var startpos = $.getUrlParam("pos")?$.getUrlParam("pos"):"start";//start?end?
$().ready(function () {
    if ($.getUrlParam("hot")=="true") {
        $(".hot_pos").css("background-color", "red");
    }
});

$().ready(function () {

    //构建场景
    var fstimes = 0;
    var fs = Stage.init("view",0,29,function (s) {//初始化

        //划屏
        var lastTouch = null;
        var movetoward = 0;//1超右，2朝左
        $("#office").on("touchstart",function (e) {
            e.preventDefault();
            lastTouch = e.touches[0];
            movetoward = 0;
        }).on("touchmove",function (e) {
            e.preventDefault();
            if(lastTouch){
                var curTouch = e.touches[0];
                if(curTouch.pageX>lastTouch.pageX){
                    movetoward = 1;
                    slideRight()

                }else if(curTouch.pageX<lastTouch.pageX){
                    movetoward = 2;
                    slideLeft();

                }
                lastTouch = curTouch;
            }
        }).on("touchend",function (e) {
            e.preventDefault();
            lastTouch = null
            var times = 0
            var handle = null;
            //让手感丝般柔滑
            // if(movetoward==1){
            //     handle = setInterval(function () {
            //         times++
            //         if(times<15){
            //             slideRight()
            //         }else {
            //             clearInterval(handle)
            //         }
            //     },30)
            // }else if(movetoward==2){
            //     handle = setInterval(function () {
            //         times++
            //         if(times<15){
            //             slideLeft();
            //         }else {
            //             clearInterval(handle)
            //         }
            //     },30)
            // }
            movetoward = 0;
        })

        var lastTouch2 = null;
        $("#goonFirst").on("touchstart",function (e) {
            e.preventDefault();
            lastTouch2 = e.touches[0];
        }).on("touchend",function (e) {
            e.preventDefault();
            if(lastTouch2){
                var curTouch = e.changedTouches[0];
                if(curTouch.pageY<lastTouch2.pageY-100){
                    s.playNext();
                }
            }
            lastTouch2 = null
        })

        function slideRight() {
            var left = parseFloat($("#office").css("left"));
            if(fstimes>1) {
                if (left <= -3390) {
                    $("#goonSecond").fadeIn();
                } else {
                    $("#goonSecond").fadeOut();
                }
            }
            if(left>-3390){
                left = left-50>-3390?left-50:-3390
                $("#office").css("left",left+"px");
            }
        }

        function slideLeft() {
            var left = parseFloat($("#office").css("left"));
            if(fstimes>1){
                if(left>=0){
                    $("#goonSecond").fadeIn();
                }else{
                    $("#goonSecond").fadeOut();
                }
            }
            if (left < 0) {
                left = left + 50 < 0 ? left + 50 : 0
                $("#office").css("left", left + "px");
            }
        }

        // var oldWebkitCompassHeading = null
        // setInterval(function () {
        //     if ($("#view").css("display")!="none") {
        //         $("#log").html(webkitCompassHeading);
        //         if (oldWebkitCompassHeading != null && Math.abs(oldWebkitCompassHeading - webkitCompassHeading) < 100) {
        //             // $("#log").html(oldWebkitCompassHeading+";"+webkitCompassHeading);
        //             if (webkitCompassHeading < oldWebkitCompassHeading - 1) {
        //                 var left = parseFloat($("#office").css("left"));
        //
        //                 if(fstimes>1){
        //                     if(left>=0){
        //                         $("#goonSecond").fadeIn();
        //                     }else{
        //                         $("#goonSecond").fadeOut();
        //                     }
        //                 }
        //                 if (left < 0) {
        //                     left = left + 30 < 0 ? left + 30 : 0
        //                     $("#office").css("left", left + "px");
        //                 }
        //             } else if (webkitCompassHeading > oldWebkitCompassHeading + 1) {
        //                 var left = parseFloat($("#office").css("left"));
        //
        //
        //                 if(left<=-3390){
        //                     $("#goonSecond").fadeIn();
        //                 }else{
        //                     $("#goonSecond").fadeOut();
        //                 }
        //                 if(left>-3390){
        //                     left = left-30>-3390?left-30:-3390
        //                     $("#office").css("left",left+"px");
        //                 }
        //             }
        //         }
        //         oldWebkitCompassHeading = webkitCompassHeading;
        //     }
        // },1000/24)
        //
        $("#goonSecond").click(function () {
            var $this = $(this);
            $("#goon_img").attr("src","resource/goon_highlight.png");
            setTimeout(function () {
                s.hide();
                s.runStage(2,0);
                $("#goon_img").attr("src","resource/goon.png");
            },500)
        })

        setTimeout(function () {
            // $("#office").fadeIn();
            var leftpush = false;
            $("#leftarrow").on('touchstart',function (e) {
                e.preventDefault();
                leftpush = true;
                setTimeout(function () {
                    if(leftpush){
                        var handle = setInterval(function () {
                            var left = parseFloat($("#office").css("left"));
                            if(fstimes>1){
                                if(left>=0){
                                    $("#goonSecond").fadeIn();
                                }else{
                                    $("#goonSecond").fadeOut();
                                }
                            }
                            if(leftpush && left<0){
                                left = left+10<0?left+10:0
                                $("#office").css("left",left+"px");
                            }else{
                                clearInterval(handle);
                            }

                        },1000/48);
                    }
                },500);
            }).on('touchend',function (e) {
                e.preventDefault();
                leftpush = false;
            });

            var rightpush = false;
            $("#rightarrow").on('touchstart',function (e) {
                e.preventDefault();
                rightpush = true;
                setTimeout(function () {
                    if(rightpush){
                        var handle = setInterval(function () {
                            var left = parseFloat($("#office").css("left"));
                            if(fstimes>1){
                                if(left>=0){
                                    $("#goonSecond").fadeIn();
                                }else{
                                    $("#goonSecond").fadeOut();
                                }
                            }
                            if(rightpush && left>-3390){

                                left = left-10>-3390?left-10:-3390
                                $("#office").css("left",left+"px");
                            }else{
                                clearInterval(handle);
                            }

                        },1000/48);
                    }
                },500);
            }).on('touchend',function (e) {
                e.preventDefault();
                rightpush = false;
            });

        },500)
    },function (s) {
        fstimes++;
        //初始化
        if(fstimes>1){
            $("#goonFirst").hide();
            $("#tips").show().delay(3000).fadeOut();
        }else{
            $("#goonFirst").show();
            $("#tips").hide();
        }
        $(".goonbtn").hide();
        $("#office").css("left","-1730px");
        $("#goon_img").attr("src","resource/goon.png");
    });

    var ss = Stage.init("qa",35,49,function (s) {//初始化
        $("#qa_no").click(function () {
            s.hide();
            s.run2StageEnd(0,0);
        })
        $("#qa_yes").click(function () {
            s.playNext();
        })
    });

    var ts = Stage.init("page_1",53,186,function (s) {//初始化
        $("#p1ToP2").click(function () {
            s.playNext();
        })
    });

    var fos = Stage.init("page_2",187,189,function (s) {//初始化
        $("#p2ToP1").click(function () {
            s.hide();
            s.run2StageEnd(2,1);
        })
        $("#p2ToP2").click(function () {
            s.playNext();
        })
    });

    var es = Stage.init(null,189,0)


//        $("#desc").find("#light_img").addClass("light_rotate")
    var sm = VideoStageManager.init("pageWrap","video",[fs,ss,ts,fos,es],function () {
        $("#end_page").show();
    });

    //开始页
    $("#go_btn").click(function () {
        $("#start_page").hide();
        //场景1
        if(startstage){
            if(startpos=="start"){
                sm.runStage(startstage);
            }else{
                sm.run2StageEnd(startstage,2);
            }
        }else{
            sm.play();
        }
    });

    //重播事件
    $("#replay_btn").click(function () {
        $("#end_page").hide();
        sm.play();
    });

    //陀螺仪
    var webkitCompassHeading = 0;
    window.addEventListener('deviceorientation', function(e){
        webkitCompassHeading = e.webkitCompassHeading?e.webkitCompassHeading:360-e.alpha;//iOS支持webkitCompassHeading，安卓直接用alpha
        // $("#log").html(webkitCompassHeading);
    });


})
