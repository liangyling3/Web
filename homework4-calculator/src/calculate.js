var onScreen = '0';
var flag = 0;

function isOperator(c) {
	return c=='+' || c=='-' || c=='*' || c=='/' || c=='.';
}

function isBacket(c) {
	return c=='(' || c==')';
}

/*注意！！！！！eval是把字符串当作程序运行，
如果字符串不合法，控制台会直接报错，而不会输出字符串。*/

function input(element) {
	if (element == '=') {
		try {
			var result = eval(onScreen);
			onScreen = "" + result;
			// 如果结果不为字符串，会导致下一步的回退等无法进行操作
			// or onScreen.toString(); / onScreen = String(result);
			document.getElementById('screen').innerHTML = '=' + onScreen;
			flag = 1;
			return;
		}
		catch (err) {  // 好神奇！！！
			alert('Math Error!');
			flag = 0;
			return;
		}
	}


	if (element == 'CE') {
		onScreen = '0';
	} 
	else if (element == '←') {
		// 考虑回退到空的情况
		onScreen = onScreen.substring(0, onScreen.length-1);
		if (onScreen.length == 0) onScreen = '0';
	}
	// 连续输入两个操作符的情况
	else if (isOperator(onScreen[onScreen.length-1]) && isOperator(element)) {
		onScreen = onScreen.substring(0, onScreen.length-1) + element;
	}
	// 0为第一操作数的情况
	else if (onScreen == '0' && isOperator(element)) {
		onScreen = '0' + element;
	}
	//前一步为结果时，再输入数字要更新显示
	else if (flag==1 && !isNaN(onScreen) && !isNaN(element)) {
		onScreen = element;
	}
	else if (onScreen != '0') {
		onScreen += element;
	}
	else {
		onScreen = element;
	}
	
	document.getElementById('screen').innerHTML = onScreen;	
	flag = 0;
}