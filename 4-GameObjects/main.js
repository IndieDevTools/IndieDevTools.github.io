//  SETUP CANVAS AND STAGE
setup({
	w: window.innerWidth,
	h: window.innerHeight
});
//  SIMPLE CONTROLS
let mousePosition = vector();
function mouseDown(e) {
	//  IF THE MOUSE OBJECT HAS NO CHILDREN
	if(mouseObject.children.length < 1)
		//  CHECK TO SEE IF EITHER OBJECT CAN BE PICKED UP
		objects.forEach(obj => pickUp(obj));
	//  IF THE MOUSE HAS A CHILD PUT IT DOWN
	else putDown(mouseObject.children[0]);
}
function mouseMove(e) {
	mousePosition.x = e.clientX - canvasOffset.x;
	mousePosition.y = e.clientY - canvasOffset.y;
}
addEventListener("mousedown",mouseDown,false);
addEventListener("mousemove",mouseMove,false);

//  MAKE OBJECTS
let context = canvas.context,
	mouseObject = new GameObject({}),
	objects = [
	new GameObject({
		x: 100,
		y: 100,
		w: 100,
		h: 100,
		circular: true,
		debug: true
	}),
	new GameObject({
		x: 100,
		y: 200,
		w: 100,
		h: 100,
		debug: true
	})
];
//  ADD THEM TO THE STAGE
stage.addChild(mouseObject);
objects.forEach(obj => stage.addChild(obj));

update();
function update() {
	requestAnimationFrame(update);
	//  MOVE THE MOUSE OBJECT (AND ALL CHILDREN) TO THE MOUSE POSITION 
	mouseObject.position.copy(mousePosition);
	render();
}
function pickUp(obj) {
	//  IF THE MOUSE POSITION IS INSIDE THE OBJECT
	if(mousePosition.x > obj.gX
	&& mousePosition.x < obj.gX + obj.w
	&& mousePosition.y > obj.gY
	&& mousePosition.y < obj.gY + obj.h) {
		//  ONE CHILD AT A TIME (ONLY THE FIRST IN ARRAY IF BOTH ARE CLICKED)
		if(mouseObject.children.length < 1) {
			mouseObject.addChild(obj);
			//  MOVE OBJECT FROM WORLD SPACE TO LOCAL SPACE
			obj.position.subtract(mouseObject);
		}
	}
}
function putDown(obj) {
	//  FIND GLOBAL POSITION
	let v1 = vector(obj.gX,obj.gY);
	mouseObject.removeChild(obj);
	stage.addChild(obj);
	//  KEEP AT SAME GLOBAL POSITION
	obj.position.copy(v1);
}
