import { Component } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ModelCorpiCelesti} from "../Models/model-corpi-celesti";

@Component({
  selector: 'app-main-form',
  templateUrl: './main-form.component.html',
  styleUrls: ['./main-form.component.css']
})
export class MainFormComponent {
  corpiCelesti:ModelCorpiCelesti[]=[{nome:"pianeta",codice:"p"}, {nome:"stella",codice:"s"} ,{nome:"asteroide",codice:"a"}, {nome:"meteora",codice:"m"}, {nome:"U.F.O.",codice:"u"}]

  mainFormGroup:FormGroup = new FormGroup({
    corpoCeleste:new FormControl("")
  })
}
