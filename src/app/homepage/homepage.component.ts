import {Component, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
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
  listaRegistrazioni:ModelValueForm[]=[]
  listaRegistrazioniSubscription: Subscription | undefined;
  frozenCols: any[]=[];
  scrollableCols: any[]=[];
  constructor(private databaseService: DatabaseService,private router: Router,private confirmationService: ConfirmationService,) {
  }
  ngOnInit(): void {
    this.listaRegistrazioniSubscription = this.databaseService.getData().subscribe((items:ModelValueForm[]) => {
      this.listaRegistrazioni = items;
      console.log(items)
    });
  }

  goToRegistration(){
    this.router.navigate(["/registration"])
  }
  modifyRegistration(id:number){
    this.router.navigateByUrl(`/registration?id=${id}`)
  }

  deleteRegistration(id:number){
    this.confirmationService.confirm({
      header: 'Confirmation',
      message: 'Vuoi davvero eliminare questa registrazione?',
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
