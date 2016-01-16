var taobao = {};

taobao.init = function() {
	taobao.nav();	// nav show or hide
	taobao.Search();
	taobao.sellerAd('.seller_ad_t','.page_item1'); // seller_ad prev or prev
	taobao.sellerAd('.seller_ad_b','.page_item2');
	scroll1();
	scroll2();
	taobao.notice();	//右侧公告
	taobao.gather();	// market_gather
	taobao.guang(); 	//ai guang
}

$(document).ready(taobao.init);

// market_gather
taobao.gather = function() {
	$('#gather > li').click(function() {
		$index = $('#gather > li').index($(this));
		
		$('#gather > li')
			.eq($index).addClass('selected')
			.siblings().removeClass('selected');

		$('#gather_div > div')
			.eq($index).show()
			.siblings().hide();	
	})
}


// seller_ad prev or prev
taobao.sellerAd = function (obj1,boj2) {
	$(obj1).hover(
		function() {
			$(boj2).show();
		},
		function() {
			$(boj2).hide();
		}
	)
}
//右侧公告
taobao.notice = function() {
	$('#taobao_ad_t > ul > li').hover(
		function(){
			var n = $('#taobao_ad_t > ul > li').index($(this));
			
			$('#taobao_ad_t > ul > li')
				.eq(n).addClass('current')
				.siblings().removeClass('current');

			$('#taobao_ad_t > div')
				.eq(n).addClass('current_info')
				.siblings().removeClass('current_info');
		}
	)
}

//Search
taobao.Search = function() {
	var num = 0;

	$('#SearchTab > li').click(function() {
		var Tmall = $('#SearchTab > li').eq(num);
		num = $('#SearchTab > li').index($(this));

		if(num == 1){
			$('#SearchTab > li')
				.eq(num).addClass('Tmall')
				.siblings().removeClass('search_wrap active');
			$('#search_button').css({"border": "3px solid #c60000"});
			$('#btn_search').css({"background-color": "#c60000"});
			$('.tm').show();
			$('.tb').hide();	
		} else {
			$('#SearchTab > li')
				.eq(num).addClass('search_wrap active')
				.siblings().removeClass('search_wrap active Tmall');
			$('#search_button').css({"border": "3px solid #ff4200"});
			$('#btn_search').css({"background-color": "#ff4200"});
			$('.tm').hide();
			$('.tb').show();
	}}).hover(
			function() {
				$(this).addClass('hover')
			},
			function() {
				$(this).removeClass('hover')
			}
		)

	//Cancel the mobile phone shop taobao
	$('#cancel_mobile').click(function() {
		$('.ta_extra').hide();
	})

	// 点击搜索
	$("._input").keydown(function() {
		 setTimeout(function() {
           if($("._input").val()){
				$('.sousuo').hide();
			} else {
				$('.sousuo').show();
			}
        },16)
	})
	
}

// nav show or hide
taobao.nav = function () {
	var num = null;

	$('._index').hover( 
			function() {
				num = $('._index').index($(this));
				$(this).addClass('hover_c');
				$('._block').eq(num).show();
			},
			function() {
				$(this).removeClass('hover_c');
				$('._block').eq(num).hide();
			}
		)
	$('._block').hover(
		function() {
			$('._index').eq(num).addClass('hover_c');
			$(this).show();
		},
		function() {
			$('._index').eq(num).removeClass('hover_c');
			$(this).hide();
		}
	)
}

// ai guang
taobao.guang = function() {
	var oGuang = document.getElementById('guang');
	var aLis = oGuang.getElementsByTagName('li');

	var oGleft = document.getElementById('guang_fl');
	var oGright = document.getElementById('guang_fr');

	var len = aLis.length;
	var w = aLis[0].offsetWidth;
	var Timers = null;
	var cur = 0;

	oGuang.style.width = len * w + 'px';

	function play() {
        Timers = setInterval(function() {
            cur++;
            m();
        },1800);
    }
    play();

    oGuang.onmouseover = function() {
        clearInterval(Timers);
    }
    oGuang.onmouseout = play;

     //上一张
    oGleft.onclick = function () {
        clearInterval(Timers);
        cur--;
        m();
        return false;
    }

    //下一张
    oGright.onclick = function() {
        clearInterval(Timers);
        cur++;
        m();
        return false;
    }

	function m() {
        if (cur == len) {
	        aLis[0].style.left = len * w + 'px';
	    }
        
        if (cur == len+1) {
            aLis[0].style.left = '0px';
            oGuang.style.left = '0px';
            cur = 1;
        }
        if (cur == 0) {
            aLis[0].style.left = '0px';
        }

    	if (cur == -1) {
            aLis[len-1].style.left = '0px';
            oGuang.style.left = len * w + 'px';
            cur = len-1;
        };

        move(oGuang, {
	        left: - (cur * w)
	    }, 800, 'easeOutStrong');
    }
}
