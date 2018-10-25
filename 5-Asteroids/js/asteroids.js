//  CLASSES
class Vec {
	constructor(x=0,y=0) {
		this.x = x;
		this.y = y;
		this.m = 1;
		return this;
	};
	add(v) {
		this.x += v.x;
		this.y += v.y;
		return this;
	};
	sub(v) {
		this.x -= v.x;
		this.y -= v.y;
		return this;
	};
	scale(n) {
		this.x *= n;
		this.y *= n;
		return this;
	};
	clear() {
		this.x = 0;
		this.y = 0;
		return this;
	};
	copy(v) {
		this.x = v.x;
		this.y = v.y;
		return this;
	};
	dir() {
		return Math.atan2(this.y,this.x);
	};
	mag() {
		this.m = Math.sqrt(this.x*this.x + this.y*this.y);
		return this.m;
	};
	unit() {
		this.mag();
		this.x /= this.m;
		this.y /= this.m;
		return this;
	};
	vFrD(d) {
		this.x = Math.cos(d);
		this.y = Math.sin(d);
		return this;
	};
};

class Actor {
	constructor(o) {
		this.id = objID++;
		this.type = o.type;

		this.w = o.w || 16;
		this.h = o.h || 16;

		this.pos = new Vec(o.x,o.y);
		this.vel = new Vec(0,0);
		this.acc = new Vec();
		this.accSpeed = 50;

		this.dir = 0;
		this.turnSpeed = 6.28;

		this.firingSpeed = 300;
		this.firingTime = 0;

		this.life = 1000;
	};
	update(dt) {
		this.vel.add(tVec.copy(this.acc).scale(dt/1000));
		this.pos.add(tVec.copy(this.vel).scale(dt/1000));
		this.acc.clear();

		if(this.pos.x > size)
			this.pos.x -= size;
		if(this.pos.x < 0)
			this.pos.x += size;
		if(this.pos.y > size)
			this.pos.y -= size;
		if(this.pos.y < 0)
			this.pos.y += size;

		switch(this.type) {
			case 'player':
				this.firingTime -= dt;
			break;
			case 'bullet':
				this.life -= dt;
			break;
		};
	};
	render(ctx) {
		ctx.save();
		
		ctx.translate(this.pos.x,this.pos.y);
		ctx.rotate(this.dir);
		
		switch(this.type) {
			case 'player':
				ctx.fillStyle = 'white';
				ctx.translate(-this.w/2,-this.h/2);
				ctx.beginPath();
				ctx.moveTo(0,          0.2*this.h);
				ctx.lineTo(1*this.w,   0.5*this.h);
				ctx.lineTo(0,          0.8*this.h);
				ctx.lineTo(0.2*this.w, 0.5*this.h);
				ctx.fill();
			break;
			case 'bullet':
				ctx.fillStyle = 'red';
				fillCircle(ctx,0,0,this.w/2);
			break;
			case 'asteroid':
				ctx.fillStyle = 'grey';
				fillCircle(ctx,0,0,this.w/2);
			break;
		}
		ctx.restore()
	};

};

const title = 'Asteroids',
	size = 400,
	deltaTime = 1000/60,
	bulletSpeed = 800,
	asteroidSpeed = 512,
	PI = Math.PI;

