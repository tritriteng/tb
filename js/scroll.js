// 第一组
function scroll1(){
    var Ulscroll= document.getElementById('seller_ad_scroll');
    var aLis = Ulscroll.getElementsByTagName('li');

    var oPromo1 = document.getElementById('promo1');
    var aAs = oPromo1.getElementsByTagName('a');

    var oPrev1 = document.getElementById('prev1');
    var oNext1 = document.getElementById('next1');

    var len = aLis.length;
    var w = aLis[0].offsetWidth;
    var Timers = null;

    var cur = 0;

    Ulscroll.style.width = len * w + 'px';

    for ( var i=0; i<len; i++ ) {

        aAs[i].index = i;
        aAs[i].onclick = function() {
            if (this.index == cur % len) {
                return;
            }

            cur = this.index;
            m(Ulscroll,aLis);
        }

    }
    function play() {
        Timers = setInterval(function() {
            cur++;
            m(Ulscroll,aLis);
        },4000);
    }
    play();

    Ulscroll.onmouseover = function() {
        clearInterval(Timers);
    }
    Ulscroll.onmouseout = play;

    //上一张
    oPrev1.onclick = function () {
        clearInterval(Timers);
        cur--;
        m(Ulscroll,aLis);
        return false;
    }

    //下一张
    oNext1.onclick = function() {
        clearInterval(Timers);
        cur++;
        m(Ulscroll,aLis);
        return false;
    }

    function m(obj,target) {
        
        if (cur == len) {
            target[0].style.left = len * w + 'px';
        }
        
        if (cur == len+1) {
            target[0].style.left = '0px';
            obj.style.left = '0px';
            cur = 1;
        }

        if (cur == 0) {
            target[0].style.left = '0px';
        }

        if (cur == -1) {
            target[len-1].style.left = '0px';
            obj.style.left = len * w + 'px';
            cur = len-1;
        };

        for (var i=0; i<len; i++) {
            aAs[i].className = '';
        }
       
        aAs[cur % len].className = 'selected';

        move(obj, {
            left: - (cur * w)
        }, 1000, 'easeOutStrong');
    }

}

function scroll2() {
     // 第二组
    var Ulscroll2= document.getElementById('ad_b_scroll');
    var bLis = Ulscroll2.getElementsByTagName('li');

    var oPromo2 = document.getElementById('promo2');
    var bAs = oPromo2.getElementsByTagName('a');

    var oPrev2 = document.getElementById('prev2');
    var oNext2 = document.getElementById('next2');

    var len = bLis.length;
    var w = bLis[0].offsetWidth;
    var Timers2 = null;

    var cur = 0;

    Ulscroll2.style.width = len * w + 'px';

    for ( var i=0; i<len; i++ ) {

        bAs[i].index = i;
        bAs[i].onclick = function() {
            if (this.index == cur % len) {
                return;
            }

            cur = this.index;
            m(Ulscroll2,aLis);
        }

    }
    function play() {
        Timers2 = setInterval(function() {
            cur++;
            m(Ulscroll2,bLis);
        },3800);
    }
    play();

    Ulscroll2.onmouseover = function() {
        clearInterval(Timers2);
    }
    Ulscroll2.onmouseout = play;

    //上一张
    oPrev2.onclick = function () {
        clearInterval(Timers2);
        cur--;
        m(Ulscroll2,bLis);
        return false;
    }

    //下一张
    oNext2.onclick = function() {
        clearInterval(Timers2);
        cur++;
        m(Ulscroll2,bLis);
        return false;
    }

    function m(obj,target) {
        if (cur == len) {
            target[0].style.left = len * w + 'px';
        }
       
        if (cur == len+1) {
            target[0].style.left = '0px';
            obj.style.left = '0px';
            cur = 1;
        }

        if (cur == 0) {
            target[0].style.left = '0px';
        }

        if (cur == -1) {
            target[len-1].style.left = '0px';
            obj.style.left = len * w + 'px';
            cur = len-1;
        };

        for (var i=0; i<len; i++) {
            bAs[i].className = '';
        }
       
        bAs[cur % len].className = 'selected';

        move(obj, {
            left: - (cur * w)
        }, 1000, 'easeOutStrong');
    }

}


function move(obj, attrTarget, duration, fx, callback) {

    clearInterval(obj.timer);

    var j = {};

    for (var attr in attrTarget) {
        j[attr] = {};

        if (attr == 'opacity') {
            j[attr].b = Math.round( css( obj, attr ) * 100 );
        } else {
            j[attr].b = parseInt(css( obj, attr ));
        }

        j[attr].c = attrTarget[attr] - j[attr].b;
    }

    var d = duration || 1000;
    var t = 0;

    var st = +new Date();

    var fx = fx || 'linear';

    obj.timer = setInterval(function() {

        t = +new Date() - st;

        if (t >= d) {
            t = d;
            clearInterval(obj.timer);
        }

        for (var attr in attrTarget) {
            var v = Tween[fx](t, j[attr].b, j[attr].c, d);
            if (attr == 'opacity') {
                obj.style.opacity = v / 100;
                obj.style.filter = 'alpha(opacity='+ v +')';
            } else {
                obj.style[attr] = v + 'px';
            }
        }

        if (t == d) {
            callback && callback();
        }

    }, 16);

}

