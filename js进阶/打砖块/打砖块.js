function $(id){
	return document.getElementById(id);
}
function rand(min,max){
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
//砖块构造函数
function BlockBreak(){
	this.box = $("box");//容器
	this.list = document.getElementsByTagName("li");//砖块
	this.board = $("board");//挡板
	this.ball = $("bubble");//小球
	this.fx = 1;//横向
	this.fy = -1;//纵向
	this.leftInit = 0;//砖块left的初始值
	this.topInit = 0;//砖块的top的初始值
}
//初始化功能，摆放每一个砖块的位置
BlockBreak.prototype.init = function(){
	for (var i = 0; i < this.list.length; i++){
		this.list[i].style.backgroundColor = "rgb("+rand(0,255)+","+rand(0,255)+","+rand(0,255)+")";
		var x = this.leftInit * this.list[0].offsetWidth;
		var y = this.topInit;
		this.list[i].style.left = x + "px";
		this.list[i].style.top = y + "px";
		this.leftInit++;
		
		//换行
		if((i + 1) % 10 == 0){
			this.leftInit = 0;
			this.topInit += this.list[0].offsetHeight;
		}
	}
}

//挡板运动

BlockBreak.prototype.mousemove = function(){
	
	var that = this;
	that.board.onmousedown = function (e){
		var ev = e || event;
		basex = ev.pageX;
		// console.log(basex);
		movex = 0;
		document.onmousemove = function (e){
			var en = e || window.event;
			movex = en.pageX - basex;
			// console.log(movex);
			basex = en.pageX;
			// console.log(basex);
			that.board.style.left = that.board.offsetLeft + movex + "px";
			
			if(that.board.offsetLeft <= 0){
				that.board.style.left = 0;
			}	
			
			if(that.board.offsetLeft >= (that.box.offsetWidth - that.board.offsetWidth)){
					that.board.style.left = that.box.offsetWidth - that.board.offsetWidth + "px";
			}	
			
		}
	}
}

BlockBreak.prototype.keydown = function(){
	
	var that = this;
	document.onkeydown = function(e){
		var e = e || event;
		if(e.keyCode == 37){
			that.board.style.left = that.board.offsetLeft - 30 + "px";
			if(that.board.offsetLeft <= 0){
				that.board.style.left = 0;
			}	
		}
		if(e.keyCode == 39){
			that.board.style.left = that.board.offsetLeft + 30 + "px";
			if(that.board.offsetLeft >= (that.box.offsetWidth - that.board.offsetWidth)){
				that.board.style.left = that.box.offsetWidth - that.board.offsetWidth + "px";
			}	
		}
	}	
}

var times = 0;
var score = 0;
var timer = null;
//小球运动
BlockBreak.prototype.move = function(){
	// var timer = null;
	var that = this;
	timer = setInterval(function(){
		//小球动起来
		that.ball.style.left = that.ball.offsetLeft + that.fx + "px";
		that.ball.style.top = that.ball.offsetTop + that.fy + "px";
		//小球四个方向的反弹
		//上
		if(that.ball.offsetTop <= 0){
			that.fy *= -1;
		}
		//左
		if(that.ball.offsetLeft <= 0){
			that.fx *= -1;
		}
		//右
		if(that.ball.offsetLeft >= (that.box.offsetWidth - that.ball.offsetWidth)){
			that.fx *= -1;
		}
		//下
		if(that.ball.offsetTop >= (that.box.offsetHeight - that.ball.offsetHeight)){
			//游戏结束了y
			that.fy *= -1;//重置小球死亡后的方向
			//that.box.appendChild(document.createTextNode("GameOver!"));
			//$("box").innerHTML = "Gameover!";
			clearInterval(timer);
			$("res").innerHTML = "游戏结束";
		}
		
		//小球和挡板的碰撞反弹
		if(that.ball.offsetTop + that.ball.offsetHeight >= that.board.offsetTop){
			if(that.ball.offsetLeft + that.ball.offsetWidth >= that.board.offsetLeft){
				if(that.ball.offsetLeft <= that.board.offsetLeft + that.board.offsetWidth){
					that.fy *= -1;
					times++;
					$("times").innerHTML = "挡板打球" + times + "次";
				}
			}
		}
		//小球和砖块的碰撞反弹
		//以一个小球为基准遍历所有砖块，找到满足条件的那个砖块隐藏
		for(var i = 0; i < that.list.length; i++){
			if (that.ball.offsetTop <= that.list[i].offsetTop + that.list[i].offsetHeight){
				if(that.ball.offsetLeft >= that.list[i].offsetLeft){
					if(that.ball.offsetLeft <= that.list[i].offsetLeft + that.list[i].offsetWidth){
						that.fy *= -1;
						that.list[i].style.display = "none";
						score++;
						$("score").innerHTML = "得分为:" + score;
					}
				}
			}
		}
	},10)
}


var bb = new BlockBreak();
bb.init();

$("start").onclick = function(){
	//重置挡板和小球的位置
	if (timer!= null){
		clearInterval(timer);
	}
	
	// location.reload();
		
	$("board").style.left = 160 + "px";
	$("bubble").style.left = 180 + "px";
	$("bubble").style.top = 476 + "px";
	bb.keydown();
	bb.mousemove();
	bb.move();
	
	//右侧信息实现系统时间的显示
	setInterval(function(){
		var now = new Date();
		$("time").innerHTML = now.getFullYear() + "/" + (now.getMonth()+1) + "/"
			+ now.getDate() + "  " + now.getHours()+":"+now.getMinutes()+":"+now.getSeconds();
	},10)
	$("res").innerHTML = "游戏加载完成了";
}

//开始有问题,不能刷新