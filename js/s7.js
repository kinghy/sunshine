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
    var zs = Stage.init("start",0,151,function (s) {//初始化
        $("#shuxi").click(function () {
            var $this = $(this);
            $this.attr("src","resource/shuxi_highlight.png");
            setTimeout(function () {
                s.hide()
                s.runStage(5)
                $this.attr("src","resource/shuxi.png");
            },500)
        });
        $("#bushuxi").click(function () {
            var $this = $(this);
            $this.attr("src","resource/bushuxi_highlight.png");
            setTimeout(function () {
                s.hide();
                s.runStage(1)
                $this.attr("src","resource/bushuxi.png");
            },500)
        })
    });
    var fs = Stage.init("page_1",151.5,156,function (s) {//初始化
        $("#p1ToP2").click(function (e) {
            s.playNext();
        })
    });
    var ss = Stage.init("page_2",158,159,function (s) {//初始化
        $("#p2ToP3").click(function (e) {
            s.playNext();
        })
        $("#p2ToP1").click(function (e) {
            s.hide();
            s.run2StageEnd(1);
        })
    });
    var ts = Stage.init("page_3",161,163,function (s) {//初始化
        $("#p3ToP4").click(function (e) {
            s.playNext();
        })
        $("#p3ToP2").click(function (e) {
            s.hide();
            s.run2StageEnd(2);
        })
    });

    var fours = Stage.init("page_4",165,166,function (s) {//初始化
        $("#p4ToP4").click(function (e) {
            s.playNext();
        })
        $("#p4ToP3").click(function (e) {
            s.hide();
            s.run2StageEnd(3);
        })
    });

    var fives = ChoiceStage.init("qa_1",168,173,$("#yuan_green_1_btn"),
        $("#gao_yellow_1_btn,#xi_blue_1_btn,#zhun_violet_1_btn,#yi_pink_1_btn,#hun_yellow_1_btn"),
        174,177,177.5,180.5,181,184);

    var sixs = ChoiceStage.init("qa_2",185,186.5,$("#zhun_violet_2_btn"),
        $("#gao_yellow_2_btn,#xi_blue_2_btn,#yuan_green_2_btn,#yi_pink_2_btn,#hun_yellow_2_btn"),
        187,190,190.5,193.5,194,197);
    var sevens = ChoiceStage.init("qa_3",198,199.5,$("#gao_yellow_3_btn"),
        $("#zhun_violet_3_btn,#xi_blue_3_btn,#yuan_green_3_btn,#yi_pink_3_btn,#hun_yellow_3_btn"),
        200,202.5,203,206.5,207,210);
    var eights = Stage.init("page_5",211,286,function (s) {//初始化
        $("#p5ToP6").click(function (e) {
            s.playNext();
        })
    });
    var nights = Stage.init("page_6",287,312,function (s) {//初始化
        $("#p6ToP7").click(function (e) {
            s.playNext();
        })
    });
    var tens = Stage.init("page_7",313,347,function (s) {//初始化
        $("#p7ToP8").click(function (e) {
            s.playNext();
        })
    });
    var es = Stage.init(null,348,0)


//        $("#desc").find("#light_img").addClass("light_rotate")
//     var sm = VideoStageManager.init("pageWrap","video",[zs,fs,ss,ts,fours,fives,sixs,sevens,es],function () {
//         $("#end_page").show();
//     });
    var sm = VideoStageManager.init("pageWrap","video",
        [zs,fs,ss,ts,fours,fives,sixs,sevens,eights,nights,tens,es],function () {
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
