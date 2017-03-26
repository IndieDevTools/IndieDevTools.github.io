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
///*
let P = vector(200,240),
	V1 = vector(300,0),
	V2 = vector();

function update() {
	context.fillRect(0,0,canvas.width,canvas.height);
	context.strokeStyle = 'black';
	drawArrow(V1,P.x,P.y);

	V2.copy(mousePosition).subtract(P);
	console.log(V1.dotProduct(V2))

	if(V1.dotProduct(V2)>0)
		context.strokeStyle = 'orange';
	else context.strokeStyle = 'green';
	drawArrow(V2,P.x,P.y);

	
}
//*/
/*
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
//*/






// let gameObject = {
// 		position: vector(100,200),
// 		velocity: vector(50,0)
// 	},
// 	computerCycle = setInterval( () => {
// 		let gObj = gameObject;
// 		gObj.position.add(gObj.velocity);
// 		canvas.context.clearRect(0,0,canvas.width,canvas.height);
// 		canvas.context.fillRect(gObj.position.x,gObj.position.y,100,100);
// 		if(gObj.position.x > canvas.width)
// 			gObj.position.x -= canvas.width + 100;
// 	}, 1000)




// console.log(Math.atan2(4,5));
// // console.log(Math.PI/4);
// // let context = canvas.context;

// context.fillStyle = 'red';
// context.strokeStyle = 'black';



// let V1 = vector(40,20),
// 	V2 = V1.perpendicular();
// drawArrow(V1, 200,400);
// drawArrow(V2, 200,400);


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


// let v1 = vector(500,100),
// 	p1 = vector(150,200),
// 	v2 = p1.clone().subtract(vector(100,100)),
// 	n = v1.normal().scale(10),
// 	v3 = v2.project(v1);
// drawArrow(v1,100,100);

// drawArrow(v2,100,100);
// drawArrow(n,100,100);
// drawArrow(v3,100,90);
// drawPoint(p1);
// console.log(v2.dotProduct(n));
// console.log(v3);


// let vectors = [
// 	vector()
// ]
