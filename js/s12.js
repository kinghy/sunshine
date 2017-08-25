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
    // var handle = null;
    //构建场景
    var submitCallback = function(s,answer){
        // clearInterval(handle);
        var str = "";
        $("#"+s.stageId+" .letterPos").each(function (index) {
            var $this = $(this)
            str += $this.text();
            $this.removeClass("letterInput")
            if(index==0){
                $this.addClass("letterInput")
            }
        })
        return str==answer;
    }

    var initCallback = function (s) {
        var $letterPos = $("#"+s.stageId+" .letterPos")
        var selectIndex = 0;
        var $selectedPos = $($letterPos[selectIndex]).addClass("letterInput")

        $letterPos.each(function (index) {
            $(this).click(function () {
                if(index!=selectIndex){
                    $selectedPos.removeClass("letterInput")
                    selectIndex = index;
                    $selectedPos = $($letterPos[selectIndex]).addClass("letterInput")
                }
            })
        })

        $("#"+s.stageId+" .answerPos img").click(function () {
            $letterPos.each(function (index) {
                var $this = $(this);
                if($this.hasClass("letterInput")){
                    $selectedPos = $this;
                    selectIndex = index;
                }
            })
            var $this = $(this);
            this.src = "resource/"+$this.attr("data")+"_highlight.png";
            setTimeout(function () {
                this.src = "resource/"+$this.attr("data")+".png"
                var t = $this.attr("letter");
                if($selectedPos.hasClass("letterFour") && t.length>4){
                    t = t.substring(0,4);
                }
                $selectedPos.html(t)
                if(selectIndex+1<$letterPos.length){
                    $selectedPos.removeClass("letterInput")
                    selectIndex = selectIndex+1;
                    $selectedPos = $($letterPos[selectIndex]).addClass("letterInput")
                }
            }.bind(this),500)
        })
    }

    var showCallback = function (s) {
        // clearInterval(handle);
        $("#"+s.stageId+" .letterPos").each(function(){
            $(this).html("&nbsp;");
        })
        $("#"+s.stageId+" .answer").show();
    }

    var zs = Stage.init("qa",0,146,function (s) {//初始化
        $("#qa_no").click(function () {
            s.hide();
            s.run2StageEnd(0,85);
        })
        $("#qa_yes").click(function () {
            s.playNext();
        })
    });

    var fs = CustomChoiceStage.init("first_qa",147,155.5,$("#q1_submit"),function (s) {
        return submitCallback(s,"一分耕耘一分收获脚踏实地尊重规律");
    },157,160,160.5,164,164.5,167.5,function (s) {
        initCallback(s);
    },function (s) {
        showCallback(s);
    });

    var ss = CustomChoiceStage.init("second_qa",168,170.2,$("#q2_submit"),function (s) {
        return submitCallback(s,"感恩土地勤劳、踏实、善良");
    },170.5,173.5,174,178,178.5,181.5,function (s) {
        initCallback(s);
    },function (s) {
        showCallback(s);
    });

    var ts = CustomChoiceStage.init("third_qa",182.5,184,$("#q3_submit"),function (s) {
        return submitCallback(s,"一蹴而就不忘初心精益求精");
    },184.5,187.5,188,192,192.5,195.5,function (s) {
        initCallback(s);
    },function (s) {
        showCallback(s);
    });

    var fours = CustomChoiceStage.init("fourth_qa",196,198,$("#q4_submit"),function (s) {
        return submitCallback(s,"心无旁骛长久持续");
    },198.5,201.5,202,206,206.5,210,function (s) {
        initCallback(s);
    },function (s) {
        showCallback(s);
    });


    var es = Stage.init(null,211,0)
    var sm = VideoStageManager.init("pageWrap","video",[zs,fs,ss,ts,fours,es],function () {
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
