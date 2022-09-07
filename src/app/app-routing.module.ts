import { EntryListComponent } from './entry-list/entry-list.component';
import { EntryComponent } from './entry/entry.component';
import { DetailComponent } from './detail/detail.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: 'detail/:id', component: DetailComponent},
  {path: 'entry-list', component: EntryListComponent},
  {path: 'entry', component: EntryComponent},
  {path: 'entry/:id', component: EntryComponent},
  {path: '', component: HomeComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
