/**
 * Created by rjt on 2017/7/19.
 */
var cvWidth = 321;//canvas宽度
var cvHeight = 406;//canvas高度

//扩展js方法用于获取url参数
(function ($) {
    $.getUrlParam = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
    }
})(jQuery);

//页面适配，根据屏幕的高度自动缩放
$().ready(function () {
    var vp = $("head").find("[name='viewport']");
    var h = document.documentElement.clientHeight>document.documentElement.clientWidth?document.documentElement.clientHeight:document.documentElement.clientWidth
    vp.attr("content",vp.attr("content")+",maximum-scale="+(h/1140).toFixed(2));
})

$().ready(function () {

    //屏蔽右键菜单
    document.body.addEventListener('contextmenu', function (e) {
        e.preventDefault();
    });

    //视频调整
    var resizeStage = function () {
        //调整缩放比
        var vp = $("head").find("[name='viewport']");
        var reg = /maximum-scale=\d+.\d+/g;
        var arr = vp.attr("content").match(reg);
        var scale = arr?arr[0].replace("maximum-scale=",""):1;
        var h = document.documentElement.clientHeight>document.documentElement.clientWidth?document.documentElement.clientHeight:document.documentElement.clientWidth
        var rh = h*scale;
        var newScale = (rh/ 1140).toFixed(2);
        // if(scale!=newScale){
        if(scale>=newScale+0.05 || scale<=newScale-0.05){
            vp.attr("content","width=device-width,initial-scale=1.0, user-scalable=no,minimal-ui,maximum-scale="+newScale);
        //
        }else{
            var root = $("#root");
            $("#root").css('transform', "rotate(0deg)");
            $("body").width(innerWidth)
            $("body").height(innerHeight)
            root.width(innerWidth);
            root.height(innerHeight);
            if (root.width() > root.height()) {
                var angle = window.orientation ? window.orientation : screen.orientation.angle;
                root.width(innerHeight);
                root.height(innerWidth);
                var sub = (innerWidth - innerHeight) / 2
                if(angle<0){
                    sub *= -1;
                }
                $("#root").css('transform', "rotate(" + angle * (-1) + "deg) translate(" + sub + "px," + sub + "px)")
            }

        }
    }

    resizeStage();

    $(window).resize(function () {
        setTimeout(function () {
            resizeStage();
        }, 100)

    });

    //在js中设置canvas的宽高时，如果设置方式不正确，或者在cass中设置时，在绘制图像时就会出现拉伸的情况。这是因为canvas的默认宽高为300px*150px，在css中设置canvas的宽高，实际上是把canvas在300px*150px的基础上进行了拉伸。所以绘制出来的图像会发生变形。
    $("#cv").get(0).width = cvWidth;
    $("#cv").get(0).height = cvHeight;
    //屏蔽安卓中的video点击自动播放
    $("#video").click(function () {
        event.preventDefault();//屏蔽事件传递
    })

    //loading页
    var mycv = document.getElementById("cv");
    var myctx = mycv.getContext("2d");
    var imgs = ["resource/01.png","resource/02.png","resource/03.png","resource/04.png"];
    AnimationImages.init(myctx,imgs);

    setTimeout(function () {
        $("#loading_page").hide();
        $("#start_page").show();
    },loadingTime);
});

var SimpleMultiChoiceStage = {
    init:function(stageId,startTime,endTime,$submitBtn,$answerBtns,$answerArea,answers,correctedSTime,correctedETime,wrong1STime,wrong1ETime,wrong2STime,wrong2ETime,initCallBack,showCallBack,hideCallBack){
        var cs = ChoiceStage.init(stageId,startTime,endTime,null,null,correctedSTime,correctedETime,wrong1STime,wrong1ETime,wrong2STime,wrong2ETime,initCallBack,showCallBack,hideCallBack);
        $answerBtns.click(function () {
            var $this = $(this);
            if($this.hasClass("selected")){
                this.src = "resource/"+$this.attr("data")+".png";
                $this.removeClass("selected");
            }else{
                this.src = "resource/"+$this.attr("data")+"_highlight.png";
                $this.addClass("selected");
            }
        });
        var etimes = 0;
        $submitBtn.click(function () {
            var corrects = 0;
            $answerArea.find(".selected").each(function () {

                var $this = $(this)
                setTimeout(function () {
                    $this.get(0).src = "resource/"+$this.attr("data")+".png";
                    $this.removeClass("selected");
                },600)
                var data = $this.attr("data");
                var isCorrect = false;
                for(var i in answers){
                    if(answers[i]==data){
                        isCorrect = true;
                        break;
                    }
                }
                if(isCorrect){
                    ++corrects;
                }else{
                    --corrects;
                }
            });
            if(corrects==answers.length){
                cs.correct(this,stageId,cs,correctedSTime,correctedETime);
            }else{
                cs.wrong(this, ++etimes, stageId, cs, endTime, wrong1STime, wrong1ETime, wrong2STime, wrong2ETime);
            }

        });
        return cs;
    }
}


