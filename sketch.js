




let img;
let vecTL, vecTR, vecBL, vecBR;
let size;
let val2 = 2;
let capture;
var video;

let propNumb,propNumb2;

function preload(){
	// img = loadImage(myDat);

  // img = myDat;
  // img = createCapture(VIDEO);
  // img.hide()
  song = loadSound('szymon.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
	stack_video = createVideo(['thestack.mp4']);
  stack_video.hide();



  // song.loop();

  // create a new Amplitude analyzer
  analyzer = new p5.Amplitude();

  // Patch the input to an volume analyzer
  analyzer.setInput(song);


  //size = min(height, width) * 0.4;

  // vecTL = createPoint(-size, -size);//TOP LEFT
  // vecTR = createPoint(size, -size);//TOP RIGHT
  // vecBR = createPoint(size, size);//BOTTOM LEFT
  // vecBL = createPoint(-size, size);//BOTTOM RIGHT

  capture = createCapture(VIDEO);
  capture.hide();
	stack_video.loop();

  // capture.size(320, 240);

// image(capture, 0, 0);



}

function createPoint(x, y){
	let vec = createVector(x, y);
	// addDrag(vec);
	return vec;
}

function draw() {
  background(255);


  // Get the average (root mean square) amplitude
  let vol = analyzer.getLevel();

  let h = map(vol, 0, 0.05, 400, 0);
  let val = h + val2
  let height = 400



  // image(canvasToImage(), 0, 0);

  texture(stack_video);
  textureMode(NORMAL);

  beginShape(TRIANGLE_STRIP);

  vertex(-width, 400,0,1*propNumb2);
  //left top
  vertex(-width, -400, 0,0);

  vertex(-400, h ,0.1,1*propNumb2);
  vertex(-400, -h, 0.1,0*propNumb2);
  vertex(-400, h,0.1,1*propNumb2);
  vertex(-400, -h, 0.1,0);

//     //left bottom
//     vertex(-400, 400,0,1);
//     //left top
//     vertex(-400, -400, 0,0);

  vertex(-350, h ,0.2,1);
  vertex(-350, -h, 0.2,0*propNumb2);
  vertex(-350, h,0.2,1);
  vertex(-350, -h, 0.2,0*propNumb2);

  vertex(-300, height ,0.3,1*propNumb2);
  vertex(-300, -height, 0.3,0*propNumb2);
  vertex(-300*propNumb, height,0.3,1);
  vertex(-300*propNumb, -height, 0.3,0*propNumb2);

  vertex(-200*propNumb, h ,0.4,1*propNumb2);
  vertex(-200*propNumb, -h, 0.4,0*propNumb2);
  vertex(-200*propNumb, h,0.4,1*propNumb2);
  vertex(-200*propNumb, -h, 0.4,0);

  vertex(-100*propNumb, height ,0.5,1);
  vertex(-100*propNumb, -height, 0.5,0);
  vertex(-100*propNumb, height,0.5,1);
  vertex(-100*propNumb, -height, 0.5,0);

  vertex(250*propNumb, h,0.6,1*propNumb2);
  vertex(250*propNumb, -h, 0.6,0);
  vertex(250, h, 0.6,1*propNumb2);
  vertex(250, -h,0.6,0*propNumb2);

  vertex(300, height,0.7,1*propNumb2);
  vertex(300, -height, 0.7,0*propNumb2);
  vertex(300, height, 0.7,1*propNumb2);
  vertex(300, -height,0.7,0);

  vertex(360, h, 0.8,1);
  vertex(360, -h,0.8,0);
  vertex(360, h, 0.8,1*propNumb2);
  vertex(360, -h,0.8,0*propNumb2);

  vertex(480, height, 0.9,1*propNumb2);
  vertex(480, -height,0.9,0*propNumb2);
  vertex(480, height, 0.9,1);
  vertex(480, -height,0.9,0*propNumb2);

  //right bottom
  vertex(width, height,1,1);
  //right top
  vertex(width, -height,1,0);
  endShape();



  // drawDrag();

}

let counter =0;
let pos5 = 0;
let pos6 = 0;
document.body.addEventListener('mousemove', e => {


	if (counter == 0) {
		song.loop()
		counter++;
	}

	e = e || window.event;
	e.preventDefault();
	pos5 = e.clientX;
	pos6 = e.clientX;


	propNumb2 = map(pos6, 0, document.body.clientHeight , 0, 1);

	propNumb = map(pos5, 0, document.body.clientWidth , 0.5, 1);

});

// document.body
// function mousePressed() {

//   dragMousePressed();
// }

// function mouseReleased() {
//   dragMouseReleased();
// }

// function mouseDragged() {
//   val2 ++ ;
//   dragMouseDragged();
// }
