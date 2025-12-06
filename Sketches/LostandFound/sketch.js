/* 
* Author: Kenny Luong
* Prompt by: Matthew Cassab
*/

let snowHeight = -800;
let snowTime = 0;
function setup() {
  let canvas = createCanvas(1200, 800);
  canvas.parent('sketch-container');
  frameRate(8);
}

function draw() {
  //builds background
  colorMode(HSB);
  background(175,40,90);
  fill(50,32,100);
  noStroke();
  circle(1200,0, 400);
  mountainRange();
  fill(242);
  rect(0,650,1200,150);
  
  //builds cabin base
  colorMode(HSB);
  fill(40,70,40);
  rect(100,500,300,150);
  stroke(40,70,11);
  strokeWeight(0.5);
  line(100,525,400,525);
  line(100,550,400,550);
  line(100,575,400,575);
  line(100,600,400,600);
  line(100,625,400,625);
  
  //furnishes cabin
  cabinDecor();
  
  //builds roof
  colorMode(HSB);
  fill(80,100,20);
  quad(85,500,195,465,305,465,415,500);
  rect(85,500,330,8);
  
  //places trees
  push();
  let treePos = [[40,700],[600,650], [700,770], [1100, 743], [950,610]];
  plantTrees(treePos);
  
  scale(0.5);
  let halfTreePos = [[53,650],[850,852],[1350,600], [2300,1000], [1800,1600]];
  plantTrees(halfTreePos);
  
  scale(0.35);
  let smallTreePos = [[1100,2100],[4800,3000],[6000,2500], [2800,3300], [3000,1800]];
  plantTrees(smallTreePos);
  pop();
  
  //snowfall
  snow();
}

function cabinDecor(){
  //door
  fill(44,70,30);
  rect(167,562,49,87);
  fill(44,70,30);
  rect(170,565,44,85);
  fill(60,60,100);
  circle(206,610,5);
  fill(44,70,25);
  circle(192,584,25);
  
  //window
  fill(255);
  rect(260,560,80,50);
  fill(200,100,40);
  rect(265,565,70,40);
  strokeWeight(4);
  stroke(255);
  line(265,585,335,585);
  line(288,565,288,605);
  line(311,565,311,605);
  path();
  
  //chimney
  strokeWeight(0.5);
  fill(80);
  rect(150,440,10,60);
  rect(147,435,16,5);
  
}

function path() {
  
  //path to cabin
  
  stroke(0);
  strokeWeight(0);
  point(170, 650);
  point(260, 800);
  
  colorMode(RGB);
  stroke(255,0,0);
  strokeWeight(0);
  point(150, 800);
  point(280, 650);
  
  fill(233);
  beginShape();
  stroke(0);
  strokeWeight(0);
  vertex(170,650);
  bezierVertex(190, 800, 200, 650, 260, 800);
  vertex(320,800);
  bezierVertex(280,650,250,800,215,650);
  //bezier(170, 650, 150, 800, 280, 650, 260, 800);
  //bezier(220,650,250,800,280,650,320,800);
  endShape(CLOSE);
}

function pineTree(x, y){
  //stump
  fill(44,70,30);
  rect(x,y,20,40);
  //main tree
  
  strokeWeight(0);
  fill(170,100,50);
  quad(x-40, y, x, y-70, x+20,y-70, x+60, y);
  quad(x-40, y-70, x, y-140, x+20, y-140 , x+60, y-70);
  quad(x-40, y-140 , x+10, y-210, x+10, y-210, x+60, y-140);
  //Snow Coat
  strokeWeight(0.5);
  fill(240);
  quad(x-35, y-5, x+5, y-65, x+15, y-65, x+55, y-5);
  quad(x-35, y-75, x+5, y-135, x+15, y-135, x+55, y-75);
  quad(x-35, y-145, x+10, y-205, x+10, y-205, x+55, y-145);
  /*
  strokeWeight(0);
  fill(170,100,50);
  quad(560,650,600,580,620,580,660,650);
  quad(560,580,600,510,620,510,660,580);
  quad(560,510,610,440,610,440,660,510);
  //Snow Coat
  strokeWeight(0.5);
  fill(240);
  quad(565,645,605,585,615,585,655,645);
  quad(565,575,605,515,615,515,655,575);
  quad(565,505,610,445,610,445,655,505);
  */
  
}

function plantTrees(treePos){
  for(let i = 0; i < treePos.length; i++){
    pineTree(treePos[i][0], treePos[i][1]);
  }
}

//creates a layer of distant snow
function mountainRange(){
  fill(96);
  rect(0,200,1200,1000);
  colorMode(HSB);
  fill(175, 40, 90);
  arc(1200,200,625,450, HALF_PI, PI);
  triangle(0,300,0,0,200,125);
  arc(600,300,400,300,PI+HALF_PI, PI*2-PI/6);
  triangle(545,200,620,290,600,100);
  arc(350,180,350,150,PI/32, PI);
  arc(800,150,400,120,0,PI);
}

function snow(){
  push();
  blendMode(OVERLAY);
  rectMode(CENTER);
  noStroke();
  fill(255);
  
  //controls snowfall
  let y = frameCount * 8;
  if(frameCount > 100) y = constrain(y, 600, 800);
  translate(random(-5,5), y);
  
  //creates snowflakes
  for(let i = 0; i<1700;i++){
    circle(random(width), snowHeight+random(800), random(1,5));
    rotate(PI);
  }
  blendMode(BLEND);
  pop();
}