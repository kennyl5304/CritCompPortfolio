/*
//Main Genres
let genres = [[['Rock',63.5],['Pop',22.3],['Folk',4.6],['Metal',3.0],['Classical',1.5],['Reggae',1.5],['Electronic',1.0],['Blues',0.5],['Christian?',0.5],['Country',0.5],['Jazz',0.5],['Hip Hop',0.5]],[['Rock',64.6],['Pop',18.6],['Metal',4.9],['Classical',3.1],['Reggae',2.7],['Easy Listening',2.2],['Christian?',1.3],['Folk',1.3],['Blues',,0.9],['Electronic',0.4]]];
//Subgenres
let subgenres = [[['Pop-Punk', 9],['Emo',8],['Alternative Rock'],['K-Pop',3],['Punk',3],['Classic Rock',2],['Indie',2],['Post Hardcore',2]],[['Pop-Punk',12],['Emo',8],['Punk',5],['Alternative Rock', 2],['Skate Punk',2],['Musicals',2],['Indie',2],['Horror Punk',2]]];
//Top Artists
let artists = [['Queen','Turnover','The Killers','My Chemical Romance','Twenty One Pilots','Fall Out Boy','Weezer','Taylor Swift','Fleetwood Mac'],['Jeff Buckley','Billy Joel','The Protomen','Queen','Fall Out Boy','The Phantom of the Opera Cast - West End','Maisie Peters','ABBA','Pink Floyd']];
//Tempos from 0-10BPM to 190-200BPM
let tempos = [[0,0,0,0,1,0,0,4,8,17,11,19,27,16,12,11,13,11,1,2],[0,0,0,0,0,0,1,5,10,15,18,10,15,15,12,15,13,10,8,4]];
//Decades from '60s to '20s
let decades = [[2,21,1,18,34,45,32],[2,20,7,25,39,39,19]];
//Playlists (song count, hours, minutes, albums, artist count, artists, genres, subgenres)
let playlists = [[153,10,21,138,117,genres[0],subgenres[0],artists[0],tempos[0],decades[0]],[151,9,50,121,116,genres[1],subgenres[1],artists[1],tempos[1],decades[1]]];
*/
let loading = true;
let filesLoaded = 0;

let isPlaying = false;
let songTitle = "";
let clickwheel;
let arrCount = 0;
let fft;

let masterArr;
let sunArr;
let monArr;
let sunTab, monTab;

let currSong;
let songPlaying;

let albumCover;
let covers = new Array(12);
let coverArr = ["BJ.webp", "FM.webp","FOB.webp","MCR.webp","MPs.webp","Queen.webp","Proto.webp","TK.webp","TOP.webp","TS.webp","Turn.webp","Wee.webp"];
let songlist = new Array(12);
let titleArr = ["BJ.m4a", "FM.m4a","FOB.m4a","MCR.m4a","MPs.mp3","Queen.mp3","Proto.mp3","TK.m4a","TOP.m4a","TS.m4a","Turn.mp3","Wee.m4a"];
let songTitles = ["Movin' Out (Anthony's Song) by Billy Joel", "You Make Loving Fun by Fleetwood Mac", "Tell That Mick He Just Made My List of Things to Do Today by Fall Out Boy", "Cemetery Drive by My Chemical Romance", "There it Goes by Maisie Peters", "Don't Stop Me Now by Queen", "The Hounds by The Protomen","Change Your Mind by The Killers", "Hometown by Twenty One Pilots", "Style by Taylor Swift", "Cutting My Fingers Off by Turnover", "No One Else by Weezer"];
let songAudio;

function preload(){
  let filestoLoad = 12;
  sunTab = loadTable('CSVs/Sun_10_5_25_history.csv', "csv", "header");
  monTab = loadTable('CSVs/Mon_10_6_25_history.csv', "csv", "header");
  for(let i = 0; i < titleArr.length; i++){
    let audio = loadSound('TopArtists/' + titleArr[i]);
    songlist[i] = audio;
    coverArt = loadImage('Covers/' + coverArr[i]);
    covers[i] = coverArt;
  }
  songAudio = songlist[0];
  albumCover = covers[0];
  currSong = songTitles[0];
}

