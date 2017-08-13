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

    var zs = Stage.init("start",0,122,function (s) {//初始化
        $(".start_pos").click(function (e) {
            s.playNext();
        })
    });

    var fs = Stage.init("choice",123,126,function (s) {//初始化
        $(".choice_pos").click(function (e) {
            $("#choice").hide();
            var $t = $(e.target)
            s.runStage(parseInt($t.attr("data"))+1)
        })
    });

    $("#back").click(function () {
        $("#back_img").attr("src","resource/back_highlight.png");
        setTimeout(function () {
            $("#back_img").attr("src","resource/back.png");
            $("#choice_wrong").hide();
            sm.run2StageEnd(1,0);
        },500)
    })

    var ss = Stage.init("choice_wrong",127,129);
    var ts = Stage.init("choice_wrong",130,132);
    var fours = Stage.init("choice_wrong",133.5,135);

    var fives = Stage.init("book_4",137,143,function (s) {//初始化
        $("#page2Next_4").click(function () {
            s.playNext();
        })
    });

    var sixs = Stage.init("book_1",144,279,function (s) {//初始化
        $("#page2Next").click(function () {
            s.playNext();
        })
    });

    var sevens = Stage.init("iphone",280,286,function (s) {//初始化
        $("#article").scroll(function(e){
            var $this =$(this),
                viewH =$this.height(),//可见高度
                contentH =$this.get(0).scrollHeight,//内容高度
                scrollTop =$this.scrollTop();//滚动高度
            if(contentH==viewH+scrollTop){
                $("#tips").hide();
                $("#goon").fadeIn();
            }
        });
        $("#goon").click(function () {
            s.playNext();
        })
    },function (s) {
        $("#tips").show();
        $("#goon").hide();
    });

    var eights = Stage.init("book_2",288,337,function (s) {//初始化
        $("#p1ToP2").click(function () {
            s.playNext();
        })
    });

    var ns = Stage.init("book_3",338,340,function (s) {//初始化
        $("#p2ToP1").click(function () {
            s.hide();
            s.run2StageEnd(8,1);
        })
        $("#p2ToP2").click(function () {
            s.playNext();
        })
    });


    var es = Stage.init(null,340,0)


//        $("#desc").find("#light_img").addClass("light_rotate")
    var sm = VideoStageManager.init("pageWrap","video",[zs,fs,ss,ts,fours,fives,sixs,sevens,eights,ns,es],function () {
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
