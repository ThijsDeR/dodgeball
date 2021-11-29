import Game from './Game.js';
import Vector from './Vector.js';

export default class Ball {
  private radius: number;

  private position: Vector;

  private speed: Vector;

  private color: string;

  /**
   * l
   *
   * @param radius l
   * @param speed l
   * @param pos l
   * @param color l
   */
  public constructor(
    radius: number,
    speed: Vector,
    pos: Vector,
    color: string,
  ) {
    this.radius = radius;
    this.speed = speed;
    this.position = pos;
    this.color = color;
  }

  /**
   * Moves the ball by applying the Newtonian laws of physics
   *
   * @param t the time to move over
   */
  public applyPhysics(t: number): void {
    // move: calculate the new position of the ball
    // Some physics here: the y-portion of the speed changes due to gravity
    // Formula: Vt = V0 + gt
    // 9.8 is the gravitational constant
    this.speed.setY(this.speed.getY() - Game.BALL_SPEED * Game.GRAVITY * t);
    // Calculate new X and Y parts of the position
    // Formula: S = v*t
    this.position.setX(this.position.getX() + Game.BALL_SPEED * this.speed.getX() * t);
    // Formula: S=v0*t + 0.5*g*t^2
    this.position.setY(this.position.getY() + this.speed.getY() * t + 0.5 * Game.GRAVITY * t * t);
  }

  /**
   * Lets the ball bounce from the canvas walls
   *
   * @param canvas the canvas to bounce between
   */
  public bounceFromCanvasWalls(canvas: HTMLCanvasElement): void {
    // collide: check if the ball hits the walls and let it bounce
    // Left wall
    if (this.position.getX() <= this.radius && this.speed.getX() < 0) {
      this.speed.setX(-this.speed.getX());
    }
    // Right wall
    if (this.position.getX() >= canvas.width - this.radius
      && this.speed.getX() > 0) {
      this.speed.setX(-this.speed.getX());
    }

    // Bottom only (ball will always come down)
    if (this.position.getY() <= this.radius && this.speed.getY() < 0) {
      this.speed.setY(-this.speed.getY());
    }
  }

  /**
   * Check if the ball collides with the player
   *
   * @param x the x position of the player
   * @param y the y position of the player
   * @param r the radius of the player
   * @returns `true` if the ball overlaps with the player
   */
  public overlapsWith(x: number, y:number, r: number): boolean {
    // adjust: Check if the ball collides with the player. It's game over
    // then
    const distX = x - this.position.getX();
    const distY = y - this.position.getY();
    // Calculate the distance between ball and player using Pythagoras'
    // theorem
    const distance = Math.sqrt(distX * distX + distY * distY);
    // Collides is distance <= sum of radii of both circles
    return distance <= (this.radius + r);
  }

  /**
   * Renders the ball on the canvas
   *
   * @param canvas the canvas to render on
   * @param ctx the rendering context to draw on
   */
  public render(canvas: HTMLCanvasElement): void {
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = this.color;
    ctx.beginPath();
    // reverse height, so the ball falls down
    const y = canvas.height - this.position.getY();
    ctx.ellipse(this.position.getX(), y, this.radius, this.radius, 0, 0,
      2 * Game.FULL_CIRCLE);
    ctx.fill();
  }

  /**
   * cool location data
   *
   * @returns location data
   */
  public getLocation(): { x: number, y: number, size: number } {
    return { x: this.position.getX(), y: this.position.getY(), size: this.radius };
  }

  /**
   * cool thing
   *
   * @param amount amount
   * @param canvas amount
   */
  public moveBallOnX(amount: number): void {
    this.position.setX(this.position.getX() + amount);
  }

  /**
   * l
   *
   * @returns l
   */
  public getSpeed(): Vector {
    return this.speed;
  }

  /**
   * l
   *
   * @param vector l
   */
  public setSpeed(vector: Vector): void {
    this.speed = vector;
  }
}
