"use strict";
let canvas,
	canvasOffset = vector();

function setup(options) {
	options = options || {
		w: 720,
		h: 480
	}

	canvas = createCanvas(options.w,options.h);
	document.body.appendChild(canvas);

	//  GET COORDINATES
	if(canvas.width < window.innerWidth)
		canvasOffset.x = Math.floor((window.innerWidth-canvas.width)/2);
	if(canvas.height < window.innerHeight)
		canvasOffset.y = Math.floor((window.innerHeight-canvas.height)/2);

	//  CENTER CANVAS
	canvas.style.marginLeft = canvasOffset.x + "px";
	canvas.style.marginTop = canvasOffset.y + "px";
}

function createCanvas(width = 400, height = 400) {

	let canvas = document.createElement('canvas'),
		context = canvas.getContext('2d');

	canvas.context = context;

	canvas.width = width;
	canvas.height = height;

	return canvas;
}