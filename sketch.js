var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var feed;
var lastFed;
var Hour;


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  feed = createButton("Feed The Dog");
  feed.position(700, 95);
  feed.mousePressed(feedDog);

  Hour = hour(); 

}

function draw() {
  background(46,139,87);
  foodObj.display();

  //write code to read fedtime value from the database 
  database.ref('hour').update({
    hour : Hour
  })
 
  //write code to display text lastFed time here

  if(lastFed >= 12){

    textSize(20);
    fill("black");
    text("Last Fed : " + Hour + "PM", 345, 32);

  }else if(lastFed === 0){

    textSize(20);
    fill("black");
    text("Last Fed : 12 AM", 345, 32);

  }else{

    textSize(20);
    fill("black");
    text("Last Fed : " + Hour + "AM", 345, 32);

  }
 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){

  dog.addImage(happyDog);

  console.log(Hour);

  //write code here to update food stock and last fed time
  foodS = foodS - 1;
  database.ref('/').update({
    Food : foodS
  })

}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
