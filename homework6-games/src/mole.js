var countScore = 0;
var status = 0;
var startFlag = 0;

var radios = new Array();	// 定义数组要用数组对象！！
var labels = new Array();
var button = new Array();
function creatRadios() {
	for (var i = 0; i < 61; ++ i) {
		radios[i] = document.createElement('input');	// 创造元素
		radios[i].type = "radio";
		radios[i].className = "radio";

		labels[i] = document.createElement('label');	// 创造元素
		labels[i].className = "label"; 

		var buttonContainer = document.getElementById('buttons');
		buttonContainer.insertBefore(radios[i], buttonContainer.lastChild);
		buttonContainer.insertBefore(labels[i], buttonContainer.lastChild);
	}
	button = document.getElementsByClassName('radio');
	for (var i = 0; i < 61; ++ i) {
		labels[i].addEventListener('click', buttonReact);
		labels[i].addEventListener('mousedown', setBefore);
	}
}

//	计时函数
var clock = 31;
function countTime() {
	clock --;
	document.getElementById('timeFrame').innerHTML = clock;
	setTime = setTimeout(countTime, 1000); 	// 单位为毫秒
	if (clock == 0) {
		clearInterval(setTime);	
		score = document.getElementById('scoreFrame').innerHTML;
		overInfo = "Game Over!!! Your score is " + score;
		document.getElementById('screen').innerHTML = overInfo;
		startFlag = 0;
	}
}

function clearButton() {
	for (var i = 0; i < 60; ++i) {
		button[i].checked = 0;
	}
}

function start() {
	if (startFlag == 0) {
		clock = 31;
		countTime();
		document.getElementById('screen').innerHTML = 'The Game Starts.';
		countScore = 0;
		document.getElementById('scoreFrame').innerHTML = 0;
		startFlag = 1;
		countScore = 0;
		clearButton();
		randomMice();
	}
	else {
		clearInterval(setTime);	
		score = document.getElementById('scoreFrame').innerHTML;
		overInfo = "Game Over!!! Your score is " + score + '.';
		document.getElementById('screen').innerHTML = overInfo;
		startFlag = 0;
	}
}

var index;
function randomMice() {
	if (clock > 0) {
		index = Math.round(Math.random()*60-1);	// 产生0~59的随机数
		button[index].checked = 1;			
	}
}

var before = 0;
function setBefore() {
	var preButton = this.previousSibling;	// 获取前一个元素
	before = preButton.checked;
}

function buttonReact(ev) {
	var preButton = this.previousSibling;	// 获取前一个元素
	if (clock > 0) {
		if (before) {
			countScore ++;
			preButton.checked = 0;		
			randomMice();			
		} 
		else {
			if (countScore > 0) 
				countScore --;
			preButton.checked = 0;
			button[index].checked = 1;
		}
		document.getElementById('scoreFrame').innerHTML = countScore;
	}
	else {
		this.checked = 0;
	}
}

var startButton = document.getElementById('startButton');
window.onload = function() {
	creatRadios();
	startButton.onclick = function() {
		start();
	};
};

