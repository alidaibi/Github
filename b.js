(function($){
	var rain = function(target,direction){
		function Rain(opacity, speed, x, y){
			this.speed = speed;
			this.opacity = -.03 + opacity / 10;
			this.counter = 0;
			this.xPos = x;
			this.yPos = y;
		}
		function draw(a,b,c,d,f,g){
			context.moveTo(a.xPos + a.counter * i * b, a.yPos + a.counter);
			context.bezierCurveTo(a.xPos + a.counter * i * b + c * b,
								  a.yPos + a.counter + d,
								  a.xPos + a.counter * i * b + f * b,
								  a.yPos + a.counter + g,
								  a.xPos + a.counter * i * b,
								  a.yPos + a.counter);

		}
		function createRain(){
			for(var i = 0; countNum > i; i++){
				var x = Math.round(Math.random() * width * i + width);
				'right' == c ?  x *= -1 : 'left' != c && (x = Math.round(Math.random() * width * i + 1));
				var y = -1 * Math.round(Math.random() * height * 2 + 50);
				var speed = 5 + 5 * Math.random();
				var opacity = Math.floor(10 * Math.random() + 1);
				var r = new Rain(opacity, speed, x, y);
				j.push(r);
			}
			start();
		
		}
		function start(){
			context.clearRect(0, 0, width, height);
			for(var a = 0,l = j.length; a < l; a++) j[a].update();
			animate = requestAnimationFrame(start);
		}
		var canvas = $(target),
			context = canvas[0].getContext('2d'),
			width = 1366,
			height = 638;
		canvas.attr({
			width: width,
			height: height
		});
		var animate, countNum = 5e3,
			i = 1,
			c = direction,
			j = [],
			requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
		Rain.prototype.update = function(){
			this.counter += this.speed;
			this.yPos +	this.counter > height && (this.xPos = Math.round(Math.random() * width * i + width),
			'right' == c ? this.xPos = -1 * Math.round(Math.random() * width * i + 25) : 'left' != c && (this.xPos = Math.round(Math.random() * width + 1)),
			this.yPos = -1 * Math.round(Math.random() * height * 2 + 1),this.counter = 0),
			context.beginPath(),
			'left' == c ? draw(this, -1, 7, 10, 11, 5) : 'right' == c ? draw(this, 1, 7, 10, 11, 5) : (i = 0, draw(this, 1, 0, 15, 3, 20)),
			context.fillStyle = 'rgba(255, 255, 255, '+ this.opacity.toFixed(2) +')',
			context.fill()
		}
		createRain();
		
	}
	rain('#rain_canvas','left');
})(jQuery);