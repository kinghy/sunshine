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
    var zs = Stage.init("start_1",0,137,function (s) {//初始化
        $("#start_qd_1").click(function (e) {
            this.src = "resource/qd_highlight.png";
            setTimeout(function () {
                this.src = "resource/qd.png"
                s.playNext();
            }.bind(this),500)
        })
    });

    var fs = ChoiceStage.init("first_qa",138,144,$("#zl_btn"),$("#jz_long_btn,#yj_btn"),145.5,149.5,150,154,154.5,160);
    var ss = Stage.init("start_2",161,169,function (s) {//初始化
        $("#start_qd_2").click(function (e) {
            this.src = "resource/qd_highlight.png";
            setTimeout(function () {
                this.src = "resource/qd.png"
                s.playNext();
            }.bind(this),500)
        })
    });
    var ts = ChoiceStage.init("second_qa",170,175,$("#yqwlkh_btn"),$("#jjlyzs_btn,#zszwcxbg_btn"),176.5,185,186,190,190.5,196);
    var fours = Stage.init("start_3",197,205,function (s) {//初始化
        $("#start_qd_3").click(function (e) {
            this.src = "resource/qd_highlight.png";
            setTimeout(function () {
                this.src = "resource/qd.png"
                s.playNext();
            }.bind(this),500)
        })
    });
    var fives = ChoiceStage.init("third_qa",206,211.5,$("#glsczjz_btn"),$("#whsygzh_btn,#khsgszb_btn"),213,222.5,223,227,227.5,233);
    var sixs = Stage.init("start_4",234,240.5,function (s) {//初始化
        $("#start_qd_4").click(function (e) {
            this.src = "resource/qd_highlight.png";
            setTimeout(function () {
                this.src = "resource/qd.png"
                s.playNext();
            }.bind(this),500)
        })
    });
    var sevens = Stage.init("fourth_qa",241,247,function (s) {//初始化
        // var c=document.getElementById("f_canvas");
        // var ctx=c.getContext("2d");
        // var cxs = new Image();
        // cxs.src = "resource/cxs.png";
        // cxs.onload=function(){
        //     ctx.drawImage(cxs,10,10,198,70);
        // };
        // cxs.onclick = function () {
        //     alert(123);
        // }
        // var gls = new Image();
        // gls.src = "resource/gls.png";
        // gls.onload=function(){
        //     ctx.drawImage(gls,10,120,198,70);
        // };
        // var whs = new Image();
        // whs.src = "resource/whs.png";
        // whs.onload=function(){
        //     ctx.drawImage(whs,10,230,198,70);
        // };
        var canvas = new fabric.Canvas('f_canvas');
        fabric.Image.fromURL('resource/cxs.png', function(img) {
            img.set({
                left: 10,
                top: 10
            });
            canvas.add(img);
        });

    });
    var es = Stage.init(null,340,0)
    var sm = VideoStageManager.init("pageWrap","video",[zs,fs,ss,ts,fours,fives,sixs,sevens,es],function () {
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
