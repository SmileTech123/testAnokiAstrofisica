import {BehaviorSubject, Observable, Subject} from "rxjs";
import {Injectable} from "@angular/core";
import {ModelCorpiCelesti} from "./Models/model-corpi-celesti";
import {ModelValueForm} from "./Models/model-value-form";
@Injectable({
  providedIn: 'root'
})

//Componente per gestire il database simulato con rxjs richiamabile in tutto il progetto

export class DatabaseService {
  private databaseSubject = new BehaviorSubject<any[]>([]);
  private dati: ModelValueForm[] = []; // Dati del database
  constructor() {
    //Prendo i valori dalla sessione e se esistono inizializzo l array con i valori recuperati
    const savedData = sessionStorage.getItem('database');
    if (savedData) {
      this.dati = JSON.parse(savedData);
      this.databaseSubject.next([...this.dati]);
    }
  }

  //Funzione che ritorna i valori storicizzati nel database
  getData(): Observable<any[]> {
    return this.databaseSubject.asObservable();
  }

  //Funzione che elimina i valori tramite id nel database
  deleteData(id:number): void {
    this.dati.splice(id,1)
    this.databaseSubject.next([...this.dati]); // Aggiorna i sottoscrittori con i nuovi dati;
    sessionStorage.setItem('database', JSON.stringify(this.dati));
  }

  //Funzione che modifica i valori tramite id nel database
  modifyData(id:number,item: ModelValueForm){
    this.dati[id]=item
    this.databaseSubject.next([...this.dati]); // Aggiorna i sottoscrittori con i nuovi dati;
    sessionStorage.setItem('database', JSON.stringify(this.dati));
  }

  //Funzione che aggiunge i valori al database
  addData(item: ModelValueForm): void {
    this.dati.push(item);
    this.databaseSubject.next([...this.dati]); // Aggiorna i sottoscrittori con i nuovi dati;
    sessionStorage.setItem('database', JSON.stringify(this.dati));
  }


}
