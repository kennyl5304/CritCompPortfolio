let bgm;
let player;
let scene;
let scenesFinished = [1,0,0,0];
let loaded = true;

//Doorways
let doors = [[200,300], [700,300], [1200,300]];
let doorWidth = [150,150,150];
let lockDoor;
let openDoor;
let path;
let opened = [false,false,false];

let font;
let textFly;
let textFlyX;
let textFlyY;

class Player{
  constructor(x,y){
    this.x=x;
    this.y=y;
    this.speed = scene==1 ? 3 : 5;
    this.health=100;
    this.jump = false;
    this.lastJump = 0;
    this.grounded = true;
    this.framesSinceLanding = 0;
    this.lastAttack = 0;
    this.blocking = false;
    this.moving = false;
    this.shotSound = createAudio("Audio/tie-blaster.mp3");
    this.shotSound.volume(0.17);
    this.deathSound = createAudio("Audio/lego-yoda-death-sound-effect.mp3");
    this.deathSound.volume(0.53);
    this.currentFrame = 0;
  }
  
  show(){
    if(scene==1){
      noFill();
      noStroke();
      rect(this.x,this.y,90,40);
      image(playerImg, this.x, this.y-40);
    }
    else if(scene==2){
      if(this.jump){
        this.y-=11;
        if(this.y <= 50) this.jump = false;
      }
      if(!this.jump && this.y <= 300) this.y+=8;
      noFill();
      //this will get changed
      //fill(255,100,0)
      if(this.blocking){
        stroke(25, 25, 112);
        strokeWeight(3);
      }
      else{
        noStroke();
      }
      rect(this.x,this.y,150,300);
      //jump animation
      if(this.jump){
        playerJump[this.currentFrame].resize(400,0);
        image(playerJump[this.currentFrame],this.x-120,this.y-80);
        if(frameCount%5==0)this.currentFrame = constrain(this.currentFrame+1, 0, 5);
      }
      //fall animation
      if(!this.jump && !this.grounded){
        playerFall.resize(400,0);
        image(playerFall,this.x-120,this.y-80);
        this.framesSinceLanding = 0;
      }
      //land animation
      if(this.framesSinceLanding == 0) this.currentFrame = 0;
      if(this.framesSinceLanding <= 15 && this.grounded){
        playerLand[this.currentFrame].resize(400,0);
        image(playerLand[this.currentFrame],this.x-120,this.y-80);
        if(this.framesSinceLanding%5==0)this.currentFrame = constrain(this.currentFrame+1, 0, 2);
      }

      //attack animation
      if(this.grounded && millis()-this.lastAttack <= 300){
        playerAttack[this.currentFrame].resize(400,0);
        image(playerAttack[this.currentFrame],this.x-120,this.y-80);
        if(frameCount%2==0)this.currentFrame = constrain(this.currentFrame+1, 0, 2);          
      }
      else{
        //walking/running animation
        if(this.moving && this.grounded && this.framesSinceLanding > 15){
          playerRun[this.currentFrame].resize(400,0);
          image(playerRun[this.currentFrame],this.x-120,this.y-80);
          if(frameCount%8==0)this.currentFrame = constrain(this.currentFrame+1, 0, 4);
          if(this.currentFrame >= 4) this.currentFrame = 0;
        }
        else if(!this.moving && this.grounded && this.framesSinceLanding > 15){
          playerIdle1.resize(400,0);
          playerIdle2.resize(400,0);
          if(frameCount%30>=15)image(playerIdle1, this.x-120, this.y-80);
          else image(playerIdle2, this.x-120, this.y-80);
        }
      }
    }
    else if(scene==3){
      if(this.jump){
        this.y-=11;
        if(this.y <= 150) this.jump = false;
      }
      if(!this.jump && this.y <= 450) this.y+=8;
      noFill();
      //this will get changed
      //fill(255,100,0);
      
      noStroke();      
      rect(this.x+10,this.y,90,150);
      if(this.currentFrame > 9) this.currentFrame = 0;

      //jump animation
      if(this.jump){
        playerJump[this.currentFrame].resize(250,0);
        image(playerJump[this.currentFrame],this.x-70,this.y-80);
        if(frameCount%5==0)this.currentFrame = constrain(this.currentFrame+1, 0, 5);
      }
      //fall animation
      if(!this.jump && !this.grounded){
        playerFall.resize(250,0);
        image(playerFall,this.x-70,this.y-80);
        this.framesSinceLanding = 0;
      }
      //land animation
      if(this.framesSinceLanding == 0) this.currentFrame = 0;
      if(this.framesSinceLanding <= 15 && this.grounded){
        playerLand[this.currentFrame].resize(250,0);
        image(playerLand[this.currentFrame],this.x-70,this.y-80);
        if(this.framesSinceLanding%5==0)this.currentFrame = constrain(this.currentFrame+1, 0, 2);
      }

      //walking/running animation
      if(this.grounded && this.framesSinceLanding > 15){
          playerRun[this.currentFrame].resize(250,0);
          image(playerRun[this.currentFrame],this.x-70,this.y-80);
          if(frameCount%5==0)this.currentFrame = constrain(this.currentFrame+1, 0, 4);
          if(this.currentFrame >= 4) this.currentFrame = 0;
      }
      /*
      if(this.grounded && this.framesSinceLanding > 15){
        playerIdle1.resize(250,0);
        playerIdle2.resize(250,0);
        if(frameCount%30>=15)image(playerIdle1, this.x-120, this.y-80);
        else image(playerIdle2, this.x-120, this.y-80);
      }
      */
    }
  }
  
