import { Game } from '@pages/index';

export default class App {
    private game = new Game();

    public getInstance(): Game {
        return this.game;
    }
}