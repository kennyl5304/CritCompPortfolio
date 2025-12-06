//face and eyebrow variables
let faceColor = [30, 100, 100];
let eyebrowStroke = 1;
let faceDiam = [200, 200];
//eye + pupil variables
let eyePos = [150, 175, 50, 30]; //[0] = height, scale x&y
let pupilWidth = [20, 30];
let pupilRatio = 2;
//mouth variables
let mouthPos = [200, 250];
let mouthScale = [100, 50];
let teethScale = [
  [200, 225, 200, 275],
  [175, 230, 175, 270],
  [225, 230, 225, 270],
  [150, 250, 250, 250],
];

let bgm;

function setup() {
  let canvas = createCanvas(400, 400);
  canvas.parent('sketch-container');
  bgm = createAudio("peakmusic.mp3");
  bgm.play();
  bgm.loop();
  background(220);
  colorMode(HSB);
  fill(faceColor[0], faceColor[1], faceColor[2]);
  ellipse(200, 200, 200, 200);
  console.log('aaaaaa');
}

function draw() {
  //redraw bg + face shape
  drawBg();
  strokeWeight(1);
  colorMode(HSB);
  let faceX = constrain(mouseX, 100, 400);
  let faceY = constrain(mouseY, 100, 400);
  faceDiam = [faceX, faceY];
  drawBody();
  fill(
    faceColor[0],
    constrain(abs(sin(mouseX / 90)) * 150, 50, 100),
    faceColor[2]
  );
  ellipse(200, 200, faceDiam[0], faceDiam[1]);
  colorMode(RGB);

  //draw eyes
  scaleEyes();
  fill(255);
  let eyeHeight = constrain(150 - mouseY, 0, 10);
  let leftEyePosition = eyePositions("left", faceX, faceY);
  let rightEyePosition = eyePositions("right", faceX, faceY);
  ellipse(leftEyePosition[0], leftEyePosition[1], eyePos[2], eyePos[3]);
  ellipse(rightEyePosition[0], rightEyePosition[1], eyePos[2], eyePos[3]);

  //scale mouth
  mouthScale[0] = faceDiam[0] / 2;
  mouthScale[1] = faceDiam[1] / 4;
  teethLineScale();
  //draw mouth
  if (mouseY < 150) {
    let mouthHeight = constrain(150 - mouseY, 0, 30);
    ellipse(200, 250 - mouthHeight, mouthScale[0], mouthScale[1]);
    fill(0);
    line(
      teethScale[0][0],
      teethScale[0][1] - mouthHeight,
      teethScale[0][2],
      teethScale[0][3] - mouthHeight
    );
    line(
      teethScale[1][0],
      teethScale[1][1] - mouthHeight,
      teethScale[1][2],
      teethScale[1][3] - mouthHeight
    );
    line(
      teethScale[2][0],
      teethScale[2][1] - mouthHeight,
      teethScale[2][2],
      teethScale[2][3] - mouthHeight
    );
    line(
      teethScale[3][0],
      teethScale[3][1] - mouthHeight,
      teethScale[3][2],
      teethScale[3][3] - mouthHeight
    );
  } else {
    mouthHeight = mouseY > 250 ? constrain(-1 * (250 - mouseY), 0, 60) : 0;
    ellipse(200, 250 + mouthHeight, mouthScale[0], mouthScale[1]);
    fill(0);
    line(
      teethScale[0][0],
      teethScale[0][1] + mouthHeight,
      teethScale[0][2],
      teethScale[0][3] + mouthHeight
    );
    line(
      teethScale[1][0],
      teethScale[1][1] + mouthHeight,
      teethScale[1][2],
      teethScale[1][3] + mouthHeight
    );
    line(
      teethScale[2][0],
      teethScale[2][1] + mouthHeight,
      teethScale[2][2],
      teethScale[2][3] + mouthHeight
    );
    line(
      teethScale[3][0],
      teethScale[3][1] + mouthHeight,
      teethScale[3][2],
      teethScale[3][3] + mouthHeight
    );
  }

  eyeRand();
  ellipse(leftEyePosition[0], leftEyePosition[1], pupilWidth[0], eyePos[3]);
  ellipse(rightEyePosition[0], rightEyePosition[1], pupilWidth[0], eyePos[3]);

  noFill();
  strokeWeight(eyebrowStroke);
  
  
  doMeEyebrows(faceX, faceY);
}

//draw body
function drawBody(){
  beginShape();
  fill(faceColor[0],constrain(abs(sin(mouseX / 90)) * 150, 50, 100),faceColor[2]);
  vertex(200-faceDiam[0]/4,200+faceDiam[1]/4);
  bezierVertex(200-faceDiam[0]/4,200+faceDiam[1]/4,200,300,200-faceDiam[0]/2,200+faceDiam[1]);
  vertex(200-faceDiam[0]/2,200+faceDiam[1]);
  bezierVertex(200-faceDiam[0]/2,200+faceDiam[1],100,300,200-faceDiam[0],600);
  vertex(200-faceDiam[0],600);
  vertex(200+faceDiam[0],600);
  bezierVertex(200+faceDiam[0],600,300,300,200+faceDiam[0]/2,200+faceDiam[1]);
  vertex(200+faceDiam[0]/2,200+faceDiam[1]);
  bezierVertex(200+faceDiam[0]/2,200+faceDiam[1],200,300,200+faceDiam[0]/4,200+faceDiam[1]/4);
  vertex(200+faceDiam[0]/4,200+faceDiam[1]/4,200-faceDiam[0]/4,200+faceDiam[1]/4);
  endShape();
  strokeWeight(1);
}

