<!DOCTYPE HTML>

<head>
<title>Indie Dev Tools</title>
</head>

<body style="margin: 0px">

<script>
	function createCanvas(width = 400, height = 400) {

		let canvas = document.createElement('canvas'),
			context = canvas.getContext('2d');

		canvas.context = context;

		canvas.width = width;
		canvas.height = height;

		return canvas;
	}

	let canvas = createCanvas(window.innerWidth,window.innerHeight),
		context = canvas.context;

	document.body.appendChild(canvas);
	
	//  SET UP CONTEXT
	context.fillStyle = "orange";
	context.strokeStyle = "green";
	context.lineWidth = 6;

	//  CREATE A RECTANGULAR PATH
	context.beginPath();
	context.rect(50,50,600,400);
	context.fill();
	context.stroke();

	//  FILL RECT
	context.fillStyle = "cornflowerblue";
	context.fillRect(150,150,600,400);

	//  STROKE RECT
	context.strokeStyle = "purple";
	context.strokeRect(250,250,600,400);

	//  CLEAR RECT
	context.clearRect(350,0,200,800);

	// context.strokeStyle = "red";
	// drawPoint(50,50);
	// context.beginPath();
	// context.moveTo(50,465);
	// context.lineTo(50,475);
	// context.lineTo(650,475);
	// context.lineTo(650,465);
	// context.stroke();

	// context.beginPath();
	// context.moveTo(665,50);
	// context.lineTo(675,50);
	// context.lineTo(675,450);
	// context.lineTo(665,450);
	// context.stroke();

	</script>

</body>
</html> 
