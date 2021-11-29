export default class Vector {
  private x: number;

  private y: number;

  /**
   * f
   *
   * @param x l
   * @param y l
   */
  public constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  /**
   * f
   *
   * @returns f
   */
  public getX(): number {
    return this.x;
  }

  /**
   * l
   *
   * @param x l
   */
  public setX(x: number): void {
    this.x = x;
  }

  /**
   * f
   *
   * @returns f
   */
  public getY(): number {
    return this.y;
  }

  /**
   * l
   *
   * @param y l
   */
  public setY(y: number): void {
    this.y = y;
  }
}
