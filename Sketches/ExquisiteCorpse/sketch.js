let isPlaying = false;
let song;

function setup() {
  song = createAudio('Teddybears - Punkrocker.mp3');
  
  let canvas = createCanvas(400, 600);
  canvas.parent("sketch-container");
  background(220);
  stroke(0);
  strokeWeight(1);
  line(0,200,400,200);
  line(0,400,400,400);
}

function draw() {
  drawCanvas();
  translate(0,abs(sin(frameCount*0.03))*8);
  head();
  torso();
  legs();
  if(isPlaying) musicNotes();
  console.log(mouseX + " " + mouseY);
}

//Head from me
function head(){
  //neck
  noStroke();
  beginShape();
  fill(1,35,62);
  vertex(180,200);
  bezierVertex(180,195,180,195,175,185);
  vertex(225,185);
  bezierVertex(220,195,220,195,220,200);
  endShape();
  
  //head shape
  beginShape();
  fill(1, 35, 80);
  vertex(175,190);
  bezierVertex(150,150,130,100,130,80);
  vertex(130,80);
  bezierVertex(140,-20,230,0,270,70);
  vertex(270,70);
  bezierVertex(275,120,270,150,260,190);
  vertex(260,190);
  bezierVertex(240,195,240,195,220,185);
  vertex(220,185);
  bezierVertex(210,190,210,195,200,195);
  endShape();
  
  //Head Cone
  headCone();
  
  //facial features
  face();
}

//Torso from Anna
function torso(){
  wings();
  //body
  beginShape();
  fill(53,80,62);
  vertex(180,200);
  bezierVertex(180,200,180,230,160,240);
  vertex(160,240);
  bezierVertex(150,300,130,350,100,400);
  vertex(320,400);
  bezierVertex(270,350,270,300,240,240);
  vertex(240,240);
  bezierVertex(220,230,220,200,220,200);
  endShape();
  
  arms();
  //body details
  drawAbs();
}

//Made by ChatGPT
function drawAbs() {
  stroke(53,80,53);
  strokeWeight(1.5);
  noFill();

  beginShape();
  vertex(200, 200);
  bezierVertex(200, 230, 200, 260, 200, 290);
  bezierVertex(200, 310, 200, 340, 200, 360);
  endShape();
  beginShape();
  vertex(170, 230);
  bezierVertex(185, 225, 215, 225, 230, 230);
  endShape();
  beginShape();
  vertex(165, 260);
  bezierVertex(185, 255, 215, 255, 235, 260);
  endShape();
  beginShape();
  vertex(160, 290);
  bezierVertex(185, 285, 215, 285, 240, 290);
  endShape();
}



//Legs from Zainab
function legs(){
  colorMode(HSB);
  fill(215,62,53);
  //leftLeg
  beginShape();
  vertex(160,420);
  vertex(270,500);
  vertex(270,530);
  vertex(285,540);
  vertex(282,550);
  vertex(260,540);
  vertex(258,510);
  vertex(140,420);
  endShape();
  
  
  fill(215,68,66);
  //rightLeg
  beginShape();
  vertex(260,420);
  vertex(200,470);
  vertex(195,505);
  vertex(180,530);
  vertex(190,540);
  vertex(210,510);
  vertex(214,480);
  vertex(280,420);
  endShape();
  
  //cassette
  noStroke();
  fill(315,79,86);
  quad(155,505,215,565,185,595,125,525);
  fill(255);
  quad(155,520,200,565,185,580,140,532);
  fill(0);
  triangle(165,535,155,545,170,555);
  
  //chili pepper
  beginShape();
  fill(13,100,80);
  vertex(280,550);
  bezierVertex(300,565,300,590,370,580);
  vertex(370,580);
  bezierVertex(300,560,290,520,280,550);
  endShape();
  
  beginShape();
  fill(103,100,53);
  vertex(285,545);
  bezierVertex(275,530,270,535,260,540);
  endShape();
  
  //plate
  beginShape();
  stroke(1);
  fill(206,80,53);
  vertex(100,400);
  bezierVertex(173,445,246,445,320,400);
  endShape();
}

//Head Cone
function headCone(){
  beginShape();
  fill(1,35,76);
  stroke(1);
  vertex(146,74);
  bezierVertex(120,90,80,90,53,51);
  vertex(53,51);
  bezierVertex(10,90,10,130,62,164);
  vertex(62,164);
  bezierVertex(90,145,120,140,156,156);
  vertex(156,156);
  bezierVertex(160,120,160,100,146,74);
  endShape();
  
  beginShape();
  fill(1,35,69);
  vertex(47,57);
  bezierVertex(80,100,80,130,62,164);
  endShape();
  
  //bulb
  fill(43,44,70);
  noStroke();
  circle(164,52,20);
}

