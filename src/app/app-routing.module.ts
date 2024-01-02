import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RegistrationFormComponent} from "./registration-form/registration-form.component";
import {HomepageComponent} from "./homepage/homepage.component";

const routes: Routes = [
  {path:"home",component:HomepageComponent},
  {path:"registration",component:RegistrationFormComponent},
  { path: '', redirectTo: '/registration', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
