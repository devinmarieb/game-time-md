/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const canvas = $('#canvas')[0];
	const ctx = canvas.getContext('2d');
	const Game = __webpack_require__(1);

	var mouseClick = true;
	var game = new Game(ctx, canvas);

	game.startScreen();

	function start() {
	  requestAnimationFrame(function gameLoop() {
	    ctx.clearRect(0, 0, canvas.width, canvas.height);
	    game.run();
	    requestAnimationFrame(gameLoop);
	    if (game.level === 1) {
	      $('.body').css({ 'background-image': 'url(../images/level1.png)' });
	    } else if (game.level === 2) {
	      $('.body').css({ 'background-image': 'url(../images/level2.png)' });
	    } else if (game.level === 3) {
	      $('.body').css({ 'background-image': 'url(../images/level3.png)' });
	    }
	  });
	};

	$('canvas').on('click', function (event) {
	  if (mouseClick === true) {
	    game.setLevel(1);
	    start();
	    $('html, body').animate({ scrollTop: $(document).height() }, 3000);
	    return mouseClick = false;
	  }
	});

	$('.start-over-button').on('click', function () {
	  location.reload();
	});

	$('#background-one').on('click', function () {
	  $('.body').css({ 'background-color': '#BADA55', 'color': 'black' });
	  $('.background-theme').text('#BADA55');
	});

	$('#background-two').on('click', function () {
	  $('.body').css({ 'background-color': '#C00C00', 'color': 'white' });
	  $('.background-theme').text('#C00C00');
	});

	$('#background-three').on('click', function () {
	  $('.body').css({ 'background-color': '#C0FFEE', 'color': 'black' });
	  $('.background-theme').text('#C0FFEE');
	});

	$('#background-four').on('click', function () {
	  $('.body').css({ 'background-color': '#0DD', 'color': 'white' });
	  $('.background-theme').text('#0DD');
	});

	$(document).on('keydown', function (e) {
	  if (e.keyCode === 79) {
	    $('#canvas').toggleClass('rotateDatCanvas');
	  }
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const Ball = __webpack_require__(2);
	const Paddle = __webpack_require__(3);
	const Block = __webpack_require__(4);
	const Obstacle = __webpack_require__(5);

	var score = 0;

	function Game(ctx, canvas) {
	  this.level = 0;
	  this.ctx = ctx;
	  this.canvas = canvas;
	  this.paddle = new Paddle({}, ctx, canvas);
	  this.ball = new Ball({}, ctx, canvas);
	  this.obstacle = new Obstacle({}, ctx, canvas);
	  this.obstacleTwo = new Obstacle({ y: 175 }, ctx, canvas);
	  this.obstacleThree = new Obstacle({ y: 300 }, ctx, canvas);
	  this.moveLeft = false;
	  this.moveRight = false;
	  this.blocksArray = [];
	  this.lifeCounter = 5;
	  this.scoreCounter = score;
	  this.toggleSpaceBar = true;
	}

	Game.prototype.startScreen = function () {
	  if (this.level === 0) {
	    this.updateLifeCounterText();
	    this.updateScoreCounterText();
	    this.ctx.font = "48px Indie Flower, sans-serif";
	    this.ctx.fillText("HOW TO PLAY:", canvas.width / 6, canvas.height / 3.1);
	    this.ctx.font = "24px Indie Flower";
	    this.ctx.fillText(" - Use the left and right arrow keys to move the paddle", canvas.width / 6, canvas.height / 2.4);
	    this.ctx.fillText(" - Press space bar to start the ball", canvas.width / 6, canvas.height / 1.93);
	    this.ctx.fillText(" - Click the screen to get breakin'", canvas.width / 6, canvas.height / 1.6);
	  };
	};

	Game.prototype.run = function () {
	  if (this.level < 5) {
	    this.setUpGameOnCanvas();
	    this.updateLifeCounterText();
	    this.updateScore();
	    this.updateScoreCounterText();
	  } else {
	    this.gameOver();
	  };
	};

	Game.prototype.setUpGameOnCanvas = function () {
	  this.paddle.draw();
	  this.setPaddleKeys();
	  this.moveThePaddle();
	  this.ball.draw();
	  this.ballMovement();
	  this.ballCollisionWithWall();
	  this.ballCollisionWithPaddle();
	  this.ballCollisionWithBlocks();
	  this.ballGlitchCollision();
	  this.blocksArray.forEach(function (block) {
	    block.draw();
	  });
	  if (this.level === 2) {
	    this.obstacle.draw();
	    this.obstacle.x += this.obstacle.speed;
	    this.obstacleCollisionWithWall();
	    this.ballCollisionWithObstacleOne();
	  }
	  if (this.level === 3) {
	    this.obstacleTwo.draw();
	    this.obstacleThree.draw();
	    this.obstacleTwo.x -= this.obstacleTwo.speed;
	    this.obstacleThree.x += this.obstacleThree.speed;
	    this.obstacleCollisionWithWall();
	    this.ballCollisionWithObstacleTwo();
	    this.ballCollisionWithObstacleThree();
	  }
	  if (this.level === 4) {
	    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	    this.ctx.font = '72px Indie Flower';
	    this.ctx.fillText("You Won!", canvas.width / 3, canvas.height / 3);
	    this.ctx.fillText("Congrats Playa'", canvas.width / 5, canvas.height / 1.8);
	  }
	};

	Game.prototype.setLevel = function (level) {
	  this.level = level;
	  this.toggleSpaceBar = true;
	  this.paddle.x = 325;
	  this.paddle.y = 450;
	  for (i = 0; i < 8; i++) {
	    for (j = 0; j < level + 2; j++) {
	      this.blocksArray.push(new Block({ x: 2 + i * 100, y: 50 + j * 25, width: 96, height: 20 }, this.ctx, this.canvas));
	    }
	  }
	};

	Game.prototype.drawBlocks = function () {
	  for (i = 0; i < this.blocksArray; i++) {
	    this.blocksArray[i].draw();
	  }
	};

	Game.prototype.ballMovement = function () {
	  let ball = this.ball;
	  let paddle = this.paddle;
	  let game = this;
	  if (game.toggleSpaceBar === true) {
	    ball.x = paddle.x + paddle.width / 2;
	    ball.y = paddle.y - ball.radius;
	  }
	  $(document).on('keydown', function (e) {
	    if (e.keyCode === 32 && game.toggleSpaceBar === true) {
	      ball.speedX = ball.speed;
	      ball.speedY = ball.speed;
	      game.toggleSpaceBar = false;
	    }
	  });
	  ball.x += ball.speedX;
	  ball.y -= ball.speedY;
	};

	Game.prototype.setPaddleKeys = function () {
	  let paddle = this.paddle;
	  let game = this;
	  let canvas = this.canvas;
	  $(document).on('keydown', function (e) {
	    if (e.keyCode === 37) {
	      game.moveLeft = true;
	    }
	    if (e.keyCode === 39) {
	      game.moveRight = true;
	    }
	  });
	  $(document).on('keyup', function (e) {
	    if (e.keyCode === 37) {
	      game.moveLeft = false;
	    }
	    if (e.keyCode === 39) {
	      game.moveRight = false;
	    }
	  });
	};

	Game.prototype.setPaddleKeys = function () {
	  // let { paddle, game, canvas }
	  let paddle = this.paddle;
	  let game = this;
	  let canvas = this.canvas;
	  $(document).on('keydown', function (e) {
	    if (e.keyCode === 37) {
	      game.moveLeft = true;
	    }
	    if (e.keyCode === 39) {
	      game.moveRight = true;
	    } else if (e.keyCode === 38 || e.keyCode === 40) {
	      e.preventDefault();
	    };
	  });

	  Game.prototype.moveThePaddle = function () {
	    let paddle = this.paddle;
	    if (this.moveLeft && paddle.x > 0) {
	      paddle.x -= paddle.paddleSpeed;
	    }
	    if (this.moveRight && paddle.x + paddle.width < canvas.width) {
	      paddle.x += paddle.paddleSpeed;
	    }
	  };
	  $(document).on('keyup', function (e) {
	    if (e.keyCode === 37) {
	      game.moveLeft = false;
	    }
	    if (e.keyCode === 39) {
	      game.moveRight = false;
	    }
	  });
	};

	Game.prototype.resetPaddleAndBall = function () {
	  let { paddle, ball } = this;
	  ball.speedX = 0;
	  ball.speedY = 0;
	  ball.x = canvas.width / 2;
	  ball.y = canvas.height - paddle.height * 8;
	  paddle.x = 325;
	  paddle.y = 450;
	  return this;
	};

	Game.prototype.updateLifeCounter = function () {
	  return this.lifeCounter -= 1;
	};

	Game.prototype.updateLifeCounterText = function () {
	  $('.life-counter').text(this.lifeCounter);
	};

	Game.prototype.updateScore = function () {
	  var highscore = JSON.parse(localStorage.getItem('score'));
	  this.scoreCounter = score;
	  if (score > highscore) {
	    saveScore();
	  }
	  $('.high-score').text(highscore);
	};

	Game.prototype.updateScoreCounterText = function () {
	  $('.score-counter').text(this.scoreCounter);
	};

	Game.prototype.gameOver = function () {
	  this.ctx.font = "72px Indie Flower";
	  this.ctx.fillText('Game Over!', canvas.width / 3.5, canvas.height / 3, 500);
	  this.ctx.fillText('Final Score:', canvas.width / 3.5, canvas.height / 2);
	  this.ctx.fillText(score, canvas.width / 2.2, canvas.height / 1.5);
	};

	Game.prototype.levelComplete = function () {
	  let ball = this.ball;
	  let game = this;
	  ball.speedX = 0;
	  ball.speedY = 0;
	  this.lifeCounter += 2;
	};

	Game.prototype.ballCollisionWithPaddle = function () {
	  let { ball, paddle } = this;
	  var paddleLeft = [paddle.x, paddle.x + paddle.width / 6];
	  var paddleRight = [paddle.x + paddle.width - paddle.width / 6, paddle.x + paddle.width];
	  if (detectCollision(ball, paddle)) {
	    if (ball.x <= paddleRight[0] && ball.x >= paddleLeft[1] && ball.y >= paddle.y) {
	      ball.speedY = 6;
	      ball.y -= ball.speedY;
	    } else if (ball.x <= paddleRight[1] && ball.x >= paddleRight[0] && ball.y >= paddle.y) {
	      ball.speedX = 6;
	      ball.speedY = 6;
	      ball.x += ball.speedX;
	      ball.y -= ball.speedY;
	    } else if (ball.x >= paddleLeft[0] && ball.x <= paddleLeft[1] && ball.y >= paddle.y) {
	      ball.speedX = -6;
	      ball.speedY = 6;
	      ball.x += ball.speedX;
	      ball.y -= ball.speedY;
	    }
	  }
	};

	Game.prototype.ballCollisionWithWall = function () {
	  let ball = this.ball;
	  let paddle = this.paddle;
	  if (ball.x > canvas.width - ball.radius) {
	    ball.changeDirectionX();
	  }
	  if (ball.x < 0 + ball.radius) {
	    ball.changeDirectionX();
	  }
	  if (ball.y < 0 + ball.radius) {
	    ball.changeDirectionY();
	  }
	  if (ball.y - ball.radius > canvas.height) {
	    this.resetPaddleAndBall();
	    if (this.lifeCounter > 0) {
	      this.updateLifeCounter();
	      this.toggleSpaceBar = true;
	    } else {
	      this.level = 10;
	    }
	  }
	};

	Game.prototype.ballCollisionWithBlocks = function () {
	  let ball = this.ball;
	  let paddle = this.paddle;
	  let block = this.block;
	  let game = this;
	  this.blocksArray.forEach(function (block, index, blockarray) {
	    if (detectCollision(ball, block)) {
	      blockarray.splice(index, 1);
	      score += 10;
	      if (detectTopOrBottomCollision(ball, block)) {
	        ball.changeDirectionY();
	      } else if (detectSideCollision(ball, block)) {
	        ball.changeDirectionX();
	      }
	    };
	  });
	  if (this.blocksArray.length === 0) {
	    this.levelComplete();
	    this.setLevel(game.level += 1);
	  };
	};

	Game.prototype.ballCollisionWithObstacleOne = function () {
	  let { ball, obstacle } = this;
	  if (detectCollision(ball, obstacle)) {
	    if (ball.y - ball.radius - (obstacle.y + obstacle.height) < ball.speed && ball.speedY === 6) {
	      ball.changeDirectionY();
	    }
	  };
	};

	Game.prototype.ballCollisionWithObstacleTwo = function () {
	  let { ball, obstacleTwo } = this;
	  if (detectCollision(ball, obstacleTwo)) {
	    if (ball.y - ball.radius - (obstacleTwo.y + obstacleTwo.height) < ball.speed && ball.speedY === 6) {
	      ball.changeDirectionY();
	    }
	  };
	};

	Game.prototype.ballCollisionWithObstacleThree = function () {
	  let { ball, obstacleThree } = this;
	  if (detectCollision(ball, obstacleThree)) {
	    if (ball.y - ball.radius - (obstacleThree.y + obstacleThree.height) < ball.speed && ball.speedY === 6 || ball.y + ball.radius - obstacleThree.y < ball.speed && ball.speedY === -6) {
	      ball.changeDirectionY();
	    }
	  };
	};

	Game.prototype.obstacleCollisionWithWall = function () {
	  let { obstacle, obstacleTwo, obstacleThree } = this;
	  let obstacleArray = [obstacle, obstacleTwo, obstacleThree];
	  obstacleArray.forEach(function (obstacle) {
	    if (obstacle.x + obstacle.width > 800) {
	      obstacle.changeDirection();
	    } else if (obstacle.x < 0) {
	      obstacle.changeDirection();
	    }
	  });
	};

	Game.prototype.ballGlitchCollision = function () {
	  let ball = this.ball;
	  let paddle = this.paddle;
	  let canvas = this.canvast;
	  if (detectCollision(ball, paddle)) {
	    if (ball.x + ball.radius > paddle.x && ball.y + ball.radius > paddle.y && ball.x - ball.radius < 0) {
	      ball.changeDirectionY();
	      ball.changeDirectionX();
	    }
	    if (ball.x - ball.radius < paddle.x + paddle.width && ball.y + ball.radius > paddle.y && ball.x + ball.radius > 800) {
	      ball.changeDirectionY();
	      ball.changeDirectionX();
	    }
	  }
	};

	function detectCollision(ball, block) {
	  var bottomOfBlock = false;
	  var leftSideOfBlock = false;
	  var rightSideOfBlock = false;
	  var topOfBlock = false;
	  if (ball.y - ball.radius <= block.y + block.height) {
	    bottomOfBlock = true;
	  }
	  if (ball.x + ball.radius >= block.x) {
	    leftSideOfBlock = true;
	  }
	  if (ball.x - ball.radius <= block.x + block.width) {
	    rightSideOfBlock = true;
	  }
	  if (ball.y + ball.radius >= block.y) {
	    topOfBlock = true;
	  }
	  if (bottomOfBlock && leftSideOfBlock && rightSideOfBlock && topOfBlock) {
	    return true;
	  }
	};

	function detectSideCollision(ball, block) {
	  if (ball.x + ball.radius - block.x < ball.speed || ball.x - ball.radius - (block.x + block.width) < ball.speed) {
	    return true;
	  }
	};

	function detectTopOrBottomCollision(ball, block) {
	  if (ball.y - ball.radius - (block.y + block.height) < ball.speed) {
	    return true;
	  }
	};

	function saveScore() {
	  localStorage.setItem('score', JSON.stringify(score));
	};

	module.exports = Game;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	const Paddle = __webpack_require__(3);
	var paddle = new Paddle({});

	function Ball(options, ctx, canvas) {
	  this.radius = options.radius || 10;
	  this.x = options.x || paddle.x + paddle.width / 2;
	  this.y = options.y || paddle.y - this.radius;
	  this.speed = options.speed || 6;
	  this.speedX = options.speedX || 0;
	  this.speedY = options.speedY || 0;
	  this.ctx = ctx;
	  this.canvas = canvas;
	  this.paddle = paddle;
	}

	Ball.prototype.draw = function () {
	  this.ctx.beginPath();
	  this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
	  this.ctx.fillStyle = '#617';
	  this.ctx.fill();
	  this.ctx.closePath();
	};

	Ball.prototype.changeDirectionX = function () {
	  if (this.speedX) {
	    this.speedX = -this.speedX;
	  }
	};

	Ball.prototype.changeDirectionY = function () {
	  if (this.speedY) {
	    this.speedY = -this.speedY;
	  }
	};

	module.exports = Ball;

/***/ },
/* 3 */
/***/ function(module, exports) {

	function Paddle(options, ctx, canvas) {
	  this.x = options.x !== undefined ? options.x : 325;
	  this.y = options.y || 490;
	  this.width = options.width || 150;
	  this.height = options.height || 10;
	  this.paddleSpeed = 10;
	  this.ctx = ctx;
	  this.canvas = canvas;
	}

	Paddle.prototype.draw = function () {
	  this.ctx.fillRect(this.x, this.y, this.width, this.height);
	};

	module.exports = Paddle;

/***/ },
/* 4 */
/***/ function(module, exports) {

	function Block(options, ctx, canvas) {
	  this.x = options.x || 0;
	  this.y = options.y || 0;
	  this.width = options.width || 90;
	  this.height = options.height || 20;
	  this.ctx = ctx;
	  this.canvas = canvas;
	}

	Block.prototype.draw = function () {
	  this.ctx.fillRect(this.x, this.y, this.width, this.height);
	};

	module.exports = Block;

/***/ },
/* 5 */
/***/ function(module, exports) {

	function Obstacle(options, ctx, canvas) {
	  this.x = options.x !== undefined ? options.x : 325;
	  this.y = options.y || 150;
	  this.width = options.width || 200;
	  this.height = options.height || 10;
	  this.speed = 3;
	  this.ctx = ctx;
	  this.canvas = canvas;
	}

	Obstacle.prototype.draw = function () {
	  this.ctx.fillRect(this.x, this.y, this.width, this.height);
	};

	Obstacle.prototype.changeDirection = function () {
	  this.speed = -this.speed;
	};

	module.exports = Obstacle;

/***/ }
/******/ ]);