//Face Features
function face(){
  //eyes
  push();
  if(isPlaying)translate(random(-2,2), random(-1,1))
  eyes();
  
  //nose creases
  stroke(245, 17, 28);
  noFill();
  beginShape();
  vertex(170,77);
  bezierVertex(209,68,220,84,217,94);
  vertex(217,94);
  bezierVertex(210,100,200,120,210,128);
  endShape();
  beginShape();
  vertex(256,70);
  bezierVertex(236,70,239,72,225,86);
  vertex(225,86);
  bezierVertex(220,100,246,110,239,126);
  endShape();
  
  //dimples
  bezier(205,108,150,130,210,150,180,190);
  bezier(238,107,280,120,242,150,263,178);
  curve(211,143,196,145,196,154,218,156);
  
  if(!isPlaying){
    curve(202,182,200,152,243,150,244,180);
    curve(220,150,209,145,209,152,220,160);
    curve(230,150,219,145,219,152,230,160);
    curve(240,150,229,145,229,152,240,160);
    curve(250,150,239,145,239,152,250,160);
  }
  else{
    fill(228,20,10);
    beginShape();
    vertex(213,141);
    bezierVertex(200,148,200,156,211,166);
    vertex(211,166);
    bezierVertex(220,170,230,170,241,164);
    vertex(241,164);
    bezierVertex(250,156,250,148,237,140);
    vertex(237,140);
    bezierVertex(230,138,220,138,213,141);
    endShape();
  }
  pop();
}

function eyes(){
  //left eye
  beginShape();
  noStroke();
  fill(53,14,100);
  vertex(208,97);
  bezierVertex(185,60,180,110,169,105);
  vertex(169,105);
  bezierVertex(175,100,190,130,208,97);
  endShape();
  //left pupil
  beginShape();
  fill(346,14,62);
  vertex(181,93);
  bezierVertex(180,97,170,106,169,105);
  vertex(169,105);
  bezierVertex(175,102,190,121,191,110);
  vertex(191,110);  
  bezierVertex(195,105,195,95,181,93);
  endShape();
  beginShape();
  fill(228,14,12);
  vertex(177,99);
  bezierVertex(175,108,170,101,169,105);
  vertex(169,105);
  bezierVertex(172,106,175,108,179,110);
  vertex(179,110);
  bezierVertex(187,109,186,101,177,99);
  endShape();
  
  //right eye
  beginShape();
  fill(53,14,100);
  vertex(229,92);
  bezierVertex(240,80,250,80,260,97);
  vertex(260,97);
  bezierVertex(250,110,240,110,229,92);
  endShape();
  //right pupil
  beginShape();
  fill(346,14,62)
  vertex(229,92);
  bezierVertex(230,100,240,109,241,104);
  vertex(241,104);
  bezierVertex(245,95,245,90,235,86);
  vertex(235,86);
  bezierVertex(232,88,232,88,229,92);
  endShape();
  beginShape();
  fill(228,14,12);
  vertex(229,92);
  bezierVertex(231,95,233,98,235,100);
  vertex(235,100);
  bezierVertex(240,96,238,92,233,87);
  endShape();
}

//Wings from Anna
function wings(){
  //back Wings (bat)
  fill(20,80,26);
  beginShape();
  vertex(200,240);
  bezierVertex(190,260,180,260,150,215);
  vertex(145,210);
  bezierVertex(100,220,70,220,40,280);
  vertex(40,280);
  bezierVertex(60,270,70,270,90,300);
  vertex(90,300);
  bezierVertex(130,280,150,280,170,320);
  vertex(170,320);
  bezierVertex(190,300,210,300,230,320);
  vertex(230,320);
  bezierVertex(250,280,270,280,310,300);
  vertex(310,300);
  bezierVertex(330,260,340,260,360,280);
  vertex(360,280);
  bezierVertex(330,220,300,220,255,210);
  vertex(250,215);
  bezierVertex(220,260,210,260,200,240);
  endShape();
  
  //front Wings (hawk)
  beginShape();
  fill(30,80,53);
  vertex(200,240);
  bezierVertex(170,240,160,240,120,210);
  vertex(120,210);
  bezierVertex(90,210,70,230,40,360);
  vertex(40,360);
  bezierVertex(80,330,90,320,130,290);
  vertex(130,290);
  bezierVertex(170,300,180,300,200,330);
  vertex(200,330);
  bezierVertex(220,300,230,300,270,290);
  vertex(270,290);
  bezierVertex(310,320,320,330,360,360);
  vertex(360,360);
  bezierVertex(330,230,310,210,280,210);
  vertex(280,210);
  bezierVertex(240,240,230,240,200,240);
  endShape();
  
  //shading
  beginShape();
  fill(30,80,44);
  vertex(200,270);
  bezierVertex(170,240,160,240,120,260);
  vertex(120,260);
  vertex(40,360);
  bezierVertex(80,330,90,320,130,290);
  vertex(130,290);
  bezierVertex(170,300,180,300,200,330);
  vertex(200,330);
  bezierVertex(220,300,230,300,270,290);
  vertex(270,290);
  bezierVertex(310,320,320,330,360,360);
  vertex(360,360);
  vertex(280,260);
  bezierVertex(240,240,230,240,200,270);
  endShape();
  
}

