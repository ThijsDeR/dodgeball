import Ball from './Ball.js';
import Game from './Game.js';
import KeyListener from './KeyListener.js';
import Player from './Player.js';

export default class Scene {
  private canvas: HTMLCanvasElement;

  private balls: Ball[];

  private player: Player;

  private keyboard: KeyListener;

  /**
   * lol
   *
   * @param canvas sheesh
   */
  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;

    // Resize the canvas to full window size
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    // Set the player at the center

    this.keyboard = new KeyListener();

    this.balls = [];
    this.createBalls(2);

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
  private createBalls(amount: number) {
    for (let index = 0; index < amount; index++) {
      const radius = Game.MIN_BALL_RADIUS + Game.BALL_RADIUS_SCATTER * Math.random();

      this.balls.push(new Ball(
        radius,
        Game.MIN_BALL_X_SPEED + Game.BALL_X_SPEED_SCATTER * Math.random(),
        Game.MIN_BALL_Y_SPEED,
        radius + (this.canvas.width - 2 * radius) * Math.random(),
        this.canvas.height * (1 - Game.BALL_POSITION_Y_AREA)
          + this.canvas.height * (Game.BALL_POSITION_Y_AREA) * Math.random(),
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
  public update(lastTimeStamp: number, elapsed: number): {gameOver: boolean, won: boolean} {
    let status = { gameOver: false, won: false };
    const playerLocation = this.player.getSelfBall().getLocation();
    const playerHands = this.player.getHands();
    this.balls.forEach((ball, ballIndex) => {
      ball.applyPhysics(elapsed);
      ball.bounceFromCanvasWalls(this.canvas);
      [playerHands.leftHand, playerHands.rightHand].forEach((hand) => {
        const handLocation = hand.getLocation()
        if (ball.overlapsWith(handLocation.x, handLocation.y, handLocation.size)) {
          this.balls.splice(ballIndex, 1);
        }
      });
      if (this.balls.length === 0) {
        status.gameOver = true;
        status.won = true;
      }

      if (ball.overlapsWith(playerLocation.x, playerLocation.y, playerLocation.size)) {
        status.gameOver = true;
      }
    });

    return status;
  }
}
