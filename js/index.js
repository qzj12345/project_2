window.addEventListener('load',function(){
	// alert(1);
	// 1.获取按钮
	var arrow_l = document.querySelector('.arrow_l');
	var arrow_r = document.querySelector('.arrow_r');
	var focus = document.querySelector('.focus');
	// 2.鼠标经过focus 显示隐藏左右按钮
	focus.addEventListener('mouseenter',function(){
		arrow_l.style.display = 'block';
		arrow_r.style.display = 'block';
		clearInterval(timer);
		timer = null;//清空定时器
	});
	focus.addEventListener('mouseleave',function(){
		arrow_l.style.display = 'none';
		arrow_r.style.display = 'none';
		timer = setInterval(function() {
			arrow_r.click();
		},2000)
	});
	// 3.动态生成小圆圈
	var ul = focus.querySelector('ul');
	var ol = focus.querySelector('.circle');
	// console.log(ul.children.length);
	var focusWidth = focus.offsetWidth;
	for (var i = 0; i < ul.children.length; i++) {
		// 创建小li
		var li = document.createElement('li');
		// 自定义属性：索引号
		li.setAttribute('index',i);
		// 把小li插入ol
		ol.appendChild(li);
		// 4.给小圈圈添加点击事件,在生成li的时候就绑定点击事件
		li.addEventListener('click', function(){
			// 用排他思想，干掉所有人，留下自己的current类
			for (var i = 0; i < ol.children.length; i++) {
				ol.children[i].className = '';
			}
			this.className = 'current';
			// 5 点击小圈圈，移动图片，移动ul
			// ul 得移动距离为负值 小圈圈索引号 * 图片宽度
			// 当我们点击某个小li就拿到当前li得索引号
			var index = this.getAttribute('index');
			// 当我们点击li要不li索引号给num (*bug)
			// 点击li,还要把li索引号给cir (*bug)
			num = index;
			cir = index;
			animate(ul,- index*focusWidth);
		})
	};
	// 把ol里面的第一个li设为红色
	ol.children[0].className = 'current';
	// 克隆图片
	var frist = ul.children[0].cloneNode(true);
	ul.appendChild(frist);
	// 7.点击右侧按钮 图片滚动
	var num = 0;
	var cir = 0;//小圆圈变化
	var flag = true;//flag 为节流阀
	arrow_r.addEventListener('click',function(){
		if (flag) {
			flag = false;
			// 如果走到最后一张复制的图片，ul快速复原left = 0
			if(num == ul.children.length - 1) {
				ul.style.left = 0;
				num = 0;
			}
			num++;
			animate(ul,- num * focusWidth,function(){
				flag = true;
			});
			// 8.
			cir++;
			if (cir == ol.children.length) {
				cir = 0;
			}
			circleChange();
		}
	})
	arrow_l.addEventListener('click',function(){
		if (flag) {
			flag = false;
			// 如果走到最后一张复制的图片，ul快速复原left = 0
			if(num == 0 ) {
				
				num = ul.children.length - 1;
				ul.style.left = -num * focusWidth + 'px';
			}
			num--;
			animate(ul,- num * focusWidth,function(){
				flag = true;
			});
			// 8.点击按钮，小圈圈一起变化
			cir--;
			// if (cir < 0) {
			// 	cir = ol.children.length-1;
			// }
			cir = cir < 0 ? ol.length - 1 : cir
			// 调用函数
			circleChange();
		}
	});

function circleChange() {
	for(var i = 0;i < ol.children.length; i++) {
		 ol.children[i].className = '';
	}
	// 当前的小圈圈类名为‘current’
	ol.children[cir].className = 'current';
}
// 10.自动播放轮播图
var timer = setInterval(function(){
	// 手动调用事件
	arrow_r.click();
},2000);

// 节流阀
var flag = true;
// 到今日推荐，出现电梯
$(function() {
	var toolTop = $(".recom").offset().top;
	toggleTool();
	function toggleTool() {	
		if($(document).scrollTop() >= toolTop) {
			$(".fixedtool").fadeIn();
		}else{
			$(".fixedtool").fadeOut();
		}
	};	
	$(window).scroll(function(){
		toggleTool();
		if(flag) {
			// 3.页面滚动到某个内容区域，左侧电梯导航li相应添加和删除类current
			$(".floor .w").each(function(i,ele) {
				if($(document).scrollTop() >= $(ele).offset().top) {
					console.log(i);
					$(".fixedtool li").eq(i).addClass("current").siblings().removeClass("current");
				}
			})
		}
	});
	
});
//2.点击电梯到导航滚到响应内容区域
 $(".fixedtool li").click(function() {
	 flag = false;
	 // console.log($(this).index());
	 //当我们每次点击li就要计算出页面要去往的位置
	 // 选出对应索引号的内容区的盒子，计算它的 .offset().top
	 var cur = $(".floor .w").eq($(this).index()).offset().top;
	 // 页面动画滚动
	$("body,html").stop().animate({
		scrollTop: cur
	},function(){
		flag = true;
	});
	// 自己添加背景颜色，别人都去掉
	$(this).addClass("current").siblings().removeClass("current");
	
 })
})