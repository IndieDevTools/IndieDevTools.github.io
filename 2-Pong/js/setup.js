"use strict";
let stage,canvas;

function setup(options) {
	options = options || {
		w: 720,
		h: 480
	}

	stage = new GameObject({
		w: options.w,
		h: options.h
	})
	canvas = createCanvas(options.w,options.h);
	document.body.appendChild(canvas);

	//  CENTER CANVAS
	if(canvas.width < window.innerWidth)
		canvas.style.marginLeft = (window.innerWidth-canvas.width)/2+"px";
	if(canvas.height < window.innerHeight)
		canvas.style.marginTop = (window.innerHeight-canvas.height)/2+"px";
}

function createCanvas(width = 400, height = 400) {

	let canvas = document.createElement('canvas'),
		context = canvas.getContext('2d');

	canvas.context = context;

	canvas.width = width;
	canvas.height = height;

	return canvas;
}