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

    var zs = Stage.init("butterfly",0,71,function (s) {//初始化
        var lastTouch = null;
        var $this = $("#"+s.stageId)
        $this.find(".jigsaw").on("touchstart",function (e) {
            e.preventDefault();
            if($(this).css("opacity")=="1"){
                var data = $(this).attr("data")
                lastTouch = e.touches[0];
                $this.find('.j_'+data).css("top",lastTouch.clientY-96).css("left",lastTouch.clientX-64)
                $(this).css("opacity",0);
                $this.find('.j_'+data).show()
            }
        }).on("touchmove",function (e) {
            e.preventDefault();
            var data = $(this).attr("data")
            if(lastTouch){
                var curTouch = e.touches[0];
                var $img = $this.find('.j_'+data);
                $img.css("top",curTouch.clientY-$img.height()/2).css("left",curTouch.clientX-$img.width()/2)
                lastTouch = curTouch;

                var $timg = $this.find('.a_'+data);

                if(Math.abs(curTouch.clientY-$timg.height()/2-parseFloat($timg.css("top")))<30
                &&Math.abs(curTouch.clientX-$timg.width()/2-parseFloat($timg.css("left")))<30){
                    $timg.show();
                    $timg.css("opacity",0.5)
                }else{
                    $timg.hide();
                }
            }
        }).on("touchend",function (e) {
            e.preventDefault();
            var data = $(this).attr("data")
            lastTouch = null
            var $timg = $this.find('.a_'+data);
            if($timg.is(':hidden')){
                $(this).css("opacity",1);
                $this.find('.j_'+data).hide()
            }else{
                $timg.css("opacity",1);
                $this.find('.j_'+data).hide();
            }

            if($this.find('.a:hidden').length==0){
                s.playNext();
            }
        })
    },function (s) {
        var $this = $("#"+s.stageId);
        $this.find(".jigsaw").show()
        $this.find(".j").hide()
        $this.find(".a").hide()
    });

    var es = Stage.init(null,72,0)


//        $("#desc").find("#light_img").addClass("light_rotate")
//     var sm = VideoStageManager.init("pageWrap","video",[zs,fs,ss,ts,fours,fives,sixs,sevens,es],function () {
//         $("#end_page").show();
//     });
    var sm = VideoStageManager.init("pageWrap","video",[zs,es],function () {
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
