var mainScreen = document.getElementById("mainScreen");

//让背景动起来
var timerBg = null;
function moveBg(){
	var jsBg1 = document.getElementById("bg1");
	var jsBg2 = document.getElementById("bg2");
	timerBg = setInterval(function(){
		jsBg1.style.top = jsBg1.offsetTop + 1 + "px";
		jsBg2.style.top = jsBg2.offsetTop + 1 + "px";
		
		if (jsBg1.offsetTop >= 684){
			jsBg1.style.top = "-684px";
		}
		
		if (jsBg2.offsetTop >= 684){
			jsBg2.style.top = "-684px";
		}
	},10);
}
// var jsBg1 = document.getElementById("bg1");
// var jsBg2 = document.getElementById("bg2");
// var timerBg = setInterval(function(){
// 	jsBg1.style.top = jsBg1.offsetTop + 1 + "px";
// 	jsBg2.style.top = jsBg2.offsetTop + 1 + "px";
// 	
// 	if (jsBg1.offsetTop >= 684){
// 		jsBg1.style.top = "-684px";
// 	}
// 	
// 	if (jsBg2.offsetTop >= 684){
// 		jsBg2.style.top = "-684px";
// 	}
// },10);



//飞机动起来
//拖拽效果
var airplane = document.getElementById("airplane");
//给飞机添加移动事件
airplane.addEventListener("mousedown",function(e){
	var ev = e || window.event;
	 basex = ev.pageX;
	 basey = ev.pageY;
	 
	 movex = 0;
	 movey = 0;
	 //给主屏幕添加移动事件
	mainScreen.addEventListener("mousemove",function(e){
		 var en = e || window.event;
		 movex = en.pageX - basex;
		 basex = en.pageX;
		 movey = en.pageY - basey;
		 basey = en.pageY;
		 airplane.style.left = airplane.offsetLeft + movex + "px";
		 airplane.style.top = airplane.offsetTop + movey + "px";
	 },false)
},false)

//发射子弹
var timerBullent =null;
function moveBullent (){
	timerBullent = setInterval(function(){
		//创建子弹
		var bullent = document.createElement("div");
		mainScreen.appendChild(bullent);
		bullent.className = "bullent";
		bullent.style.left = airplane.offsetLeft + 43 + "px";
		bullent.style.top = airplane.offsetTop - 22 + "px";  
		
		//让子弹飞
		var timerBullentFly = setInterval(function(){
			bullent.style.top = bullent.offsetTop - 20 + "px";
			if (bullent.offsetTop <= -24){
				clearInterval(timerBullentFly);
				mainScreen.removeChild(bullent);
			}
		},70);
		bullent.timer = timerBullentFly;
	},200)
}
// var timerBullent = setInterval(function(){
// 	//创建子弹
// 	var bullent = document.createElement("div");
// 	mainScreen.appendChild(bullent);
// 	bullent.className = "bullent";
// 	bullent.style.left = airplane.offsetLeft + 43 + "px";
// 	bullent.style.top = airplane.offsetTop - 22 + "px";  
// 	
// 	//让子弹飞
// 	var timerBullentFly = setInterval(function(){
// 		bullent.style.top = bullent.offsetTop - 20 + "px";
// 		if (bullent.offsetTop <= -24){
// 			clearInterval(timerBullentFly);
// 			mainScreen.removeChild(bullent);
// 		}
// 	},70);
// 	bullent.timer = timerBullentFly;
// },200)

//随机数
function randomNum(min,max){
	return parseInt(Math.random() * (max - min) + min);
}

//敌人下落
var timerTank = null;
function moveTank (){
	timerTank = setInterval(function(){
		//创建坦克
		var tank = document.createElement("div");
		mainScreen.appendChild(tank);
		tank.className = "tank";
		tank.style.left = randomNum(0,472) + "px";
		tank.style.top = "0px";  
		
		//让坦克下落
		var timerTankFly = setInterval(function(){
			tank.style.top = tank.offsetTop + 15 + "px";
			if (tank.offsetTop >= 684){
				clearInterval(timerTankFly);
				mainScreen.removeChild(tank);
			}
		},70);
		tank.timer = timerTankFly;
	},500)
}
	
