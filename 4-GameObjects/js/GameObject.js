"use strict";
let objectID = 0;

class GameObject {
	constructor(options) {
		options = options || {};

		//  UNIQUE ID FOR EACH OBJECT
		this.id = objectID++;

		this.position = vector(
			options.x || 0,
			options.y || 0
		);
		this.size = vector(
			options.w || 0,
			options.h || 0
		);

		this.rotation = options.rotation || 0;

		this.pivot = vector(
			options.pivotX || 0.5,
			options.pivotY || 0.5
		);
		this.scale = vector(
			options.scaleX || 1,
			options.scaleY || 1
		);
		
		//  PHYSICS
		this.velocity = vector();
		this.acceleration = vector();

		//  VISIBILITY
		this.visible = options.visible || true;
		this.alpha = options.alpha || 1;
		this.blendMode = options.blendMode || null;
		
		//  SCENE GRAPH
		this.parent = options.parent || null;
		this.children = options.children || [];
		this._zIndex = options.zIndex || 0;

		//  SHAPE OF THE OBJECT
		this.circular = options.circular || false;
		this.points = options.points || undefined;

		this.debug = options.debug || false;
	}

	get x() { return this.position.x; }
	set x(value) { this.position.x = value; }
	get y() { return this.position.y; }
	set y(value) { this.position.y = value; }
	get w() { return this.size.x; }
	set w(value) { this.size.x = value; }
	get h() { return this.size.y; }
	set h(value) { this.size.y = value; }

	get halfWidth() { return this.w/2 }
	get halfHeight() { return this.h/2 }

	get centre() {
		return vector(
			this.x + this.halfWidth,
			this.y + this.halfHeight
		)
	}
	get topLeft() { return this.position.clone() }
	get topRight() { return this.position.clone().add({x:this.w,y:0}) }
	get bottomLeft() { return this.position.clone().add({x:0,y:this.h}) }
	get bottomRight() { return this.position.clone().add(this.size) }

	get gX() {
		if(this.parent)
			return this.x + this.parent.gX;
		else return this.x;
	}

	get gY() {
		if(this.parent)
			return this.y + this.parent.gY;
		else return this.y;
	}

	get zIndex() {
		return this._zIndex;
	}

	set zIndex(value) {
		this._zIndex = value;
		if(this.parent)
			this.parent.children.sort((a,b) => a.zIndex - b.zIndex)
	}

	addChild(sprite) {
		if(sprite.parent)
			sprite.parent.removeChild(sprite);
		sprite.parent = this;
		this.children.push(sprite);
		this.children.sort((a,b) => a.zIndex - b.zIndex)
	}

	removeChild(sprite) {
		if(sprite.parent === this)
			this.children.splice(this.children.indexOf(sprite),1);
		else throw new Error(sprite + "is not a child of " + this);
	}

	update() {
		this.velocity.add(this.acceleration);
		this.position.add(this.velocity);
	}
}