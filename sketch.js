const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

var backgroundImg, space;
var astroImg, astro; 
var obstacle1Img, obstacle1;
var obstacle2Img, obstacle2;
var obstacle3Img, obstacle3;
var obstacleGroup; 
var starsImg, stars, starsGroup;

var life;

var PLAY = 1, END = 0; 

var gameState = PLAY;

function preload()
{
  backgroundImg = loadImage("Space.jpeg");
  astroImg = loadImage("Astronaunt.png");
  obstacle1Img = loadImage("Obstacle1.png");
  obstacle2Img = loadImage("Obstacle2.png");
  obstacle3Img = loadImage("Obstacle3.png");
  starsImg = loadImage("star.png");
}

function setup() 
{
  createCanvas(600,700);

  life = 3;

  engine = Engine.create();
  world = engine.world;

  space = createSprite(300, 300);
  space.addImage(backgroundImg);
  space.scale = 1.2;
  space.velocityY = 1;

  astro = createSprite(300, 500);
  astro.addImage(astroImg);
  astro.scale = 0.15;

  starsGroup = new Group();
  obstacleGroup = new Group();
}

function draw() 
{
  background(51);
  
  Engine.update(engine);
 
  if (gameState == PLAY) {
    gamePlay();
  }

  else if (gameState == END) {
  obstacleGroup.destroyEach();
  starsGroup.destroyEach(); 
  space.destroy(); 
  text("GAME OVER", 300, 400);
  }
    

  drawSprites();

}

function gamePlay() {
  if(space.y > 400) {
    space.y = 300;
  }

  if(keyDown(RIGHT_ARROW)) {
    astro.x += 5
  }

  if(keyDown(LEFT_ARROW)) {
    astro.x -= 5
  }

  spawnStars();
  spawnObstacles();

if (obstacleGroup.isTouching(astro)) {
lifeover(); 
}

if(starsGroup.isTouching(astro)) {
  life = life + 1; 
}
}

function lifeover() {
  life = life - 1;
  console.log(life);
  if (life >= 1) {
    gameState = PLAY
  }

  else {
    gameState = END; 
  }
}

function spawnObstacles() {
  if(frameCount % 100 == 0) {
    var r = Math.round(random(10, 400))
    var obstacle = createSprite(r, 10, 20, 20);
    obstacle.velocityY = 4; 
    obstacle.scale = 0.2;

    var rand = Math.round(random(1, 3));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1Img);
              break;
      case 2: obstacle.addImage(obstacle2Img);
              break;
      case 3: obstacle.addImage(obstacle3Img);
              break;
      default: break;
    }
    astro.depth = obstacle.depth;
  astro.depth = astro.depth + 1;
  console.log(astro.depth);
    obstacleGroup.add(obstacle);
  }

}

function spawnStars() {
  if (frameCount % 120 == 0) {
    var r = Math.round(random(10, 400))
    stars = createSprite(r, r, 20, 20);
    stars.addImage(starsImg);
    stars.velocityY = 2; 
    stars.scale = 0.02;
    starsGroup.add(stars);
  }
}

