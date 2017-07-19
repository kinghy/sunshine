/**
 * Created by rjt on 2017/7/14.
 */

var loadingTime = 5000;//loading最大时间

$().ready(function () {

    //构建场景
    var fs = Stage.init("view",0,29,function (s) {//初始化
        $(".goonbtn").click(function () {
            var $this = $(this);
            $("#goon_img").attr("src","resource/goon_highlight.png");
            setTimeout(function () {
                s.playNext();
                $(".goonbtn").hide();
                $("#office").css("left","-1730px");
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
                            if(left>=0){
                                $(".goonbtn").fadeIn();
                            }else{
                                $(".goonbtn").fadeOut();
                            }

                            if(leftpush && left<0){
                                left = left+10<0?left+10:0
                                $("#office").css("left",left+"px");
                            }else{
                                clearInterval(handle);
                            }

                        },1000/24);
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
                            if(left<=-3390){
                                $(".goonbtn").fadeIn();
                            }else{
                                $(".goonbtn").fadeOut();
                            }
                            if(rightpush && left>-3390){

                                left = left-10>-3390?left-10:-3390
                                $("#office").css("left",left+"px");
                            }else{
                                clearInterval(handle);
                            }

                        },1000/24);
                    }
                },500);
            }).on('touchend',function (e) {
                e.preventDefault();
                rightpush = false;
            });

        },2000)
    });

    var ss = Stage.init("qa",35,50,function (s) {//初始化
        $("#qa_no").click(function () {
            s.hide();
            s.run2StageEnd(0,3);
        })
        $("#qa_yes").click(function () {
            s.playNext();
        })
    });

    var ts = Stage.init("page_1",51,186,function (s) {//初始化
        $("#p1ToP2").click(function () {
            s.playNext();
        })
    });

    var fos = Stage.init("page_2",187,189,function (s) {//初始化
        $("#p2ToP1").click(function () {
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
        sm.play();
        // sm.run2StageEnd(2,2);
    });

    //重播事件
    $("#replay_btn").click(function () {
        $("#end_page").hide();
        sm.play();
    });

})
