$(function(){
	// 1.全选 全不选功能模块
	// 就是把全选按钮（checkall）的状态赋值 给三个小按钮（j-checkbox）就可以了
	// 事件可以用change
	$(".checkall").change(function(){
		// console.log($(this).prop("checked"));
		// j-checkbox 的状态与checkall状态一致
		$(".j-checkbox,.checkall").prop("checked",$(this).prop("checked"));
		// 7
		if($(this).prop("checked")) {
			//添加类名
			$(".cart-item").addClass("check-cart-item");
		}else{
			$(".cart-item").removeClass("check-cart-item");
		}
	});
	// 2.如果复选框被选中的个数等于3 就应该吧全选按钮选上
	$(".j-checkbox").change(function() {
		console.log($(".j-checkbox:checked").length);
		if($(".j-checkbox:checked").length === $(".j-checkbox").length){
			$(".checkall").prop("checked", true);
		}else {
			$(".checkall").prop("checked", false);
		}
		//7. 
		if($(this).prop("checked")){
			$(this).parents(".cart-item").addClass("check-cart-item");
		}else{
			$(this).parents(".cart-item").removeClass("check-cart-item");
		}
	});
	// 3.增减商品数量模块 首先声明一个变量，当我们点击+号时（increment），就让这个值++，然后赋值给文本框
	$(".increment").click(function() {
		var n = $(this).siblings(".itxt").val();//.siblings取的是除了自己意外亲兄弟的值  小括号为空，取到的是当前的值
		n++;
		$(this).siblings(".itxt").val(n);//修改值
		// 4.
		var p = $(this).parents(".p-num").siblings(".p-price").html();//注意：一定要从this出发，不能直接修改这个属性的值
		// console.log(p);
		p = p.substr(1);
		$(this).parents(".p-num").siblings(".p-sum").html("￥" + p * n);
		getSum();
	});
	$(".decrement").click(function() {
		var n = $(this).siblings(".itxt").val();//.siblings取的是除了自己意外亲兄弟的值  小括号为空，取到的是当前的值
		if(n == 1){
			return false;
		}//如果他是1，就不执行了
		n--;
		$(this).siblings(".itxt").val(n);//修改值
		// 4.
		var p = $(this).parents(".p-num").siblings(".p-price").html();//注意：一定要从this出发，不能直接修改这个属性的值
		// console.log(p);
		p = p.substr(1);
		$(this).parents(".p-num").siblings(".p-sum").html("￥" + (p * n).toFixed(2));
	});
	// 4.修改商品小计 要用到截取字符串 substr(1)
	// 5.直接修改表单内的值，也要做小计
	$(".itxt").change(function() {
		//先得到文本框的值 * 当前商品单价
		var n = $(this).val();
		// p 当前商品的单价
		var p = $(this).parents(".p-num").siblings(".p-price").html();//注意：一定要从this出发，不能直接修改这个属性的值
		// console.log(p);
		p = p.substr(1);
		// 保留两位小数
		$(this).parents(".p-num").siblings(".p-sum").html("￥" + (p * n).toFixed(2));
		getSum();
	});
	// 6.计算总计和总额模块
	getSum();
	function getSum() {
		var count = 0;//总件数
		var money = 0;//总价钱
		$(".itxt").each(function(i , ele) {
			count += parseInt($(ele).val());
		});
		$(".amount-sum em").text(count);
		$(".p-sum").each(function(i,ele) {
			money += parseFloat($(ele).text().substr(1));
		});
		$(".price-sum em").text("￥" + money.toFixed(2));
	};
	// 7.删除商品模块
	// 单击删除
	$(".p-action a").click(function() {
		$(this).parents(".cart-item").remove();
	});
	// 删除选中
	$(".remove-batch").click(function(){
		$(".j-checkbox:checked").parents(".cart-item").remove();
	});
	// 清空全部
	$(".clear-all").click(function(){
		$(".cart-item").remove();
		$(".amount-sum em").text(0);
		$(".price-sum em").text("￥" + 0);
	});
})