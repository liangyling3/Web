var startBlock = document.getElementById('startBlock');
var zeroX = startBlock.offsetLeft;	// 存储startBlock的初始位置
var zeroY = startBlock.offsetTop;

function addEvent() {
	startBlock.addEventListener('isImpact',impact);
}

function impact (ev) {
	var startBlock = ev.target;
	startBlock

}

function lose() {
	startBlock.style.left = zeroX + 'px';
	startBlock.style.top = zeroY + 'px';
	document.getElementById('Info').style.opacity = 1;
	// 清空当前事件
	document.onmousemove = null;
	document.onmouseup = null;
}

/*先想好树是怎样的！！*/
window.onload = function() {
	addEvent();
	
	// 鼠标按住startBlock开始游戏
	startBlock.onmousedown = function (ev) { 
		document.getElementById('Info').style.opacity = 0;
		// ev是事件的参数，包含了事件触发时的各种参数
		// ie中ev是全局的,通过window.event获取，其他浏览器作为参数传入
		// 在window.onload中可以省略window.
	    var ev = event || ev;

	    // client: 返回当事件被触发时，鼠标指针的坐标
	    // offset: 与边的距离
		var distanceX = ev.clientX - startBlock.offsetLeft;
		var distanceY = ev.clientY - startBlock.offsetTop;

　　　　 document.onmousemove = function(moveEv) {
			var moveEv = event || moveEv;
			startBlock.style.left = moveEv.clientX - distanceX + 'px';
			startBlock.style.top = moveEv.clientY - distanceY + 'px'; 
　　　　};

		// 按住过程中松开鼠标会回到原位
　　　　document.onmouseup = function() {
			lose();
			document.getElementById('Info').innerHTML = "Please don't Release the mouse and start again!"
		};

		startBlock.isImpact = function {
			lose;
			document.getElementById('Info').innerHTML = "You lose!!!";
		}
	};
};