  update(){
    if(scene==1){
      if(keyIsPressed){
        if(key === 'w' && this.y > 10){
          this.y-=this.speed;
        }
        if(key === 'a' && this.x > 10){
          this.x-=this.speed;
        }
        if(key === 's' && this.y < height-10){
          this.y+=this.speed;
        }
        if(key === 'd' && this.x < width-10){
          this.x+= this.speed;
        }
      }
      if(keyIsDown(32)){
        this.shoot();
        this.shotSound.play();
      }
    }
    else if(scene==2){
      //healthCheck
      if(this.health <= 0){
        scene=0;
        loaded=false;
        this.deathSound.play();
      }
      //groundCheck
      this.grounded = this.y >= 300;
      if(this.grounded) this.framesSinceLanding++;

      if(keyIsPressed && !this.blocking){
        if(key === 'w' && (millis()-this.lastJump >= jumpCooldown)){
          this.jump = true;
          this.lastJump = millis();
          this.currentFrame = 0;
        }
        if(key === 'a' && this.x > 10){
          this.x-=this.speed;
          this.moving=true;
        }
        if(key === 'd' && this.x < width-10){
          this.x+= this.speed;
          this.moving=true;
        }
      }
      else{
        this.moving=false;
      }
      if(keyIsDown(32) && !this.blocking){
        this.attack();
      }
      this.blocking = keyIsDown(83);
    }
    else if(scene==3){
      //groundCheck
      this.grounded = this.y >= 450;
      if(this.grounded) this.framesSinceLanding++;

      if(keyIsDown(65) && this.x > 30){
        this.x-=this.speed;
      }
      if(keyIsDown(68) && this.x < width-10){
        this.x+=this.speed;
      }
      if(keyIsPressed){
        if(key === ' ' && (millis()-this.lastJump >= jumpCooldown)){
          this.jump = true;
          this.lastJump=millis();
          this.currentFrame = 0;
        }
      }
    }
  }
  
  shoot(){
    if(millis()-lastShot >= projCooldown){
      let projectile = new Projectile(this.x+45,this.y+26);
      projectiles.push(projectile);
      lastShot = millis();
    }
  }
  
  attack(){
    if(this.grounded)this.currentFrame=0;
    attackSound.play();
    if(millis()-this.lastAttack >= attackCooldown){
      let projectile = new Projectile(this.x+134,this.y+11,this);
      projectiles.push(projectile);
      this.lastAttack = millis();
    }
  }
}

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("sketch-container");
  bgm = createAudio("Audio/Matchstick Dreamer - 8 Bit.mp3");
  bgm.play();
  bgm.loop();
  scene = 0;
  lockDoor = createAudio("Audio/locked.mp3");
  openDoor = createAudio("Audio/open.mp3");

  textFlyX = width;
  textFlyY = random(50,height-50);
  font = loadFont("Fonts/KGHAPPY.ttf");
}

function draw(){
  switch(scene){
    case 0:
      if(!loaded) initializeVariables();
      menu();
      break;
    case 1:
      if(!loaded) initializeVariables();
      scene1();
      break;
    case 2:
      if(!loaded) initializeVariables();
      scene2();
      break;
    case 3:
      if(!loaded) initializeVariables();
      scene3();
      break;
    case 4:
      //loading screen for level 1
      if(!loaded) initializeVariables();
      loadingScene(1);
      break;
    case 5:
      //loading screen for level 2
      if(!loaded) initializeVariables();
      loadingScene(2);
      break;
    case 6:
      //loading screen for level 3;
      if(!loaded) initializeVariables();
      loadingScene(3);
      break;
  }
}

