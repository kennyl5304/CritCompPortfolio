let seconds = 0;
let season = "Summer";
let changing = false;
let tardisOp = 255;

let grassColor = [121,47,48];
let skyColor = [189, 52, 100];
let treeColor = [130, 75, 54];
let tWidth = 0;
let tHeight = 0;
let treePos = [[-50,420],[80,420], [275,420], [500,420], [620,420]];

let rain = [];
let rainTime = 0;
let snowflake = [];
let snowTime = 0;

let opacity = 0;
let sunOp = 0;
let snowpacity = 255;
let rainOp = 255;


function setup() {
  let canvas = createCanvas(600, 600);
  canvas.parent("sketch-container");
  for(let i = 0; i<600; i++){
    rain[i] = new downpour();
  }
  for(let i = 0; i<1000; i++){
    snowflake[i] = new snowfall();
  }
}

function draw() {
  colorMode(HSB);
  noStroke();
  background(skyColor[0], skyColor[1], skyColor[2]);
  fill(grassColor[0], grassColor[1], grassColor[2]);
  rect(0,500,600,100);
  
  plantTree(-50,420);
  plantTree(80,420);
  plantTree(275,420);
  plantTree(500,420);
  plantTree(620,420);
  tardis(season);
  console.log(season);
  
  if(frameCount%1600 <= 400){
    shiftSeason("Summer");
    sunlight();
    tWidth = 100;
    tHeight = 180;
  }
  else if(frameCount%1600 <= 800){
    shiftSeason("Autumn");
    for(let i = 0; i<600;i++){
      rain[i].draw();
      rain[i].pour();
    }
  }
  else if(frameCount%1600 <= 1200){
    shiftSeason("Winter");
    for(let i = 0; i<1000; i++){
      snowflake[i].draw();
      snowflake[i].fall();
    }
    rainOp = 255;
  }
  else{
    if(frameCount%1600 == 1201) {
      tWidth = 0;
      tHeight = 0;
    }
    shiftSeason("Spring");
    snowpacity = 255;
    tardis(season);
    for(let i = 0; i<600; i++){
      rain[i] = new downpour();
    }
  }
}

function plantTree(x,y){
  
  fill(44,70,30);
  rect(x,y,30,80);
  strokeWeight(10);
  stroke(44,70,30);
  line(x+10,y+1,x-15,y-50);
  line(x+4,y+1,x-15,y-50);
  line(x-15,y-50,x-30,y-60);
  line(x-15,y-50,x,y-80);
  line(x-3,y-72,x-15,y-85);
  
  line(x+25,y+1,x+35,y-50);
  line(x+20,y+1,x+32,y-50);
  line(x+35,y-50,x+45,y-70);
  line(x+35,y-50,x+20,y-75);
  fill(treeColor[0], treeColor[1], treeColor[2]);
  noStroke();
  if(season != "Winter" && season != "Spring")ellipse(x+15,y-80,100,180);
  strokeWeight(1);
}

function shiftSeason(nextSeason){
  season = nextSeason;
  shiftGrass(season);
  shiftSky(season);
  if(season == "Winter"){
    fallingLeaves();
  }
  else if (season == "Spring"){
    growingLeaves();
  }
  else{
    shiftTrees(season);
  }
}

//gradually shift tree colors
function shiftTrees(season){
  let targetNums = [];

  if(season === "Autumn"){
    targetNums = [31,71,46];
  }
  else if(season === "Winter"){
    targetNums = [130, 8, 90];
  }
  else if(season === "Spring"){
    targetNums = [130, 71, 46];
  }
  else{
    targetNums = [130, 75, 54];
  }
  
  if(treeColor[0] != targetNums[0]) treeColor[0] = treeColor[0]<targetNums[0] ? treeColor[0]+(abs(treeColor[0]-targetNums[0])/10) : treeColor[0]-(abs(treeColor[0]-targetNums[0])/40);
  if(treeColor[1] != targetNums[1]) treeColor[1] = treeColor[1]<targetNums[1] ? treeColor[1]+0.1 : treeColor[1]-0.1;
  if(treeColor[2] != targetNums[2]) treeColor[2] = treeColor[2]<targetNums[2] ? treeColor[2]+0.1 : treeColor[2]-0.1;
}

function fallingLeaves(){
  let y = constrain(frameCount%400*4, 0, 160);
  if(y >= 100 && tHeight >= 0){
    tWidth+=2;
    tHeight-=4;
  }
  fill(31,71,46)
  treePos.forEach((tree, index) => {
    ellipse(tree[0]+15,tree[1]-80+y,tWidth,tHeight);
  });
}

function growingLeaves(){
  treeColor = [130, 71, 46];
  
  if(tWidth != 100) tWidth++;
  if(tHeight != 180) tHeight++;
  fill(treeColor[0], treeColor[1], treeColor[2]);
  treePos.forEach((tree, index) => {
    ellipse(tree[0]+15,tree[1]-80,tWidth,tHeight);
  });
}

