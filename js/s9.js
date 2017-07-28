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

    var zs = Stage.init("start",0,95,function (s) {//初始化
        $(".start_pos").click(function (e) {
            s.playNext();
        })
    });

    var fs = ChoiceStage.init("first_qa",96,98,$("#jjlg_btn"),$("#xjby_btn,#zjld_btn"),99,102,103,106,108,113);
    var ss = MultiChoiceStage.init("fourth_qa",114,116,$("#submit_btn"),$("#fourth_choice img"),$("#fourth_answer"),
        ["rhyy","xybzbx","zcgl","hjs"],117,119,120,124,125,129);1232zuodao zheli

    var ss = ChoiceStage.init("second_qa",$("#jjlg_c_btn"),$("#yfyw_btn,#zctd_btn,#zjld_d_btn"),);
    var ts = ChoiceStage.init("third_qa",130,133,$("#yjzs_btn"),$("#xhge_btn,#mmhh_btn"),134,137,138,142,143,148);
    // var fours = ChoiceStage.init("four_qa",149,151,$("#jjlg_c_btn"),$("#yfyw_btn,#zctd_btn,#zjld_d_btn"),152,155,156,160,161,165);
    var fives = ChoiceStage.init("five_qa",166,168,$("#hwsk_1_btn"),$("#wjtr_btn,#rxzr_btn"),169,172,173,177,178,183);
    var sixs = ChoiceStage.init("six_qa",184,186,$("#bcxr_btn"),$("#xhcy_btn,#hwsk_btn"),187,190,191,195,196,200);
    // var sevens = ChoiceStage.init("seven_qa",201,204,$("#jjlg_c_btn"),$("#yfyw_btn,#zctd_btn,#zjld_d_btn"),205,207,208,213,214,218);

    var es = Stage.init(null,219,0)


//        $("#desc").find("#light_img").addClass("light_rotate")
//     var sm = VideoStageManager.init("pageWrap","video",[zs,fs,ss,ts,fours,fives,sixs,sevens,es],function () {
//         $("#end_page").show();
//     });
    var sm = VideoStageManager.init("pageWrap","video",[zs,fs,ts,fives,sixs,es],function () {
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
