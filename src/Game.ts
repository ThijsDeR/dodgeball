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

  public static readonly MIN_BALL_X_SPEED: number = -5;

  public static readonly BALL_X_SPEED_SCATTER: number = 10;

  public static readonly MIN_BALL_Y_SPEED: number = 0;

  public static readonly BALL_POSITION_Y_AREA: number = 0.2;

  public static readonly BALL_COLOR: string = 'blue';

  public static readonly BALL_COLORS: string[] = ['green', 'purple', 'blue'];

  public static readonly PLAYER_RADIUS: number = 50;

  public static readonly PLAYER_COLOR: string = 'red';

  public static readonly PLAYER_SPEED: number = 15;

  private scene: Scene;

  private gameLoop: GameLoop;

  private score: number;

  /**
   * Construc a new instance of this class
   *
   * @param canvas the canvas to render on
   */
  public constructor(canvas: HTMLCanvasElement) {
    this.scene = new Scene(canvas);
    this.gameLoop = new GameLoop(this.scene);
  }

  /**
   * Start the game.
   */
  public start(): void {
    // Start the animation
    console.log('start animation');
    // Set the last tick timestamp to current time
    this.gameLoop.start();
  }
}
