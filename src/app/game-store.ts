import {ChoosePlayerAction} from './actions';
import Player from '../model/player';
import Game from '../model/game';
import {Robot} from './robot';
import Move from '../model/move';

export default class GameStore {
    private _game: Game;
    private _robot: Robot;
    private _humanPlayer: Player;
    private _robotPlayer: Player;

    constructor(robot: Robot) {
        this._game = new Game();
        this._robot = robot;
    }

    get game(): Game {
        return this._game;
    }

    get humanPlayer(): Player {
        return this._humanPlayer;
    }

    get robotPlayer(): Player {
        return this._robotPlayer;
    }

    public onChoosePlayer(action: ChoosePlayerAction): void {
        const player: Player = this._game.players.filter(p => p.name === action.name)[0];

        if (player === undefined) {
            throw new Error('Unknown player "' + action.name + '"');
        }

        this._humanPlayer = player;
        this._robotPlayer = this._game.players.filter(p => p !== player)[0];

        if (this._game.currentPlayer === this._robotPlayer) {
            const move: Move = this._robot.chooseMove(this._game);

            this._game.performMove(this._robotPlayer, move);
        }
    }
}