function menu() {
  background(25,25,113);
  textFont(font);
  noStroke();
  /*
  // Set the noise level and scale.
  stroke(255,0,0);
  let noiseLevel = 800;
  let noiseScale = 0.002;
  //blendMode(SOFT_LIGHT)
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
  */
  blendMode(BLEND)
  //text
  stroke(0);
  strokeWeight(5);
  fill(255);
  textSize(17);
  textAlign(CENTER);
  text("Creativity",275,280);
  text("Conflict",775,280);
  text("Romance",1275,280);
  strokeWeight(1);
  
  //flying text
  if(frameCount%1000 >= 550 && frameCount%1000 <= 1000) textFlying();
  if(frameCount%1000 == 1) randomText();

  for(let i = 0; i < doors.length; i++){
    initializeDoors(doors[i], i);
  }
}

function mouseClicked(){
  if(scene==0){
    for(let i = 0; i < doors.length; i++){
      let doorCoords = doors[i];
      if(mouseX > doorCoords[0] && mouseX < doorCoords[0]+150 && mouseY > doorCoords[1] && mouseY < doorCoords[1]+300){// && scenesFinished[i]==1){
        if(opened[i]){
          if(doorWidth[i] == -1) {
            scene = 4+i;
            loaded = false;
          }
        }
        opened[i] = !opened[i];
        openDoor.play();
      }
      else lockDoor.play();
    }
  }
  else if(scene>=4){
    scene-=3;
    loaded = false;
  }
}

function initializeDoors(doorCoords, doorIndex){
  //interior
  stroke(0);
  fill(255,252,97);
  rect(doorCoords[0],doorCoords[1],150,300);
  //door frame
  fill(247,137,52);
  //open or close door if clicked
  if(opened[doorIndex] && doorWidth[doorIndex]>=0) {
    doorWidth[doorIndex]--;
  }
  if(!opened[doorIndex] && doorWidth[doorIndex]<=150){
    doorWidth[doorIndex]++;
  }
  rect(doorCoords[0],doorCoords[1],doorWidth[doorIndex],300);
  fill(237,232,2);
  noStroke();
  circle(doorCoords[0]+130-(150-doorWidth[doorIndex]),doorCoords[1]+170,15-constrain((150-doorWidth[doorIndex])/5,0,15));  
  //light ray
  angleMode(DEGREES);
  fill(237,232,200);
  arc(doorCoords[0]+75,doorCoords[1]+300,150,300,360,2+150-doorWidth[doorIndex]);
}

function initializeVariables(){
  if(scene<4)bgm.stop();
  if(scene == 0){
    if(scenesFinished[3]==1) bgm = createAudio("Audio/Matchstick Dreamer.mp3");
    else bgm = createAudio("Audio/Matchstick Dreamer - 8 Bit.mp3");
    bgm.play();
    bgm.loop();
    font = loadFont("Fonts/KGHAPPY.ttf");
    loaded = true;
  }
  else if(scene == 1){
    bgm = createAudio("Audio/Starships and Supernovas - 8 Bit.mp3");
    bgm.play();
    bgm.loop();
    font = loadFont("Fonts/Starjout.ttf");

    playerImg = loadImage("Images/kenny-(a-wing).png");
    asteroidImg = loadImage("Images/asteroid.png");

    player = new Player(11, height/2);
    //create asteroid array
    asteroids.length = 0;
    for(let i = 0; i < 53; i++){
      let asteroid = new Asteroid(random(width+200, width+1200), random(0, height));
      asteroids.push(asteroid);
    }
    destroyed = 0;
    projectiles.length = 0;
    loaded = true;
  }
  else if(scene == 2){
    bgm = createAudio("Audio/The Bridge - 8 Bit.mp3");
    bgm.play();
    bgm.loop();
    font = loadFont("Fonts/Martyric.ttf");
    loaded = true;
    backgroundImage = loadImage("Images/scene2bg.png");
    attackSound = createAudio("Audio/fireball.mp3");
    attackSound.volume(0.35);
    hitSound = createAudio("Audio/punch.mp3");
    hitSound.volume(0.35);
    blockSound = createAudio("Audio/block.mp3");
    blockSound.volume(0.35);
    depressionBeam = loadImage("Images/Depression Beam.png");
    blueBall = loadImage("Images/Blue Ball.png");

    player = new Player(100,300);

    playerIdle1 = loadImage("Images/kenny-idle1.png");
    playerIdle2 = loadImage("Images/kenny-idle2.png");
    initializeAnimations();
    projectiles.length = 0;

    enemies.length=0;
    enemies.push(new Enemy(1000,300,"Anxiety",100));
    enemies.push(new Enemy(1000,300,"Depression",200));
    enemies.push(new Enemy(1000,300,"Existential Dread",300));
  }
  else if(scene == 3){
    bgm = createAudio("Audio/Renegade Hearts - 8 Bit.mp3");
    bgm.play();
    bgm.loop();
    font = loadFont("Fonts/Rockybilly.ttf");
    skybox = loadImage("Images/skybox.png");
    parallaxBuildings1 = loadImage("Images/parallax1.png");
    parallaxBuildings2 = loadImage("Images/parallax2.png");
    paraX1=0;
    paraX2=0;

    player = new Player(100,450);
    
    playerIdle1 = loadImage("Images/kenny-idle1.png");
    playerIdle2 = loadImage("Images/kenny-idle2.png");
    initializeAnimations();
    timer = 180;
    obstacles = [];
    obstacleImg1 = loadImage("Images/taxi.png");
    obstacleImg2 = loadImage("Images/nyc-trash.png");
    obstacleImg3 = loadImage("Images/door.png");

    train = new Train();
    trainCaught = false;
    loaded = true;
  }
  else if(scene == 4) font = loadFont("Fonts/Starjout.ttf");
  else if(scene == 5) font = loadFont("Fonts/Martyric.ttf");
  else if(scene == 6) font = loadFont("Fonts/Rockybilly.ttf");
  textAlign(LEFT);
  randomText();
  loaded = true;
}

