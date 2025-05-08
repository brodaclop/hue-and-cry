import { Injectable, signal, computed } from '@angular/core';
import { GameBoard } from './types';
import seedrandom from 'seedrandom';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private static readonly diff = (x: number, y: number) => {
    if (x > y) {
      const tmp = y;
      y = x;
      x = tmp;
    }
    return Math.pow(Math.min(y - x, 360 + x - y) / 360, 2);

  }

  public calculateScore(board: GameBoard) {
    let score = 0;
    board.forEach((tile, idx) => {
      const x = idx & 3;
      const y = idx >> 2;
      if (x > 0) {
        score += GameService.diff(tile, board[idx - 1]);
      }
      if (x < 3) {
        score += GameService.diff(tile, board[idx + 1]);
      }
      if (y > 0) {
        score += GameService.diff(tile, board[idx - 4]);
      }
      if (y < 3) {
        score += GameService.diff(tile, board[idx + 4]);
      }
    });
    return score;
  }

  private readonly randomBoard = (seed: string): GameBoard => {
    const rnd = seedrandom(seed);
    const ret = Array(16).fill(-1) as GameBoard;
    ret.forEach((_: number, idx: number) => {
      let n = Math.floor(rnd() * 72.0) * 5;
      while (ret.includes(n)) {
        n = Math.floor(rnd() * 72.0) * 5;
      }
      ret[idx] = n;
    });

    return ret;
  }

  private readonly board = signal<GameBoard>(this.randomBoard('hello, world'));

  constructor() { }

  score = computed(() => {
    const board = this.board();
    return this.calculateScore(board);
  });



  reset = (seed: string) => {
    this.board.set(this.randomBoard(seed));
  }

  swap = (source: number, target: number) => this.board.update(board => {
    const ret: GameBoard = [...board];
    const tmp = ret[target];
    ret[target] = ret[source];
    ret[source] = tmp;
    return ret;
  });


  getBoard() {
    return this.board;
  }
}
