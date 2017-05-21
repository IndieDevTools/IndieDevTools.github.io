//  HELPER FUNCTION
function vector(x,y) {
	return new Vector(x,y);
};

function Vector(x,y) {
	this.x = x || 0;
	this.y = y || 0;
	return this;
};

Vector.prototype = {

	//  ADD ANOTHER VECTOR TO THIS ONE
	add: function(vec) {
		this.x += vec.x;
		this.y += vec.y;
		return this;
	},

	//  SUBTRACT ANOTHER VECTOR FROM THIS ONE
	subtract: function(vec) {
		this.x -= vec.x;
		this.y -= vec.y;
		return this;
	},

	//  SCALE THIS VECTOR BY AN AMOUNT OR ANOTHER VECTOR
	scale: function(vec) {
		//  SCALE BY A VECTOR
		if(vec.x !== undefined) {
			this.x *= vec.x;
			this.y *= vec.y;
		} else {
		//  SCALE BOTH BY SAME NUMBER
			this.x *= vec;
			this.y *= vec;
		}
		return this;
	},

	//  CLEARS THIS VECTOR
	clear: function() {
		this.x = 0;
		this.y = 0;
		return this;
	},

	//  COPIES ANOTHER VECTOR ONTO THIS
	copy: function(vec) {
		this.x = vec.x;
		this.y = vec.y;
		return this;
	},

	//  CREATE A NEW VECTOR, THE SAME AS THIS ONE
	clone: function() {
		return new Vector(this.x,this.y);
	},

	//  REVERSES THIS VECTOR
	reverse: function() {
		this.x = -this.x;
		this.y = -this.y;
		return this;
	},

	//  RETURNS THE MAGNITUDE OF THIS VECTOR
	magnitude: function() {
		return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
	},

	//  RETURNS THE DIRECTION THIS VECTOR IS POINTING IN RADIANS, 0 POINTS RIGHT
	direction: function() {
		return Math.atan2(this.y,this.x)
	},

	//  RETURNS THE DISTANCE BETWEEN TWO POINTS
	distance: function(x, y) {
		if(x.x !== undefined)
			return Math.sqrt(Math.pow(x.x - this.x, 2) + Math.pow(x.y - this.y, 2));
		else return Math.sqrt(Math.pow(x - this.x, 2) + Math.pow(y - this.y, 2));
	},

	//  RETURNS A NEW VECTOR ROTATED 90˚ FROM THIS VECTOR
	perpendicular: function() {
		let v = new Vector();
		v.x = this.y;
		v.y = -this.x;
		return v;
	},

	//  RETURNS THE UNIT VECTOR OF THIS VECTOR
	normalize: function() {
		let v = new Vector(0,0),
			m = this.magnitude();
		if(m != 0) {
			v.x = this.x / m;
			v.y = this.y / m;
		}
		return v;
	},

	//  RETURNS THE UNIT VECTOR OF THE VECTOR PERPENDICULAR TO THIS VECTOR
	normal: function() {
		let p = this.perpendicular();
		return p.normalize();
	},

	//  FINDS THE DOT PRODUCT OF THIS VECTOR AND ANOTHER
	dotProduct: function(vector) {
		let v = vector.normalize();
		return this.x * v.x + this.y * v.y;
	},

	//  PROJECT THIS VECTOR ONTO ANOTHER
	project: function(vector) {
		let v = vector.normalize(),
			dp = this.dotProduct(v);
		return new Vector(dp * v.x, dp * v.y);
	},

	//  BOUNCE THIS VECTOR OFF OF ANOTHER
	bounce: function(vector) {
		let p1 = this.project(vector),
			p2 = this.project(vector.normal()).reverse();
		return p1.add(p2);
	},
};