//gradually shift the sky
function shiftSky(season){
  let targetNums = [];

  if(season === "Autumn"){
    targetNums = [189, 51, 76];
  }
  else if(season === "Winter"){
    targetNums = [189, 19, 76];
  }
  else if(season === "Spring"){
    targetNums = [189, 91, 71];
  }
  else{
    targetNums = [189, 52, 100];
  }
  
  if(skyColor[0] != targetNums[0]) skyColor[0] = skyColor[0]<targetNums[0] ? skyColor[0]+0.1 : skyColor[0]-0.1;
  if(skyColor[1] != targetNums[1]) skyColor[1] = skyColor[1]<targetNums[1] ? skyColor[1]+0.1 : skyColor[1]-0.1;
  if(skyColor[2] != targetNums[2]) skyColor[2] = skyColor[2]<targetNums[2] ? skyColor[2]+0.1 : skyColor[2]-0.1;

}


//gradually shift grass color according to season
function shiftGrass(season){
  let targetNums = [];
  if(season === "Autumn"){
    targetNums = [121, 31, 32];
  }
  else if(season === "Winter"){
    targetNums = [121, 9, 90];
  }
  else if(season === "Spring"){
    targetNums = [121, 79, 66];
  }
  else{
    targetNums = [121, 47, 48];
  }
    
  if(grassColor[0] != targetNums[0]) grassColor[0] = grassColor[0]<targetNums[0] ? grassColor[0]+0.1 : grassColor[0]-0.1;
  if(grassColor[1] != targetNums[1]) grassColor[1] = grassColor[1]<targetNums[1] ? grassColor[1]+0.1 : grassColor[1]-0.1;
  if(grassColor[2] != targetNums[2]) grassColor[2] = grassColor[2]<targetNums[2] ? grassColor[2]+0.1 : grassColor[2]-0.1;
}

function tardis(Season){
  if(Season == "Winter" && tardisOp > 0){
    tardisOp = lerp(tardisOp, tardisOp-10,0.5);
    tardisOp = lerp(tardisOp, tardisOp+5, 0.1);
  }
  if(Season == "Spring" && tardisOp < 255){
    tardisOp = lerp(tardisOp, tardisOp+2,0.5);
    tardisOp = lerp(tardisOp, tardisOp+5, 0.1);
  }
  colorMode(RGB)
  fill(0,55,111, tardisOp)
  rect(250,300,100,200);
  rect(240,300,120,10);
  quad(255,300,266,285,332,285,345,300);
  rect(266,280,66,5)
  //quad(225,320,266,285,332,285,375,320);
  fill(3,41,79, tardisOp)
  rect(260,380,30,30);
  rect(260,420,30,30);
  rect(260,460,30,30);
  rect(310,380,30,30);
  rect(310,420,30,30);
  rect(310,460,30,30);
  colorMode(HSB)
  fill(60,40,100, tardisOp);
  rect(290,260,15,20)
  
  //windows
  fill(140, tardisOp);
  rect(260,335,30,30);
  rect(310,335,30,30);
  stroke(1, tardisOp);
  strokeWeight(1);
  line(270,335,270,365);
  line(280,335,280,365);
  line(260,350,290,350);
  line(320,335,320,365);
  line(330,335,330,365);
  line(310,350,340,350);
  strokeWeight(7);
  line(260,315,340,315);
  noStroke();
}

function sunlight(){
  noStroke();
  colorMode(RGB);
  fill(253,251,211, sunOp);
  circle(600,0,200);
  if(frameCount%1600 < 400 && frameCount%1600 > 300) {
    opacity -= 3;
    sunOp -= 3;
  }
  if(frameCount%1600 < 100) {
    if(opacity < 50) opacity += (frameCount%1600);
    if(sunOp < 255)sunOp += frameCount%1600;
  }
  beginShape();
  fill(253,251,220, opacity);
  vertex(500,20);
  vertex(100,500);
  vertex(340,500);
  vertex(590,100);
  endShape();
}

function downpour(){
  this.x = random(width);
  this.y = -600+random(600);
  this.opacity = 255;
  this.radius = 0;

  this.draw = function(){
    if(frameCount%1600 == 400) this.y = -600+random(600);
    
    if(frameCount%1600 >= 750) {
      this.opacity--;
    }
    push();
    blendMode(OVERLAY);
    noStroke();
    fill(255, this.opacity);
    ellipse(this.x, this.y, 2, random(3,5));
    blendMode(BLEND);
    pop();
  }
  
  //controls y value
  this.pour = function(){
    if(this.y < 530){
      let y = rainTime * 2;
      this.y += 5;
      rainTime++;
    }
    if(this.y >= 530){
      fill(255, this.opacity);
      ellipse(this.x, this.y, this.radius*2, this.radius/2);
      this.radius++;
      this.opacity -= 15;
    }
    if(this.opacity < 0){
      this.y = -600+random(600);
      this.opacity = 255;
      this.radius = 0;
    }
  }
}

function snowfall(){
  this.x = random(width);
  this.y = -600+random(600);
  
  this.draw = function(){
    push();
    blendMode(OVERLAY);
    rectMode(CENTER);
    noStroke();
    if(frameCount%1400 > 1500 && snowpacity >= 0) snowpacity--;
    fill(255, snowpacity);
    circle(this.x, this.y, random(1,5));  
    blendMode(BLEND);
    pop();
  }
  
  this.fall = function(){
    if(this.y < 600){
      this.y += 4;
    }
    else{
     this.y = -600+random(600); 
    }
  }
  
  this.fade = function(){
    if(snowpacity>=0)snowpacity--;
  }
}