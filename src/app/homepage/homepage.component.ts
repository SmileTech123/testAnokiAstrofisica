import {Component, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {DatabaseService} from "../database.service";
import {ModelValueForm} from "../Models/model-value-form";
import {formatDate} from "@angular/common";
import {Router} from "@angular/router";

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
  constructor(private databaseService: DatabaseService,private router: Router) {
  }
  ngOnInit(): void {
    this.listaRegistrazioniSubscription = this.databaseService.getData().subscribe((items:ModelValueForm[]) => {
      this.listaRegistrazioni = items;
      this.scrollableCols = [
        { field: 'year', header: 'Year'},
        { field: 'brand', header: 'Brand'},
        { field: 'color', header: 'Color' },
        { field: 'year', header: 'Year' },
        { field: 'brand', header: 'Brand'},
        { field: 'color', header: 'Color' }
      ];

      this.frozenCols = [
        { field: 'vin', header: 'Vin' }
      ];
    });
  }

  goToRegistration(){
    this.router.navigate(["/registration"])
  }



  protected readonly formatDate = formatDate;
}
