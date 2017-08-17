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
    var memoryJson = {"memory1":false,"memory2":false,"memory3":false,"memory4":false}
    var zs = Stage.init("start",0,100,function (s) {//初始化
        $("#"+s.stageId+" .memory").click(function () {
            s.hide();
            s.runStage($(this).attr("data"))
            memoryJson[this.id] = true;
        });
    },function () {
        for(var key in memoryJson){
            if(memoryJson[key]){
                $("#"+key).attr("src","resource/"+key+"_read.png");
            }else{
                $("#"+key).attr("src","resource/"+key+".png");
            }
        }
    });

    var initCallBack = function (s) {
        $("#"+s.stageId+" .goon").click(function () {
            var $this = $(this);
            $this.attr("src","resource/goon_rect_highlight.png");
            setTimeout(function () {
                s.hide();
                s.runStage(5)
                $this.attr("src","resource/goon_rect.png");
            },500)
            for(var key in memoryJson){
                memoryJson[key] = false;
            }
        })

        $("#"+s.stageId+" .back").click(function () {
            var $this = $(this);
            $this.attr("src","resource/back_rect_highlight.png");
            setTimeout(function () {
                s.hide();
                s.run2StageEnd(0)
                $this.attr("src","resource/back_rect.png");
            },500)
        })
    }

    var showCallBack = function (s) {
        var flg = true;
        for(var key in memoryJson){
            if(!memoryJson[key]){
                flg = memoryJson[key];
                break
            }
        }
        if(flg){
            $("#"+s.stageId+" .goon").show();
        }else{
            $("#"+s.stageId+" .goon").hide();
        }
    }

    var fs = Stage.init("m1_stage",103,111,initCallBack,showCallBack);
    var ss = Stage.init("m2_stage",112,120,initCallBack,showCallBack);
    var ts = Stage.init("m3_stage",121.5,130,initCallBack,showCallBack);
    var fours = Stage.init("m4_stage",131,140,initCallBack,showCallBack);

    var fives = Stage.init("page_1",141,200,function (s) {//初始化
        $("#p1ToP2").click(function () {
            s.playNext();
        })
    });

    var sixs = Stage.init("page_2",201,203,function (s) {//初始化
        $("#p2ToP1").click(function () {
            s.hide();
            s.run2StageEnd(5);
        })
        $("#p2ToP2").click(function () {
            s.playNext();
        })
    });



    var es = Stage.init(null,204,0)


//        $("#desc").find("#light_img").addClass("light_rotate")
//     var sm = VideoStageManager.init("pageWrap","video",[zs,fs,ss,ts,fours,fives,sixs,sevens,es],function () {
//         $("#end_page").show();
//     });
    var sm = VideoStageManager.init("pageWrap","video",[zs,fs,ss,ts,fours,fives,sixs,es],function () {
        $("#end_page").show();
    });

    //开始页
    $("#go_btn").click(function () {
        $("#start_page").hide();
        //场景1

        sm.play(startstage,startpos);

    });

    //重播事件
    $("#replay_btn").click(function () {
        $("#end_page").hide();
        sm.play();
    });

})
