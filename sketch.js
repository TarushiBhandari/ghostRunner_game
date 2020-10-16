var tower, towerImg;
var doorGroup, doorImg;
var climberImg, climberGroup;
var ghost, ghostImg;
var invisibleBlock, invisibleBlockGroup;
var PLAY= 1;
var END= 0;
var gameState= PLAY;
var spookySound;


function preload(){

  towerImg= loadImage("tower.png");
  doorImg= loadImage("door.png");
  climberImg= loadImage("climber.png");
  ghostImg= loadImage("ghost-standing.png");
  spookySound= loadSound("spooky.wav");
  
}

function setup(){
  createCanvas(600,600);

  tower= createSprite(300,300,300,300);
  tower.addImage(towerImg);
  tower.velocityY= 1;

  ghost= createSprite(300,300,50,50);
  ghost.addImage(ghostImg);
  ghost.scale= 0.3;

  doorGroup= new Group();
  climberGroup= new Group();
  invisibleBlockGroup= new Group();

}

function draw(){
background("black");

  if(gameState===PLAY){
    
    spookySound.play();
    
    if(tower.y>600){
       tower.y= 300;
     }
    if(keyDown("left_arrow")){
       ghost.x= ghost.x-3;
     }
  
    if(keyDown("right_arrow")){
       ghost.x= ghost.x+3;
     }
  
    if(keyDown("space")){
       ghost.velocityY= -5;
     }
  
    ghost.velocityY= ghost.velocityY+0.5;
    
    if(climberGroup.isTouching(ghost)){
       ghost.velocityY= 0;
     }
    
    spawnDoors();
    drawSprites();

    if(invisibleBlockGroup.isTouching(ghost)||
      ghost.y>600){
      ghost.destroy();
      gameState=END;
     }
    
    
  }else if(gameState===END){
    
    fill("yellow");
    stroke("yellow");
    textSize(30);
    text("Game Over",220,300);
  }
}

function spawnDoors(){
  
  if(frameCount%240===0){
    
    var door= createSprite(200,50,50,50);
    var climber= createSprite(200,100,10,10);
    invisibleBlock= createSprite(200,105);
    invisibleBlock.width= climber.width;
    invisibleBlock.height= 2;
    
    door.x= Math.round(random(120,400));
    climber.x= door.x;
    invisibleBlock.x= door.x;
    
    //invisibleBlock.debug= true;
   
    door.velocityY= 1;
    climber.velocityY= 1;
    invisibleBlock.velocityY= 1;
    door.lifetime= 600;
    climber.lifetime= 600;
    door.addImage(doorImg);
    climber.addImage(climberImg);
    doorGroup.add(door);
    climberGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
    door.depth= ghost.depth;
    ghost.depth= ghost.depth+1;
    
  } 
}