function css(obj, attr) {
    if (obj.currentStyle) {
        return obj.currentStyle[attr];
    } else {
        return getComputedStyle(obj)[attr];
    }
}

/*
 * t : time 已过时间
 * b : begin 起始值
 * c : count 总的运动值
 * d : duration 持续时间
 * */

//Tween.linear();

var Tween = {
    linear: function (t, b, c, d){  //匀速
        return c*t/d + b;
    },
    easeIn: function(t, b, c, d){  //加速曲线
        return c*(t/=d)*t + b;
    },
    easeOut: function(t, b, c, d){  //减速曲线
        return -c *(t/=d)*(t-2) + b;
    },
    easeBoth: function(t, b, c, d){  //加速减速曲线
        if ((t/=d/2) < 1) {
            return c/2*t*t + b;
        }
        return -c/2 * ((--t)*(t-2) - 1) + b;
    },
    easeInStrong: function(t, b, c, d){  //加加速曲线
        return c*(t/=d)*t*t*t + b;
    },
    easeOutStrong: function(t, b, c, d){  //减减速曲线
        return -c * ((t=t/d-1)*t*t*t - 1) + b;
    },
    easeBothStrong: function(t, b, c, d){  //加加速减减速曲线
        if ((t/=d/2) < 1) {
            return c/2*t*t*t*t + b;
        }
        return -c/2 * ((t-=2)*t*t*t - 2) + b;
    },
    elasticIn: function(t, b, c, d, a, p){  //正弦衰减曲线（弹动渐入）
        if (t === 0) {
            return b;
        }
        if ( (t /= d) == 1 ) {
            return b+c;
        }
        if (!p) {
            p=d*0.3;
        }
        if (!a || a < Math.abs(c)) {
            a = c;
            var s = p/4;
        } else {
            var s = p/(2*Math.PI) * Math.asin (c/a);
        }
        return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
    },
    elasticOut: function(t, b, c, d, a, p){    //正弦增强曲线（弹动渐出）
        if (t === 0) {
            return b;
        }
        if ( (t /= d) == 1 ) {
            return b+c;
        }
        if (!p) {
            p=d*0.3;
        }
        if (!a || a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        } else {
            var s = p/(2*Math.PI) * Math.asin (c/a);
        }
        return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
    },
    elasticBoth: function(t, b, c, d, a, p){
        if (t === 0) {
            return b;
        }
        if ( (t /= d/2) == 2 ) {
            return b+c;
        }
        if (!p) {
            p = d*(0.3*1.5);
        }
        if ( !a || a < Math.abs(c) ) {
            a = c;
            var s = p/4;
        }
        else {
            var s = p/(2*Math.PI) * Math.asin (c/a);
        }
        if (t < 1) {
            return - 0.5*(a*Math.pow(2,10*(t-=1)) *
                Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
        }
        return a*Math.pow(2,-10*(t-=1)) *
            Math.sin( (t*d-s)*(2*Math.PI)/p )*0.5 + c + b;
    },
    backIn: function(t, b, c, d, s){     //回退加速（回退渐入）
        if (typeof s == 'undefined') {
            s = 1.70158;
        }
        return c*(t/=d)*t*((s+1)*t - s) + b;
    },
    backOut: function(t, b, c, d, s){
        if (typeof s == 'undefined') {
            s = 3.70158;  //回缩的距离
        }
        return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
    },
    backBoth: function(t, b, c, d, s){
        if (typeof s == 'undefined') {
            s = 1.70158;
        }
        if ((t /= d/2 ) < 1) {
            return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
        }
        return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
    },
    bounceIn: function(t, b, c, d){    //弹球减振（弹球渐出）
        return c - Tween['bounceOut'](d-t, 0, c, d) + b;
    },
    bounceOut: function(t, b, c, d){
        if ((t/=d) < (1/2.75)) {
            return c*(7.5625*t*t) + b;
        } else if (t < (2/2.75)) {
            return c*(7.5625*(t-=(1.5/2.75))*t + 0.75) + b;
        } else if (t < (2.5/2.75)) {
            return c*(7.5625*(t-=(2.25/2.75))*t + 0.9375) + b;
        }
        return c*(7.5625*(t-=(2.625/2.75))*t + 0.984375) + b;
    },
    bounceBoth: function(t, b, c, d){
        if (t < d/2) {
            return Tween['bounceIn'](t*2, 0, c, d) * 0.5 + b;
        }
        return Tween['bounceOut'](t*2-d, 0, c, d) * 0.5 + c*0.5 + b;
    }
}