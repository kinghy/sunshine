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
    // var zs = Stage.init("start",0,52,function (s) {//初始化
    //     $("#start_confirm").click(function (e) {
    //         this.src = "resource/confirm_highlight.png";
    //         setTimeout(function () {
    //             this.src = "resource/confirm.png"
    //             s.playNext();
    //         }.bind(this),500)
    //     })
    // });
    //
    // var fs = CustomChoiceStage.init("first_qa",53,54,$("#submit"),function () {
    //     var str = "";
    //     $("input.fifty").each(function () {
    //         str += this.value;
    //     })
    //     return str=="五十字箴言";
    // },57,59,60,63,64,71,function () {
    //         //绑定按键输入
    //         var $is = $("input.fifty")
    //
    //         var inputHandle = function (e,index) {
    //             console.log(index+":"+this.value)
    //             if(this.value.length==0 || $(this).attr("composition")=="true") return;
    //             var str = this.value.replace($(this).attr("oldInput"),"")
    //             this.value = str[0];
    //             this.blur();
    //             if(index+1>=$is.length) return;
    //             var pos = index+1;
    //             var next = $is.get(pos);
    //             next.focus();
    //             var input = $is.get(pos);
    //             if(str.length>1){
    //                 input.value = str.substring(1);
    //                 inputHandle.call(next,e,pos)
    //             }
    //         }
    //
    //         $is.each(function (index) {
    //             $(this).on("focus",function () {
    //                 this.value = "";
    //             }).on("input",function (e) {
    //                 inputHandle.call(this,e,index)
    //             }).on('compositionstart', function (e) {
    //                 $(this).attr("composition",true);
    //             }).on('compositionend', function (e) {
    //                 $(this).attr("composition",false);
    //                 inputHandle.call(this,e,index)
    //             }).on("click",function () {
    //                 this.value = "";
    //             });
    //         })
    // })
    //99
    var bs = Stage.init("book",0,75.5,function (s) {//初始化
        // var lastTouch2 = null;
        // $("#goonFirst").on("touchstart",function (e) {
        //     e.preventDefault();
        //     lastTouch2 = e.touches[0];
        // }).on("touchend",function (e) {
        //     e.preventDefault();
        //     if(lastTouch2){
        //         var curTouch = e.changedTouches[0];
        //         if(curTouch.pageY<lastTouch2.pageY-100){
        //             s.playNext();
        //         }
        //     }
        //     lastTouch2 = null
        // })
        $("#goonFirst").click(function () {
            var $this = $(this);
            $this.find("img").attr("src","resource/goon_highlight.png");
            setTimeout(function () {
                s.playNext();
                $this.find("img").attr("src","resource/goon.png");
            },500)
        })
    });

    var ss = CustomChoiceStage.init("second_qa",76,101,$("#q1_submit"),function () {
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
    },104.5,106.5,107.5,110.5,111.5,118.5,function () {
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

    var ts = CustomChoiceStage.init("third_qa",119,120.5,$("#q2_submit"),function () {
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
    },122.5,125.5,126,129.5,130,137.5,function () {
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
    var fours = CustomChoiceStage.init("fourth_qa",138.5,139.5,$("#q3_submit"),function () {
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
    },141.5,144.5,145,148.5,149,156.5,function () {
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
    var fives = CustomChoiceStage.init("fifth_qa",157.5,158.5,$("#q4_submit"),function () {
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
    },160.5,163.5,164,167.5,168,175,function () {
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
    var sixs = CustomChoiceStage.init("sixth_qa",175.5,176.5,$("#q5_submit"),function () {
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
    },178.5,181.5,182,185.5,186,193,function () {
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

    var es = Stage.init(null,193.5,0)
    var sm = VideoStageManager.init("pageWrap","video",[bs,ss,ts,fours,fives,sixs,es],function () {
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
