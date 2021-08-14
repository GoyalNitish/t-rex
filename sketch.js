var trex, trex_running, edges;
var groundImage,ground,invisibleground;
var cloud , cloudImage ,cloudGroup ;
var score;   
var o1,o2,o3 ,o4,o5,o6,obstacleGroup;
var PLAY=1;
var END=0;
var gamestate=PLAY;

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
}

function setup(){
  createCanvas(600,200);
  
  // creating trex
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  edges = createEdgeSprites();
  
  //adding scale and position to trex
  trex.scale = 0.5;
  trex.x = 50

//creating ground sprite
ground=createSprite(200,180,400,20);
ground.addImage("ground", groundImage);
ground.x=ground.width/2;


// create invisible ground
 
invisibleground=createSprite(200,190,400,10);
invisibleground.visible=false;
console.log('Hello'+5);
score = 0;

obstacleGroup= new Group();
cloudGroup=createGroup();
}


function draw(){
  //set background color 
  background(160);
  fill('red');
  text('score='+score,500,50);


  if(gamestate===PLAY){
    ground.velocityX= -4; 

    score=score+Math.round(frameCount/60);

      //jump when space key is pressed
  if(keyDown("space")&& trex.y>=125){
    trex.velocityY = -10;
  }
  
  trex.velocityY = trex.velocityY + 0.8;



if(ground.x<0){
  ground.x=ground.width/2
}

spawnclouds();

spawnObstacles();

if(trex.isTouching(obstacleGroup)){
  gamestate=END;
}
  }

else if (gamestate===END){
  cloudGroup.setVelocityXEach(0);
  obstacleGroup.setVelocityXEach(0);  
  ground.velocityX=0;
}


  //stop trex from falling down
  trex.collide(invisibleground);

 

}

function spawnclouds(){
if(frameCount % 60==0){

cloud=createSprite(600,100,40,10);
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
  var obstacle=createSprite(400,165,10,40);
 obstacle.velocityX=-6

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











