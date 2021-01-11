let video;
let poseNet;
let nose;
let img;
var d = 0;
var e = 1;


function setup() {
  createCanvas(1080, 750);
  video = createCapture(VIDEO);
  video.size(1080, 750);
  video.hide();
  let poseNet = ml5.poseNet(video, modelReady);
  poseNet.on('pose', gotPoses);
  img = loadImage('dog.gif');

}

function gotPoses(poses) {
  if (poses.length > 0) {
    let pose = poses[0].pose;
    nose = pose.keypoints[0].position;
  }
}

function modelReady() {
  console.log('model loaded');
}

function draw() {
    image(video, 0, 0, width, height);
    drawKeypoints();
    drawBlob();
}

function drawBlob(){
    if(nose){
        image(img, nose.x - 950, nose.y-380, nose.x/3,nose.y/2);
        image(img, nose.x - 380, nose.y-380,nose.x/3,nose.y/2);
    }
}

function drawKeypoints()  {
  if (nose) {
var a = mouseX;
  var b = mouseY;
  var c = nose.x-nose.y;
  scale = map(0.01, 0, 0.5, 1.0, 2.0);
  background(0,0,0,0);
  var s = windowHeight/4*scale;
  translate(nose.x, nose.y - 300);
  stroke(a,c,a);
  noFill();
  if (d <= -360 || d >= 360){
      e = e*(-1);
  }
  d = d+e*scale*0.2;
  beginShape();
  for (var t = 0; t <= 360; t += 1) {
    var x = s * (cos(c*radians(t)+radians(d))) * cos(radians(d/360*t));
    var y = s * (sin(c*radians(t)+radians(d))) * cos(radians(d/360*t));
    vertex(x,y);
  }
  endShape();
  }
}
