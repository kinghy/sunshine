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
    var zs = Stage.init("start_1",0,136.5,function (s) {//初始化
        $("#start_qd_1").click(function (e) {
            this.src = "resource/qd_highlight.png";
            setTimeout(function () {
                this.src = "resource/qd.png"
                s.playNext();
            }.bind(this),500)
        })
    });

    var fs = ChoiceStage.init("first_qa",138,143,$("#zl_btn"),$("#jz_long_btn,#yj_btn"),145.5,149.5,150.3,154,154.5,160);
    var ss = Stage.init("start_2",161,168.5,function (s) {//初始化
        $("#start_qd_2").click(function (e) {
            this.src = "resource/qd_highlight.png";
            setTimeout(function () {
                this.src = "resource/qd.png"
                s.playNext();
            }.bind(this),500)
        })
    });
    var ts = ChoiceStage.init("second_qa",170,174.5,$("#yqwlkh_btn"),$("#jjlyzs_btn,#zszwcxbg_btn"),176.5,185,186,190,190.5,196);
    var fours = Stage.init("start_3",197,205,function (s) {//初始化
        $("#start_qd_3").click(function (e) {
            this.src = "resource/qd_highlight.png";
            setTimeout(function () {
                this.src = "resource/qd.png"
                s.playNext();
            }.bind(this),500)
        })
    });
    var fives = ChoiceStage.init("third_qa",206,211,$("#glsczjz_btn"),$("#whsygzh_btn,#khsgszb_btn"),213,222.5,223,227,227.5,233);
    var sixs = Stage.init("start_4",234,240.5,function (s) {//初始化
        $("#start_qd_4").click(function (e) {
            this.src = "resource/qd_highlight.png";
            setTimeout(function () {
                this.src = "resource/qd.png"
                s.playNext();
            }.bind(this),500)
        })
    });

    var lineAnswer = new Array();
    var $g1 = null;
    var $g2 = null;
    var $g1Sel = null;
    var $g2Sel = null;
    var sevens = CustomChoiceStage.init("fourth_qa",241,246.8,$("#q4_submit"),function () {
        return (lineAnswer["cxs"]=="bjdl" && lineAnswer["gls"]=="czjz" && lineAnswer["whs"] == "ygzh")
    },249,259.5,260.5,264,264.5,270,function (s) {//初始化
        var $s = $("#"+s.stageId);
        $g1 = $s.find(".g1");
        $g2 = $s.find(".g2");
        var selectGroup = function ($this,$g) {
            if($this.hasClass("selected")){
                $this.removeClass("selected");
                $this.attr("src","resource/"+$this.attr("data")+".png");
                return null;
            }else{
                $g.each(function () {
                    var $t = $(this)
                    if($t.hasClass("selected")){
                        $t.removeClass("selected");
                        $t.attr("src","resource/"+$t.attr("data")+".png");
                    }
                })
                $this.addClass("selected");
                $this.attr("src","resource/"+$this.attr("data")+"_highlight.png");
                return $this;
            }
        }

        var drawLine = function () {
            if($g1Sel!=null && $g2Sel!=null){
                var canvas = document.getElementById("f_canvas");//获取到canvas元素
                var context = canvas.getContext("2d");//获取上下文的环境
                context.beginPath();
                context.moveTo(0,0);
                // context.lineTo(300,300);
                var moveX = $g1Sel.position().left+$g1Sel.width()+10;
                var moveY = $g1Sel.position().top+$g1Sel.height()/2;
                var LineX = $g2Sel.position().left-10;
                var LineY = $g2Sel.position().top+$g2Sel.height()/2;
                context.moveTo(moveX,moveY);
                context.lineTo(LineX,LineY);
                context.strokeStyle = "#36D9FF"
                context.lineWidth = 5;//线条的宽度
                context.stroke();//绘制
                context.closePath();
                $g1Sel.removeClass("selected");
                $g1Sel.addClass("lined");
                $g1Sel.attr("src","resource/"+$g1Sel.attr("data")+".png");

                $g2Sel.removeClass("selected");
                $g2Sel.addClass("lined");
                $g2Sel.attr("src","resource/"+$g2Sel.attr("data")+".png");

                lineAnswer[$g1Sel.attr("data")]= $g2Sel.attr("data");
                $g1Sel = null;
                $g2Sel = null;
            }
        }

        $g1.click(function () {
            var $t = $(this)
            if(!$t.hasClass("lined")){
                $g1Sel = selectGroup($t,$g1);
                setTimeout(function () {
                    drawLine();
                },300)
            }
        })
        $g2.click(function () {
            var $t = $(this)
            if(!$t.hasClass("lined")){
                $g2Sel = selectGroup($t,$g2);
                setTimeout(function () {
                    drawLine();
                },300)
            }
        })

    },function (s) {
        var canvas = document.getElementById("f_canvas");//获取到canvas元素
        var context = canvas.getContext("2d");//获取上下文的环境
        context.clearRect(0,0,500,400);
        lineAnswer = new Array();
        $g1Sel = null;
        $g2Sel = null;
        $g1.removeClass("lined").removeClass("selected");
        $g2.removeClass("lined").removeClass("selected");
    });
    var eights = Stage.init("start_5",271,284.5,function (s) {//初始化
        $("#start_qd_5").click(function (e) {
            this.src = "resource/qd_highlight.png";
            setTimeout(function () {
                this.src = "resource/qd.png"
                s.playNext();
            }.bind(this),500)
        })
    });
    var nights = ChoiceStage.init("fifth_qa",285,290.8,$("#zysy_2_btn"),$("#gwdx_btn,#qyyq_btn"),292,307,308,311,311.5,317);


    var es = Stage.init(null,317.5,0)
    var sm = VideoStageManager.init("pageWrap","video",[zs,fs,ss,ts,fours,fives,sixs,sevens,eights,nights,es],function () {
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
