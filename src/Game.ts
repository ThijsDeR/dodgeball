import GameLoop from './GameLoop.js';
import Scene from './Scene.js';

/**
 * Main class of this Game.
 */
export default class Game {
  public static readonly GRAVITY: number = 0.0098;

  public static readonly FULL_CIRCLE: number = Math.PI * 2;

  public static readonly MIN_BALL_RADIUS: number = 25;

  public static readonly BALL_RADIUS_SCATTER: number = 25;

  public static readonly MIN_BALL_X_SPEED: number = -10;

  public static readonly BALL_X_SPEED_SCATTER: number = 20;

  public static readonly MIN_BALL_Y_SPEED: number = 0;

  public static readonly BALL_POSITION_Y_AREA: number = 0.2;

  public static readonly BALL_SPEED: number = 0.1;

  public static readonly BALL_COLOR: string = 'blue';

  public static readonly BALL_COLORS: string[] = ['green', 'purple', 'blue'];

  public static readonly PLAYER_RADIUS: number = 50;

  public static readonly PLAYER_COLOR: string = 'red';

  public static readonly PLAYER_SPEED: number = 8;

  private scene: Scene;

  private gameLoop: GameLoop;

  private wave: number;

  private score: number;

  /**
   * Construc a new instance of this class
   *
   * @param canvas the canvas to render on
   */
  public constructor(canvas: HTMLCanvasElement) {
    this.scene = new Scene(canvas, this);
    this.gameLoop = new GameLoop(this.scene, GameLoop.PLAY_CATCH_UP);
    this.wave = 0;
    this.score = 0;
  }

  /**
   * Start the game.
   */
  public start(): void {
    console.log(this.score, this.wave);
    this.score += this.wave;
    this.wave += 1;
    // Start the animation
    console.log('start animation');
    // Set the last tick timestamp to current time
    this.gameLoop.start(this.wave);
  }

  /**
   * wave
   *
   * @returns wave
   */
  public getWave(): number {
    return this.wave;
  }

  /**
   * score
   *
   * @returns score
   */
  public getScore(): number {
    return this.score;
  }
}
