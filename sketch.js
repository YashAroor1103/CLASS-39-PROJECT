var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var bananasGroup;
var background;
var score;

function preload(){
  
  
  monkey_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");
  
  backgroundImage = loadImage("jungle.jpg");
}

function setup() {
  createCanvas = (600,600);
  
  bg = createSprite(300,300,600,600);
  bg.addImage(backgroundImage);
  bg.velocityX = -3;
  
  //creating monkey and ground
  monkey = createSprite (80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(400,350,900,10);
  ground.velocityX = -4;
  console.log(ground.x)
  ground.visible = false;
  
  bananasgroup = createGroup();

  score = 0;
}

function draw() {
  background("white");
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score:" + score,500,50);
  
  //when space key pressed monkey should jump
  if(keyDown("space")){
    monkey.velocityY = -12;
   }
  
  //adding gravity
  monkey.velocityY = monkey.velocityY + 0.8;
  
     if (bg.x < 0){
      bg.x = bg.width/2;
    }
  
  if(ground.x <0){
    ground.x = ground.width/2;
  }
  
  if(bananasgroup.isTouching(monkey)){
    score = score + 2;
    bananasgroup.destroyEach();
  }
  
  //stop monkey from falling down
  monkey.collide(ground);
  
  food();
  spawnObstacles();
  
   if(bananasgroup.isTouching(monkey)){
      monkey.scale = 0.2;
    }
  
 
  
  
  drawSprites();
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime = Math.ceil(frameCount/frameRate())
  text("Survival Time: "+ survivalTime,100,50)
}
 
function food(){
  if (frameCount % 80 === 0){
     banana = createSprite(200,120,40,10);
     banana.y = Math.round(random(120,200));
     banana.addImage("banana", bananaImage)
     banana.scale = 0.05;
     banana.velocityX = -3;
    
    //assigning lifetime to banana
    banana.lifetime = 80;
    
    switch(score){
        case 10: monkey.scale = 0.12;
        break;
        
        case 20: monkey.scale = 0.14;
        break;
        
        case 30: monkey.scale = 0.16;
        break;
        
        case 40: monkey.scale = 0.18;
        break;
        
        default: break;
    }
    
   
    
    bananasgroup.add(banana);
  }
}
function spawnObstacles(){
  if (frameCount % 300 === 0){
    var obstacle = createSprite(600,330,10,40);
    obstacle.addImage("image",obstacleImage);
    obstacle.scale = 0.1;
    obstacle.velocityX = -(6 + score/100);
    obstacle.lifetime = 80;
  }
}


