function animate(obj,target,callback){
			//console.log(callback);//callback = function(){} 调用的时候 callback()
			// 清空定时器，只保留一个执行
			clearInterval(obj.timer);
			obj.timer = setInterval(function(){
				//步长值要写到计时器里面
				// 要避免小数 向上取整
				var step = (target - obj.offsetLeft) / 10;
				step = step > 0 ? Math.ceil(step) : Math.floor(step);
				if(obj.offsetLeft == target){
					// 停止动画，本质就是停止计时器
					clearInterval(obj.timer);
					// 回调函数写到计时器结束
					// if(callback){
					// 	//调用函数
					// 	callback();
					// }
					callback && callback();
				}
					// 慢慢变小：步长公式：（目标值 - 现在的位置） / 10
				obj.style.left = obj.offsetLeft + step + 'px';
				},30);
		}
		