import {AfterViewInit, ChangeDetectorRef, Component, NgZone, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {ModelCorpiCelesti} from "../Models/model-corpi-celesti";
import { formatDate } from '@angular/common';
import {Message} from "primeng/api";
import { DatabaseService} from "../database.service";
import {Observable, Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent implements OnInit{
  idRegistrazione:number=0
  corpoCelesteSelected:ModelCorpiCelesti={nome:"pianeta",codice:"p"}
  dialogTitle:string="Esito registrazione"
  corpiCelesti:ModelCorpiCelesti[]=[{nome:"pianeta",codice:"p"}, {nome:"stella",codice:"s"} ,{nome:"asteroide",codice:"a"}, {nome:"meteora",codice:"m"}, {nome:"U.F.O.",codice:"u"}]
  classiHarvard:string[]=["O","B","A","F","G","K","M"]
  titleForm:string="Form Registrazione"
  dialogMessaggio: Message[] = [{ severity: 'success', summary: '', detail: 'Registrazione avvenuta con successo!' }];
  displayDialogMessaggio:boolean=false;
  displayTemperatura:boolean=true
  displayMassa:boolean=true
  displayRaggio:boolean=true
  displayHarvard:boolean=true
  displayInclinazioneOrbitale:boolean=true
  displayAlbedo:boolean=true
  displayDistanza:boolean=true
  displaySistemaSolare:boolean=true
  displayButtonModifyRegistration:boolean=false
  dataOggi:Date=new Date();
  mainFormGroup:FormGroup = new FormGroup({})
  constructor(private databaseService: DatabaseService,private router: Router,private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.mainFormGroup = new FormGroup<any>({
      data:new FormControl(Validators.required),
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
    this.route.queryParams.subscribe(params => {
      var idParam=params["id"]
      if(idParam!=undefined){
        this.idRegistrazione=idParam
        this.databaseService.getData().subscribe((r:any)=>{
          this.corpoCelesteSelected={codice:r[idParam].codiceCorpoCeleste,nome:r[idParam].nomeCorpoCeleste}
          this.displayButtonModifyRegistration=true
          setTimeout(()=>{
            this.mainFormGroup.patchValue(r[idParam])

          },100)
        }).unsubscribe()
      }
    })
  }





  validatoreMassaRaggio(control: AbstractControl): { [key: string]: any } | null {
      const value = control.value;
      if(value==null){
        return null;
      }
      if (value <= 0 || value >100) {
        return { 'validatoreMassaRaggio': true };
      }
      return null;
  }

  validatoreDistanzaUA(control: AbstractControl): { [key: string]: any } | null {
    const value = control.value;
    if(value!=null){
      if (value <= 0 || value >5881413000000000) {
        return { 'validatoreDistanzaUA': true };
      }
    }

    return null;
  }

  resetForm(){
    this.mainFormGroup.reset()
    this.dataOggi=new Date()
    this.mainFormGroup.controls['data'].setValue(formatDate(this.dataOggi, 'yyyy-MM-ddTHH:mm:ss', 'it'))
    this.displayDialogMessaggio=false
  }

  returnToHome(){
    this.displayDialogMessaggio=false
    this.router.navigate(["home"])
  }


  changeCorpoCeleste(){

    var codiceCorpoCeleste=this.corpoCelesteSelected.codice
    this.mainFormGroup.reset()
    this.resetDisplays();
    this.resetForm()
    switch (codiceCorpoCeleste) {
      case "p":
        this.displayHarvard=false
        this.mainFormGroup.controls['distanza'].setValidators([Validators.required,this.validatoreDistanzaUA])
        this.mainFormGroup.controls['distanza'].updateValueAndValidity()

        break;
      case "s":
        this.displayInclinazioneOrbitale=false;
        this.displayAlbedo=false
        this.mainFormGroup.controls['classeHarvard'].setValidators(Validators.required)
        this.mainFormGroup.controls['distanza'].setValidators([Validators.required,this.validatoreDistanzaUA])
        this.mainFormGroup.controls['distanza'].updateValueAndValidity()
        this.mainFormGroup.controls['classeHarvard'].updateValueAndValidity()
        break;
      case "a":
        this.displayHarvard=false
        this.displayInclinazioneOrbitale=false
        this.mainFormGroup.controls['distanza'].setValidators([Validators.required,this.validatoreDistanzaUA])
        this.mainFormGroup.controls['distanza'].updateValueAndValidity()
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
        this.mainFormGroup.controls['massa'].clearValidators()
        this.mainFormGroup.controls['raggio'].clearValidators()
        this.mainFormGroup.controls['massa'].setErrors(null)
        this.mainFormGroup.controls['raggio'].setErrors(null)
        this.mainFormGroup.controls['massa'].updateValueAndValidity()
        this.mainFormGroup.controls['raggio'].updateValueAndValidity()


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
    this.mainFormGroup.controls['classeHarvard'].clearValidators()
    this.mainFormGroup.controls['distanza'].clearValidators()
    this.mainFormGroup.controls['classeHarvard'].setErrors(null)
    this.mainFormGroup.controls['distanza'].setErrors(null)
    this.mainFormGroup.controls['classeHarvard'].updateValueAndValidity()
    this.mainFormGroup.controls['distanza'].updateValueAndValidity()
    this.mainFormGroup.controls['massa'].setValidators(this.validatoreMassaRaggio)
    this.mainFormGroup.controls['raggio'].setValidators(this.validatoreMassaRaggio)
  }



  onSubmit() {
    this.mainFormGroup.value.codiceCorpoCeleste = this.corpoCelesteSelected.codice
    this.mainFormGroup.value.nomeCorpoCeleste = this.corpoCelesteSelected.nome


    if(this.displayButtonModifyRegistration){
      this.dialogTitle="Esito modifica"
      this.dialogMessaggio= [{ severity: 'success', summary: '', detail: 'Modificata avvenuta con successo!' }];
      this.databaseService.modifyData(this.idRegistrazione,this.mainFormGroup.value);
    }else{
      this.databaseService.addData(this.mainFormGroup.value);
    }
    this.displayDialogMessaggio=true
  }
}
