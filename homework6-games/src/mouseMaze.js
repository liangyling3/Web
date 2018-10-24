var startFlag = 0;
var endFlag = 0;
var impactFlag = 0;
var throughPathFlag = [0,0,0,0,0];
var testFlag = 0;

var startBlock = document.getElementById('startBlock');
var endBlock = document.getElementById('endBlock');
var toRestart = document.getElementById('toRestart');
var wall = document.getElementsByClassName('wall');
var path = document.getElementsByClassName('path');

function addListener() {			//	添加监听
	for (var i = 0; i < 5; ++i) {
		wall[i].addEventListener('mouseover', impact);
		wall[i].addEventListener('mouseout', restart);
		path[i].addEventListener('mouseout', throughPath);
	}
	startBlock.addEventListener('mouseover', start);
	endBlock.addEventListener('mouseover', end);
}

function start(ev) {
	if (startFlag != 1) {
		endFlag = 0;
		impactFlag = 0;
		throughPathFlag = [0,0,0,0,0];
	}
	else {
		throughPathFlag = [0,0,0,0,0];
	}
	document.getElementById('info').style.opacity = 0;
	startFlag = 1;
}

function impact(ev) {
	if (startFlag == 1 && endFlag == 0) {
		if (impactFlag == 0)				 
			ev.target.className += " error"; // 增加一个类
		document.getElementById('info').style.opacity = 1;
		document.getElementById('info').innerHTML = 'You Lose!!! Move the mouse cursor to leave the wall to restart.';
		impactFlag = 1;
		startFlag = 0;
	}
}

function restart(ev) {
	if (impactFlag == 1) {
		for (var i = 0; i < 5; ++i) {
			wall[i].className = "wall";
		}
		startFlag = 0;
		document.getElementById('info').innerHTML = 'Move the mouse over the "S" to begin.';
	}
}

function throughPath(ev) {
	if (ev.target.id == 'path_1') throughPathFlag[0] = 1;
	if (ev.target.id == 'path_2') throughPathFlag[1] = 1;
	if (ev.target.id == 'path_3') throughPathFlag[2] = 1;
	if (ev.target.id == 'path_4') throughPathFlag[3] = 1;
	if (ev.target.id == 'path_5') throughPathFlag[4] = 1;
}

function isCheat(ev) {
	var count = 0;
	for (var i = 0; i < 5; ++i) {
		if (throughPathFlag[i] == 1) {
			count ++;
		}
	}
	if (count == 5) 
		return false;
	else
		return true;
}

function test(ev) {
	if (startFlag == 1) {
		testFlag = 1;
	}
}

function end(ev) {
	endFlag = 1;
	if (impactFlag != 1 && !isCheat() && startFlag == 1) {
		document.getElementById('info').style.opacity = 1;
		document.getElementById('info').innerHTML = "You Win!!!";
	}
	else if (impactFlag != 1) {
		document.getElementById('info').style.opacity = 1;
		document.getElementById('info').innerHTML = "Don't cheat, you should start from the 'S' and move to the 'E' inside the maze!";
	}
	startFlag = 0;
}

window.onload = function() {
	addListener();
};