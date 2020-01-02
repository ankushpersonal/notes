import { Component, OnInit } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime, pluck } from 'rxjs/operators';
import { DataService, } from '../view-notes/data.service';
import * as uuid from 'uuid';


@Component({
  selector: 'app-create-notes',
  templateUrl: './create-notes.component.html',
  styleUrls: ['./create-notes.component.css']
})
export class CreateNotesComponent implements OnInit {

  note: any; // for subscription and assignment
  subscription: Subscription; // subscription
  textareaState: boolean = true;

  constructor(private _data: DataService) {

    // subscription from subjects
    this.subscription = this._data.receiver2().subscribe(item => {
      var notes: any = document.getElementById('note');
      if (item == 'item_deleted') {
        notes.value = '';
        this.textareaState = true;
      }
      else if (item == 'add_note') {
        notes.value = '';
        this.textareaState = false;
      }
      else {
        notes.value = item.text;
      }
    });

  }

  notesArray: any = [];

  listen() {
    let note: any = document.querySelector('#note');
    fromEvent(note, 'input')
      .pipe(pluck('target', 'value'), debounceTime(500))
      .subscribe((value) => {
        this._data.dataEmitter1(value);
      })
  }

  saveNote(data) {
    var note = {};
    if (data && !this.textareaState) {
      note = { "id": uuid.v4(), "text": data, "timestamp": new Date() };
      this.notesArray = JSON.parse(localStorage.getItem('notes'));
      this.notesArray.push(note);
      localStorage.setItem('notes', JSON.stringify(this.notesArray));
      this._data.dataEmitter1(note);
      this.textareaState = true;
    }
  }

  ngOnInit() {
    if (localStorage.getItem('notes')){
      this.notesArray = JSON.parse(localStorage.getItem('notes'));
    }
    else{
      localStorage.setItem('notes' , '[]');
    }
    this.listen();
  }


}

