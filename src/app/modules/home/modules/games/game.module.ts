import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { DragDropModule } from '@angular/cdk/drag-drop';


import { CheckboxModule } from 'primeng/checkbox';
import { InputNumberModule } from 'primeng/inputnumber';
import { CardModule } from 'primeng/card';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { SelectButtonModule } from 'primeng/selectbutton';

import { GameRoutes } from './game.routing';
import { ViewComponent } from './components/view/view.component';
import { GuessTheWordComponent } from './components/guess-the-word/guess-the-word.component';
import { TryingTheWordComponent } from './components/trying-the-word/trying-the-word.component';
import { AlertComponent } from './components/ui/alert/alert.component';
import { SpinnerComponent } from './components/ui/spinner/spinner.component';
import { ListWordsComponent } from './components/ui/list-words/list-words.component';
import { HowManyWordsComponent } from './components/ui/how-many-words/how-many-words.component';
import { PuzzleWordsComponent } from './components/puzzle-words/puzzle-words.component';
import { HowManyWordsPuzzleComponent } from './components/ui/how-many-words-puzzle/how-many-words-puzzle.component';
import { ButtonSelectComponent } from './components/ui/button-select/button-select.component';
import { DropListWordsComponent } from './components/ui/drop-list-words/drop-list-words.component';
import { PuzzleLettersComponent } from './components/puzzle-letters/puzzle-letters.component';
import { DragWordsComponent } from './components/ui/drag-words/drag-words.component';

@NgModule({
  declarations: [
    ViewComponent,
    GuessTheWordComponent,
    TryingTheWordComponent,
    SpinnerComponent,
    AlertComponent,
    ListWordsComponent,
    HowManyWordsComponent,
    PuzzleWordsComponent,
    HowManyWordsPuzzleComponent,
    ButtonSelectComponent,
    DropListWordsComponent,
    DropListWordsComponent,
    PuzzleLettersComponent,
    DragWordsComponent



  ],
  imports: [
    GameRoutes,
    CommonModule,
    SharedModule,
    CheckboxModule,
    InputNumberModule,
    CardModule,
    PanelModule,
    TableModule,
    SelectButtonModule,
    DragDropModule


  ],
  exports: []
})
export class GameModule { }
