const Engine = Matter.Engine
const World = Matter.World
const Bodies = Matter.Bodies
const Body = Matter.Body

var myEngine, myWorld
var ball, keeper, ground
var player, playerFall, playerKick, playButton, goalImg, goal
var chance = true




function preload(){
backgroundImg = loadImage("Images/backgroundImg.png")
keeper = loadImage("Images/keeper.png")
 playerRun = loadAnimation("Images/playerRun.png")
 playerFall = loadAnimation("Images/playerFall.png")
 playerKick =loadAnimation("Images/playerKick.png")
playButton = loadImage("Images/playButton.png")
goalImg = loadImage("Images/goal.png")
ballImg = loadImage("Images/ball1.png")

}



function setup(){
createCanvas(windowWidth,windowHeight);
myEngine = Engine.create();
myWorld = myEngine.world

ground = Bodies.rectangle(width/2, height-10, width, 20,{isStatic : true})
World.add(myWorld,ground);


ball = Bodies.circle(100,100,50,{restitution : 0.85, frictionAir : 0.00000001, density : 0.00101010101010010})
World.add(myWorld,ball);

 goal = Bodies.rectangle(730,130,500,250,{isStatic : true})
 World.add(myWorld,goal);

player = createSprite(680,700,30,30)
player.addAnimation("run",playerRun)
player.addAnimation("kick",playerKick)
player.addAnimation("fall",playerFall)
player.mirrorX(player.mirrorX()*-1)

player.changeAnimation("run")
player.scale = 0.4







}

function draw(){
background("red")
Engine.update(myEngine)


push()
imageMode(CENTER)
image(backgroundImg, width/2,height/2, width, height)
pop()

push()
fill("red")
text(mouseX+","+mouseY, mouseX, mouseY)
pop()

push()
rectMode(CENTER)
rect(ground.position.x,ground.position.y,width,20);
pop()

push()
translate(ball.position.x, ball.position.y)
rotate(ball.angle)
imageMode(CENTER)
image(ballImg,0,0, 50,50)
pop()

push()
imageMode(CENTER)
image(goalImg, goal.position.x, goal.position.y, 500, 250)
pop()


drawSprites()



}



function mouseClicked(){
Body.setPosition(ball, {x: 725, y: 560})
Body.setStatic(ball,true)
player.velocityY = -10





}
function keyPressed(){
if(keyDown("k")){
player.changeAnimation("kick");



}




}

 function keyReleased(){
if(keyDown("k")){
player.changeAnimation("run")
}

if(chance){
chance = false
d = dist(player.position.x,player.position.y,ball.position.x, ball.position.y);
if(d<70){
    player.velocityY = 0
    Body.setStatic(ball,false)
    xTemp = random(-13,13)
    yTemp = random(-25,-80)

Body.setVelocity(ball,{x:xTemp, y:yTemp});


}

else
{
player.velocityY = 0
player.changeAnimation("fall")
gameOver()
}




}






 }

 function gameOver(){
swal({
    title: "Game Over",
    text: "You ran out of tries",
    confirmButtonText: "Play again"
}, function(isConfirm){
if(isConfirm){
location.reload();


}


})






 }