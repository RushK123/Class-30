const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground;
var rope, fruitLink, fruit, fruitOptions;
var backgroundImg, rabbitImg, melonImg, rabbit;
var cutButton;

function preload(){
  backgroundImg = loadImage("background.png");
  rabbitImg = loadImage("Rabbit-01.png");
  melonImg = loadImage("melon.png");
}



function setup() 
{
  createCanvas(500,700);
  //frameRate(80);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(200,680,600,20);
  rope = new Rope(6,{x:250, y:30})
  textSize(50);

  fruitOptions = {
    density : 0.01 
  }
  fruit = Bodies.circle(300, 300, 15,fruitOptions);
  Composite.add(rope.body, fruit);
  fruitLink = new Link(rope,fruit);

  rabbit = createSprite(250, 640, 10, 10);
  rabbit.addImage(rabbitImg);
  rabbit.scale = 0.1;

  cutButton = createImg("cut_btn.png");
  cutButton.position(250, 30);
  cutButton.size(50,50);
  cutButton.mouseClicked(drop);

  rectMode(CENTER);
  ellipseMode(RADIUS);
}


function draw() 
{
  background(backgroundImg);
  Engine.update(engine);

  ground.show();
  rope.show();
  image(melonImg,fruit.position.x, fruit.position.y,60,60);
  

  drawSprites();
 
   
}

function drop(){
  rope.break();
  fruitLink.detached();
  fruitLink = null;
  

}
