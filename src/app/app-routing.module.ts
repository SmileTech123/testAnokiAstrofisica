import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RegistrationFormComponent} from "./registration-form/registration-form.component";
import {HomepageComponent} from "./homepage/homepage.component";


 //Definisco i route per le pagine, come pagina iniziale se il path è vuoto imposto il componente HomePage
const routes: Routes = [
  {path:"home",component:HomepageComponent},
  {path:"registration",component:RegistrationFormComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