function textFlying(){
  textFlyX-=11;
  textAlign(LEFT);
  if(scene==1 || scene==3){
    textSize(35);
  }
  else{
    textSize(53);
  }
  stroke(255);
  fill(0);
  text(textFly,textFlyX,textFlyY);
}

function randomText(){
  textFlyX = width;
  textFlyY = random(50,height-50);
  if(scene==3) textFlyY = random(50,height-590);
  let rand = round(random(1,4));
  if(scene == 0){
    if(rand == 1) textFly = "Do I bleed the same to you? Do I bleed the same to you?";
    if(rand == 2) textFly = "And the lovers hearts won't break, and the dreamers light the way";
    if(rand == 3) textFly = "We've got matchstick dreams we need a spark to ignite"
  }
  if(scene == 1){
    if(rand == 1) textFly = "Far away from the great unknown, in a land of stars is a place that i call home";
    if(rand == 2) textFly = "In a distant space, gonna find what life is worth";
    if(rand == 3) textFly = "Supernova won't you shine me a light"
  }
  else if(scene == 2){
    if(rand == 1) textFly = "If in your heart was where I once belonged, in your memory I'm too far gone";
    if(rand == 2) textFly = "Another broken vow, another day where I can't find words to say";
    if(rand == 3) textFly = "Standing at the edge of the world, it's calling me by my name"
  }
  else if(scene == 3){
    if(rand == 1) textFly = "And I'll dream of your smile under the Osaka sun, go get your guns, if love is war then our battles begun";
    if(rand == 2) textFly = "We're the renegades of the night, if it all breaks down would you still be around?";
    if(rand == 3) textFly = "With you my world comes alive, my sweet paradise found in the heaven of your starlit eyes"
  }
  console.log(textFly);
}


let asteroidImg;
let asteroids = [];
let projectiles = [];
let projCooldown = 300;
let lastShot = 0;
let destroyed = 0;
let requirement = 100;
//Level 1


class Projectile{
  constructor(x,y){
    if(arguments.length==3){
      this.firer=arguments[2];
    }
    this.x=x;
    this.y=y;
    this.firing = true;
  }

  show(){
    if(scene==1){
      fill(255,0,0);
      noStroke();
      rect(this.x,this.y,17,5);
    }
    else if(scene==2){
      if(this.firer==player){
        //fill(0,0,255);
        blueBall.resize(64,64);
        image(blueBall,this.x-11,this.y+125);
      }
      else{
        //fill(255,0,0);
        depressionBeam.resize(64,64);
        image(depressionBeam,this.x-11,this.y+125);
      }
      noStroke();
      noFill();
      circle(this.x,this.y+150,26);
    }
  }
  
