# Alexander-186.github.io

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Pong</title>

<style>
body{
    margin:0;
    background:#111;
    display:flex;
    justify-content:center;
    align-items:center;
    height:100vh;
    overflow:hidden;
    font-family:Arial, sans-serif;
}

canvas{
    background:#000;
    border:4px solid white;
}

#score{
    position:absolute;
    top:20px;
    color:white;
    font-size:40px;
    font-weight:bold;
}
</style>

</head>
<body>

<div id="score">0 : 0</div>
<canvas id="game" width="800" height="500"></canvas>

<script>

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const scoreText = document.getElementById("score");

const paddleWidth = 15;
const paddleHeight = 100;

const player = {
    x:20,
    y:200,
    width:paddleWidth,
    height:paddleHeight,
    speed:7
};

const cpu = {
    x:765,
    y:200,
    width:paddleWidth,
    height:paddleHeight,
    speed:5
};

const ball = {
    x:400,
    y:250,
    radius:10,
    speed:5,
    vx:5,
    vy:3
};

let playerScore = 0;
let cpuScore = 0;

const keys = {};

document.addEventListener("keydown",(e)=>{
    keys[e.key]=true;
});

document.addEventListener("keyup",(e)=>{
    keys[e.key]=false;
});

function drawRect(x,y,w,h,color){
    ctx.fillStyle=color;
    ctx.fillRect(x,y,w,h);
}

function drawBall(){
    ctx.beginPath();
    ctx.arc(ball.x,ball.y,ball.radius,0,Math.PI*2);
    ctx.fillStyle="white";
    ctx.fill();
}

function update(){

    // Player movement
    if(keys["ArrowUp"] && player.y>0){
        player.y-=player.speed;
    }

    if(keys["ArrowDown"] && player.y+player.height<canvas.height){
        player.y+=player.speed;
    }

    // CPU AI
    let center = cpu.y + cpu.height/2;

    if(center < ball.y-25){
        cpu.y += cpu.speed;
    }

    if(center > ball.y+25){
        cpu.y -= cpu.speed;
    }

    // Ball movement
    ball.x += ball.vx;
    ball.y += ball.vy;

    // Top/bottom collision
    if(ball.y-ball.radius<=0 || ball.y+ball.radius>=canvas.height){
        ball.vy *= -1;
    }

    // Player paddle collision
    if(
        ball.x-ball.radius < player.x+player.width &&
        ball.y > player.y &&
        ball.y < player.y+player.height
    ){
        ball.vx *= -1;
    }

    // CPU paddle collision
    if(
        ball.x+ball.radius > cpu.x &&
        ball.y > cpu.y &&
        ball.y < cpu.y+cpu.height
    ){
        ball.vx *= -1;
    }

    // Score
    if(ball.x<0){
        cpuScore++;
        resetBall();
    }

    if(ball.x>canvas.width){
        playerScore++;
        resetBall();
    }ˇ

    scoreText.innerHTML = playerScore + " : " + cpuScore;
}

function resetBall(){

    ball.x = canvas.width/2;
    ball.y = canvas.height/2;

    ball.vx = (Math.random()>0.5 ? 5 : -5);
    ball.vy = (Math.random()*6)-3;
}

function draw(){

    ctx.clearRect(0,0,canvas.width,canvas.height);

    drawRect(player.x,player.y,player.width,player.height,"white");
    drawRect(cpu.x,cpu.y,cpu.width,cpu.height,"white");

    // Center line
    for(let i=0;i<canvas.height;i+=30){
        drawRect(canvas.width/2-2,i,4,20,"gray");
    }

    drawBall();
}

function gameLoop(){

    update();
    draw();

    requestAnimationFrame(gameLoop);

}

gameLoop();

</script>

</body>
</html>
