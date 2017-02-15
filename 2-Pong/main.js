setup({
	w: 960,
	h: 640
});

//  CREATE VARIABLES AND GAME OBJECTS
let roundOver = false,
	field = shape({
		w: stage.w,
		h: stage.h,
		fillStyle: 'cornflowerblue'
	}),
	ball = shape({
		w: 50,
		x: stage.center.x - 25,
		y: stage.center.y - 25,
		fillStyle: 'red',
		circular: true
	}),
	player1 = shape({
		w: 50,
		h: 200,
		y: stage.h/2 - 100,
		fillStyle: 'green'
	}),
	player2 = shape({
		w: 50,
		h: 200,
		x: stage.w - 50,
		y: stage.h/2 - 100,
		fillStyle: 'green'
	});

startRound("left");

//  FUNCTION TO START ROUND
function startRound(direction) {
	roundOver = false;

	//  RESET PLAYER POSITIONS
	player1.y = field.h/2 - player1.h/2;
	player2.y = field.h/2 - player2.h/2;

	//  RESET BALL POSITION
	ball.position.copy(field.center).subtract(ball.halfWidth);

	//  SET BALLS NEW DIRECTION VECTOR
	ball.velocity.x = 10;
	if(direction === 'left')
		ball.velocity.x *= -1;
	ball.velocity.y = (Math.random() * 6) - 3;
	// ball.velocity.y = 2.42;


	//  MAKE SURE IT HAS THE SAME SPEED IN ANY DIRECTION
	ball.velocity.copy(ball.velocity.normalize()).scale(10);
};

//  FUNCTION TO END ROUND
function endRound(direction) {
	//  SO THIS ONLY GETS CALLED ONCE
	if(roundOver) return;
	roundOver = true;

	//  STOP THE BALL
	ball.velocity.clear();

	//  WAIT FOR NEXT ROUND
	switch(direction) {
		case 'left':
			setTimeout( () => startRound('right'), 1000);
		break;
		case 'right':
			setTimeout( () => startRound('left'), 1000);
		break;
	}
};

//  FUNCTION TO HANDLE BALL/PLAYER COLLISION
function bounce(player) {
	if(roundOver) return;

	//  MOVE BALL OUT OF PLAYER
	ball.position.subtract(response);

	//  BOUNCE OFF OF PLAYER
	switch(response.collisionSide) {
		//  BALL COLLIDES WITH SIDES
		case 'top':
		case 'bottom':
			ball.velocity.y *= -1;
		break;
		case 'left':
		case 'right':
			ball.velocity.x *= -1;
		break;
		//  BALL COLLIDES WITH CORNERS
		default:
			//  DRAW A LINE FROM THE CENTRE OF THE BALL TO THE CORNER, THEN FIND ITS NORMAL
			let surface = ball.center.subtract(response.obj1[response.collisionSide]).normal();
			//  BOUNCE OFF THE NORMAL
			ball.velocity = ball.velocity.bounce(surface);
		break;
	}
}

//  FUNCTION THAT CONSTRAINS A PLATER TO THE SCREEN
function constrainToScreen(player) {
	if(player.top < 0)
		player.y = 0;
	if(player.bottom > field.h)
		player.y = field.h - player.h;
};

//  CONTROLS AND AI GO HERE
function begin() {
	//  CHECK FOR KEY PRESSES
	if(keys["37"])
		player1.velocity.y = -5;
	else if(keys["39"])
		player1.velocity.y = 5;
	else player1.velocity.y = 0;

	for(let i in touches) {
		let touch = touches[i];
		if(touch.x < stage.halfWidth)
			player1.velocity.y = -5;
		else if(touch.x > stage.halfWidth)
			player1.velocity.y = 5;
		else player1.velocity.y = 0;
	}


	//  PLAYER2 AI
	if(ball.center.y < player2.top - 5)
		player2.velocity.y = -5;
	else if(ball.center.y > player2.bottom + 5)
		player2.velocity.y = 5;
	else player2.velocity.y = 0;
};

//  MOVEMENT AND COLLISION
function update() {
	//  UPDATE ALL GAME OBJECTS
	stage.children.forEach( obj => {
		obj.update();
	})

	//  BALL/FIELD COLLISIONS
	//  END ROUND ON LEFT OR RIGHT
	if(ball.left < 0)
		endRound('left');
	if(ball.right > field.w)
		endRound('right');
	//  BOUNCE OFF TOP AND BOTTOM
	if(ball.top < 0) {
		ball.velocity.y *= -1;
		ball.y = 0;
	}
	if(ball.bottom > field.h) {
		ball.velocity.y *= -1;
		ball.y = field.h - ball.h;
	}

	//  BALL/PLAYER COLLISIONS
	if(objectCollision(player1,ball))
		bounce(player1);
	if(objectCollision(player2,ball))
		bounce(player2);

	//  PLAYER/FIELD COLLISIONS
	constrainToScreen(player1);
	constrainToScreen(player2);

};

//  DRAW TO SCREEN
function draw() {
	render();
};

MainLoop.setBegin(begin);
MainLoop.setUpdate(update);
MainLoop.setDraw(draw);

MainLoop.start();