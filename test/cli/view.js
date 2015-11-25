var expect = require('chai').expect;
var chalk = require('chalk');
var view = require('../../src/cli/view');
var Game = require('../../src/model/game').default;

describe('view', () => {
    describe('showSpace', () => {
        var game;

        beforeEach(() => {
            game = new Game();
        });

        it('should show an empty space', () => {
            var expected, actual;

            expected = chalk.dim('4');
            actual = view.showSpace(game, {x: 0, y: 1});

            expect(actual).to.equal(expected);
        });

        it('should show a space marked with X', () => {
            var expected, actual;

            expected = chalk.yellow('X');
            game.board.spaceAt(0, 1).mark(game.players[0]);
            actual = view.showSpace(game, {x: 0, y: 1});

            expect(actual).to.equal(expected);
        });

        it('should show a space marked with O', () => {
            var expected, actual;

            expected = chalk.cyan('O');
            game.board.spaceAt(0, 1).mark(game.players[1]);
            actual = view.showSpace(game, {x: 0, y: 1});

            expect(actual).to.equal(expected);
        });
    });

    describe('showBoard', () => {
        var game;

        beforeEach(() => {
            game = new Game();
        });

        it('should show an empty board', () => {
            var expected, actual;

            expected = ' 1 | 2 | 3 \n'
                         + '---+---+---\n'
                         + ' 4 | 5 | 6 \n'
                         + '---+---+---\n'
                         + ' 7 | 8 | 9 ';

            actual = chalk.stripColor(view.showBoard(game));

            expect(actual).to.equal(expected);
        });

        it('should show a partially filled board', () => {
            var expected, actual;

            expected = ' 1 | 2 | X \n'
                         + '---+---+---\n'
                         + ' O | X | 6 \n'
                         + '---+---+---\n'
                         + ' O | 8 | 9 ';

            game.board.spaceAt(1, 1).mark(game.players[0]);
            game.board.spaceAt(0, 1).mark(game.players[1]);
            game.board.spaceAt(2, 2).mark(game.players[0]);
            game.board.spaceAt(0, 0).mark(game.players[1]);

            actual = chalk.stripColor(view.showBoard(game));

            expect(actual).to.equal(expected);
        });
    });
});