// var timerTank = setInterval(function(){
// 	//创建坦克
// 	var tank = document.createElement("div");
// 	mainScreen.appendChild(tank);
// 	tank.className = "tank";
// 	tank.style.left = randomNum(0,472) + "px";
// 	tank.style.top = "0px";  
// 	
// 	//让坦克下落
// 	var timerTankFly = setInterval(function(){
// 		tank.style.top = tank.offsetTop + 15 + "px";
// 		if (tank.offsetTop >= 684){
// 			clearInterval(timerTankFly);
// 			mainScreen.removeChild(tank);
// 		}
// 	},70);
// 	tank.timer = timerTankFly;
// },500)

//碰撞检测
function pzjcFunc(obj1,obj2){
	var obj1Left = obj1.offsetLeft;
	var obj1Width = obj1Left + obj1.offsetWidth;
	var obj1Top = obj1.offsetTop;
	var obj1Height = obj1Top + obj1.offsetHeight;
	
	var obj2Left = obj2.offsetLeft;
	var obj2Width = obj2Left + obj2.offsetWidth;
	var obj2Top = obj2.offsetTop;
	var obj2Height = obj2Top + obj2.offsetHeight;
	
	if(! (obj1Left > obj2Width || obj1Width < obj2Left || 
		obj1Top > obj2Height || obj1Height < obj2Top)){
			return true;
	}else{
		return false;
	}
}

//子弹坦克碰撞
var mark = 0;
var timerPZJC = null;
function PZ (){
	timerPZJC = setInterval(function(){
		var allTanks = document.getElementsByClassName("tank");
		var allBullents = document.getElementsByClassName("bullent");
		for(var i = 0; i < allBullents.length; i++){
			for (var j = 0; j < allTanks.length; j++){
				var b = allBullents[i];
				var t = allTanks[j];
				
				if (pzjcFunc(b,t)){
					mark++;
					clearInterval(b.timer);
					clearInterval(t.timer);
					mainScreen.removeChild(b);
					mainScreen.removeChild(t);
					document.getElementById("grade").innerHTML = "score: " + mark;
					break;
				}
				//break;
			}
		}
	},50)
}
// var timerPZJC = setInterval(function(){
// 	var allTanks = document.getElementsByClassName("tank");
// 	var allBullents = document.getElementsByClassName("bullent");
// 	for(var i = 0; i < allBullents.length; i++){
// 		for (var j = 0; j < allTanks.length; j++){
// 			var b = allBullents[i];
// 			var t = allTanks[j];
// 			
// 			if (pzjcFunc(b,t)){
// 				clearInterval(b.timer);
// 				clearInterval(t.timer);
// 				mainScreen.removeChild(b);
// 				mainScreen.removeChild(t);
// 				// grade.style.innerhtml = "score:" + score + 1;
// 				break;
// 			}
// 			//break;
// 		}
// 	}
// },50)

//死亡检测
var timerDie = null;
function die() {
	timerDie = setInterval(function(){
		var allTanks = document.getElementsByClassName("tank");
		for(var i = 0; i < allTanks.length; i++){
				if (pzjcFunc(allTanks[i],airplane)){
					for(var j = 0; j < 100; j++){
						clearInterval(j);
					}
					var over = document.getElementById("over");
					over.style.display = "block";
					setTimeout(function() {
						over.innerHTML = "<p>游戏即将重新开始</p>";
						setTimeout(function() {
							location.reload();
						}, 2000);
					}, 2000);
				}
		}
	},50)
}
// var timerDie = setInterval(function(){
// 	var allTanks = document.getElementsByClassName("tank");
// 	for(var i = 0; i < allTanks.length; i++){
// 			if (pzjcFunc(allTanks[i],airplane)){
// 				for(var j = 0; j < 100; j++){
// 					clearInterval(j);
// 				}
// 			}
// 	}
// },50)

function autoplay(){
	var music = document.getElementById("vd");//获取ID  
	if (music.paused) { //判读是否播放  
		music.paused=false;
		music.play(); //没有就播放
	}	 
}  

//开始
var start = document.getElementById("start");
start.onclick = function (){
	
	start.style.display = "none";
	console.log("aaa");
	moveBg();
	moveBullent();
	moveTank();
	PZ();
	die();
	setInterval(autoplay(),10);
}

//分数
// var grade = document.getElementById("grade");
// var score = 0;
