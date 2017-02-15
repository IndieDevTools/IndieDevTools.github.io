let keys = {},
	touches = {},
	mouse = vector(),
	keyHandler = function(e) {
		// e.preventDefault();
		// console.log(e.keyCode)
		if(!keys[e.keyCode]
		&& e.type === "keydown")
			keys[e.keyCode] = Date.now();
		else if(e.type === "keyup")
			delete keys[e.keyCode];
	},
	mouseHandler = function(e) {
		e.preventDefault();
		switch(e.type) {
			case "mousedown":
				mouse.pressed = true;
			case "mousemove":
				mouse.x = e.clientX;
				mouse.y = e.clientY;
			break;
			
			case "mouseup":
				mouse.x = -1;
				mouse.y = -1;
				mouse.pressed = false;
			break;
		}
	}
	touchHandler = function(e) {
		e.preventDefault()
		touches = {};
		// console.log("touches")
		for(var i=0,iL=e.touches.length; i<iL; i++) {
			var touch = e.touches[i];
			touches[touch.identifier] = {
				x: touch.clientX,
				y: touch.clientY,
				id: touch.identifier
			};
		}
		// console.log(touches)
	}
document.body.onkeydown = keyHandler;
document.body.onkeyup = keyHandler;

document.body.onmousedown = mouseHandler;
document.body.onmousemove = mouseHandler;
document.body.onmouseup = mouseHandler;

document.body.ontouchstart = touchHandler;
document.body.ontouchmove = touchHandler;
document.body.ontouchend = touchHandler;


	