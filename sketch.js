/*
MAKE SKETCH FULL TO SEE THE WHOLE SKETCH!!
Daniel Shiffman Videos for Sound, Particle.
Form + Code for conditionals.
*/
let mic;
var fft;
var recordHighLevel = 0;

var recordHighLevel = 0;
var video;
var vScale = 16;

var particles = [];
let font;
let font2;

function preload() {
  font = loadFont('qigong.otf');
}


var slider;


function setup() {
 var cnv=createCanvas(windowWidth, windowHeight);
   cnv.position(0,0);
  cnv.style('z-index','-1');
  bg1 = loadImage('night.jpg');
  bg2 = loadImage('data/am.jpg');
  bg3 = loadImage('data/sky.jpg');
  bg4 = loadImage('sunset.jpg');
  //Start mic/ FFT
  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT();
  fft.setInput(mic);
  var reacorHighLevel = 0;
  pixelDensity(1);
  video = createCapture(VIDEO);
  video.size(width / vScale, height / vScale);
  for (var i = 0; i < 50; i++) {
    particles[i] = new Particle(random(width), random(height));
  }
  slider = createSlider(0, 255, 127);
  video.hide();
  slider.hide();
}

function draw() {
   let hr=hour();
  let mn=minute();
    
    if(hr<=24 & hr<=5){
  background(bg1);
  }
    if(hr>=5 & hr<=9){
   background(bg2);
 }
if(hr>=9 & hr<=18){
  background(bg3);
}
  if(hr>=18 & hr<=20){
   background(bg4) 
  }
  if(hr>=20 & hr<=24){
   background(bg1); 
  }
  image(video,1000,602,80,40);
  fft.analyze();
  video.loadPixels();
  for (var i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].show();
    var midEnergy = fft.getEnergy('mid');
    smooth();
    textSize(midEnergy);
    // frameRate(15);
    noStroke();
    textLeading(60);
    textFont(font);
    textAlign(CENTER);
    text('Meta\nCortex', width / 2, height / 2);
    noStroke();
    rect(1090,602,20,40);
  }

  var waveform = fft.waveform();
	noFill();
    frameRate(300);
	stroke(255);
	strokeWeight(1);
	beginShape();
	for (let i = 0; i < waveform.length; i++) {
		vertex(
			map(i, 0, waveform.length, 1140,1340,),
			lerp(0, height / 12, waveform[i]) + (height / 1.03)
		);
	}
	endShape();
}
