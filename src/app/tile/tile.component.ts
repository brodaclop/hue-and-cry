import { Component, Input, numberAttribute } from '@angular/core';
import { DragService } from '../drag.service';

@Component({
  selector: 'app-tile',
  imports: [],
  templateUrl: './tile.component.html',
  styleUrl: './tile.component.css'
})
export class TileComponent {
  @Input({ transform: numberAttribute }) hue: number = 0;
  @Input({ transform: numberAttribute }) idx: number = -1;

  constructor(public dragService: DragService) { }
}