//Arms from Anna
function arms(){
  //top left
  beginShape();
  vertex(146,310);
  bezierVertex(110,320,90,330,77,310);
  vertex(77,310);
  bezierVertex(60,280,60,260,71,238);
  vertex(82,238);
  bezierVertex(80,258,80,278,93,293);
  vertex(93,293);
  bezierVertex(110,300,130,295,149,290)
  endShape();

  //top right
  beginShape();
  vertex(267,310);
  bezierVertex(290,320,300,330,343,310);
  vertex(343,310);
  bezierVertex(350,280,350,260,337,238);
  vertex(324,238);
  bezierVertex(330,258,330,278,326,293);
  vertex(326,293);
  bezierVertex(290,300,270,295,259,290)
  endShape();
  
  //lower left
  beginShape();
  vertex(138,322);
  bezierVertex(110,335,90,340,77,339);
  vertex(77,339);
  bezierVertex(60,330,40,320,29,316);
  vertex(22,328);
  bezierVertex(40,350,70,350,71,350);
  vertex(71,350);
  bezierVertex(90,360,110,355,134,341);
  endShape();
  
  //lower right
  beginShape();
  vertex(270,322);
  bezierVertex(310,335,300,340,337,339);
  vertex(337,339);
  bezierVertex(340,330,360,320,371,316);
  vertex(378,328);
  bezierVertex(360,350,330,350,329,350);
  vertex(329,350);
  bezierVertex(310,360,290,355,266,341);
  endShape();
  
  //chatGPT made
  drawHand(71, 238, 1);
  drawHand(337, 238, -1);
  drawHand(22, 328, 1);
  drawHand(378, 328, -1);
}

//Made with ChatGPT
function drawHand(x, y, flip = 1) {
  push();
  if(isPlaying) translate(random(-5,5),0);
  beginShape();
  vertex(x, y);
  bezierVertex(x + 6 * flip, y - 13, x + 10 * flip, y - 13, x + 12 * flip, y - 8);
  bezierVertex(x + 15 * flip, y - 15, x + 10 * flip, y - 18, x + 8 * flip, y - 10);
  bezierVertex(x + 10 * flip, y - 18, x + 5 * flip, y - 20, x + 3 * flip, y - 12);
  bezierVertex(x + 5 * flip, y - 20, x, y - 21, x, y - 12);
  bezierVertex(x - 2 * flip, y - 15, x - 4 * flip, y - 10, x, y);
  endShape(CLOSE);
  pop();
}


//Cassette functionality
function mousePressed(){
  if((mouseX >= 160 && mouseX <= 200) && (mouseY >= 525 && mouseY <= 540)){
    if(!isPlaying){
      console.log("Now Playing: 'Punkrocker' by Teddybears and Iggy Pop");
      isPlaying = true;
      song.play();
    }
    else{
      isPlaying = false;
      song.pause();
    }
  }
}

//Music Notes
function musicNotes(){
  let speed = frameCount%10
  let randX = random(10,53);
  let randY = random(60,150);
    if(speed == 0){
      stroke(0);
      strokeWeight(2);
      circle(randX,randY, 6);
      line(randX+2,randY,randX+2,randY-20);
      line(randX+2,randY-20,randX+22,randY-20);
      line(randX+22,randY-20,randX+22,randY);
      circle(randX+20,randY,6);
    }
}

//Draw canvas lines
function drawCanvas(){
  background(53);
  
  stroke(0);
  strokeWeight(1);
  //line(0,200,400,200);
  //line(0,400,400,400);
}

/*
function torso(){
  //plate
  beginShape();
  vertex(100,200);
  bezierVertex(180,210,240,210,300,200);
  endShape();
  
  //hole
  ellipse(200,250,220,85);
  fill(255,0,0);
  //branches
  beginShape();
  vertex(170,290);
  bezierVertex(180,320,180,350,170,400);
  vertex(290,400);
  vertex(291,390);
  vertex(305,370);
  bezierVertex(310,350,310,330,280,280);
  vertex(280,280);
  bezierVertex(280,284,220,295,170,290);
  endShape();
  
  //gap
  fill(225);
  beginShape();
  vertex(200,292);
  bezierVertex(195,320,195,350,200,365);
  vertex(200,365);
  bezierVertex(230,375,260,375,270,370);
  vertex(270,370);
  bezierVertex(275,350,275,340,270,330);
  vertex(271,310);
  endShape();
}

function legs(){
  //rattle
  beginShape();
  vertex(50,490);
  bezierVertex(60,410,70,410,90,485);
  //vertex(50,450);
  //bezierVertex(70,490,85,490,90,450);
  endShape();
  
  //snake tail
  noFill();
  beginShape();
  vertex(50,490);
  bezierVertex(180,660,300,520,330,515);
  endShape();
}
*/