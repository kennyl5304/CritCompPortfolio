//Disclaimer: This noise is so damn slow
let song;
function setup() {
  let canvas = createCanvas(800, 800);
  canvas.parent("sketch-container");
  song = createAudio('poolloop.mp3');
  song.play();
  song.loop();
  song.volume(0.35)
  frameRate(30);
}

function draw() {
  //background(220)  
  background(255,192,203, 44);
  noFill();
  //backNoise();
  rectMode(CENTER);
  let xOffset = constrain(mouseX/80,0,10)+10;
  let yOffset = constrain(mouseY/80,0,10)+100;
  
  for(let i = 0; i < 4; i++){
    for(let j = 0; j < 3; j++){
      drawTrident((j*300)+xOffset,(i*200)+yOffset);
    }
  }
}

function drawTrident(x, y){
  beginShape();
  //rotate(frameCount*0.01);
  strokeWeight(lerp(1,10,constrain(abs(sin(frameCount/60)*0.8)-0.05,0.1,0.53)));
  stroke(141,220,220);
  noFill();
  ellipse(x,y,10,20);
  line(x,y-10,x+165,y-60);
  line(x+165,y-60,x+265,y-25);
  line(x+265,y-25,x+265,y-5);
  line(x,y+10,x+160,y-40);
  line(x+160,y-40,x+160,y-20);
  line(x+160,y-20,x+179,y-13);
  ellipse(x+57,y+24,10,20);
  line(x+160,y-40,x+209,y-24);
  line(x+209,y-24,x+58,y+33);
  line(x+160,y-20,x+56,y+15);
  ellipse(x+100,y+50,10,20);
  line(x+265,y-25,x+100,y+40);
  line(x+265,y-5,x+100,y+60);
  endShape();
  
  /*
  ellipse(130,200,10,20);
  line(130,190,295,140);
  line(295,140,395,175);
  line(395,175,395,195);
  line(130,210,290,160);
  line(290,160,290,180);
  line(290,180,309,187);
  ellipse(187,224,10,20);
  line(290,160,339,176);
  line(339,176,188,233);
  line(290,180,186,215);
  ellipse(230,250,10,20);
  line(395,175,230,240);
  line(395,195,230,260);
  */
}

function mousePressed(){
  console.log(mouseX + " " + mouseY)
}

function backNoise(){
  let noiseLevel = 255;
  let noiseScale = 0.009;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      // Scale the input coordinates.
      let nx = noiseScale * x;
      let ny = noiseScale * y;
      let nt = noiseScale * frameCount;

      // Compute the noise value.
      let c = noiseLevel * noise(nx, ny, nt);
      fill(255,192,203, 44)
      stroke(255, c, 203);
      strokeWeight(0.5)
      point(x, y);
    }
  }
}
