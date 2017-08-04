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
    var zs = Stage.init("start",0,52,function (s) {//初始化
        $(".start_pos").click(function (e) {
            s.playNext();
        })
    });

    var fs = CustomChoiceStage.init("first_qa",53,56,$("#submit"),function () {
        var str = "";
        $("input.fifty").each(function () {
            str += this.value;
        })
        return str=="五十字箴言";
    },57,59,60,63,64,71,function () {
            //绑定按键输入
            var $is = $("input.fifty")

            var inputHandle = function (e,index) {
                console.log(index+":"+this.value)
                if(this.value.length==0 || $(this).attr("composition")=="true") return;
                var str = this.value.replace($(this).attr("oldInput"),"")
                this.value = str[0];
                this.blur();
                if(index+1>=$is.length) return;
                var pos = index+1;
                var next = $is.get(pos);
                next.focus();
                var input = $is.get(pos);
                if(str.length>1){
                    input.value = str.substring(1);
                    inputHandle.call(next,e,pos)
                }
            }

            $is.each(function (index) {
                $(this).on("focus",function () {
                    this.value = "";
                }).on("input",function (e) {
                    inputHandle.call(this,e,index)
                }).on('compositionstart', function (e) {
                    $(this).attr("composition",true);
                }).on('compositionend', function (e) {
                    $(this).attr("composition",false);
                    inputHandle.call(this,e,index)
                }).on("click",function () {
                    this.value = "";
                });
            })
    })

    var ss = Stage

    var es = Stage.init(null,216,0)
    var sm = VideoStageManager.init("pageWrap","video",[zs,fs,es],function () {
        $("#end_page").show();
    });

    //开始页
    $("#go_btn").click(function () {
        $("#start_page").hide();
        //场景1
        if(startstage){
            setTimeout(function () {
                if(startpos=="start"){
                    sm.runStage(startstage);
                }else{
                    sm.run2StageEnd(startstage,2);
                }
            },1000)
        }
        sm.play();

    });

    //重播事件
    $("#replay_btn").click(function () {
        $("#end_page").hide();
        sm.play();
    });

})
