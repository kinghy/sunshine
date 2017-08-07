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

    var ss = CustomChoiceStage.init("second_qa",72,124,$("#q1_submit"),function () {
        var str = "";
        $("#second_qa .letterPos").each(function () {
            str += this.innerHTML;
        })
        return str=="众家自我";
    },126,129,130,133,134,140.5,function () {
        var $letterPos = $("#second_qa .letterPos")
        var selectIndex = 0;
        var $selectedPos = $($letterPos[selectIndex]).addClass("letterInput")
        $("#second_qa .letter img").click(function () {
            var $this = $(this);
            this.src = "resource/"+$this.attr("data")+"_highlight.png";
            setTimeout(function () {
                this.src = "resource/"+$this.attr("data")+".png"
                $selectedPos.html($this.attr("letter"))
                setTimeout(function () {
                    $selectedPos.removeClass("letterInput")
                    selectIndex = selectIndex+1<$letterPos.length?selectIndex+1:0;
                    $selectedPos = $($letterPos[selectIndex]).addClass("letterInput")
                },300)
            }.bind(this),500)
        })
    });

    var ts = CustomChoiceStage.init("third_qa",141,143,$("#q2_submit"),function () {
        var str = "";
        $("#third_qa .letterPos").each(function () {
            str += this.innerHTML;
        })
        return str=="业内业外";
    },145,148,148,152,152,160,function () {
        var $letterPos = $("#third_qa .letterPos")
        var selectIndex = 0;
        var $selectedPos = $($letterPos[selectIndex]).addClass("letterInput")

        $("#third_qa .letter img").click(function () {
            var $this = $(this);
            this.src = "resource/"+$this.attr("data")+"_highlight.png";
            setTimeout(function () {
                this.src = "resource/"+$this.attr("data")+".png"
                $selectedPos.html($this.attr("letter"))
                setTimeout(function () {
                    $selectedPos.removeClass("letterInput")
                    selectIndex = selectIndex+1<$letterPos.length?selectIndex+1:0;
                    $selectedPos = $($letterPos[selectIndex]).addClass("letterInput")
                },300)
            }.bind(this),500)
        })
    });
    var fours = CustomChoiceStage.init("fourth_qa",161,162,$("#q3_submit"),function () {
        var str = "";
        $("#fourth_qa .letterPos").each(function () {
            str += this.innerHTML;
        })
        return str=="高远";
    },164,167,167.5,171,171,179,function () {
        var $letterPos = $("#fourth_qa .letterPos")
        var selectIndex = 0;
        var $selectedPos = $($letterPos[selectIndex]).addClass("letterInput")

        $("#fourth_qa .letter img").click(function () {
            var $this = $(this);
            this.src = "resource/"+$this.attr("data")+"_highlight.png";
            setTimeout(function () {
                this.src = "resource/"+$this.attr("data")+".png"
                $selectedPos.html($this.attr("letter"))
                setTimeout(function () {
                    $selectedPos.removeClass("letterInput")
                    selectIndex = selectIndex+1<$letterPos.length?selectIndex+1:0;
                    $selectedPos = $($letterPos[selectIndex]).addClass("letterInput")
                },300)
            }.bind(this),500)
        })
    });
    var fives = CustomChoiceStage.init("fifth_qa",179,181,$("#q4_submit"),function () {
        var str = "";
        $("#fifth_qa .letterPos").each(function () {
            str += this.innerHTML;
        })
        return str=="做事做人";
    },182,185,186,189,190,197,function () {
        var $letterPos = $("#fifth_qa .letterPos")
        var selectIndex = 0;
        var $selectedPos = $($letterPos[selectIndex]).addClass("letterInput")

        $("#fifth_qa .letter img").click(function () {
            var $this = $(this);
            this.src = "resource/"+$this.attr("data")+"_highlight.png";
            setTimeout(function () {
                this.src = "resource/"+$this.attr("data")+".png"
                $selectedPos.html($this.attr("letter"))
                setTimeout(function () {
                    $selectedPos.removeClass("letterInput")
                    selectIndex = selectIndex+1<$letterPos.length?selectIndex+1:0;
                    $selectedPos = $($letterPos[selectIndex]).addClass("letterInput")
                },300)
            }.bind(this),500)
        })
    });
    var sixs = CustomChoiceStage.init("sixth_qa",198,200,$("#q5_submit"),function () {
        var str = "";
        $("#sixth_qa .letterPos").each(function () {
            str += this.innerHTML;
        })
        return str=="精英阳光";
    },201,204,204,208,208,215,function () {
        var $letterPos = $("#sixth_qa .letterPos")
        var selectIndex = 0;
        var $selectedPos = $($letterPos[selectIndex]).addClass("letterInput")

        $("#sixth_qa .letter img").click(function () {
            var $this = $(this);
            this.src = "resource/"+$this.attr("data")+"_highlight.png";
            setTimeout(function () {
                this.src = "resource/"+$this.attr("data")+".png"
                $selectedPos.html($this.attr("letter"))
                setTimeout(function () {
                    $selectedPos.removeClass("letterInput")
                    selectIndex = selectIndex+1<$letterPos.length?selectIndex+1:0;
                    $selectedPos = $($letterPos[selectIndex]).addClass("letterInput")
                },300)
            }.bind(this),500)
        })
    });

    var es = Stage.init(null,216,0)
    var sm = VideoStageManager.init("pageWrap","video",[zs,fs,ss,ts,fours,fives,sixs,es],function () {
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
