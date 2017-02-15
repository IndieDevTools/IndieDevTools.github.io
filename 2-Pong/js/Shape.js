function shape(options) {
	options = options || {};
	let r = new Shape(options);
	stage.addChild(r);
	return r;
}

class Shape extends GameObject {
	
	constructor(options) {
		super(options);

		this.w = options.w || 32;
		this.h = options.h || 32;
		if(this.circular)
			this.h = this.w;

		this.fillStyle = options.fillStyle || "red";
		this.strokeStyle = options.strokeStyle || "none";
		this.lineWidth = options.lineWidth || "0";

		this.mask = options.mask || false;
	}

	render(ctx) {
		ctx.strokeStyle = this.strokeStyle;
		ctx.lineWidth = this.lineWidth;
		ctx.fillStyle = this.fillStyle;
		ctx.beginPath();
		//  RENDER SHAPES
		if(this.points
		&& this.points.length > 1) {
			ctx.moveTo(
				this.points[0].x + (-this.w * this.pivot.x),
				this.points[0].y + (-this.h * this.pivot.y)
			)
			for(let i=1,iL=this.points.length; i<iL; i++) {
				ctx.lineTo(
					(this.points[i].x  * this.w)+ (-this.w * this.pivot.x),
					(this.points[i].y  * this.h)+ (-this.h * this.pivot.y)
				)
			}
		//  RENDER CIRCLES
		} else if(this.circular) {
			ctx.arc(
				this.halfWidth + (-this.w * this.pivot.x),
				this.halfHeight + (-this.h * this.pivot.y),
				this.halfWidth,
				0, 2*Math.PI, false
			)
		//  RENDER RECTS
		} else {
			ctx.rect(
				-this.w * this.pivot.x,
				-this.h * this.pivot.y,
				this.w, this.h
			)
		}
		if(this.closeShape)
			ctx.closePath();

		if(this.strokeStyle !== "none") ctx.stroke();
		if(this.fillStyle !== "none") ctx.fill();
		if(this.mask === true) ctx.clip();
	}
}