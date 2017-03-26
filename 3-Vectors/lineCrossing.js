setup();

let mousePosition = vector();
function mouseHandler(e) {
	mousePosition.x = e.clientX - canvasOffset.x;
	mousePosition.y = e.clientY - canvasOffset.y;
	update();
}
addEventListener("mousedown",mouseHandler,false);
addEventListener("mousemove",mouseHandler,false);

let context = canvas.context;
context.fillStyle = 'cornflowerblue';
context.lineWidth = 4;
context.lineCap = "round";

let P = vector(200,240),
	P2 = vector(),
	V1 = vector(300,0),
	V2 = vector(),
	N1 = V1.perpendicular().scale(0.5),
	dist = 0;

function update() {
	context.fillStyle = 'cornflowerblue';
	context.fillRect(0,0,canvas.width,canvas.height);
	context.strokeStyle = 'black';
	drawArrow(V1,P.x,P.y);

	P2.copy(mousePosition);
	V2.copy(P2).subtract(P);

	dist = N1.dotProduct(V2);
	console.log(dist);
	if(dist>0)
		context.strokeStyle = 'orange';
	else context.strokeStyle = 'green';
	drawArrow(V2,P.x,P.y);
	context.strokeStyle = 'yellow';
	drawArrow(N1,P.x,P.y);
	context.fillStyle = 'red';
	drawPoint(P2);	
}


function drawVector(vec, x = 0, y = 0) {
	context.beginPath();
	context.moveTo(x,y);
	context.lineTo(x+vec.x, y+vec.y);
	context.stroke();
}
function drawArrow(vec, x = 0, y = 0) {
	drawVector(vec,x,y);
	let nrml = vec.normal().scale(10);
	context.save()
	context.translate(x+vec.x,y+vec.y);
	context.rotate(-Math.PI/4);
	drawVector(nrml);
	context.rotate(-Math.PI/2);
	drawVector(nrml);
	context.restore();
}
function drawPoint(vec) {
	context.beginPath();
	context.arc(vec.x-2, vec.y-2, 4, 0, Math.PI*2);
	context.fill()
}