function setup() {
  let canvas = createCanvas(600, 600);
  canvas.parent("sketch-container");
  sunArr = sunTab.getArray();
  monArr = monTab.getArray();
  masterArr = sunArr.concat(monArr);
  clickwheel = createAudio("clickwheel.mp3");
  fft = new p5.FFT();
}

function draw() {
  background(255,165,0);
  if(!isPlaying) {
    songTitle = "";
  }
   else{
    songTitle = "Now (supposedly) Playing: " + songPlaying[1] + " by " + songPlaying[2];
    songSpectrum();
    songWaveform();
  }
  noStroke();
  fill(255);
  textWrap(WORD)
  textFont("Helvetica")
  textSize(17);
  textAlign(CENTER);
  text(songTitle,0,580,600);
  text(isPlaying ? "Now Playing: " + currSong : "", 0,20,600);
  circle(300,300,400);
  fill(255,165,0)
  if(!isPlaying){
    circle(300,300,150);
  }
  else{
    imageMode(CENTER)
    drawingContext.save();
    drawingContext.beginPath();
    drawingContext.arc(300,300,75,0,TWO_PI);
    drawingContext.clip();
    let img = albumCover;
    image(img,300,300,150,150);
    drawingContext.restore();
  }
  wheelDecor();

}

function mousePressed(){
  //console.log(mouseX + " " + mouseY)
}

function mouseClicked(){
  if(dist(mouseX,mouseY,300,450)<30){
    if(songAudio != null) {
      if(isPlaying){
        songAudio.pause();
        isPlaying = false;
      }
      else{
        songAudio.play();
        isPlaying = true;
      }
    }
    songPlaying = masterArr[arrCount];
  }
  if(dist(mouseX,mouseY,160,300)<20){
    if(isPlaying){
      arrCount--;
      songPlaying = masterArr[arrCount];
      selectSong();
      songAudio.play();
    }
  }
  if(dist(mouseX,mouseY,440,300)<20){
    if(isPlaying){
      arrCount++;
      songPlaying = masterArr[arrCount];
      selectSong();
      songAudio.play();
    }
  }
}

function mouseDragged(){
  if(dist(mouseX,mouseY,300,300)<200 && dist(mouseX,mouseY,300,300)>75){
    if (clickwheel.elt.paused) clickwheel.play();
    if(arrCount < masterArr.length){
      arrCount++;
    }
    else{
      arrCount = 0;
    }
    if(songAudio == null || !songAudio.isPlaying()) selectSong();
  }
  return false;
}

function mouseReleased(){
  if(dist(mouseX,mouseY,300,300)<200 && dist(mouseX,mouseY,300,300)>75){
    if (!clickwheel.elt.paused) clickwheel.pause();
  }
}

function selectSong(){
  if(isPlaying) {
    songAudio.stop();
  }
  songAudio = songlist[arrCount%12];
  albumCover = covers[arrCount%12];
  currSong = songTitles[arrCount%12];
}

function wheelDecor(){
  fill(161);
  //top lettering
  textSize(20);
  textAlign(LEFT)
  text("MENU",270,170);
  
  //right play
  triangle(425,290,425,310,440,300);
  triangle(440,290,440,310,455,300);
  stroke(161);
  strokeWeight(5)
  line(460,290,460,310);
  noStroke();
  
  //left play
  triangle(175,290,175,310,160,300);
  triangle(160,290,160,310,145,300);
  stroke(161);
  line(140,290,140,310);

  noStroke();
  
  //bottom play
  triangle(275,440,275,470,300,455);
  stroke(161);
  line(310,445,310,465);
  line(320,445,320,465);
}

function songWaveform(){
  let waveform = fft.waveform();
  beginShape();
  stroke(2);
  noFill()
  for (let i = 0; i < waveform.length; i++){
    let x = map(i, 0, waveform.length, 0, width);
    let y = map( waveform[i], -1, 1, 0, height);
    vertex(x,y);
  }
  endShape();
  noStroke();
}

function songSpectrum(){
  noStroke();
  let spectrum = fft.analyze();
  fill(mouseX, 0, mouseY);
  for (let i = 0; i< spectrum.length; i++){
    let x = map(i, 0, spectrum.length, 0, width);
    let h = -height + map(spectrum[i], 0, 255, height, 0);
    rect(x, height, width / spectrum.length, h )
  }
}