var MultiChoiceStage = {
    init:function(stageId,startTime,endTime,$submitBtn,$answerBtns,$answerArea,answers,correctedSTime,correctedETime,wrong1STime,wrong1ETime,wrong2STime,wrong2ETime,initCallBack,showCallBack,hideCallBack){
        var cs = ChoiceStage.init(stageId,startTime,endTime,null,null,correctedSTime,correctedETime,wrong1STime,wrong1ETime,wrong2STime,wrong2ETime,initCallBack,showCallBack,hideCallBack);
        $answerBtns.click(function () {
            var $this = $(this);
            this.src = "resource/"+$this.attr("data")+"_highlight.png";
            setTimeout(function () {
                $this.hide();
                var data = $this.attr("data");
                this.src = "resource/"+data+".png";
                var $img = $("<img id=\""+data+"_answer\" class='abtn' data=\""+$this.attr("data")+"\" src=\"resource/"+$this.attr("data")+".png\" />")
                var $dom = $("<div class=\"fourth_choice_btn\">"+ "</div>");
                $dom.append($img);
                $answerArea.append($dom);
                $img.click(function () {
                    var $thisImg = $(this);
                    var data = $thisImg.attr("data");
                    this.src = "resource/"+data+"_highlight.png";
                    setTimeout(function () {
                        $thisImg.parent().remove();
                        $this.show();
                    }.bind(this), 500);
                });

            }.bind(this), 500);
        });
        var etimes = 0;
        $submitBtn.click(function () {
            var corrects = 0;
            $answerArea.find(".abtn").each(function () {
                var data = $(this).attr("data");
                var isCorrect = false;
                for(var i in answers){
                    if(answers[i]==data){
                        isCorrect = true;
                        break;
                    }
                }
                if(isCorrect){
                    ++corrects;
                }else{
                    --corrects;
                }
            });
            if(corrects==4){
                cs.correct(this,stageId,cs,correctedSTime,correctedETime);
            }else{
                cs.wrong(this, ++etimes, stageId, cs, endTime, wrong1STime, wrong1ETime, wrong2STime, wrong2ETime);
            }

        });
        return cs;
    }
}

var CustomChoiceStage = {
    init:function(stageId,startTime,endTime,$submitBtn,submitCallBack,correctedSTime,correctedETime,wrong1STime,wrong1ETime,wrong2STime,wrong2ETime,initCallBack,showCallBack,hideCallBack){
        var s = Stage.init(stageId,startTime,endTime,initCallBack,showCallBack,hideCallBack);
        var submitClicked = function () {
            if(submitCallBack && typeof(submitCallBack)=="function") {
                if(submitCallBack(ret)){
                    ret.correct(this,stageId,ret,correctedSTime,correctedETime);
                }else {
                    ret.wrong(this, ++etimes, stageId, ret, endTime, wrong1STime, wrong1ETime, wrong2STime, wrong2ETime);
                }
            }
        }
        var ret = {
            correct : function(btn,thisId,ret,correctStartTime,correctEndTime) {
                var $this = $(btn);
                btn.src = "resource/"+$this.attr("data")+"_highlight.png";
                setTimeout(function () {
                    //正确
                    s.hide();
                    btn.src = "resource/"+$this.attr("data")+".png";
                    ret.runByTime(correctStartTime,correctEndTime,correctEndTime,function () {
                        ret.playNext();
                    })
                }.bind(this), 500)
            },
            wrong : function (btn,times,thiId,ret,questionTime,wrong1StartTime,wrong1EndTime,wrong2StartTime,wrong2EndTime) {
                var $this = $(btn);
                btn.src = "resource/"+$this.attr("data")+"_highlight.png";
                setTimeout(function () {
                    //正确
                    var video = document.querySelector("video");
                    if(times<2) {
                        s.hide()
                        btn.src = "resource/"+$this.attr("data")+".png"
                        ret.runByTime(wrong1StartTime,wrong1EndTime,questionTime,function () {
                            s.show();
                        })
                    }else{
                        s.hide()
                        btn.src = "resource/"+$this.attr("data")+".png"
                        ret.runByTime(wrong2StartTime,wrong2EndTime,questionTime,function () {
                            s.show();
                        })
                    }
                }.bind(this),500)
            },
            submit : submitClicked
        }
        ret = $.extend({},s,ret);
        s = ret;
        var etimes = 0;

        $submitBtn.click(submitClicked);

        return ret;
    },

}

