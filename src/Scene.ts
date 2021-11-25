import Game from "./Game";

export default class Scene {
  private canvas: HTMLCanvasElement;

  private ballRadius: number;

  private ballPositionX: number;

  private ballPositionY: number;

  private ballSpeedX: number;

  private ballSpeedY: number;

  private playerPositionX: number;
  
  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;

    // Resize the canvas to full window size
    this.canvas.width = window.innerWidth - 1;
    this.canvas.height = window.innerHeight - 4;

    this.createBall();

    // Set the player at the center
    this.playerPositionX = this.canvas.width / 2;
  }
    /**
   * Spawn a ball
   */
  private createBall() {
    this.ballRadius = Game.MIN_BALL_RADIUS + Game.BALL_RADIUS_SCATTER * Math.random();
    this.ballSpeedX = Game.MIN_BALL_X_SPEED + Game.BALL_X_SPEED_SCATTER * Math.random();
    this.ballSpeedY = Game.MIN_BALL_Y_SPEED;
    this.ballPositionX = this.ballRadius
      + (this.canvas.width - 2 * this.ballRadius) * Math.random();
    this.ballPositionY = this.canvas.height * 0.8
      + this.canvas.height * Game.BALL_POSITION_Y_AREA * Math.random();
  }

  public processInput() {
    
  }

  /**
   * Renders the game state so player can see that balls
   */
  public render() {
    const ctx = this.canvas.getContext('2d');
    // Clear the entire canvas
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw the player
    ctx.fillStyle = Game.PLAYER_COLOR;
    ctx.beginPath();
    const playerPositionY = this.canvas.height - Game.PLAYER_RADIUS;
    ctx.ellipse(
      this.playerPositionX,
      playerPositionY,
      Game.PLAYER_RADIUS,
      Game.PLAYER_RADIUS,
      0,
      0,
      Game.FULL_CIRCLE,
    );
    ctx.fill();

    // Draw the ball
    ctx.fillStyle = Game.BALL_COLOR;
    ctx.beginPath();
    // reverse height, so the ball falls down
    const y = this.canvas.height - this.ballPositionY;
    ctx.ellipse(
      this.ballPositionX,
      y,
      this.ballRadius,
      this.ballRadius,
      0,
      0,
      Game.FULL_CIRCLE,
    );
    ctx.fill();
  }

  /**
   * Update the statuses of all the (moving) balls
   *
   * @param timestamp no idea tbh
   * @returns boolean whether game is over or not
   */
  public update(lastTimeStamp: number, timestamp: number): boolean {
    const t = timestamp - lastTimeStamp;

    // move: calculate the new position of the ball
    // Some physics here: the y-portion of the speed changes due to gravity
    // Formula: Vt = V0 + gt
    // 9.8 is the gravitational constant
    this.ballSpeedY -= Game.GRAVITY * t;
    // Calculate new X and Y parts of the position
    // Formula: S = v*t
    this.ballPositionX += this.ballSpeedX * t;
    // Formula: S=v0*t + 0.5*g*t^2
    this.ballPositionY += this.ballSpeedY * t + 0.5 * Game.GRAVITY * t * t;

    // collide: check if the ball hits the walls and let it bounce
    // Left wall
    if (this.ballPositionX <= this.ballRadius && this.ballSpeedX < 0) {
      this.ballSpeedX = -this.ballSpeedX;
    }
    // Right wall
    if (this.ballPositionX >= this.canvas.width - this.ballRadius
      && this.ballSpeedX > 0) {
      this.ballSpeedX = -this.ballSpeedX;
    }

    // Bottom only (ball will always come down)
    if (this.ballPositionY <= this.ballRadius && this.ballSpeedY < 0) {
      this.ballSpeedY = -this.ballSpeedY;
    }

    // adjust: Check if the ball collides with the player. It's game over
    // then
    const distX = this.playerPositionX - this.ballPositionX;
    const distY = Game.PLAYER_RADIUS - this.ballPositionY;
    // Calculate the distance between ball and player using Pythagoras'
    // theorem
    const distance = Math.sqrt(distX * distX + distY * distY);
    // Collides is distance <= sum of radii of both circles
    const gameover = distance <= (this.ballRadius + 50);
    return gameover;
  }
}