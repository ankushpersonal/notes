import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private firstSubject = new Subject<any>();

  private secondSubject = new Subject<any>();
  
  constructor() { }

  dataEmitter1(data) {
    this.firstSubject.next(data); // pass the data to subject1
  }

  dataEmitter2(data) {
    this.secondSubject.next(data); // pass the data to subject2
  }

  receiver1(): Observable<any> {
    return this.firstSubject.asObservable();
  }

  receiver2(): Observable<any> {
    return this.secondSubject.asObservable();
  }

}
