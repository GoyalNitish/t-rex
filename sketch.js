var trex, trex_running,trexcolidedImg, edges;
var groundImage,ground,invisibleground;
var cloud , cloudImage ,cloudGroup ;
var score;   
var o1,o2,o3 ,o4,o5,o6,obstacleGroup;
var PLAY=1;
var END=0;
var gamestate=PLAY;
var gameover,restart;
var gameovereImg,restartImg;
var checkpoint,die,jump;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  groundImage = loadImage("ground2.png");
  cloudImage = loadImage('cloud.png');
o1=loadImage('obstacle1.png');
o2=loadImage('obstacle2.png');
o3=loadImage('obstacle3.png');
o4=loadImage('obstacle4.png');
o5=loadImage('obstacle5.png');
o6=loadImage('obstacle6.png');

restartImg=loadImage('restart.png');
gameovereImg=loadImage('gameOver.png');
trexcolidedImg=loadAnimation('trex_collided.png');

checkpoint=loadSound('checkpoint.mp3');
die=loadSound('die.mp3');
jump=loadSound('jump.mp3');
}

function setup(){
  createCanvas(windowWidth,windowHeight);
  
  // creating trex
  trex = createSprite(50,height-70,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation('collided',trexcolidedImg);
  edges = createEdgeSprites();
  
  //adding scale and position to trex
  trex.scale = 0.5;
  trex.x = 50

//creating ground sprite
ground=createSprite(width/2,height,width,2);
ground.addImage("ground", groundImage);
ground.x=ground.width/2;


// create invisible ground
 
invisibleground=createSprite(width/2,height-10,width,125);
invisibleground.visible=false;
console.log('Hello'+5);
score = 0;

obstacleGroup= new Group();
cloudGroup=createGroup();

gameover=createSprite(width/2,height/2-50);
gameover.addImage(gameovereImg);
gameover.scale=0.5;

restart=createSprite(width/2,height/2);
restart.addImage(restartImg);
restart.scale=0.5;

//trex set colider
trex.setCollider('circle',0,0,40);
trex.debug=false;

restart.visible=false;
gameover.visible = false;
}


function draw(){
  //set background color 
  background(160);
  fill('red');
  text('score='+score,500,50);


  if(gamestate===PLAY){
  
    ground.velocityX= -(4 + 3 * score / 100); 

    score=score+Math.round(getFrameRate() / 60);

      //jump when space key is pressed
  if(touches.length>0 || keyDown("space")&& trex.y>=height-120){
    trex.velocityY = -10;
    jump.play();
  touches=[] ;

  }
  
  if(score>0 && score % 100 ===0){
    checkpoint.play();

  }

  trex.velocityY = trex.velocityY + 0.8;



if(ground.x<0){
  ground.x=ground.width/2
}

spawnclouds();

spawnObstacles();

if(trex.isTouching(obstacleGroup)){
 // trex.velocityY=-12
  //jump.play();
 gamestate=END;
  die.play();
}
  }

else if (gamestate===END){    
  restart.visible = true
 gameover.visible = true
  cloudGroup.setVelocityXEach(0);
  obstacleGroup.setVelocityXEach(0);  
  ground.velocityX=0;
  trex.velocityY=0;
  trex.changeAnimation('collided');
  
  obstacleGroup.setLifetimeEach(-1);
  cloudGroup.setLifetimeEach(-1);

  if(touches.length>0||keyDown('SPACE')){
    reset();
    touches=[];
  }
}

drawSprites();

  //stop trex from falling down
  trex.collide(invisibleground);

 

}

function spawnclouds(){
if(frameCount % 60==0){

cloud=createSprite(width+20,height-300,40,10);
cloud.addImage(cloudImage)
cloud.velocityX=-3;
cloud.scale=0.1;
cloud.y=Math.round(random(10,60));
cloud.lifetime=200;
cloud.depth= trex.depth
trex.depth=trex.depth+1

// adding clod to a group
cloudGroup.add(cloud);
}

}

function spawnObstacles(){
if(frameCount % 60==0){
  var obstacle=createSprite(600,height-95,20,30);
 obstacle.velocityX=-(6 + score / 100);

 // generating random obstacles
 var rand=Math.round(random(1,6));

 switch(rand){
   case 1: obstacle.addImage(o1);
   break;
   case 2: obstacle.addImage(o2);
   break;
   case 3: obstacle.addImage(o3);
   break;
   case 4: obstacle.addImage(o4);
   break;
   case 5: obstacle.addImage(o5);
   break;
   case 6: obstacle.addImage(o6);
   break;
  default:break;
  
 }
obstacle.scale=0.5;
obstacle.lifetime=300;

obstacleGroup.add(obstacle);

}


}

function reset(){
  gamestate=PLAY;

  gameover.visible=false;
  restart.visible=false;

  obstacleGroup.destroyEach();
  cloudGroup.destroyEach();

  trex.changeAnimation("running");
  score=0;
}










