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
  idRegistrazione:number=0 //Variabile per memorizzare l' id della registrazione (se in modifica)
  corpoCelesteSelected:ModelCorpiCelesti={nome:"pianeta",codice:"p"} //Variabile con binding legata alla select del corpo celeste
  dialogTitle:string="Esito registrazione" //Titolo della dialog che si apre dopo il submit
  corpiCelesti:ModelCorpiCelesti[]=[{nome:"pianeta",codice:"p"}, {nome:"stella",codice:"s"} ,{nome:"asteroide",codice:"a"}, {nome:"meteora",codice:"m"}, {nome:"U.F.O.",codice:"u"}] //Variabile che memorizza tutti i valori possibili per la select dei corpi celesti
  classiHarvard:string[]=["O","B","A","F","G","K","M"] //Variabile che memorizza tutti i valori possibili per la select della classe Harvard
  titleForm:string="Form Registrazione" //Titolo della card contente il form
  dialogMessaggio: Message[] = [{ severity: 'success', summary: '', detail: 'Registrazione avvenuta con successo!' }]; //Variabile di configurazione per il messaggio da visualizzare nella dialog
  displayDialogMessaggio:boolean=false; //Variabile che definisce se la dialog deve essere visibile
  displayTemperatura:boolean=true //Variabile che definisce se il campo temperatura deve essere visibile
  displayMassa:boolean=true //Variabile che definisce se il campo massa deve essere visibile
  displayRaggio:boolean=true //Variabile che definisce se il campo raggio deve essere visibile
  displayHarvard:boolean=true //Variabile che definisce se il campo classe Harvard deve essere visibile
  displayInclinazioneOrbitale:boolean=true //Variabile che definisce se il campo Inclinazione Orbitale deve essere visibile
  displayAlbedo:boolean=true //Variabile che definisce se il campo Albedo deve essere visibile
  displayDistanza:boolean=true //Variabile che definisce se il campo distanza deve essere visibile
  displaySistemaSolare:boolean=true //Variabile che definisce se il campo Sistema Solare deve essere visibile
  displayButtonModifyRegistration:boolean=false //Variabile che definisce se il bottone per modificare i valori deve essere visibile
  dataOggi:Date=new Date(); //Variabile che memorizza la data e orario odierna
  mainFormGroup:FormGroup = new FormGroup({}) //Variabile contente la configurazione del form
  constructor(private databaseService: DatabaseService,private router: Router,private route: ActivatedRoute) {
  }



  ngOnInit(): void {
    //All avvio del componente creo tutti i campi del form impostando i valori di default e i validatori

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

    //Leggo i parametri dalla query e se l'id esiste recupero i dati dal database e li assegno al form

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





  //Funzione che crea un validatore custom per i campi massa e raggio
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

  //Funzione che crea un validatore custom per il campo distanza
  validatoreDistanzaUA(control: AbstractControl): { [key: string]: any } | null {
    const value = control.value;
    if(value!=null){
      if (value <= 0 || value >5881413000000000) {
        return { 'validatoreDistanzaUA': true };
      }
    }

    return null;
  }

  //Funzione che pulisce i valori del form riportandoli allo stato originale
  resetForm(){
    this.mainFormGroup.reset()
    this.dataOggi=new Date()
    this.mainFormGroup.controls['data'].setValue(formatDate(this.dataOggi, 'yyyy-MM-ddTHH:mm:ss', 'it'))
    this.displayDialogMessaggio=false
  }

  //Funzione che reindirizza alla pagina home
  returnToHome(){
    this.displayDialogMessaggio=false
    this.router.navigate(["home"])
  }



  //Funzione che viene eseguita al cambio di valore della select dei corpi Celesti
  //Resetto i campi e la loro visualizzazione e controllo in base al valore quali campi devono essere visibili e validati
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



  //Funzione che viene eseguita all' evento input sul campo distanza
  //Controlla il valore della distanza per verificare l appartenenza al sistema Solare
  distanzaModificata(){
    var distanzaModificata = this.mainFormGroup.controls['distanza'].value
    if(distanzaModificata>130){
      this.mainFormGroup.controls['sistemaSolare'].setValue(false)
    }else{
      this.mainFormGroup.controls['sistemaSolare'].setValue(true)
    }
  }


  //Funzione che ripristina allo stato originale la visualizzazione dei campi e la loro validazione
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



  //Funzione eseguita al submit del form
  //Se siamo in creazione aggiunge i dati al database
  //Altrimenti modifico titolo e messaggio della dialog e modifico i dati nel database
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
