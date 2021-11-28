import Ball from './Ball.js';

export default class Player {
  private selfBall: Ball;

  private leftHand: Ball;

  private rightHand: Ball;

  /**
   * wow
   * @param radius ;
   * @param posX ;
   * @param posY ;
   * @param color ;
   * @param handsColor ;
   */
  public constructor(
    radius: number,
    posX: number,
    posY: number,
    color: string,
    handsColor: string,
  ) {
    this.selfBall = new Ball(
      radius,
      0,
      0,
      posX,
      posY,
      color,
    );
    this.leftHand = new Ball(
      radius,
      0,
      0,
      posX - (radius * 2),
      posY,
      handsColor,
    );
    this.rightHand = new Ball(
      radius,
      0,
      0,
      posX + (radius * 2),
      posY,
      handsColor,
    );
  }

  /**
   * wow
   *
   * @param canvas ;
   */
  public render(canvas: HTMLCanvasElement): void {
    this.selfBall.render(canvas);
    this.leftHand.render(canvas);
    this.rightHand.render(canvas);
  }

  /**
   * l
   *
   * @param amount l
   * @param canvas l
   */
  public moveBallOnX(amount: number, canvas: HTMLCanvasElement): void {
    const leftHandLocation = this.leftHand.getLocation();
    const rightHandLocation = this.rightHand.getLocation();
    if (leftHandLocation.x + amount - leftHandLocation.size < 0
      || rightHandLocation.x + amount + rightHandLocation.size > canvas.width) return;

    this.selfBall.moveBallOnX(amount);
    this.leftHand.moveBallOnX(amount);
    this.rightHand.moveBallOnX(amount);
  }

  /**
     * balls
     *
     * @returns balls
     */
  public getSelfBall(): Ball {
    return this.selfBall;
  }

  /**
   * balls
   *
   * @returns balls
   */
  public getHands(): { leftHand: Ball, rightHand: Ball } {
    return { leftHand: this.leftHand, rightHand: this.rightHand };
  }
}
