import {Component, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {DatabaseService} from "../database.service";
import {ModelValueForm} from "../Models/model-value-form";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit{
  data:ModelValueForm[]=[]
  dataSubscription: Subscription | undefined;
  constructor(private databaseService: DatabaseService) {
  }
  ngOnInit(): void {
    this.dataSubscription = this.databaseService.getData().subscribe((items:ModelValueForm[]) => {
      this.data = items;
      console.log( this.data);
    });
  }
}
