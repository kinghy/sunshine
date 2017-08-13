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

    var zs = Stage.init("start",0,71,function (s) {//初始化
        $(".start_pos").click(function (e) {
            s.playNext();
        })
    });

    var fs = SimpleMultiChoiceStage.init("first_qa",72,74,$("#submit_1_btn"),$("#first_qa .answer"),$("#first_qa"),
        ["zljczx","ytylzx","zyzhzx"],75,78,78.5,83,83.5,88.5);
    var ss = SimpleMultiChoiceStage.init("second_qa",89,91.5,$("#submit_2_btn"),$("#second_qa .answer"),$("#second_qa"),
        ["jyjczx","yyglzx_b","ytcxzx","jzlrzx"],92,95,95.5,100,100.5,105);
    var ts = SimpleMultiChoiceStage.init("third_qa",105.5,108.5,$("#submit_3_btn"),$("#third_qa .answer"),$("#third_qa"),
        ["xsjyglq","cdjzlrhsczr","zcgszlmbdsx"],109,111.5,112,117,117.5,122);
    var fourth = Stage.init("book",123,194,function (s) {//初始化
        $("#p1ToP2").click(function (e) {
            s.playNext();
        })
    });
    var es = Stage.init(null,195,0)


//        $("#desc").find("#light_img").addClass("light_rotate")
//     var sm = VideoStageManager.init("pageWrap","video",[zs,fs,ss,ts,fours,fives,sixs,sevens,es],function () {
//         $("#end_page").show();
//     });
    var sm = VideoStageManager.init("pageWrap","video",[zs,fs,ss,ts,fourth,es],function () {
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
