var dog, happyDog, normalDog, database, foodS, foodStock, readStock;

function preload()
{
  normalDog = loadImage("images/dogImg.png")
	happyDog = loadImage("images/dogImg1.png");
}

function setup() {
  database = firebase.database();
	createCanvas(800, 700);
  
  dog = createSprite(400,350 ,10,10)
  dog.addImage(normalDog);
  dog.scale = 0.4

  foodStock = database.ref("Food");
  foodStock.on("value", readStock);
}

function draw() {  
  background(46, 139, 87);

  //text("Food Remaining =  " + Food, 200,350)

  if(keyDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDog);
  }

  drawSprites();
}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){

  if(x<=0){
    x = 0;
  }

  else{
    x = x-1
  }

  database.ref("/").update({
    Food: x
  })
}