  fire(){
    if(scene==1){
      if(this.x > width+10){
        this.firing = false;
      }
      this.collide();
      this.x += 5;
    }
    else if(scene==2){
      if(this.firer == player){
        if(this.x < 610){
          this.firing = false;
        }
        this.x += 17;
      }
      else{
        if(this.x < 0){
          this.firing = false;
        }
        this.x -= 17;
      }
      this.collide();
    }
  }
  
  collide(){
    if(scene==1){
      for(let i = 0; i < asteroids.length;i++){
        let asteroid = asteroids[i];
        
        if(collideRectCircle(this.x,this.y,17,5,asteroid.x+30,asteroid.y+30,50)){

          asteroids.splice(asteroids.indexOf(asteroid),1);
          let newOne = new Asteroid(random(width+200,width+1200),random(0,height));
          asteroids.push(newOne);
          destroyed++;
          
          projectiles.splice(projectiles.indexOf(this),1);
        }
      }
    }
    else if(scene==2){
      if(this.firer==player){
        if(collideRectCircle(enemies[0].x,enemies[0].y,150,300,this.x,this.y,26)){
          hitSound.play();
          enemies[0].health-=5;
          projectiles.splice(projectiles.indexOf(this),1);
        }
      }
      else{
        if(collideRectCircle(player.x,player.y,150,300,this.x,this.y,26)){
          if(!player.blocking){
            player.health-=10;
            if(this.firer.name == "Existential Dread") player.health-=5;
            hitSound.play();
          }
          else{
            blockSound.play();
          }
          projectiles.splice(projectiles.indexOf(this),1);
        }
      }
    }
  }
}

class Asteroid{
  constructor(x,y){
    this.x=x;
    this.y=y;
  }
  
  move(){
    this.x -= random(1,5);
  }
  
  show(){
    fill(170);
    circle(this.x+30,this.y+30,50);
    image(asteroidImg, this.x, this.y);
  }
}

function scene1(){
  background(0);
  stroke(255);
  for(let i = 0; i < 200; i++){
    point(random(0,width),random(0,height));
  }
  //flying text
  if(frameCount%1000 >= 550 && frameCount%1000 <= 1000) textFlying();
  if(frameCount%1000 == 1) randomText();

  //win condition
  if(destroyed == requirement){
    scene=0;
    scenesFinished[1]=1;
    loaded=false;
  }
  
  //asteroids moving
  for(let i = asteroids.length-1; i >= 0; i--){
    let asteroid = asteroids[i];
    asteroid.move();
    asteroid.show();
    if(asteroid.x < 0){
      asteroids.splice(asteroids.indexOf(asteroid),1);
      let newOne = new Asteroid(random(width+200,width+1200),random(0,height));
      asteroids.push(newOne);
    }
  }

  //draw any projectiles
  for(let i = projectiles.length-1; i >= 0; i--){
    let projectile = projectiles[i];
    if(projectile.firing){
      projectile.fire();
      projectile.show();
    }
  }
  
  // UI text
  fill(0);
  stroke(255,215,0);
  textFont(font);
  textSize(20);
  text("Send all the bad ideas to the wastebin!", 10,20);
  text("ideas Canned: " + destroyed + "/" + requirement,width-250,20);
  
  player.update();
  player.show();
}

let playerIdle1;
let playerIdle2;
let playerRun = [];
let playerJump = [];
let playerFall;
let playerLand = [];
let playerAttack = [];
let enemies = [];
let attackCooldown = 500;
let jumpCooldown = 1500;
let backgroundImage;
let attackSound;
let hitSound;
let blockSound;
let depressionBeam;
let blueBall;
//Level 2


class Enemy{
  constructor(x,y,name,health){
    this.x=x;
    this.y=y;
    this.name=name;
    this.speed=3;
    this.health=health;
    this.initHealth=health;
    this.moveCooldown = 1000;
    this.jump = false;
    this.lastMove = 0;
    this.lastJump = 0;
    this.lastAttack = 0;
    this.lastWalk = 0;
    this.moving = false;
    this.moveDir = 0;
    this.moveTime = 500;
    this.deathSound = createAudio("Audio/lego-luke-skywalker-death-sound.mp3");
  }
  
  show(){
    if(this.jump){
      this.y-=11;
      if(this.y <= 100) this.jump = false;
    }
    if(!this.jump && this.y <= 300) this.y+=5;
    fill(0,255,0)
    noStroke();
    rect(this.x,this.y,150,300);
    fill(0);
    textSize(35);
    textAlign(CENTER);
    textFont("Verdana");
    text(this.name,this.x+75,this.y+150);
  }
  
