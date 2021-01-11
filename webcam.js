let video;
let poses = [];
let y = 0;
let _count;
let _aryObject = [];
let _objNum;
let _colH;


function setup() {
  c= createCanvas(1280, 900, WEBGL);
  c.position(0,0);
  video = createCapture(VIDEO);
  video.size(width, height);

  poseNet = ml5.poseNet(video, modelReady);

  // with an array every time new poses are detected
  poseNet.on('pose', function(results) {
    poses = results;
  });



  frameRate(30);
  noStroke();
  colorMode(HSB, 255, 70, 70, 255);
  ambientMaterial(50);
  let maxWidth = width/1;
  _count = random(1000);
  _objNum = 32;
  let max_r = width/15;
  let max_h = width/19;
  let max_tube_r = width/12;
  for (let i = 0; i < _objNum; i++) { //x, y, z, tiltX, tiltY, tiltZ, objectType, width, height, tube_r
    let objType = random(["sphere", "cylinder", "cone", "torus"]);
    _aryObject[i] = [
      random(-maxWidth, maxWidth), random(-maxWidth, maxWidth), random(-maxWidth, maxWidth),
      random(2*PI), random(2*PI), random(2*PI),
      objType,
      random(max_r/5, max_r), random(max_h/5, max_h), random(max_tube_r/5, max_tube_r)
    ];
  }
  _colH = random(360);



  // video.hide();
}

function draw() {

  image(video, 0, 0, width, height);
  background('rgba(0,0,0, 0.25)');

  drawThis();

}

function drawThis() {

  // check the people on the screen
  for (let i = 0; i < poses.length; i++) {


      // (keypoint[숫자]에 들어갈 각 신체지점 숫자: https://github.com/pyeseul/your-workout-buddy/blob/master/keypoints_indexid.png)

      let noseX = poses[i].pose.keypoints[4].position.x;
      let noseY = poses[i].pose.keypoints[4].position.y;

  ambientMaterial(100);
  directionalLight(_colH, 100, 100, -7, -3, -7);
  directionalLight((_colH+180)%360, 100, 100, 2, -1, -2);
  ortho(-width/2, width/2, -width/2, width/2, 0, width*2);

  push();
  rotateX(noseX/30);
  rotateY(noseY/100);
  rotateZ(_count/50);
  for (let i = 0; i < _objNum; i++) {
    push();
    translate(_aryObject[i][0], _aryObject[i][0], _aryObject[i][2]);
    rotateX(_aryObject[i][3]);
    rotateY(_aryObject[i][4]);
    rotateZ(_aryObject[i][5]);
    let type = _aryObject[i][6];
    let r = _aryObject[i][7];
    let h = _aryObject[i][8];
    let tube_r = _aryObject[i][9];
    if (type == "sphere") {
      sphere(r, 128, 128);
    } else if (type == "box") {
      sphere(r, h, 128);
    } else if (type == "cylinder") {
      cylinder(r, h, 128);
    } else if (type == "cone") {
      cone(r, h, 128);
    } else if (type == "torus") {
      torus(r, tube_r, 128, 128);
    }

    pop();
  }
  pop();

  _count++;
}

  //*if (y < 30) {
 // y= y+0.8;
 // }
 // else{ y = 0;}

  //fill(random(255), random(255), random(255));


 // ellipse(eyeX, eyeY, 20, 20);
 // ellipse(eyeX, eyeY, 20, 20);






}
function modelReady() {
  console.log('model loaded!');
}

function mouseReleased() {
  _aryObject = [];
  _count = random(1000);
  let maxWidth = width/1;
  _objNum = 32;
  let max_r = width/12;
  let max_h = width/19;
  let max_tube_r = width/12;
  for (let i = 0; i < _objNum; i++) { //x, y, z, tiltX, tiltY, tiltZ, objectType, width, height, tube_r
    let objType = random(["sphere", "cylinder", "cone", "torus"]);
    _aryObject[i] = [
      random(-maxWidth, maxWidth), random(-maxWidth, maxWidth), random(-maxWidth, maxWidth),
      random(2*PI), random(2*PI), random(2*PI),
      objType,
      random(max_r/10, max_r), random(max_h/10, max_h), random(max_tube_r/10, max_tube_r)
    ];
  }
  _colH = random(360);
}
