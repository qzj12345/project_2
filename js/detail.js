//页面代码执行完毕再执行js文件
window.addEventListener('load',function(){
	var preview_img = document.querySelector('.preview_img');
	var mask = document.querySelector('.mask');
	var big = document.querySelector('.big');
	// 1.当鼠标经过 preview_img mask和big显示
	preview_img.addEventListener('mouseover', function(){
		mask.style.display = 'block';
		big.style.display = 'block';
	});
	preview_img.addEventListener('mouseout', function(){
		mask.style.display = 'none';
		big.style.display = 'none';
	})
	// 2.鼠标移动 让黄色盒子跟着鼠标走
	preview_img.addEventListener('mousemove',function(e){
		// a.先计算盒子里面的内容
		var x = e.pageX - this.offsetLeft;
		var y = e.pageY - this.offsetTop;
		// b.减去盒子高度的一半，让箭头在盒子中央
		// c.mask移动距离
		 var maskX = x - mask.offsetWidth / 2;
		 var maskY = y - mask.offsetHeight / 2;
		 // 遮罩层最大移动距离
		 var maskMax = preview_img.offsetWidth - mask.offsetWidth;
		 // d.加判断条件：
		 if (maskX <= 0) {
			maskX = 0 ;
		 }else if (maskX >= maskMax) {
			 maskX = maskMax;
		 }
		 if (maskY <= 0) {
		 			maskY = 0 ;
		 }else if (maskY >= maskMax) {
		 			 maskY = maskMax;
					 // maskY = preview_img.offsetHeight - mask.offsetHeight;
		 }
			 mask.style.left = maskX + 'px';
			 mask.style.top = maskY + 'px';
		// e.大图片的移动距离 = 遮挡层移动距离 * 大图片最大移动距离 / 遮罩层最大移动距离
		// 大图片
		var bigImg = document.querySelector('.bigImg');
		// 大图移动距离
		var bigMax = bigImg.offsetWidth - big.offsetWidth;
		// 大图片的移动距离
		var bigX = maskX * bigMax / maskMax;
		var bigY = maskY * bigMax / maskMax;
		bigImg.style.left = -bigX + 'px';
		bigImg.style.top = -bigY + 'px';
	})
})