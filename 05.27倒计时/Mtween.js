/*
 	运动函数move，多属性运动
 	参数
 		init对象:{
 			obj:要运动的元素obj,
 			attrs:{left:400,top:300}要运动的属性及目标点
 			duration:运动持续时间num
 			fx可选:'运动模式名字'，str，不写默认是匀速
 			callBack:回调函数，function运动完执行的代码
 		}
 * */
function move(init){
	init.fx = init.fx || 'linear';
	var j = {};
	for(var k in init.attrs){
		j[k] = {};
		j[k].b = css(init.obj,k);
		j[k].c = init.attrs[k]-j[k].b;
	}
	var d = init.duration;
	var start = new Date();
	clearInterval(init.obj.timer);
	init.obj.timer = setInterval(function(){
		var now = new Date();
		var t = now - start;
		if(t>=d){
			t = d;
		}
		for(var k in j){
			var b = j[k].b;
			var c = j[k].c;
			var v = Tween[init.fx](t,b,c,d);
			css(init.obj,k,v);
		}
		if(t==d){
			clearInterval(init.obj.timer);
			typeof init.callBack == 'function' && init.callBack.call(init.obj);
		}		
	},20)	
}
function css(obj,attr,val){
	if(arguments.length==2){
		var v = parseFloat(getComputedStyle(obj)[attr]);
		if(attr == 'opacity'){
			v = Math.round(v*100);
		}
		return v;
	}
	if(attr == 'opacity'){
		val = val/100;
		obj.style[attr] = val;	
	}else{
		obj.style[attr] = val+'px';	
				}	
			}
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
//抖动函数
function shake(obj,attr,endFn){
    var arr=[];
    var timer=null;
    var n=0;
    if(!obj.num){
        obj.num=parseFloat(getComputedStyle(obj)[attr]);
    }
    //拿到一组数字，抖动的幅度。
    for(var i=20;i>0;i-=2){
        arr.push(i,-i);
    }
    arr.push(0);
    //用定时器来实现抖动效果。
    clearInterval(timer);
    timer=setInterval(function(){
        n++;
        if(n>arr.length-1){
            clearInterval(timer);
            endFn&&endFn();
        }
        obj.style[attr]=arr[n]+obj.num+'px';
    },30);
}