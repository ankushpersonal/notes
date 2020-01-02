import { Component, OnInit } from '@angular/core';
import { Subscription, fromEvent } from 'rxjs';
import { DataService } from '../view-notes/data.service';
import { debounceTime, pluck } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  note: any; // for subscription and assignment
  subscription: Subscription; // subscription

  constructor(private _data: DataService) {
    this.subscription = this._data.receiver2().subscribe(item => { this.note = item; });
  }

  addNote() {
    this._data.dataEmitter1('add_note');
    this._data.dataEmitter2('add_note');
  }

  deleteNote() {
    let id = this.note.id;
    if (id) {
      let notesArray = JSON.parse(localStorage.getItem('notes'));
      let filteredArray = notesArray.filter(item => { return item.id != id; });
      localStorage.setItem('notes', JSON.stringify(filteredArray))
      this._data.dataEmitter1('item_deleted');
      this._data.dataEmitter2('item_deleted');
    }
  }

  listenSearchInput() {
    let search: any = document.querySelector('#search');
    fromEvent(search, 'input')
      .pipe(pluck('target', 'value'), debounceTime(500))
      .subscribe((value) => {
        this._data.dataEmitter1({ "q" : value }); // subscribe to query passed in search
      })
  }

  ngOnInit() {
    this.listenSearchInput();
  }



}