var ChoiceStage = {
    init:function(stageId,startTime,endTime,$correctBtns,$wrongBtns,correctedSTime,correctedETime,wrong1STime,wrong1ETime,wrong2STime,wrong2ETime,initCallBack,showCallBack,hideCallBack){
        var s = Stage.init(stageId,startTime,endTime,initCallBack,showCallBack,hideCallBack);
        var ret = {
            correct : function(btn,thisId,ret,correctStartTime,correctEndTime) {
                var $this = $(btn);
                btn.src = "resource/"+$this.attr("data")+"_highlight.png";
                setTimeout(function () {
                    //正确
                    s.hide();
                    btn.src = "resource/"+$this.attr("data")+".png";
                    ret.runByTime(correctStartTime,correctEndTime,correctEndTime,function () {
                        ret.playNext();
                    })
                }.bind(this), 500)
            },
            wrong : function (btn,times,thiId,ret,questionTime,wrong1StartTime,wrong1EndTime,wrong2StartTime,wrong2EndTime) {
                var $this = $(btn);
                btn.src = "resource/"+$this.attr("data")+"_highlight.png";
                setTimeout(function () {
                    //正确
                    var video = document.querySelector("video");
                    if(times<2) {
                        s.hide();
                        btn.src = "resource/"+$this.attr("data")+".png"
                        ret.runByTime(wrong1StartTime,wrong1EndTime,questionTime,function () {
                            s.show();
                        })
                    }else{
                        s.hide();
                        btn.src = "resource/"+$this.attr("data")+".png"
                        ret.runByTime(wrong2StartTime,wrong2EndTime,questionTime,function () {
                            s.show();
                        })
                    }
                }.bind(this),500)
            }
        }
        ret = $.extend({},s,ret);
        s = ret;
        var etimes = 0;
        if($correctBtns){
            $correctBtns.click(function () {
                ret.correct(this,stageId,ret,correctedSTime,correctedETime);
            });
        }
        if($wrongBtns) {
            $wrongBtns.click(function () {
                ret.wrong(this, ++etimes, stageId, ret, endTime, wrong1STime, wrong1ETime, wrong2STime, wrong2ETime);
            })
        }
        return ret;
    },

}

var Stage = {
    init:function(stageId,startTime,endTime,initCallBack,showCallBack,hideCallBack){
        var ret = {
            manager: null,
            stageId: stageId,
            startTime: startTime,
            endTime: endTime,
            show: function () {
                $("#"+stageId).fadeIn();
                if (showCallBack && typeof(showCallBack) == "function") {
                    showCallBack(this)
                }
            },
            hide: function () {
                $("#"+stageId).hide();
                if (hideCallBack && typeof(hideCallBack) == "function") {
                    hideCallBack(this)
                }
            },
            playNext: function () {
                this.manager.playNext();
            },
            runByTime:function (starttime,endtime,resumeTime,callback) {
                this.manager.runByTime(starttime,endtime,resumeTime,callback);
            },
            run2StageEnd:function (index,offset) {
                this.manager.run2StageEnd(index,offset);
            },
            runStage:function (index,startTime) {
                this.manager.runStage(index,startTime);
            }

        }
        if(initCallBack && typeof(initCallBack)=="function") {
            initCallBack(ret)
        }
        return ret;
    }
}

