import { Component } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { BoardComponent } from './board/board.component';
import { GameService } from './game.service';
import { DragService } from './drag.service';
import { AbsPipe } from './abs.pipe';



@Component({
  selector: 'app-root',

  imports: [RouterOutlet, BoardComponent, DecimalPipe, AbsPipe],
  providers: [DecimalPipe, AbsPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  constructor(public gameService: GameService, public dragService: DragService) { }
}
