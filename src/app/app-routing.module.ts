import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FaqComponent } from './faq/faq.component';
import { HomeComponent } from './home/home.component';
import { PrivateClassesComponent } from './private-classes/private-classes.component';
import { GroupClassesComponent } from './group-classes/group-classes.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent},
  { path: 'faq', component: FaqComponent },
  { path: 'private-classes', component: PrivateClassesComponent },
  { path: 'group-classes', component: GroupClassesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
