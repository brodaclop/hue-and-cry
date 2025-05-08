import { Component, Input } from '@angular/core';
import { GameBoard } from '../types';
import { TileComponent } from '../tile/tile.component';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-board',
  imports: [TileComponent, NgForOf],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css'
})
export class BoardComponent {
  @Input() board: GameBoard = [
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
  ]
}
