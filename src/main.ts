import Game from './Game.js';
import Scene from './Scene.js';

// Add EventListener to load the game whenever the browser is ready
window.addEventListener('load', () => {
  console.log('Handling the Load event');
  
  const game = new Game(document.querySelector('canvas#canvas'));
  game.start();
});