let tVec = new Vec(),
	objID = 0,
	_cnv,
	_obj,
	_act,
	_i, _j,
	_dir,
	Canvas = (w=innerWidth,h=innerHeight) => {
		_cnv = document.createElement('canvas');
		_cnv.ctx = _cnv.getContext('2d');
		_cnv.width = w;
		_cnv.height = h;
		return _cnv;
	},
	canvas = Canvas(),
	fillCircle = (ctx,x,y,r) => {
		ctx.beginPath();
		ctx.arc(x,y,r,PI*2,false);
		ctx.fill();
	},
	randomDir = () => Math.random() * PI*2,

	keys = {},
	keyHandler = e => {
		e.preventDefault();
		switch(e.type) {
			case 'keydown':
				keys[e.keyCode] = true;
			break;
			case 'keyup':
				delete keys[e.keyCode];
				if(!running)
					startGame();
			break;
		}
	},
	checkControls = dt => {
		if(keys[37])
			player.dir -= player.turnSpeed * dt/1000;
		else if(keys[39])
			player.dir += player.turnSpeed * dt/1000;

		if(keys[38])
			player.acc.vFrD(player.dir).scale(player.accSpeed);

		if(keys[32])
			fireBullet();

	},

	level = 0,
	running = false,
	gameOver = true,
	startTimer = 0,
	elapsedTime = 0,
	lastTime = 0,
	tick = timeStamp => {
		if(running)
			requestAnimationFrame(tick);

		elapsedTime += timeStamp - lastTime;
		lastTime = timeStamp;
		while(elapsedTime > deltaTime) {
			update(deltaTime);
			elapsedTime -= deltaTime;
		}
		if(gameOver)
			endGame();
		render(canvas.ctx);
	},
	update = dt => {
		checkControls(dt);
		player.update(dt);
		for(_i in bullets) {
			_obj = bullets[_i];
			_obj.update(dt);
			if(_obj.life <= 0)
				delete bullets[_obj.id];
		};
		for(_i in asteroids)
			asteroids[_i].update(dt);

		checkCollisions();

		if(Object.keys(asteroids).length === 0) {
			level++;
			startLevel();
		}
	},
	render = ctx => {
		ctx.fillStyle = 'cornflowerblue';
		ctx.fillRect(0,0,innerWidth,innerHeight);
		
		if(running) {
			ctx.fillStyle = 'black';
			ctx.save();
			ctx.translate(stage.pos.x,stage.pos.y);
			ctx.beginPath();
			ctx.rect(0,0,size,size);
			ctx.fill();
			ctx.clip();
			player.render(ctx);
			for(_i in bullets)
				bullets[_i].render(ctx);
			for(_i in asteroids)
				asteroids[_i].render(ctx);
			ctx.restore();
		} else {
			ctx.font = '80px futura';
			ctx.fillStyle = 'black';
			ctx.fillText(title,
				innerWidth/2 - ctx.measureText(title).width/2,
				200);
			ctx.font = '20px futura';
			ctx.fillText('press any key to start',innerWidth/2 - ctx.measureText(title).width/2,
				220)
		}
	},
	fireBullet = () => {
		if(player.firingTime > 0)
			return;
		player.firingTime = player.firingSpeed;

		_obj = new Actor({
			type: 'bullet',
			w: 8,
			h: 8
		});
		_obj.pos.copy(player.pos);
		_obj.vel.vFrD(player.dir).scale(bulletSpeed)
									.add(player.vel);
		bullets[_obj.id] = _obj;
	},
	breakAsteroid = ast => {
		if(ast.w >= 16) {
			spawnAsteroids(Math.floor(Math.random()*2)+2,
							ast,
							ast.w/2,
							ast.w/2);
		}
		delete asteroids[ast.id];
	},
	spawnAsteroids = (num,obj,w,dist) => {
		_dir = randomDir();
		_j = PI*2 / num;
		for(_i=0; _i<num; _i++) {
			_act = spawnAsteroid({
				w: w,
				h: w
			});
			_act.pos.copy(obj.pos)
					.add(tVec.vFrD(_dir+_i*_j)
						.scale(dist));

			_act.vel.vFrD(randomDir())
					.scale(asteroidSpeed/w)
					.add(obj.vel);	
		}
		
	},
	spawnAsteroid = o => {
		_obj = new Actor({
			type: 'asteroid',
			x: o.x,
			y: o.y,
			w: o.w,
			h: o.h
		});
		asteroids[_obj.id] = _obj;
		return _obj;
	},
	checkCollisions = () => {
		for(_i in asteroids) {
			_obj = asteroids[_i];
			for(_j in bullets) {
				_act = bullets[_j];
				if(collision(_obj,_act)) {
					delete bullets[_act.id];
					breakAsteroid(_obj);
				};
			}
			if(collision(_obj,player))
				gameOver = true;
		}
	},
	halfWidths = 0,
	collision = (o1,o2) => {
		halfWidths = o1.w/2 + o2.w/2;
		tVec.copy(o2.pos).sub(o1.pos).mag();
		if(tVec.m < halfWidths)
			return true;
		return false;
	},

	startLevel = () => {
		player.pos.x = size/2;
		player.pos.y = size/2;
		player.vel.clear();
		spawnAsteroids(level*2+1, player, 64, 128);
	},
	startGame = () => {
		if(Date.now() < startTime + 1000)
			return;
		running = true;
		gameOver = false;
		level = 0;
		startLevel(level);
		tick(deltaTime);
	},
	endGame = () => {
		startTime = Date.now();
		running = false;
		bullets = {};
		asteroids = {};
	},


	stage = new Actor({
		x: canvas.width/2 - size/2,
		y: canvas.height/2 - size/2,
		w: size,
		h: size
	}),
	player = new Actor({
		type: 'player',
		x: size/2,
		y: size/2
	}),
	bullets = {},
	asteroids = {};

document.body.appendChild(canvas);
addEventListener('keydown',keyHandler,{passive:false});
addEventListener('keyup',keyHandler,{passive:false});

tick(deltaTime);










