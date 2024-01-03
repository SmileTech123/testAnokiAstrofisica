import {BehaviorSubject, Observable, Subject} from "rxjs";
import {Injectable} from "@angular/core";
import {ModelCorpiCelesti} from "./Models/model-corpi-celesti";
import {ModelValueForm} from "./Models/model-value-form";
@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private dataSubject = new BehaviorSubject<any[]>([]);
  private data: ModelValueForm[] = []; // Dati del database
  constructor() {
    const savedData = sessionStorage.getItem('database');
    if (savedData) {
      this.data = JSON.parse(savedData);
      this.dataSubject.next([...this.data]);
    }
  }

  getData(): Observable<any[]> {
    return this.dataSubject.asObservable();
  }

  addData(item: ModelValueForm): void {
    this.data.push(item);
    this.dataSubject.next([...this.data]); // Aggiorna i sottoscrittori con i nuovi dati;
    sessionStorage.setItem('database', JSON.stringify(this.data));
  }


}