  update(){
    //health check
    if(this.health <= 0) {
      enemies.splice(0,1);
      this.deathSound.play();
      if(enemies.length == 0){
        scene=0;
        scenesFinished[2]=1;
        loaded=false;
      }
    }
    
    if(millis()-this.lastMove >= this.moveCooldown){
      let rand = round(random(1,4));
      //1 = move left or right; 2 = attack; 3 = jump
      if(rand == 1){
        this.move();
      }
      else if(rand == 2){
        this.attack();
      }
      else if(rand ==3){
        this.jump = true;
        this.lastJump = millis();        
      }
      this.lastMove = millis();
    }
    
    if(this.moving && this.x <= width-160 && this.x>=10){
      this.x+=(this.moveDir * 5);
      if(millis()-this.lastWalk >= 500){
        this.moving = false;
      }
    }
  }
  
  move(){
    this.moving = true;
    let rand = round(random(1,3));
    this.moveDir = (rand == 1) ? -1 : 1;
    this.lastWalk = millis();
  }
  
  attack(){
    attackSound.play();
    if(millis()-this.lastAttack >= attackCooldown){
      let projectile = new Projectile(this.x,this.y,this);
      projectiles.push(projectile);
      if(this.name == "Existential Dread"){
        let projectile2 = new Projectile(this.x,this.y+50,this);
        let projectile3 = new Projectile(this.x,round(random(1,3)) == 2 ? this.y+100 : this.y-50,this);
        projectiles.push(projectile2);
        projectiles.push(projectile3);
      }
      this.lastAttack = millis();
    }
  }
}


function scene2(){
  background(220);
  backgroundImage.resize(windowWidth,windowHeight);
  image(backgroundImage,0,0);
  
  //win condition
  if(enemies.length == 0 || enemies[0] == null){
    scene=0;
    scenesFinished[2]=1;
    loaded=false;
  }
  else{
    textFont(font);
    //flying text
    if(frameCount%1000 >= 550 && frameCount%1000 <= 1000) textFlying();
    if(frameCount%1000 == 1) randomText();


    //show player + enemy
    player.update();
    player.show();
    enemies[0].update();
    if(enemies.length != 0)enemies[0].show();


    //draw any projectiles
    for(let i = projectiles.length-1; i >= 0; i--){
      let projectile = projectiles[i];
      projectile.fire();
      projectile.show();
    }


    //text (healthbars)
    stroke(0);
    strokeWeight(3)
    fill(252,100,0)
    textFont(font);
    textSize(53);
    textAlign(LEFT)
    text("Kenny",10,50);
    textAlign(RIGHT);
    if(enemies.length!=0)text(enemies[0].name,1490,50);
    textAlign(CENTER);
    textSize(35);
    text("FIGHT YOUR DEMONS", width/2, 50);
    healthbar(player);
    healthbar(enemies[0]);
  }
}


function healthbar(person){
  stroke(0);
  strokeWeight(4);
  noFill();
  if(person == player){
    rect(175, 30, 200, 20);
  }
  else{
    if(enemies.length!=0){
      let barHeight = enemies[0].name.length > 7 ? 60 : 30;
      rect(1220-textWidth(enemies[0].name),barHeight,enemies[0].initHealth+100,20)
    }
  }
  fill(255, 0, 0);
  if(person == player){
    rect(175, 30, map(player.health, 0, 100, 0, 200), 20);
  }
  else{
    if(enemies.length!=0){
      let barHeight = enemies[0].name.length > 7 ? 60: 30;
      rect(1220-textWidth(enemies[0].name), barHeight, map(enemies[0].health, 0, 100, 0, 200), 20);
    }
  }
}

function initializeAnimations(){
  for(let i = 0; i < 5; i++){
    playerRun[i] = loadImage("Images/kenny-run-"+i+".png");
    playerRun[i].resize(400,);
  }
  for(let i = 0; i < 6; i++){
    playerJump[i] = loadImage("Images/kenny-jump-" + i + ".png");
    playerJump[i].resize(400,0);
  }
  playerFall = loadImage("Images/kenny-fall-0.png");
  for(let i = 0; i < 3; i++){
    playerLand[i] = loadImage("Images/kenny-land-"+i+".png");
  }
  for(let i = 0; i < 3; i++){
    playerAttack[i] = loadImage("Images/kenny-attack-"+i+".png");
  }
}