//change pupil size
function mousePressed() {
  pupilWidth = [random(10, 30), 30];
  pupilRatio = pupilWidth[0] / 10;

  faceColor = [random(0, 360), random(0, 100), random(25, 100)];
  eyebrowStroke = random(1, 4);
  return false;
}

function doMeEyebrows(faceX, faceY) {
  let leftX = constrain(mouseX, 100, 150);
  let leftY = constrain(mouseX, 150, 180);
  let eyebrowHeight = constrain(150 - mouseY, 0, 20);

  //adjust left eyebrow scale
  let leftPosX = faceX < 150 ? constrain(125 + (140 - faceX), 125, 150) : 125;
  let leftPosXTwo =
    faceX < 150 ? constrain(175 + (195 - faceX), 175, 190) : 175;
  if (faceX > 300)
    (leftPosX -= (faceX - 300) / 2), (leftPosXTwo += (faceX - 300) / 2);

  if (faceY > 300) eyebrowHeight -= (faceY - 300) / 2;
  bezier(
    leftPosX,
    140 + eyebrowHeight,
    leftPosX + 15,
    leftX + eyebrowHeight,
    leftPosX + 25,
    300 - leftY + eyebrowHeight,
    leftPosX + 45,
    150 + eyebrowHeight
  );

  let rightX = constrain(abs(sin(mouseX / 90)) * 140, 120, 140);
  let rightY = constrain(abs(sin(mouseX / 90)) * 140, 120, 140);

  //adjust right eyebrow scale
  let rightPosX =
    faceX < 150 || faceX > 250 ? 225 - constrain(150 - faceX, 0, 20) : 225;
  if (faceX > 300) rightPosX += (faceX - 300) / 2;
  bezier(
    rightPosX,
    150 + eyebrowHeight,
    rightPosX + 20,
    rightX + eyebrowHeight,
    rightPosX + 30,
    rightY + eyebrowHeight,
    rightPosX + 45,
    150 + eyebrowHeight
  );
}

//scales width/height of eyes
function scaleEyes() {
  let eyeWidth = mouseX < 150 ? constrain(mouseX / 3, 30, 50) : 50;
  eyePos[2] = eyeWidth;
  eyePos[3] = eyeWidth - 20;

  //scale pupils to eyes
  pupilWidth[0] = (pupilRatio * eyePos[2]) / 5;
}

function eyePositions(eye, faceX, faceY) {
  let eyePosition = [0, 0];
  let eyeHeight = constrain(150 - mouseY, 0, 10);
  if (eye === "left") {
    eyePosition[0] =
      faceX < 150 ? constrain(150 + (150 - faceX), 150, 170) : 150;
    eyePosition[1] = eyePos[1] + eyeHeight;
    if (faceX > 300) {
      eyePosition[0] -= (faceX - 300) / 2;
    }
    if (faceY > 300) {
      eyePosition[1] -= (faceY - 300) / 2;
    }
  } else {
    eyePosition[0] = faceX < 150 ? 250 - constrain(150 - faceX, 0, 20) : 250;
    eyePosition[1] = eyePos[1] + eyeHeight;
    if (faceX > 300) {
      eyePosition[0] += (faceX - 300) / 2;
    }
    if (faceY > 300) {
      eyePosition[1] -= (faceY - 300) / 2;
    }
  }
  return eyePosition;
}

//randomizes eye color to mouse position
function eyeRand() {
  colorMode(HSB);
  fill(mouseX, mouseY, 60);
  colorMode(RGB);
}

//scales lines on teeth
function teethLineScale() {
  teethScale[0] = [
    mouthPos[0],
    mouthPos[1] - mouthScale[1] / 2,
    mouthPos[0],
    mouthPos[1] + mouthScale[1] / 2,
  ];
  teethScale[1] = [
    mouthPos[0] - mouthScale[0] / 4,
    mouthPos[1] - mouthScale[1] / 2 + mouthScale[1] / 15,
    mouthPos[0] - mouthScale[0] / 4,
    mouthPos[1] + mouthScale[1] / 2 - mouthScale[1] / 15,
  ];
  teethScale[2] = [
    mouthPos[0] + mouthScale[0] / 4,
    mouthPos[1] - mouthScale[1] / 2 + mouthScale[1] / 15,
    mouthPos[0] + mouthScale[0] / 4,
    mouthPos[1] + mouthScale[1] / 2 - mouthScale[1] / 15,
  ];
  teethScale[3] = [
    mouthPos[0] - mouthScale[0] / 2,
    mouthPos[1],
    mouthPos[0] + mouthScale[0] / 2,
    mouthPos[1],
  ];
}

//changes face color with key press
function keyPressed() {
  console.log("Color changing...");
  // if (keyCode === ENTER) {
  //   faceColor = [random(0, 360), random(0, 100), random(25, 100)];
  //   eyebrowStroke = random(1, 4);
  // }
  // return false;
}

function drawBg(){
  background(174, 155, 125);
  stroke(135, 206, 235);
  let noiseLevel = 350;
  let noiseScale = 0.002;

  // Iterate from left to right.
  for (let x = 0; x < width; x += 1) {
    // Scale the input coordinates.
    let nx = noiseScale * x;
    let nt = noiseScale * frameCount;

    // Compute the noise value.
    let y = noiseLevel * noise(nx, nt);

    // Draw the line.
    line(x, 0, x, y);
  }
  stroke(0);
}
