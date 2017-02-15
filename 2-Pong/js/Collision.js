//  AXIS ALIGNED BOUNDING BOX COLLISION
let response = vector();
function objectCollision(obj1, obj2) {
	if(obj1 && obj2) {

		response.clear();
		response.obj1 = obj1;
		response.obj2 = obj2;
		response.collisionSide = "";

		if(obj1.circular
		&& obj2.circular)
			return circleVsCircle(obj1,obj2);

		if(obj1.circular
		|| obj2.circular) {
			let hit;
			if(obj1.circular)
				hit = circleVsRectangle(obj1, obj2);
			else hit = circleVsRectangle(obj2, obj1);
			if(!hit) return false;
			return obj1.circular ? response : response.reverse();
		}

		if(!obj1.circular
		&& !obj2.circular)
			return rectangleVsRectangle(obj1, obj2);
	}
}

function pointCollision(point, obj) {
	if(obj.circular) {
		if(obj.center.distance(point) <= obj.halfWidth)
			return true;
	} else {
		if(point.x > obj.x
		&& point.x < obj.x + obj.w
		&& point.y > obj.y
		&& point.y < obj.y + obj.h)
			return true;
	}
	return false;
}

function rectangleVsRectangle(obj1, obj2) {
	let distance = obj1.center.subtract(obj2.center),
		halfWidths = obj1.halfWidth + obj2.halfWidth,
		halfHeights = obj1.halfHeight + obj2.halfHeight;

	if(Math.abs(distance.x) < halfWidths) {
		if(Math.abs(distance.y) < halfHeights) {
			//  XY OVER LAPS
			let xOver = halfWidths - Math.abs(distance.x),
				yOver = halfHeights - Math.abs(distance.y);
			//  USE THE SMALLER OF THE TWO OVERLAPS AS MINIMUM TRANSLATION VECTOR
			if(xOver > yOver) {
				//  Y IS SMLLER
				//  MTV POINTS DOWN
				if(distance.y > 0) {
					response.collisionSide = "bottom";
					response.y = yOver;
				}
				//  MTV POINTS UP
				else {
					response.collisionSide = "top";
					response.y = -yOver;
				}
			} else {
				//  X IS SMALLER
				//  MTV POINTS RIGHT
				if(distance.x > 0) {
					response.collisionSide = "right";
					response.x = xOver;
				}
				//  MTV POINTS LEFT
				else {
					response.collisionSide = "left";
					response.x = -xOver;
				}
			}
			return response;
		}
	}
	return false;
}

function circleVsCircle(obj1,obj2) {

		//  DISTANCE BETWEEN CENTRE'S
		let distance = obj1.center.subtract(obj2.center),
		//  SUM OF RADII
			halfWidths = obj1.halfWidth + obj2.halfWidth;

		if(distance.magnitude() < halfWidths) {
			response.collisionSide = "circular";
			return response.copy(distance.normalize()).scale(halfWidths-distance.magnitude());
		} else return false
}

function circleVsRectangle(circ,rect) {

	//  DISTANCE BETWEEN CENTRE'S
	let distance = circ.center.subtract(rect.center),
	//  CIRCLE RADIUS + DISTANCE FROM CORNER TO CENTRE OF RECT
		length = circ.halfWidth + rect.position.distance(rect.center);

	if(distance.magnitude() < length) {

		let direction = Math.floor(distance.direction()/Math.PI*2),
			quadrant = quadrants[direction],
			distToPoint = circ.center.subtract(rect[quadrant]),
			dir = quadrants[Math.floor(distToPoint.direction()/Math.PI*2)];

		if(dir === quadrant) {
			if(pointCollision(rect[quadrant],circ)) {
				response.copy(distToPoint.normalize()).scale(circ.halfWidth-distToPoint.magnitude());
				response.collisionSide = quadrant;
			} else return false;
		} else return rectangleVsRectangle(circ,rect,response);
		return response;
	} else return false;

}

let quadrants = {
	0: "bottomRight",
	1: "bottomLeft",
	"-1": "topRight",
	"-2": "topLeft",
	2: "topLeft"
}