var VideoStageManager = {
    init:function (managerId,videoId,stages,endCallBack) {
        // this.zoomResize();
        var video = document.getElementById(videoId);

        var endVideo = function(){
            $("#"+managerId).hide();
            if(endCallBack && typeof(endCallBack)=="function") {
                endCallBack()
            }
        }

        var videoTimeInterval = null;
        video.addEventListener("ended",endVideo);
        var ret = {
            stageIndex:0,
            play : function(){
                // $("#"+managerId).show();
                this.stageIndex = 0;
                this.runStage(this.stageIndex);
            },
            playNext : function () {
                var s = stages[this.stageIndex];
                if(s){
                    s.hide();
                }
                this.runStage(++this.stageIndex);
            },
            runStage:function (index,startTime) {
                $("#"+managerId).show();
                if(index<stages.length){
                    this.stageIndex = index;
                    var s = stages[index];
                    video.currentTime = startTime?startTime:s.startTime;
                    video.play();
                    if(s.endTime>0) {
                        setTimeout(function () {
                            this.pauseVideo(video,s.endTime,function () {
                                s.show();
                            });
                        }.bind(this),100);
                    }
                }else{
                    endVideo();
                }

            },
            run2StageEnd:function(index,offset){//测试专用
                $("#"+managerId).show();
                offset = offset?offset:0;
                if(index<stages.length){
                    this.stageIndex = index;
                    var s = stages[index];
                    video.currentTime = s.endTime-offset;
                    if(offset==0){
                        s.show();
                    }else{
                        video.play();
                        if(s.endTime>0) {
                            setTimeout(function () {
                                if(video.currentTime<s.endTime - offset
                                    || video.currentTime>s.endTime){
                                    video.currentTime = s.endTime - offset;
                                }
                                this.pauseVideo(video, s.endTime, function () {
                                    s.show();
                                });
                            }.bind(this), 1000);
                        }
                    }
                }else{
                    endVideo();
                }

            },

            runByTime:function (starttime,endtime,resumeTime,callback) {
                video.currentTime = starttime;
                video.play();
                if(endtime>0){
                    setTimeout(function () {
                        this.pauseVideo(video,endtime,function () {
                            video.currentTime = resumeTime;
                            if(callback && typeof(callback)=="function") {
                                callback()
                            }
                        });
                    }.bind(this),100);
                }

            },

            pauseVideo : function(videoId,pauseTime,callback) {
                 clearInterval(videoTimeInterval);
                 videoTimeInterval = setInterval(function () {
                    if (videoId.currentTime.toFixed(1) == pauseTime) {
                        videoId.pause();
                        callback();
                        clearInterval(videoTimeInterval);
                    }
                }, 10);
            }
        }
        $(stages).each(function () {
            this.manager = ret;
        })
        return ret;
    },
    //video屏幕自适应
    // zoomResize : function() {
    //     var ratio = parseFloat(innerWidth / 810);
    //     $(".zoom-page").css("transform", "scale(" + ratio + "," + ratio + ")");
    //     $(".zoom-page").css("-webkit-transform", "scale(" + ratio + "," + ratio + ")");
    //     $(".zoom-page").css("height", innerHeight / ratio + 1);
    // }
}


//Loading动画类
var AnimationImages = {
    init:function (ctx,imgs) {//构造方法
        var images = new Array();
        var length = imgs.length;
        var loadCallBack = function(index){
            length--;
            if(length==0){
                ctx.drawImage(images[0],0,0,cvWidth,cvHeight,0,0,cvWidth,cvHeight);
                var times = 0,count=images.length;
                setInterval(function () {
                    ctx.clearRect(0,0,cvWidth,cvHeight);
                    ctx.drawImage(images[times%count],0,0,cvWidth,cvHeight,0,0,cvWidth,cvHeight);
                    times++;
                },1000/6);
            }
        }
        for(var i=0;i<imgs.length;++i){
            images[i] = this.addImage(imgs[i],i,loadCallBack.bind(this));
        }
        return {

        };
    },
    addImage:function(src,index,loadCallBack){
        var img = new Image();
        img.src = src;
        img.onload = function(){
            loadCallBack(index);
        };
        return img;
    }

}