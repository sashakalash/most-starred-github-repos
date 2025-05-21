import { Component } from '@angular/core';

import { RepoListComponent } from '@app/features/repo-list/repo-list.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RepoListComponent],
})
export class AppComponent {}
