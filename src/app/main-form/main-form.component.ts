import { Component } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {ModelCorpiCelesti} from "../Models/model-corpi-celesti";
import { formatDate } from '@angular/common';
@Component({
  selector: 'app-main-form',
  templateUrl: './main-form.component.html',
  styleUrls: ['./main-form.component.css']
})
export class MainFormComponent {
  corpiCelesti:ModelCorpiCelesti[]=[{nome:"pianeta",codice:"p"}, {nome:"stella",codice:"s"} ,{nome:"asteroide",codice:"a"}, {nome:"meteora",codice:"m"}, {nome:"U.F.O.",codice:"u"}]
  classiHarvard:string[]=["O","B","A","F","G","K","M"]
  displayTemperatura:boolean=true
  displayMassa:boolean=true
  displayRaggio:boolean=true
  displayHarvard:boolean=true
  displayInclinazioneOrbitale:boolean=true
  displayAlbedo:boolean=true
  displayDistanza:boolean=true
  displaySistemaSolare:boolean=true
  dataOggi:Date=new Date();


  mainFormGroup:FormGroup = new FormGroup({
    corpoCeleste:new FormControl({nome:"pianeta",codice:"p"},Validators.required),
    data:new FormControl(formatDate(this.dataOggi, 'yyyy-MM-ddTHH:mm:ss', 'it'),Validators.required),
    angoloOrario:new FormControl("",Validators.required),
    declinazione:new FormControl("",Validators.required),
    temperatura:new FormControl(""),
    massa:new FormControl("",[this.validatoreMassaRaggio]),
    raggio:new FormControl("",[this.validatoreMassaRaggio]),
    classeHarvard:new FormControl(""),
    inclinazioneOrbitale:new FormControl(""),
    albedo:new FormControl(""),
    distanza:new FormControl(""),
    sistemaSolare:new FormControl(true),
  })



  validatoreMassaRaggio(control: AbstractControl): { [key: string]: any } | null {
      const value = control.value;
      console.log(value)
      if (value <= 0 || value >100) {
        return { 'validatoreMassaRaggio': true };
      }
      return null;
  }

  validatoreDistanzaUA(control: AbstractControl): { [key: string]: any } | null {

    const value = control.value;
    console.log(value)
    if (value <= 0 || value >5881413000000000) {
      return { 'validatoreDistanzaUA': true };
    }
    return null;
  }


  changeCorpoCeleste(){
    var valoreCorpoCeleste:ModelCorpiCelesti=this.mainFormGroup.controls['corpoCeleste'].value
    var codiceCorpoCeleste=valoreCorpoCeleste.codice
    this.resetDisplays();
    switch (codiceCorpoCeleste) {
      case "p":
        this.displayHarvard=false
        this.mainFormGroup.controls['distanza'].setValidators([Validators.required,this.validatoreDistanzaUA])
        break;
      case "s":
        this.displayInclinazioneOrbitale=false;
        this.displayAlbedo=false
        this.mainFormGroup.controls['classeHarvard'].setValidators(Validators.required)
        this.mainFormGroup.controls['distanza'].setValidators([Validators.required,this.validatoreDistanzaUA])
        break;
      case "a":
        this.displayHarvard=false
        this.displayInclinazioneOrbitale=false
        this.mainFormGroup.controls['distanza'].setValidators([Validators.required,this.validatoreDistanzaUA])
        break;
      case "m":
        this.displayTemperatura=false
        this.displayHarvard=false
        this.displayInclinazioneOrbitale=false
        this.displayAlbedo=false
        this.displayDistanza=false
        this.displaySistemaSolare=false
        break;
      case "u":
        this.displayTemperatura=false
        this.displayMassa=false
        this.displayRaggio=false
        this.displayHarvard=false
        this.displayInclinazioneOrbitale=false
        this.displayAlbedo=false
        this.displayDistanza=false
        this.displaySistemaSolare=false
    }

  }


  distanzaModificata(){
    var distanzaModificata = this.mainFormGroup.controls['distanza'].value
    if(distanzaModificata>130){
      this.mainFormGroup.controls['sistemaSolare'].setValue(false)
    }else{
      this.mainFormGroup.controls['sistemaSolare'].setValue(true)
    }
  }


  resetDisplays(){
    this.displayTemperatura=true
    this.displayMassa=true
    this.displayRaggio=true
    this.displayHarvard=true
    this.displayInclinazioneOrbitale=true
    this.displayAlbedo=true
    this.displayDistanza=true
    this.displaySistemaSolare=true
  }

  onSubmit() {
    // Logica per gestire i dati del form dopo il submit
    console.log('Dati del form:', this.mainFormGroup);
    // Puoi anche chiamare un servizio per inviare i dati al server
  }

}
