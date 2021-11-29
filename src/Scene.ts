import Ball from './Ball.js';
import Game from './Game.js';
import KeyListener from './KeyListener.js';
import Player from './Player.js';
import Vector from './Vector.js';

export default class Scene {
  private canvas: HTMLCanvasElement;

  private gameObject: Game;

  private balls: Ball[];

  private player: Player;

  private keyboard: KeyListener;

  /**
   * lol
   *
   * @param canvas sheesh
   * @param gameObject sheesh
   */
  constructor(canvas: HTMLCanvasElement, gameObject: Game) {
    this.canvas = canvas;

    this.gameObject = gameObject;
    // Resize the canvas to full window size
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    // Set the player at the center

    this.keyboard = new KeyListener();

    this.balls = [];

    this.player = new Player(
      Game.PLAYER_RADIUS,
      this.canvas.width / 2,
      Game.PLAYER_RADIUS,
      'red',
      'green',
    );
  }

  /**
   * Spawn a ball
   *
   * @param amount lol
   */
  public createBalls(amount: number): void {
    for (let index = 0; index < amount; index++) {
      const radius = Game.MIN_BALL_RADIUS + Game.BALL_RADIUS_SCATTER * Math.random();

      this.balls.push(new Ball(
        radius,
        new Vector(
          Game.MIN_BALL_X_SPEED + Game.BALL_X_SPEED_SCATTER * Math.random(),
          Game.MIN_BALL_Y_SPEED,
        ),
        new Vector(
          radius + (this.canvas.width - 2 * radius) * Math.random(),
          this.canvas.height * (1 - Game.BALL_POSITION_Y_AREA)
            + this.canvas.height * (Game.BALL_POSITION_Y_AREA) * Math.random(),
        ),
        Game.BALL_COLORS[Math.round(Game.BALL_COLORS.length * Math.random())],
      ));
    }
  }

  /**
   * process input
   */
  public processInput(): void {
    if (this.keyboard.isKeyDown(KeyListener.KEY_LEFT)) {
      this.player.moveBallOnX(-Game.PLAYER_SPEED, this.canvas);
    } if (this.keyboard.isKeyDown(KeyListener.KEY_RIGHT)) {
      this.player.moveBallOnX(Game.PLAYER_SPEED, this.canvas);
    }
  }

  /**
   * Renders the game state so player can see that balls
   */
  public render(): void {
    const ctx = this.canvas.getContext('2d');
    // Clear the entire canvas
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw Text
    ctx.font = '25px serif';
    ctx.fillStyle = 'black';
    ctx.fillText(`Wave: ${this.gameObject.getWave()}`, 10, 50);
    ctx.fillText(`Score: ${this.gameObject.getScore()}`, 10, 100);

    // Draw the player
    this.player.render(this.canvas);

    // Draw the ball
    this.balls.forEach((ball) => {
      ball.render(this.canvas);
    });
  }

  /**
   * Update the statuses of all the (moving) balls
   *
   * @param lastTimeStamp lol
   * @param elapsed no idea tbh
   * @returns boolean whether game is over or not
   */
  public update(lastTimeStamp: number, elapsed: number): boolean {
    let gameOver = false;
    const playerLocation = this.player.getSelfBall().getLocation();
    const playerHands = this.player.getHands();
    const bouncedBalls: number[] = [];
    this.balls.forEach((ball, ballIndex) => {
      ball.applyPhysics(elapsed);
      ball.bounceFromCanvasWalls(this.canvas);

      this.balls.forEach((otherBall, otherBallIndex) => {
        const otherBallLocation = otherBall.getLocation();
        if (ball.overlapsWith(otherBallLocation.x, otherBallLocation.y, otherBallLocation.size)
         && ballIndex !== otherBallIndex && !bouncedBalls.includes(ballIndex)) {
          bouncedBalls.push(otherBallIndex);
          console.log(bouncedBalls);
          const ballSpeed = ball.getSpeed();
          const otherBallSpeed = otherBall.getSpeed();
          ball.setSpeed(new Vector(
            ballSpeed.getX() - otherBallSpeed.getY() * 0.01,
            ballSpeed.getY() - otherBallSpeed.getX() * 0.01,
          ));
          otherBall.setSpeed(new Vector(
            otherBallSpeed.getX() - ballSpeed.getY() * 0.01,
            otherBallSpeed.getY() - ballSpeed.getX() * 0.01,
          ));
        }
      });

      const hands = [playerHands.leftHand, playerHands.rightHand];
      hands.forEach((hand) => {
        const handLocation = hand.getLocation();
        if (ball.overlapsWith(handLocation.x, handLocation.y, handLocation.size)) {
          this.balls.splice(ballIndex, 1);
        }
      });
      if (this.balls.length === 0) {
        gameOver = true;
        this.toggleEndgameScreen(true);
      }

      if (ball.overlapsWith(playerLocation.x, playerLocation.y, playerLocation.size)) {
        gameOver = true;
        this.toggleEndgameScreen(false);
      }
    });

    return gameOver;
  }

  /**
   * wow
   *
   * @param won won
   */
  public toggleEndgameScreen(won: boolean): void {
    const popupScreen = document.querySelector('div#popupScreen');
    if (won) {
      popupScreen.querySelector('h2').innerHTML = 'GG EZ ROUND';
      const popupScreenButton = popupScreen.querySelector('button#actionButton');
      popupScreenButton.innerHTML = 'click or press space for new round';

      const keyboardNewRoundFunction = (event: KeyboardEvent) => {
        if (event.keyCode === 32) {
          // eslint-disable-next-line @typescript-eslint/no-use-before-define
          newRoundFunction();
        }
      };

      const newRoundFunction = () => {
        popupScreen.classList.remove('active');
        this.gameObject.start();
        // popupScreenButton.removeEventListener('click', newRoundFunction);
        window.removeEventListener('keyup', keyboardNewRoundFunction);
        popupScreenButton.removeEventListener('click', newRoundFunction);
      };

      // popupScreenButton.addEventListener('click', newRoundFunction);
      window.addEventListener('keyup', keyboardNewRoundFunction);
      popupScreenButton.addEventListener('click', newRoundFunction);
      popupScreen.classList.add('active');
    } else {
      popupScreen.querySelector('h2').innerHTML = 'Lost noob';
      const popupScreenButton = popupScreen.querySelector('button#actionButton');
      popupScreenButton.innerHTML = 'new game noob';

      const keyboardNewGameFunction = (event: KeyboardEvent) => {
        if (event.keyCode === 32) {
          // eslint-disable-next-line @typescript-eslint/no-use-before-define
          newGameFunction();
        }
      };

      const newGameFunction = () => {
        window.location.reload();
      };

      window.addEventListener('keyup', keyboardNewGameFunction);
      popupScreenButton.addEventListener('click', newGameFunction);
      popupScreen.classList.add('active');
    }
  }
}
