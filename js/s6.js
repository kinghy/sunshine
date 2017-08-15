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
                    $("#"+s.stageId+" .answer.anum"+selectIndex).hide();
                    selectIndex = index;
                    $("#"+s.stageId+" .answer.anum"+selectIndex).fadeIn();
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

                $selectedPos.html($this.attr("letter"))
                if(selectIndex+1<$letterPos.length){
                    $selectedPos.removeClass("letterInput")
                    $("#"+s.stageId+" .answer.anum"+selectIndex).hide();

                    selectIndex = selectIndex+1;
                    $("#"+s.stageId+" .answer.anum"+selectIndex).fadeIn();
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
        $("#"+s.stageId+" .answer").hide();
        var index = 0;
        $("#"+s.stageId+" .answer.anum"+index).show();

        // handle = setInterval(function () {
        //     $("#"+s.stageId+" .answer.anum"+index++).hide();
        //     $("#"+s.stageId+" .answer.anum"+index).fadeIn();
        //     var $letterPos = $("#"+s.stageId+" .letterPos")
        //     var selectIndex=0;
        //     var $selectedPos=null;
        //     $letterPos.each(function (index) {
        //         var $this = $(this);
        //         if($this.hasClass("letterInput")){
        //             $selectedPos = $this;
        //             selectIndex = index;
        //         }
        //     })
        //     if(selectIndex+1<$letterPos.length){
        //         $selectedPos.removeClass("letterInput")
        //         $selectedPos = $($letterPos[selectIndex+1]).addClass("letterInput")
        //     }else{
        //         s.submit();
        //         clearInterval(handle);
        //     }
        // },3000);
    }

    var fs = CustomChoiceStage.init("first_qa",0,147,$("#q1_submit"),function (s) {
        return submitCallback(s,"客户客户");
    },148.5,151,151.5,155,155.5,160,function (s) {
        initCallback(s);
    },function (s) {
        showCallback(s);
    });

    var ss = CustomChoiceStage.init("second_qa",161,163,$("#q2_submit"),function (s) {
        return submitCallback(s,"衣食父母");
    },163,166,166.5,170,170.5,175,function (s) {
        initCallback(s);
    },function (s) {
        showCallback(s);
    });

    var ts = CustomChoiceStage.init("third_qa",175.5,177,$("#q3_submit"),function (s) {
        return submitCallback(s,"人性个性价值体验");
    },177.5,180,181,184,185,190,function (s) {
        initCallback(s);
    },function (s) {
        showCallback(s);
    });

    var fours = CustomChoiceStage.init("fourth_qa",190.5,192.5,$("#q4_submit"),function (s) {
        return submitCallback(s,"服务");
    },193,196,196.5,200,200.5,205,function (s) {
        initCallback(s);
    },function (s) {
        showCallback(s);
    });

    var fives = CustomChoiceStage.init("fifth_qa",205.5,207.5,$("#q5_submit"),function (s) {
        return submitCallback(s,"前置细节互联直通");
    },208,211,211.5,215,215.5,220,function (s) {
        initCallback(s);
    },function (s) {
        showCallback(s);
    });


    var es = Stage.init(null,221,0)
    var sm = VideoStageManager.init("pageWrap","video",[fs,ss,ts,fours,fives,es],function () {
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
