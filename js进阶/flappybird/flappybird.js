var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
// context.fillStyle = "#FFF";   
// context.fillRect(0,0,800,400);   

//创建一个图片
var img = new Image();
img.src = "./img/bird上.jpg"; //怎莫设置图片大小
// img.width = "20px";
// img.height = "18px";

var birdX = 200;
var birdY = 100;
var birdTimer = null;

img.onload = function() { //等待图片加载结束,绘制图片
	if (birdTimer == null) {
		birdTimer = setInterval(function() {
			if (birdY <= 375) {
				birdY++;
			}
			context.clearRect(0, 0, 800, 400); //清空画布
			drawColumn();
			context.drawImage(img, birdX, birdY, 30, 25);
		}, 18);
	}
}


//小鸟起飞
document.onmousedown = function() {
	img.src = "./img/bird下.jpg";
	birdY = birdY - 30;
}

document.onmouseup = function() {
	img.src = "./img/bird上.jpg";
}

//柱子
var columnArr = [];
var columnTimer = null;

function createColumn() {
	columnTimer = setInterval(function() {
		var column = {}; //柱子容器;
		column.positionX = 800;
		column.positionY = -Math.round(Math.random() * 100 + 100);
		column.imgA = new Image();
		column.imgB = new Image();
		column.imgA.src = "./img/柱子上.jpg";
		column.imgB.src = "./img/柱子下.jpg";
		column.id = new Date().getTime();
		// console.log(column);

		columnArr.push(column);
		// console.log(columnArr);
	}, 2000);
}

createColumn();

var same = null;
var mark = 0;

function drawColumn() {
	for (var i = 0; i < columnArr.length; i++) {
		columnArr[i].positionX--;
		context.drawImage(columnArr[i].imgA, columnArr[i].positionX, columnArr[i].positionY);
		context.drawImage(columnArr[i].imgB, columnArr[i].positionX, columnArr[i].positionY + 380);

		if (birdX + 30 >= columnArr[i].positionX && birdX - 70 <= columnArr[i].positionX) {
			//加分
			//console.log("经过");

			if (columnArr[i].id != same) {
				mark++;
				same = columnArr[i].id;

				var score = document.getElementById("score");
				// document.getElementById("mark").innerHTML = "得分:" + mark;
				score.innerHTML = "得分: " + mark;
			}

			//判断碰撞
			if (birdY < columnArr[i].positionY + 250 || birdY + 25 > columnArr[i].positionY + 380) {
				// console.log("die");

				clearInterval(columnTimer);
				clearInterval(birdTimer);

				var oRes = document.getElementById("res");
				oRes.style.display = "block";

				oRes.children[0].innerHTML = "得分: " + mark;

				setTimeout(function() {
					oRes.innerHTML = "<p>游戏即将重新开始</p>";
					setTimeout(function() {
						location.reload();
					}, 2000);
				}, 1000);
			}
		}
	}
}
