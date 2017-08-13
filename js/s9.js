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

    var fs = ChoiceStage.init("first_qa",96,98,$("#jjlg_btn"),$("#xjby_btn,#zjld_btn"),99,102,103,107,108,112.5);
    var ss = SimpleMultiChoiceStage.init("second_qa",114,115,$("#submit_2_btn"),$("#second_qa .answer"),$("#second_qa"),
        ["zctd","zjld_d"],117,119,120,124,125,130);

    var ts = ChoiceStage.init("third_qa",130.5,133,$("#yjzs_btn"),$("#zctd_b_btn,#mmhh_btn"),134,137,138,142,143,148);
    var fours = SimpleMultiChoiceStage.init("four_qa",149,151,$("#submit_3_btn"),$("#four_qa .answer"),$("#four_qa"),
        ["xhge","rxzr_c"],152,155,156,160,161,165);
    var fives = ChoiceStage.init("five_qa",165.7,168,$("#hwsk_1_btn"),$("#wjtr_btn,#rxzr_btn"),169,172,173,177,178,183);
    var sixs = ChoiceStage.init("six_qa",184,186,$("#bcxr_btn"),$("#xhcy_btn,#hwsk_btn"),187,190,191,195,196,200);
    var sevens = SimpleMultiChoiceStage.init("seven_qa",201,204,$("#submit_4_btn"),$("#seven_qa .answer"),$("#seven_qa"),
        ["rrjt","whsh"],205,207,208.5,213,214,218);

    var eights = Stage.init("book",219,328,function (s) {//初始化
        $("#p1ToP2").click(function (e) {
            s.playNext();
        })
    });

    var es = Stage.init(null,329,0)


//        $("#desc").find("#light_img").addClass("light_rotate")
//     var sm = VideoStageManager.init("pageWrap","video",[zs,fs,ss,ts,fours,fives,sixs,sevens,es],function () {
//         $("#end_page").show();
//     });
    var sm = VideoStageManager.init("pageWrap","video",[zs,fs,ss,ts,fours,fives,sixs,sevens,eights,es],function () {
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
