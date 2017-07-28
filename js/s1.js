/**
 * Created by rjt on 2017/7/14.
 */

//常量定义

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
    var fs = Stage.init("desc",0,44,function (s) {//初始化
        $("#desc").click(function () {
            s.playNext();
        })
    });

    var ss = Stage.init("start_qa",45,68,function (s) {//初始化
        $("#start_qa").click(function () {
            s.playNext();
        })
    },function (s) {
        $("#start_qa").find("#light_img").addClass("light_rotate");
    },function (s) {
        $("#start_qa").find("#light_img").removeClass("light_rotate");
    });

    var ts = ChoiceStage.init("first_qa",71,79,$("#y_btn"),$("#n_btn"),79,82.5,82.6,86,86.3,92);
    var fours = ChoiceStage.init("second_qa",92.8,100,$("#y3_btn"),$("#y4_btn,#y5_btn,#y6_btn"),100.5,104,104.5,107,108.3,114);
    var fives = ChoiceStage.init("third_qa",114.8,120,$("#hlwjr_btn"),$("#ysly_btn,#qjny_btn,#swkj_btn"),121,124,124.7,128,128.7,134);
    var sixs = MultiChoiceStage.init("fourth_qa",135,141,$("#submit_btn"),$("#fourth_choice img"),$("#fourth_answer"),["rhyy","xybzbx","zcgl","hjs"],141.5,145,145,148,148.8,154);

    var es = Stage.init(null,155.5,0)

//        $("#desc").find("#light_img").addClass("light_rotate")
    var sm = VideoStageManager.init("pageWrap","video",[fs,ss,ts,fours,fives,sixs,es],function () {
        $("#end_page").show();
    });

    //开始页
    $("#go_btn").click(function () {
        $("#start_page").hide();
        //场景1
        if(startstage){
            if(startpos=="start"){
                sm.runStage(startstage);
            }else{
                sm.run2StageEnd(startstage,2);
            }
        }else{
            sm.play();
        }

    });

    //重播事件
    $("#replay_btn").click(function () {
        $("#end_page").hide();
        sm.play();
    });

})
