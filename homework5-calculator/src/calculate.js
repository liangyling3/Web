var onScreen = '0';
var flag = 0;

window.onload = function() {
	initial();
}

function initial() {
	$('.button').bind('click',input);
}

function isOperator(c) {
	return c=='+' || c=='-' || c=='*' || c=='/' || c=='.';
}
function isBacket(c) {
	return c=='(' || c==')';
}

/*注意！！！！！eval是把字符串当作程序运行，
如果字符串不合法，控制台会直接报错，而不会输出字符串。*/
function input() {
	var num = this.innerHTML;
	$('#error').html('');
	if (num == '=') {
		try {
			var result = eval(onScreen);
			onScreen = "" + result;
			// 如果结果不为字符串，会导致下一步的回退等无法进行操作
			// or onScreen.toString(); / onScreen = String(result);
			$('#screen').html('='+onScreen);
			flag = 1;
			return;
		}
		catch (err) {  // 好神奇！！！
			$('#error').html('Math Error!');
			flag = 0;
			return;
		}
	}

	if (num == 'CE') {
		onScreen = '0';
	} 
	else if (num == '←') {
		if (flag == 1) {
			onScreen = '0';
		}
		onScreen = onScreen.substring(0, onScreen.length-1);
		// 考虑回退到空的情况
		if (onScreen.length == 0) 
			onScreen = '0';
	}
	// 连续输入两个操作符的情况
	else if (isOperator(onScreen[onScreen.length-1]) && isOperator(num)) {
		onScreen = onScreen.substring(0, onScreen.length-1) + num;
	}
	// 0为第一操作数的情况
	else if (onScreen == '0' && isOperator(num)) {
		onScreen = '0' + num;
	}
	//前一步为结果时，再输入数字要更新显示
	else if (flag==1 && !isNaN(onScreen) && !isNaN(num)) {
		onScreen = num;
	}
	else if (onScreen != '0') {
		onScreen += num;
	}
	else {
		onScreen = num;
	}
	
	if (onScreen.length > 23) {
		// 从右往左截取片段
		var substr = onScreen.slice(onScreen.length-23, onScreen.length);
		$('#screen').html(substr);
	}
	else
		$('#screen').html(onScreen);
	flag = 0;
}