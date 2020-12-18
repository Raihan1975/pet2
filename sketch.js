
var database,position;
var dog,dogImg1,dogImg2;
var milkImg,milk;
var food;
function preload()
{
 dogImg1 = loadImage("images/dogImg.png");
 dogImg2 = loadImage("images/dogImg1.png");
 milkImg = loadImage("images/Milk.png");
}


function setup() {
  createCanvas(500,500);
  
  database=firebase.database();
    dog = createSprite(250,250,10,10);
    dog.addImage(dogImg1);
    dog.scale=0.1;
    var foodStock = database.ref('Food');
    foodStock.on("value",readStock);

    
}


function draw() {  
  background("green");
  drawSprites();
  //add styles here
  if(food!==undefined){
    text("Food Remaining :"+food,220,50);
    createFood();
  }
}
function readStock(data){
  food=data.val();
  
}

function keyPressed(){
  if(keyCode===UP_ARROW){
    dog.addImage(dogImg2);
    writeStock(food);
  }
}
function createFood(){
    var posY = Math.round(random(10,200));
    var posX = Math.round(random(20,220))
    milk=createSprite(posX,posY);
    milk.scale=0.1;
}
function writeStock(f){
    if(f<=0){
        f=0;
    }else
    {
      f=f-1;
    }
    database.ref('/').update({
       Food:f
    });
}


