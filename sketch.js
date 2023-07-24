//Variáveis
var trex, trex_running, trex_collided;

var edges;

var ground, groundImage;
var InvisibleGround;

var cloud, cloudImage;
var obstaculo1, obstaculo2, obstaculo3, obstaculo4, obstaculo5, obstaculo6;

var Score;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

var gameOver, restart;
var gameOverImg, restartImg;

//declarar variaveis para os sons




function preload() {

  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trex_collided = loadAnimation("trex_collided.png");

  groundImage = loadImage("ground2.png");
  cloudImage = loadImage("cloud.png");

  obstaculo1 = loadImage("obstacle1.png");
  obstaculo2 = loadImage("obstacle2.png");
  obstaculo3 = loadImage("obstacle3.png");
  obstaculo4 = loadImage("obstacle4.png");
  obstaculo5 = loadImage("obstacle5.png");
  obstaculo6 = loadImage("obstacle6.png");

  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");

  //carregamento de som
  



}



function setup() {
  createCanvas(600, 200);

  trex = createSprite(50, 160, 20, 50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);
  trex.scale = 0.5;

  ground = createSprite(200, 180, 400, 20);
  ground.addImage("ground", groundImage);
  ground.x = ground.width / 2;

  gameOver = createSprite(300, 100);
  gameOver.addImage(gameOverImg);
  gameOver.visible = false;
  gameOver.scale = 0.5;

  restart = createSprite(300, 140);
  restart.addImage(restartImg);
  restart.visible = false;
  restart.scale = 0.5;

  InvisibleGround = createSprite(200, 190, 400, 10);
  InvisibleGround.visible = false;

  obstaculoG = new Group();
  nuvenG = new Group();

  //aumentar o raio
  trex.setCollider("circle", 0, 0, 50);
  //trex.debug = true;


  Score = 0;

}


function draw() {
  background("white");

  text("pontuação: " + Score, 500, 50);


  if (gameState === PLAY) {
    //do chão também
    ground.velocityX = -(6 + Score / 100);

    Score = Score + Math.round(frameCount / 60);

    //som de checkPoint
   

    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }

    //colocar o som de pulo
    if (keyDown("space") && trex.y >= 160) {
      trex.velocityY = -10;
     
    }

    trex.velocityY = trex.velocityY + 0.5;

    criarNuvem();
    criarobstaculos();

    //colocar o som de perder
    if (obstaculoG.isTouching(trex)) {
     
    
      gameState =END;
    
    }
  }

  else if (gameState === END) {

    gameOver.visible = true;
    restart.visible = true;

    ground.velocityX = 0;
    trex.velocityY = 0;

    trex.changeAnimation("collided", trex_collided);

    obstaculoG.setLifetimeEach(-1);
    nuvenG.setLifetimeEach(-1);

    obstaculoG.setVelocityXEach(0);
    nuvenG.setVelocityXEach(0);
  }

  

  //trex colidindo com o chão invisível
  trex.collide(InvisibleGround);
  drawSprites();
}

function criarobstaculos() {
  if (frameCount % 60 == 0) {
    var obstaculo = createSprite(610, 165, 10, 40);
    //aumentar a velocidade
    obstaculo.velocityX = -(6 + Score / 100);

    //gerar obstáculos aleatórios
    var rand = Math.round(random(1, 6));

    switch (rand) {
      case 1: obstaculo.addImage(obstaculo1);
        break;

      case 2: obstaculo.addImage(obstaculo2);
        break;

      case 3: obstaculo.addImage(obstaculo3);
        break;

      case 4: obstaculo.addImage(obstaculo4);
        break;

      case 5: obstaculo.addImage(obstaculo5);
        break;

      case 6: obstaculo.addImage(obstaculo6);
        break;

      default: break;
    }
    //atribuir dimensão e tempo de vida ao obstáculo
    obstaculo.scale = 0.5;
    obstaculo.lifetime = 300;

    //adicione cada obstáculo ao grupo
    obstaculoG.add(obstaculo);
  }
}

function criarNuvem() {

  if (frameCount % 60 == 0) {
    cloud = createSprite(610, 100, 10, 10);
    cloud.y = Math.round(random(50, 100));
    cloud.addImage("nuvem", cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -(6 + Score / 100);

    //tempo de vida 
    cloud.lifetime = 200;

    //profundidade
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    // console.log(cloud.depth);
    // console.log(trex.depth);

    //adicionar nuvem ao grupo
    nuvenG.add(cloud);
  }
}
