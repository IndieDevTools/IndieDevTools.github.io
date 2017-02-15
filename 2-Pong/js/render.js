"use strict";

function render() {
	let context = canvas.context;
	context.clearRect(0,0,canvas.width,canvas.height);

	stage.children.forEach(obj => {
		displayObject(obj);
	});

	function displayObject(obj) {
		if(obj.visible) {
			context.save();
			context.translate(
				obj.x + (obj.w * obj.pivot.x),
				obj.y + (obj.h * obj.pivot.y)
			);

			context.rotate(obj.rotation);
			context.globalAlpha = obj.alpha * obj.parent.alpha;
			context.scale(obj.scaleX,obj.scaleY);

			if(obj.blendMode)
				context.globalCompositeOperation = obj.blendMode;
			else context.globalCompositeOperation = "source-over";

			if(obj.render)
				obj.render(context);
			
			if(obj.children
			&& obj.children.length > 0) {
				context.translate(
					-obj.width * obj.pivot.x,
					-obj.height * obj.pivot.y
				);
				obj.children.forEach(child => {
					displayObject(child);
				})
			}
			// context.fillStyle = "black";
			// context.fillRect(-1,-1,2,2)

			context.restore();
		}
	}

}