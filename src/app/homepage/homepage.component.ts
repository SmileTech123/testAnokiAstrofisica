import {Component, OnInit} from '@angular/core';
import {DatabaseService} from "../database.service";
import {ModelValueForm} from "../Models/model-value-form";
import {formatDate} from "@angular/common";
import {Router} from "@angular/router";
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})

export class HomepageComponent implements OnInit{
  listaRegistrazioni:ModelValueForm[]=[] //lista contenente tutte le registrazioni

  constructor(private databaseService: DatabaseService,private router: Router,private confirmationService: ConfirmationService,) {
  }
  ngOnInit(): void {
    //Recupero la lista all' avvio del componente e assegno i valori alla variabile listaRegistrazioni
    this.databaseService.getData().subscribe((items:ModelValueForm[]) => {
      this.listaRegistrazioni = items;
    });
  }

  //Funzione che reinderizza alla pagina di registrazione
  goToRegistration(){
    this.router.navigate(["/registration"])
  }

  //Funzione che reinderizza alla pagina di registrazione passando come parametro l' id
  // In questo modo posso recuperare i valori per modificare la registrazione
  modifyRegistration(id:number){
    this.router.navigateByUrl(`/registration?id=${id}`)
  }

  //Funzione che elimina la registrazione tramite id chiedendo la conferma dell' utente
  deleteRegistration(id:number){
    this.confirmationService.confirm({
      header: 'Confirmation',
      message: 'Vuoi davvero eliminare questa registrazione?',
      acceptLabel:'Si',
      acceptIcon: 'pi pi-check mr-2',
      rejectIcon: 'pi pi-times mr-2',
      rejectButtonStyleClass: 'p-button-sm',
      acceptButtonStyleClass: 'p-button-outlined p-button-sm',
      accept: () => {
        this.databaseService.deleteData(id)
      },
      reject: () => {

      }
    });

  }



  protected readonly formatDate = formatDate;
}
