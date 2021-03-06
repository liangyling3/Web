var isStart = 0;
var isEnd = 0;
var countStep = 0;
var clock = 0;

var blocks = new Array();

window.onload = function() {
	initial();
	randomBlocks();
}

function initial() {
	$('#restart').bind('click', restart);
	for (var i = 0; i < 16; ++i) {
		var block = document.getElementById('block_'+(i+1));
		block.addEventListener('click', move);		//添加事件监听
	}
	blocks = $('.block');
}

function setStartState() {
	isStart = 1;
	countStep = 0;
	clock = -1;
	countTime();
}

var setTime;
function countTime() {
	clock ++;
	$('#time').html(clock);	// 注意！！jQuery中没有innerHTML
							// jQuery获得的是jQuery对象，文件选择获得的是DOM对象
	setTime = setTimeout(countTime, 1000); 	// 单位为毫秒
}

// 思路：给每一块加上位置标识，移动中位置标识不变；移动时id改变（图片改变）
function move() {
	var index = parseInt(this.id.substring(6));
	if (index !== 16 && isEnd == 0) {
		var position = parseInt(this.className.substring(15))-1;

		if ((position != 0 && blocks[position-1].id.substring(6) == 16) ||
			(position != 15 && blocks[position+1].id.substring(6) == 16)||
			(position < 12 && blocks[position+4].id.substring(6) == 16) ||
			(position > 3 && blocks[position-4].id.substring(6) == 16)) {

			if (isStart == 0)
				setStartState();
			countStep ++;
			$('#step').html(countStep);
			var temp = this.id;

			if (position != 0 && blocks[position-1].id.substring(6) == 16) {
				this.id = blocks[position-1].id;
				blocks[position-1].id = temp;
			}
			if (position != 15 && blocks[position+1].id.substring(6) == 16) {
				this.id = blocks[position+1].id;
				blocks[position+1].id = temp;
			}
			if (position < 12 && blocks[position+4].id.substring(6) == 16) {
				this.id = blocks[position+4].id;
				blocks[position+4].id = temp;
			}
			if (position > 3 && blocks[position-4].id.substring(6) == 16) {
				this.id = blocks[position-4].id;
				blocks[position-4].id = temp;
			}
			checkWin();
		}
	}
}

function randomBlocks() {
	var arr = [];
	for (var i = 0; i <16; ++i ) {
		arr[i] = i+1;
	}
	arr = arr.sort(function() {
		return Math.random()-0.5;
	});

	for (var i = 0; i < 16; ++ i) {
		blocks[i].id = 'block_' + arr[i];
	}

	if (checkRandom() == false) {  // 若不可还原，则重置
		randomBlocks();
	}
}
function checkRandom() {  // 检查是否不可还原
	var count = 0;		// count:计算逆序数
	var m,n = 0;
	for (var i = 0; i < 16; ++i) {
		var num = parseInt(blocks[i].id.substring(6));
		if (num == 16) {  // 获得空白位置
			m = Math.floor(i/4);
			n = Math.floor(i%4);
		}
		for (var j = i+1; j < 16; ++j) {
			var _num = parseInt(blocks[j].id.substring(6));
			if (_num<num)
				count ++;
		}
	}
	count += 3-m;
	count += 3-n;
	if (count % 2 == 0) {
		return true;
	}
	return false;
}

function restart() {
	initial();
	isStart = 0;
	isEnd = 0;
	clearInterval(setTime);
	clock = 0;
	countStep = 0;
	$('#time').html(clock);
	$('#step').html(countStep);
	$('#instruction').html("Click the small blocks to restore the picture!");
	$('#instruction').css('color','#006666');
	randomBlocks();
}

function checkWin() {
	var flag = 1;
	for (var i = 0; i < 16; ++i) {
		if(blocks[i].id.substring(6) != i+1)
			flag = 0;
	}
	if (flag == 1) {
		isEnd = 1;
		isStart = 0;
	}
	if (isEnd == 1) {
		clearInterval(setTime);	
		var step = $('#step').html();   
		var time = $('#time').html();
		$('#instruction').html("You win!! You spent "+time+" seconds and "+step+" steps to win the game!!");
		$('#instruction').css('color','#ac4848');
	}
}
