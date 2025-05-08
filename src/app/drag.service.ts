import { Injectable, computed, signal } from '@angular/core';
import { GameService } from './game.service';
import { GameBoard } from './types';

@Injectable({
  providedIn: 'root'
})
export class DragService {
  private readonly draggedTile = signal<number | null>(null);
  private readonly overTile = signal<number | null>(null);

  start = (idx: number) => this.draggedTile.set(idx);

  cancel = () => this.draggedTile.set(null);

  finish = (targetIdx: number) => {
    const sourceIdx = this.draggedTile();
    if (sourceIdx !== null) {
      this.gameService.swap(sourceIdx, targetIdx);
      this.draggedTile.set(null);
      this.overTile.set(null);
    }
  }

  public over = (event: Event, idx: number) => {
    this.overTile.set(idx);
    event.preventDefault();
  }

  public leave = () => this.overTile.set(null);

  public getDragged = () => this.draggedTile;

  public isActive = () => computed(() => this.draggedTile() !== null);
  public getOver = () => this.overTile;

  public projectedDelta = () => computed(() => {
    const source = this.draggedTile();
    const target = this.overTile();
    if (source === null || target === null || source === target) {
      return 0;
    } else {
      const board: GameBoard = [...this.gameService.getBoard()()];
      const tmp = board[target];
      board[target] = board[source];
      board[source] = tmp;
      return this.gameService.calculateScore(board) - this.gameService.score();
    }
  });

  constructor(public gameService: GameService) { }
}
