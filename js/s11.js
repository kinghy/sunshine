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
        $("#start_confirm").click(function (e) {
            this.src = "resource/confirm_highlight.png";
            setTimeout(function () {
                this.src = "resource/confirm.png"
                s.playNext();
            }.bind(this),500)
        })
    });

    var fs = CustomChoiceStage.init("first_qa",53,54,$("#submit"),function () {
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

    var bs = Stage.init("book",72,99,function (s) {//初始化
        var lastTouch2 = null;
        $("#goonFirst").on("touchstart",function (e) {
            e.preventDefault();
            lastTouch2 = e.touches[0];
        }).on("touchend",function (e) {
            e.preventDefault();
            if(lastTouch2){
                var curTouch = e.changedTouches[0];
                if(curTouch.pageY<lastTouch2.pageY-100){
                    s.playNext();
                }
            }
            lastTouch2 = null
        })

    });

    var ss = CustomChoiceStage.init("second_qa",99,124,$("#q1_submit"),function () {
        var str = "";
        $("#second_qa .letterPos").each(function (index) {
            var $this = $(this)
            str += $this.text();
            $this.html("&nbsp;&nbsp;&nbsp;");
            $this.removeClass("letterInput")
            if(index==0){
                $this.addClass("letterInput")
            }
        })
        return str=="众家自我";
    },128,130,131,134,135,142,function () {
        var $letterPos = $("#second_qa .letterPos")
        var selectIndex = 0;
        var $selectedPos = $($letterPos[selectIndex]).addClass("letterInput")
        $("#second_qa .letter img").click(function () {
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
                setTimeout(function () {
                    $selectedPos.removeClass("letterInput")
                    selectIndex = selectIndex+1<$letterPos.length?selectIndex+1:0;
                    $selectedPos = $($letterPos[selectIndex]).addClass("letterInput")
                },300)
            }.bind(this),500)
        })
    });

    var ts = CustomChoiceStage.init("third_qa",143,144,$("#q2_submit"),function () {
        var str = "";
        $("#third_qa .letterPos").each(function (index) {
            var $this = $(this)
            str += $this.text();
            $this.html("&nbsp;&nbsp;&nbsp;");
            $this.removeClass("letterInput")
            if(index==0){
                $this.addClass("letterInput")
            }
        })
        return str=="业内业外";
    },146,149,150,153,154,161,function () {
        var $letterPos = $("#third_qa .letterPos")
        var selectIndex = 0;
        var $selectedPos = $($letterPos[selectIndex]).addClass("letterInput")

        $("#third_qa .letter img").click(function () {
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
                setTimeout(function () {
                    $selectedPos.removeClass("letterInput")
                    selectIndex = selectIndex+1<$letterPos.length?selectIndex+1:0;
                    $selectedPos = $($letterPos[selectIndex]).addClass("letterInput")
                },300)
            }.bind(this),500)
        })
    });
    var fours = CustomChoiceStage.init("fourth_qa",162,163,$("#q3_submit"),function () {
        var str = "";
        $("#fourth_qa .letterPos").each(function (index) {
            var $this = $(this)
            str += $this.text();
            $this.html("&nbsp;&nbsp;&nbsp;");
            $this.removeClass("letterInput")
            if(index==0){
                $this.addClass("letterInput")
            }
        })
        return str=="高远";
    },165,168,169,172,173,180,function () {
        var $letterPos = $("#fourth_qa .letterPos")
        var selectIndex = 0;
        var $selectedPos = $($letterPos[selectIndex]).addClass("letterInput")

        $("#fourth_qa .letter img").click(function () {
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
                setTimeout(function () {
                    $selectedPos.removeClass("letterInput")
                    selectIndex = selectIndex+1<$letterPos.length?selectIndex+1:0;
                    $selectedPos = $($letterPos[selectIndex]).addClass("letterInput")
                },300)
            }.bind(this),500)
        })
    });
    var fives = CustomChoiceStage.init("fifth_qa",181,182,$("#q4_submit"),function () {
        var str = "";
        $("#fifth_qa .letterPos").each(function (index) {
            var $this = $(this)
            str += $this.text();
            $this.html("&nbsp;&nbsp;&nbsp;");
            $this.removeClass("letterInput")
            if(index==0){
                $this.addClass("letterInput")
            }
        })
        return str=="做事做人";
    },184,187,188,191,192,199,function () {
        var $letterPos = $("#fifth_qa .letterPos")
        var selectIndex = 0;
        var $selectedPos = $($letterPos[selectIndex]).addClass("letterInput")
        $("#fifth_qa .letter img").click(function () {
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
                setTimeout(function () {
                    $selectedPos.removeClass("letterInput")
                    selectIndex = selectIndex+1<$letterPos.length?selectIndex+1:0;
                    $selectedPos = $($letterPos[selectIndex]).addClass("letterInput")
                },300)
            }.bind(this),500)
        })
    });
    var sixs = CustomChoiceStage.init("sixth_qa",199,200,$("#q5_submit"),function () {
        var str = "";
        $("#sixth_qa .letterPos").each(function (index) {
            var $this = $(this)
            str += $this.text();
            $this.html("&nbsp;&nbsp;&nbsp;");
            $this.removeClass("letterInput")
            if(index==0){
                $this.addClass("letterInput")
            }
        })
        return str=="精英阳光";
    },202,205,206,209,210,217,function () {
            var $letterPos = $("#sixth_qa .letterPos")
            var selectIndex = 0;
            var $selectedPos = $($letterPos[selectIndex]).addClass("letterInput")
            $("#sixth_qa .letter img").click(function () {
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
                    setTimeout(function () {
                        $selectedPos.removeClass("letterInput")
                        selectIndex = selectIndex+1<$letterPos.length?selectIndex+1:0;
                        $selectedPos = $($letterPos[selectIndex]).addClass("letterInput")
                    },300)
                }.bind(this),500)
            })
        });

    var es = Stage.init(null,218,0)
    var sm = VideoStageManager.init("pageWrap","video",[zs,fs,bs,ss,ts,fours,fives,sixs,es],function () {
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