let skybox;
let paraX1;
let paraX2;
let parallaxBuildings1;
let parallaxBuildings2;
let timer = 180;
let timeRemaining;
let distanceRemaining = 5000;
let currDistance = 0;
let trainLoaded = false;
let trainCaught = false;
let obstacles = [];
let obstacleImg1; //car
let obstacleImg2; //trash can
let obstacleImg3; //random door
//Level 3

class Obstacle {
  constructor(x,y){
    this.x=x;
    this.y=424;//height-350;
    let rand = round(random(1,3));
    if(rand==1){
      this.img = obstacleImg1;
      this.speed = 5;
      this.y=499;//height-275;
    }
    else if(rand==2){
      this.img = obstacleImg2;
      this.speed = 8;
    }
    else if(rand==3){
      this.img = obstacleImg3;
      this.speed = 11;
    }
  }
    
  move(){
    this.x -= this.speed;
    console.log(this.speed + " " + this.y + " " + height);
  }

  show(){
    //5=car, 8=trash can, 11=door
    noStroke();
    if(this.speed==5){
      obstacleImg1.resize(190,170);
      image(obstacleImg1,this.x-20,this.y-70);
      noFill();
      rect(this.x,this.y,150,100);
    }
    else if(this.speed==8){
      obstacleImg2.resize(100,100);
      image(obstacleImg2,this.x-25,this.y+80);
      noFill();
      rect(this.x,this.y+120,50,60);
    }
    else if(this.speed==11){
      obstacleImg3.resize(110,120);
      image(obstacleImg3,this.x-25,this.y+55);
      noFill();
      rect(this.x,this.y+70,60,110);
    }
  }
  
  collide(){
    if(this.speed==5){
      if(collideRectRect(this.x,this.y,150,100,player.x+10,player.y,90,150)){
        currDistance = 0;
        obstacles.length = 0;
        player.deathSound.play();
        player.x = 100;
        player.y = 450;
      }
    }
    else if(this.speed==8){
      if(collideRectRect(this.x,this.y+120,50,60,player.x+10,player.y,90,150)){
        currDistance = 0;
        obstacles.length = 0;
        player.deathSound.play();
        player.x = 100;
        player.y = 450;      
      }
    }
    else if(this.speed==11){
      if(collideRectRect(this.x,this.y+70,60,110,player.x+10,player.y,90,150)){
        currDistance = 0;
        obstacles.length = 0;
        player.deathSound.play();
        player.x = 100;
        player.y = 450;      
      }
    }
  }
}

class Train{
  constructor(){
    this.x=width+200;
    this.y=height-600;
  }

  show(){
    //background walls
    fill(246,250,243);
    rect(this.x-145,this.y+100,600,500);
    fill(46,75,46);
    //lining
    rect(this.x-145,this.y+100,10,500);
    rect(this.x+5,this.y+100,10,500);
    rect(this.x+155,this.y+100,10,500);
    rect(this.x+305,this.y+100,10,500);
    rect(this.x-145,this.y+250,600,10);
    //roof + sign
    rect(this.x-155,this.y+100,600,50);
    fill(0);
    rect(this.x-115,this.y+170,100,40);
    //draw train car
    this.trainCar();
    //platform
    fill(0);
    rect(this.x-150,this.y+380,600,100);
  }

  update(){
    if(currDistance == distanceRemaining){
      this.x=constrain(this.x-2,1200,width+200);
      if(this.x==1200) trainLoaded = true;
    }
    this.collide();
  }

  trainCar(){
    //body
    fill(155);
    rect(this.x,this.y+180,400,200);
    //doors
    fill(134);
    rect(this.x+120,this.y+220,50,150);
    rect(this.x+170,this.y+220,50,150);
    fill(0,0,255);
    //windows
    rect(this.x+30,this.y+230,50,50);
    rect(this.x+130,this.y+230,30,40);
    rect(this.x+180,this.y+230,30,40);
    rect(this.x+260,this.y+230,100,50);
    //d sign
    fill(50);
    rect(this.x+260,this.y+230,100,20);
    fill(255,69,0);
    circle(this.x+270,this.y+240,20);
  }

  collide(){
    if(collideRectRect(this.x+120,this.y+220,100,150,player.x+10,player.y,90,150)){
      trainCaught = true;
    }
  }
}

