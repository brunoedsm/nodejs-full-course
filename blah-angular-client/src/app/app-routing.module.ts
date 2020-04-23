import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { BuddiesComponent } from './buddies/buddies.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'buddies', component: BuddiesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
