import { ViewChild } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewComponent } from './components/view/view.component';
import { GuessTheWordComponent } from './components/guess-the-word/guess-the-word.component';
import { TryingTheWordComponent } from './components/trying-the-word/trying-the-word.component';
import { PuzzleWordsComponent } from './components/puzzle-words/puzzle-words.component';
import { PuzzleLettersComponent } from './components/puzzle-letters/puzzle-letters.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ViewComponent,
  },
  {
    path: 'guess',
    pathMatch: 'full',
    component: GuessTheWordComponent,
  },
  {
    path: 'trying',
    pathMatch: 'full',
    component: TryingTheWordComponent,
  },
  {
    path: 'puzzle-words',
    pathMatch: 'full',
    component: PuzzleWordsComponent,
  },
  {
    path: 'puzzle-letters',
    pathMatch: 'full',
    component: PuzzleLettersComponent,
  },
];

export const GameRoutes = RouterModule.forChild(routes);
