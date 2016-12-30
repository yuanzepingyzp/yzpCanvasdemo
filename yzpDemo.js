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
		drawMath[this.shape](context,20,this.x,this.y,this.color);
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
			});
			window.addEventListener('keydown',function(event){
				if(event.keyCode==68){
					This.boom();
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
	this.boom=function(){
		for(var i=0;i<100;i++){
			new dot(this.x,this.y,this.x+200*Math.random()-100,this.y+200*Math.random()-100,this.color);
		}
	},
	this.init=(function(This){
		This.render();
		This.eventListener();
	})(this)
};

function dot(x,y,targetX,targetY,color){
	var canvas=document.getElementById("canvas");/*私有变量*/
	var context=canvas.getContext('2d');

	this.x=x;
	this.y=y;
	this.targetX=targetX;
	this.targetY=targetY;
	this.context=context;
	this.color=color;
	this.render=function(){
		drawMath.circle(context,2,this.x,this.y,this.color);
	};
	this.move=function(){
		var This=this
		this.x=this.x+(this.targetX-this.x)/60
		this.y=this.y+(this.targetY-this.y)/60;
		this.render();
		if(this.x-this.targetX){
			window.requestAnimationFrame(function(){This.move();});
		}
	};
	this.init=(function(This){
		This.move();
	})(this)
}

var drawMath={
	circle:function(context,r,x,y,color){
		context.arc(x,y,r,0,2*Math.PI);
		context.fillStyle='white';
		context.fill();
		
		context.beginPath();
		context.arc(x,y,r,0,2*Math.PI);
		context.fillStyle=color;
		context.fill();
	},
	square:function(context,r,x,y,color){
		context.rect(x-r,y-r,2*r,2*r);
		context.fillStyle='white';
		context.fill();

		context.beginPath();
		context.rect(x-r,y-r,2*r,2*r);
		context.fillStyle=color;
		context.fill();
	}
}