function scene3(){
  background(220);
  skybox.resize(width,height);
  image(skybox,0,-100);
  parallax();
  textFont(font);
  //console.log(currDistance + " " + distanceRemaining)
  //win condition
  if(trainCaught){
    scene=0;
    scenesFinished[3]=1;
    loaded=false;
  }
  //lose condition
  if(timer <= 0){
    scene=0;
    loaded=false;
  }

  //flying text
  if(frameCount%1000 >= 550 && frameCount%1000 <= 1000) textFlying();
  if(frameCount%1000 == 1) randomText();

  //draw train station or spawn obstacles
  if(currDistance == distanceRemaining){
    stroke(0);
    train.show();
    train.update();
  }
  else {
    //spawn one obstacle
    if(currDistance%100==0){
      let obstacle = new Obstacle(1600,height-300);
      obstacles.push(obstacle);
    }
    if(obstacles.length != 0){
      for(let i = obstacles.length-1; i >= 0; i--){
        if(obstacles.length==0) break;
        obstacles[i].move();
        obstacles[i].show();
        obstacles[i].collide();
      }
    }
  }
  
  //environment
  noStroke();
  stroke(1);
  noFill();
  fill(59,71,71);
  //road
  rect(0,600,width,height-600);
  //road lines
  
  player.show();
  player.update();
  
  if(currDistance<distanceRemaining) currDistance++;
  //console.log(currDistance);
  
  //progress bar
  progressBar();
  //ui text
  countdown();
  stroke(0);
  strokeWeight(3);
  fill(255,0,255);
  textSize(17);
  text("Time before train departure: " + timeRemaining, 30,70);
}

function countdown(){
  if(frameCount%60==0 && timer>0) timer --;
  let min = floor(timer/60);
  let sec = round(timer%60);
  if(sec <= 10) sec = "0" + sec;
  timeRemaining = min + ":" + sec;
}

function progressBar(){
  stroke(0);
  strokeWeight(4);
  noFill();
  rect(1290, 50, 300, 20);
  fill(255, 0, 0);
  rect(1290, 50, map(currDistance, 0, 5000, 0, 300), 20);
}

function parallax(){
  //scroll parallax1
  parallaxBuildings1.resize(0,800);
  image(parallaxBuildings1,paraX1,-200);
  image(parallaxBuildings1,paraX1+1600,-200);
  if(!trainLoaded){
    paraX1-=3;
    if(paraX1<-1600){
      paraX1=0;
    }
  }
  
  //scroll parallax2;
  parallaxBuildings2.resize(0,800);
  image(parallaxBuildings2,paraX2,-200);
  image(parallaxBuildings2,paraX2+1600,-200);
  if(!trainLoaded){
    paraX2-=5;
    if(paraX2<-1600){
      paraX2=0;
    }
  }
}

function loadingScene(level){
  if(level==1){
    background(0);
    stroke(255);
    for(let i = 0; i < 200; i++){
      point(random(0,width),random(0,height));
    }
    fill(0);
    stroke(255,215,0);
    textFont(font);
    textAlign(CENTER);
    textWrap(WORD);
    textSize(20);
    let str = "in the confines of the mind lies thoughts brimming with worlds, ideas, and pure imagination, and yet some of them would be better off as another crumpled paper at the bottom of the wastebin...";
    text(str, width/2-500, height/2, 1000);
    textSize(11);
    textAlign(LEFT);
    text("Controls: WASD to move; space to shoot", 10, height-20);
    textAlign(RIGHT);
    text("Click to start", width-100, height-20);
  }
  else if(level==2){
    background(0);
    textFont(font);
    textAlign(CENTER);
    textWrap(WORD);
    textSize(26);
    fill(255,0,0)
    let str = "Some days are better than others. Some days, it gets harder to fake a smile. Some days, the line between barely hanging on and finally falling apart are blurrier than ever. But the fight goes on...";
    text(str, width/2-500, height/2, 1000);
    textSize(26);
    textAlign(LEFT);
    text("Controls: A/D to move; W to jump; S to block; Space to shoot", 10, height-20);
    textAlign(RIGHT);
    text("Click to start", width-100, height-20);
  }
  else if(level==3){
    textLeading(71);
    background(0);
    fill(220,208,255);
    textFont(font);
    textAlign(CENTER);
    textWrap(WORD);
    textSize(20);
    let str = "I've made a habit of always missing, be it trains or shots. This time it all feels different \nwhen I've got something worth fighting for. I've always struck out more often than not. \nBut not this time. Not. This. Time.";
    text(str, width/2-500, height/2-50, 1000);
    textSize(11);
    textAlign(LEFT);
    text("Controls: WASD to move; space to jump", 10, height-20);
    textAlign(RIGHT);
    text("Click to start", width-100, height-20);
  }
}
