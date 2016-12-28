window.onload=function(){
	var yzp=new role();
}

function role(){
	var canvas=document.getElementById("canvas");/*私有变量*/
	var context=canvas.getContext('2d');
	var colorList=['rgb(200,100,200)','rgb(100,200,200)','rgb(100,100,200)'];
	var shapeList=['circle','square'];

	this.name='yzp';
	this.x=100;
	this.y=100;
	this.speed=100;
	this.accelerate=10000;
	this.targetX=1000;
	this.targetY=1000;
	this.color='rgb(100,200,250)';
	this.shape='square';
	this.render=function(){
		drawMath[this.shape](context,this.x,this.y,this.color);
	};
	this.moveTo=function(){
			var This=this;
			this.x=this.x+(this.targetX-this.x)/60
			this.y=this.y+(this.targetY-this.y)/60;
			this.render();
			if(this.x-this.targetX){
				moveAnimation=window.requestAnimationFrame(function(){This.moveTo();});
			}else{
				this.targetX=this.x+1000;
				this.targetY=this.y-1000;
				moveAnimation=window.requestAnimationFrame(function(){This.moveTo();});
			}
	};
	this.eventListener=function(){
			var This=this;
			canvas.addEventListener('click',function(event){
				This.targetX=event.clientX;
				This.targetY=event.clientY;
				window.cancelAnimationFrame(window.moveAnimation);
				This.moveTo();	
			});
			window.addEventListener('keydown',function(event){
				if(event.keyCode==65){
					This.changeColor();
				}
			});
			window.addEventListener('keydown',function(event){
				if(event.keyCode==83){
					This.changeShape();
				}
			})
	},
	this.changeShape=function(){
		var shapeFirst=shapeList.shift();
		shapeList.push(shapeFirst);
		this.shape=shapeList[0];
		this.render();
	},
	this.changeColor=function(){
		var colorFirst=colorList.shift();
		colorList.push(colorFirst);
		this.color=colorList[0];
		this.render();
	},
	this.init=(function(This){
		This.render();
		This.eventListener();
	})(this)
};

var drawMath={
	circle:function(context,x,y,color){
		context.arc(x,y,20,0,2*Math.PI);
		context.fillStyle='white';
		context.fill();
		
		context.beginPath();
		context.arc(x,y,20,0,2*Math.PI);
		context.fillStyle=color;
		context.fill();
	},
	square:function(context,x,y,color){
		context.rect(x-20,y-20,40,40);
		context.fillStyle='white';
		context.fill();

		context.beginPath();
		context.rect(x-20,y-20,40,40);
		context.fillStyle=color;
		context.fill();
	}
}
